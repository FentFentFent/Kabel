import { Element as SvgElement, Rect as SvgRect, Text as SvgText } from "@svgdotjs/svg.js";
import CommentModel from "../src/comment";
import eventer, { EventSetupFn } from "../util/eventer";
import userState from '../util/user-state';
import Renderer from "../comment-renderer/renderer"

type InitArgs = {
    comment: CommentModel;
    text: SvgText;
    renderer: Renderer;
};

function initCommentInput(element: SvgElement, rawArgs: any) {
    const args = rawArgs as InitArgs;
    const comment = args.comment;
    const txt = args.text as SvgText;
    const rect = element as unknown as SvgRect;
    const renderer = args.renderer;

    let editing = false;
    let skipNextClick = false;
    let buffer = comment.getText() ?? "";
    let cursorPos = buffer.length;
    let anchorPos = buffer.length;

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

    function encodeForSvg(s: string) {
        return s.replace(/ /g, "\u00A0").replace(/\n/g, "&#10;");
    }

    function ensureTspansPreserve(node: Element) {
        Array.from(node.childNodes).forEach((child) => {
            if (child.nodeType === 1) (child as Element).setAttribute("xml:space", "preserve");
        });
    }

    let caretLine: SvgRect | null = null;
    let selectionRect: SvgRect | null = null;

    // --- MEASURE TEXT WIDTH USING COMMENT RENDERER ---
    function measureTextWidth(text: string, fontSize?: number, fontFamily?: string) {
        // Delegate to renderer’s measureTextBbox logic
        const tempText = renderer.getSvg().text(text).font({ size: fontSize || 12, family: fontFamily || "Arial" });
        const bbox = renderer.measureTextBbox(tempText);
        tempText.remove();
        return bbox.width;
    }

    function updateText() {
        const { start, end } = getSelectionRange();
        const hasSel = hasSelection();

        // redraw main text
        txt.clear().tspan(encodeForSvg(buffer));
        txt.attr({ "xml:space": "preserve" });
        try { ensureTspansPreserve(txt.node as Element); } catch { }
        txt.leading(1.2);

        // --- selection highlight ---
        if (hasSel) {
            const fontSize = parseFloat(txt.attr('font-size') as string) || 14;
            const fontFamily = txt.attr('font-family') as string || 'Arial';

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
                //@ts-ignore
                selectionRect = rect!.parent()!.rect?.(highlightWidth, highlightH)
                    .fill('#3390ff')
                    .attr({ 'fill-opacity': 0.35 });
                selectionRect!.node.parentNode!.insertBefore(selectionRect!.node, txt.node);
            } else {
                selectionRect.size(highlightWidth, highlightH);
            }

            selectionRect!.move(highlightX, highlightY);
        } else {
            if (selectionRect) { selectionRect.remove(); selectionRect = null; }
        }

        // --- caret ---
        if (editing) {
            const fontSize = parseFloat(txt.attr('font-size') as string) || 14;
            const fontFamily = txt.attr('font-family') as string || 'Arial';
            const textBeforeCaret = buffer.slice(0, cursorPos);
            const caretXOffset = measureTextWidth(textBeforeCaret, fontSize, fontFamily);

            const bbox = txt.bbox();
            const caretY = bbox.y;
            const caretH = bbox.height;

            //@ts-ignore
            if (!caretLine) caretLine = rect.parent().rect(1, caretH).fill('#000');

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

    // --- editing lifecycle ---
    function startEditing(ev?: MouseEvent) {
        if (editing) return;
        editing = true;
        buffer = comment.getText() ?? "";
        cursorPos = buffer.length;
        anchorPos = buffer.length;

        userState.setState('typing');

        if (ev) {
            const rectBox = txt.node.getBoundingClientRect();
            //@ts-ignore
            const zoom = renderer.getWs().getZoom();
            const clickX = (ev.clientX - rectBox.left - PADDING_X) / zoom;

            let cumulativeWidth = 0;
            cursorPos = 0;
            for (let i = 0; i < buffer.length; i++) {
                const charWidth = measureTextWidth(buffer[i] as string);
                if (cumulativeWidth + charWidth / 2 >= clickX) break;
                cumulativeWidth += charWidth;
                cursorPos = i + 1;
            }
        }

        anchorPos = cursorPos;
        updateText();
        skipNextClick = true;

        document.addEventListener("keydown", onKeyDown);
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
