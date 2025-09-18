import { Element as SvgElement, Rect as SvgRect, Text as SvgText } from "@svgdotjs/svg.js";
import CommentModel from "../src/comment";
import eventer, { EventSetupFn } from "../util/eventer";
import userState from '../util/user-state';

type InitArgs = {
    comment: CommentModel;
    text: SvgText;
};

function initCommentInput(element: SvgElement, rawArgs: any) {
    const args = rawArgs as InitArgs;
    const comment = args.comment;
    const txt = args.text as SvgText;
    const rect = element as unknown as SvgRect;
    const ws = comment.getWorkspace();
    const svg = ws.svg;
    function measureTextWidth(text: string, fontSize: number, fontFamily: string): number {
        if (!svg) return text.length * (fontSize) * 0.6;

        // encode spaces so measurement matches display
        const displayText = encodeForSvg(text);

        const txt = svg.text(displayText)
            .attr({ 'xml:space': 'preserve' })
            .font({ family: fontFamily, size: fontSize, anchor: 'start' })
            .opacity(0); // hide it

        const width = txt.bbox().width;
        txt.remove(); // clean up
        return width;
    }

    let editing = false;
    let skipNextClick = false;
    let buffer = comment.getText() ?? "";
    let cursorPos = buffer.length;
    let anchorPos = buffer.length; // selection anchor

    const PADDING_X = 4;
    const PADDING_Y = 4;
    function getSelectionRange() {
        const start = Math.min(cursorPos, anchorPos);
        const end = Math.max(cursorPos, anchorPos);
        return { start, end };
    }

    function hasSelection() {
        return cursorPos !== anchorPos;
    }

    function deleteSelection() {
        if (!hasSelection()) return false;
        const { start, end } = getSelectionRange();
        buffer = buffer.slice(0, start) + buffer.slice(end);
        cursorPos = start;
        anchorPos = start;
        return true;
    }

    // Helper: encode spaces into NBSPs for display so multiple spaces are visible.
    // Simple and reliable: converts every regular space to NBSP.
    // If you care about wrapping later we can make this fancier (only convert runs or leading spaces).
    function encodeForSvg(s: string) {
        // replace spaces with NBSPs
        // replace newlines with SVG line breaks
        return s.replace(/ /g, "\u00A0").replace(/\n/g, "&#10;");
    }


    function ensureTspansPreserve(node: Element) {
        // set xml:space on all child elements (tspans)
        Array.from(node.childNodes).forEach((child) => {
            if (child.nodeType === 1) {
                (child as Element).setAttribute("xml:space", "preserve");
            }
        });
    }

    let caretLine: SvgRect | null = null;
    let selectionRect: SvgRect | null = null;
    let measureText: SvgText | null = null; // hidden measurement element

    function updateText() {
        const { start, end } = getSelectionRange();
        const hasSel = hasSelection();

        // --- redraw main text (full buffer, always) ---
        txt.clear().tspan(encodeForSvg(buffer));
        txt.attr({ "xml:space": "preserve" });


        try { ensureTspansPreserve(txt.node as Element); } catch { }
        txt.leading(1.2);

        // --- selection highlight (same as before) ---
        if (hasSel) {
            const fontSize = parseFloat(txt.attr('font-size') as string) || 14;
            const fontFamily = txt.attr('font-family') as string || 'Arial';

            const { start, end } = getSelectionRange();
            const textBeforeStart = buffer.slice(0, start);
            const textBeforeEnd = buffer.slice(0, end);

            const bbox = txt.bbox();
            const highlightX = bbox.x + measureTextWidth(textBeforeStart, fontSize, fontFamily);
            const highlightWidth = Math.max(
                measureTextWidth(textBeforeEnd, fontSize, fontFamily) - measureTextWidth(textBeforeStart, fontSize, fontFamily),
                1
            );
            const highlightY = bbox.y;
            const highlightH = bbox.height;

            if (!selectionRect) {
                // explicitly append to parent so it actually exists in DOM
                // @ts-ignore
                selectionRect = rect!.parent()!.rect?.(highlightWidth, highlightH)
                    .fill('#3390ff')
                    .attr({ 'fill-opacity': 0.35 });
                selectionRect!.node.parentNode!.insertBefore(selectionRect!.node, txt.node);
            } else {
                console.log(highlightWidth, highlightH);
                selectionRect.size(highlightWidth, highlightH);
            }

            selectionRect!.move(highlightX, highlightY);
        } else {
            if (selectionRect) { selectionRect.remove(); selectionRect = null; }
        }



        // --- caret rect logic using measureTextWidth ---
        if (editing) {
            const fontSize = parseFloat(txt.attr('font-size') as string) || 14; // fallback if needed
            const fontFamily = txt.attr('font-family') as string || 'Arial';

            // get the width of all characters before the cursor
            const textBeforeCaret = buffer.slice(0, cursorPos);
            const caretXOffset = measureTextWidth(textBeforeCaret, fontSize, fontFamily);

            // get bbox to know y and height
            const bbox = txt.bbox();
            const caretY = bbox.y;
            const caretH = bbox.height;

            if (!caretLine) {
                // @ts-ignore
                caretLine = rect.parent().rect(1, caretH).fill('#000');
            }

            caretLine!.size(1, caretH).move(bbox.x + caretXOffset, caretY);
        } else {
            if (caretLine) { caretLine.remove(); caretLine = null; }
        }








        // --- resize background rect ---
        const bbox = txt.bbox();
        const handleRadius = 6;
        const textOffsetX = PADDING_X + handleRadius * 2 + 4;
        const rectW = Math.max(16, Math.ceil(bbox.width) + textOffsetX + PADDING_X);
        const rectH = Math.max(16, Math.ceil(bbox.height) + PADDING_Y * 2);
        rect.size(rectW, rectH);

        comment._tempInputBBox = {
            width: rectW,
            height: rectH,
            textX: textOffsetX,
            textY: PADDING_Y
        };
    }


    function startEditing(ev?: MouseEvent) {
        if (editing) return;
        editing = true;
        buffer = comment.getText() ?? "";
        cursorPos = buffer.length;

        userState.setState("typing");

        if (ev && comment._tempInputBBox) {
            let localX = ev.offsetX - comment._tempInputBBox.textX;
            localX = Math.max(0, localX);
            cursorPos = buffer.length / 2;
            anchorPos = buffer.length / 2;
        }

        updateText();
        skipNextClick = true;

        document.addEventListener("keydown", onKeyDown, { capture: true });
        document.addEventListener("mousedown", onClickOutside);
    }

    function stopEditing(commit = true) {
        if (!editing) return;
        editing = false;

        userState.removeState("typing");

        document.removeEventListener("keydown", onKeyDown, { capture: true });
        document.removeEventListener("mousedown", onClickOutside);

        if (commit) comment.setTextNoRedraw(buffer);
        updateText();
        comment.getWorkspace()?.redraw?.();
    }

    function onKeyDown(e: KeyboardEvent) {
        if (!editing) return;

        if (e.key === "Escape") { e.preventDefault(); stopEditing(false); return; }

        if (e.key === "Enter") {
            e.preventDefault();
            stopEditing(true);
        } else if (e.key === "Backspace") {
            e.preventDefault();
            if (hasSelection()) {
                deleteSelection();
            } else if (cursorPos > 0) {
                buffer = buffer.slice(0, cursorPos - 1) + buffer.slice(cursorPos);
                cursorPos--;
                anchorPos = cursorPos;
            }
        } else if (e.key === "Delete") {
            e.preventDefault();
            if (hasSelection()) {
                deleteSelection();
            } else if (cursorPos < buffer.length) {
                buffer = buffer.slice(0, cursorPos) + buffer.slice(cursorPos + 1);
            }
        }
        else if (e.key === "ArrowLeft") {
            e.preventDefault();
            if (e.shiftKey) {
                // extend selection left
                cursorPos = Math.max(0, cursorPos - 1);
            } else {
                // collapse selection and move
                cursorPos = Math.max(0, cursorPos - 1);
                anchorPos = cursorPos;
            }
        } else if (e.key === "ArrowRight") {
            e.preventDefault();
            if (e.shiftKey) {
                // extend selection right
                cursorPos = Math.min(buffer.length, cursorPos + 1);
            } else {
                // collapse selection and move
                cursorPos = Math.min(buffer.length, cursorPos + 1);
                anchorPos = cursorPos;
            }
        } else if (e.key === "Home") {
            e.preventDefault();
            if (e.shiftKey) {
                cursorPos = 0; // anchor unchanged
            } else {
                cursorPos = 0;
                anchorPos = cursorPos;
            }
        } else if (e.key === "End") {
            e.preventDefault();
            if (e.shiftKey) {
                cursorPos = buffer.length;
            } else {
                cursorPos = buffer.length;
                anchorPos = cursorPos;
            }
        } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            if (hasSelection()) deleteSelection();
            buffer = buffer.slice(0, cursorPos) + e.key + buffer.slice(cursorPos);
            cursorPos++;
            anchorPos = cursorPos;
        }

        updateText();
        comment.setTextNoRedraw(buffer);
    }

    function onClickOutside(ev: MouseEvent) {
        if (!editing) return;
        if (skipNextClick) { skipNextClick = false; return; }
        const targ = ev.target as Node;
        if (targ !== rect.node && targ !== txt.node) stopEditing(true);
    }

    const onRectDown = (ev: Event) => startEditing(ev as MouseEvent);
    const onTextDown = (ev: Event) => startEditing(ev as MouseEvent);

    rect.on("mousedown", onRectDown as any);
    txt.on("mousedown", onTextDown as any);

    updateText();

    return () => {
        rect.off("mousedown", onRectDown as any);
        txt.off("mousedown", onTextDown as any);
        document.removeEventListener("keydown", onKeyDown, { capture: true });
        document.removeEventListener("mousedown", onClickOutside);
    };
}

eventer.registerEvent("k_commentinp", initCommentInput as EventSetupFn);
export default initCommentInput;
