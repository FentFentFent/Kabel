import { Element, Rect, Text } from "@svgdotjs/svg.js";
import eventer, { EventSetupFn } from "../util/eventer";
import userState from '../util/user-state';
import { Renderer } from "../src";

function initInputBox(element: Element, args: Record<string, any>) {
    let editing = false;
    let skipNextClick = false;
    let buffer = args.field.getDisplayValue?.() ?? "";
    let cursorPos = buffer.length;
    let anchorPos = buffer.length;
    const txt: Text = args.text;
    const rect: Rect = element as Rect;
    const renderer = args.renderer as Renderer;
    const PADDING_X = 4;
    const PADDING_Y = 4;
    let caretLine: Rect | null = null;
    let selectionRect: Rect | null = null;
    // @ts-ignore
    txt!.style('user-select', 'none');
    // @ts-ignore
    rect!.style('user-select', 'none');

    // Helper: measure width of text using renderer or fallback
    function measureTextWidth(text: string) {

        if (renderer.measureTextWidth) return renderer.measureTextWidth(text);
        return text.length * 8; // rough fallback
    }

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

    function updateText() {
        // redraw main text
        txt.text(buffer);

        const { start, end } = getSelectionRange();
        const { width: totalWidth } = renderer.measureRawField(buffer);
        const { height: rectHeight } = rect.bbox(); // actual rect height

        const textBBox = txt.bbox();
        const offsetY = (rectHeight - textBBox.height) / 2; // center vertically

        // --- selection highlight ---
        if (hasSelection()) {
            const textBeforeStart = buffer.slice(0, start);
            const textBeforeEnd = buffer.slice(0, end);
            const highlightX = args.startX + PADDING_X + measureTextWidth(textBeforeStart);
            const highlightWidth = Math.max(measureTextWidth(textBeforeEnd) - measureTextWidth(textBeforeStart), 1);
            const highlightY = offsetY; // use offsetY for vertical alignment

            if (!selectionRect) {
                // @ts-ignore
                selectionRect = rect.parent()!.rect(highlightWidth, textBBox.height)
                    .fill('#3390ff')
                    .attr({ 'fill-opacity': 0.35 });
                selectionRect!.node.parentNode!.insertBefore(selectionRect!.node, txt.node);
            } else {
                selectionRect.size(highlightWidth, textBBox.height);
            }

            selectionRect!.move(highlightX, highlightY);
        } else {
            if (selectionRect) { selectionRect.remove(); selectionRect = null; }
        }

        // --- caret ---
        if (editing) {
            const caretX = args.startX + PADDING_X + measureTextWidth(buffer.slice(0, cursorPos));
            const caretH = textBBox.height;
            // @ts-ignore
            if (!caretLine) caretLine = rect.parent()!.rect(1, caretH).fill(renderer.constants.FIELD_RAW_TEXT_COLOR);
            caretLine!.size(1, caretH).move(caretX, offsetY);
        } else {
            if (caretLine) { caretLine.remove(); caretLine = null; }
        }

        // --- background rect ---
        rect.size(Math.max(16, totalWidth + PADDING_X * 2), Math.max(rectHeight, textBBox.height + PADDING_Y * 2));
        txt.move(args.startX + PADDING_X, offsetY);
    }


    function onKeyDown(e: KeyboardEvent) {
        if (!args.field.canEdit()) { // If editing isnt allowed, close the event early.
            if (editing) stopEditing();
            return;
        }
        if (!editing) return;

        if (e.key === "Escape") { e.preventDefault(); stopEditing(); return; }
        if (e.key === "Enter") { e.preventDefault(); stopEditing(); return; }

        if (e.key === "Backspace") {
            if (!deleteSelection() && cursorPos > 0) {
                buffer = buffer.slice(0, cursorPos - 1) + buffer.slice(cursorPos);
                cursorPos--;
                anchorPos = cursorPos;
            }
        } else if (e.key === "Delete") {
            if (!deleteSelection() && cursorPos < buffer.length) {
                buffer = buffer.slice(0, cursorPos) + buffer.slice(cursorPos + 1);
            }
        } else if (e.key === "ArrowLeft") {
            if (e.shiftKey) cursorPos = Math.max(0, cursorPos - 1);
            else { cursorPos = Math.max(0, cursorPos - 1); anchorPos = cursorPos; }
        } else if (e.key === "ArrowRight") {
            if (e.shiftKey) cursorPos = Math.min(buffer.length, cursorPos + 1);
            else { cursorPos = Math.min(buffer.length, cursorPos + 1); anchorPos = cursorPos; }
        } else if (e.key === "Home") {
            if (!e.shiftKey) anchorPos = 0;
            cursorPos = 0;
        } else if (e.key === "End") {
            if (!e.shiftKey) anchorPos = buffer.length;
            cursorPos = buffer.length;
        } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
            if (hasSelection()) deleteSelection();
            buffer = buffer.slice(0, cursorPos) + e.key + buffer.slice(cursorPos);
            cursorPos++;
            anchorPos = cursorPos;
        } else return;

        e.preventDefault();
        updateText();
        args.field.setValue(buffer);
    }

    function onClickOutside(ev: MouseEvent) {
        if (!editing) return;
        if (skipNextClick) { skipNextClick = false; return; }
        const target = ev.target as Node;
        if (target !== rect.node && target !== txt.node) stopEditing();
    }

    function startEditing(ev?: MouseEvent) {
        if (!args.field.canEdit()) { // If editing isnt allowed, close the event early.
            if (editing) stopEditing();
            return;
        }
        if (editing) return;
        editing = true;
        buffer = args.field.getValue?.() ?? "";
        cursorPos = buffer.length;
        anchorPos = buffer.length;

        userState.setState('typing');

        if (ev) {
            const rectBox = rect.node.getBoundingClientRect();
            const clickX = ev.clientX - rectBox.left - PADDING_X;
            let cumulativeWidth = 0;
            cursorPos = 0;
            for (let i = 0; i < buffer.length; i++) {
                const charWidth = measureTextWidth(buffer[i]);
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

    function stopEditing() {
        editing = false;
        userState.removeState('typing');
        document.removeEventListener("keydown", onKeyDown);
        document.removeEventListener("mousedown", onClickOutside);
        args.field.setValue(buffer);
        updateText();
        renderer.getWs().redraw();
    }

    rect.on("mousedown", (ev: Event) => startEditing(ev as MouseEvent));
    txt.on("mousedown", (ev: Event) => startEditing(ev as MouseEvent));

    updateText();

    return () => {
        rect.off("mousedown", startEditing as EventListener);
        txt.off("mousedown", startEditing as EventListener);
        document.removeEventListener("keydown", onKeyDown);
        document.removeEventListener("mousedown", onClickOutside);
    };
}

eventer.registerEvent("k_inputbox", initInputBox as EventSetupFn);
