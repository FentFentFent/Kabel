import { Element, Rect } from "@svgdotjs/svg.js";
import eventer, { EventSetupFn } from "../util/eventer";
import Renderer from "../renderers/renderer";

import userState from '../util/user-state';


function initInputBox(element: Element, args: Record<string, any>) {
    let editing = false;
    let skipNextClick = false;
    let buffer = args.field.getDisplayValue?.() ?? "";
    let cursorPos = buffer.length; // index in buffer

    const txt = args.text;
    const rect = element as Rect;
    const renderer: Renderer = args.renderer;
    txt.style('user-select', 'none');
    //@ts-ignore
    rect.style('user-select', 'none');

    const { height } = renderer.measureRawField("");
    const offsetY = (height - txt.bbox().height) / 2;

    function updateText() {
        // insert caret as a vertical bar into string
        const display = buffer.slice(0, cursorPos) + (editing ? '|' : '') + buffer.slice(cursorPos);
        txt.text(display);

        const { width } = renderer.measureRawField(buffer);
        rect.size(width, height);
        rect.move(args.startX, 0);
        txt.move(args.startX + renderer.constants.INPUT_BOX_PADDING, offsetY);
    }

    function onKeyDown(e: KeyboardEvent) {
        if (!editing) return;

        if (e.key === "Enter") {
            stopEditing();
            return;
        }
        if (e.key === "Backspace") {
            if (cursorPos > 0) {
                buffer = buffer.slice(0, cursorPos - 1) + buffer.slice(cursorPos);
                cursorPos--;
            }
        } else if (e.key === "Delete") {
            buffer = buffer.slice(0, cursorPos) + buffer.slice(cursorPos + 1);
        } else if (e.key === "ArrowLeft") {
            if (cursorPos > 0) cursorPos--;
        } else if (e.key === "ArrowRight") {
            if (cursorPos < buffer.length) cursorPos++;
        } else if (e.key.length === 1) {
            let ch = e.key;
            if (e.shiftKey) ch = ch.toUpperCase();
            buffer = buffer.slice(0, cursorPos) + ch + buffer.slice(cursorPos);
            cursorPos++;
        } else return;

        e.preventDefault();
        updateText();
        args.field.setValue(buffer);
    }

    function onClickOutside(ev: MouseEvent) {
        if (!editing) return;
        if (skipNextClick) {
            skipNextClick = false;
            return;
        }
        const target = ev.target as Node;
        if (target !== rect.node && target !== txt.node) stopEditing();
    }

    function startEditing(ev?: MouseEvent) {
        editing = true;
        buffer = args.field.getValue?.() ?? "";
        cursorPos = buffer.length; // default to end

        // mark that the user is typing
        userState.setState('typing');

        if (ev) {
            const rectBox = rect.node.getBoundingClientRect();
            const clickX = ev.clientX - rectBox.left - renderer.constants.INPUT_BOX_PADDING;

            let cumulativeWidth = 0;
            cursorPos = 0;

            for (let i = 0; i < buffer.length; i++) {
                const charWidth = renderer.measureTextWidth(buffer[i]);
                if (cumulativeWidth + charWidth / 2 >= clickX) break; // place after closest char
                cumulativeWidth += charWidth;
                cursorPos = i + 1;
            }
        }

        updateText();
        skipNextClick = true;

        document.addEventListener("keydown", onKeyDown);
        document.addEventListener("mousedown", onClickOutside);
    }

    function stopEditing() {
        editing = false;

        // remove typing state
        userState.removeState('typing');

        document.removeEventListener("keydown", onKeyDown);
        document.removeEventListener("mousedown", onClickOutside);
        args.field.setValue(buffer); // store without caret
        updateText();
        renderer.getWs().redraw();
    }


    rect.on("mousedown", (ev: Event) => startEditing(ev as MouseEvent));
    txt.on("mousedown", (ev: Event) => startEditing(ev as MouseEvent));


    updateText();

    return () => {
        rect.off("mousedown", startEditing as EventListener);
        txt.off("mousedown", startEditing);
        document.removeEventListener("keydown", onKeyDown);
        document.removeEventListener("mousedown", onClickOutside);
    };
}


eventer.registerEvent("k_inputbox", initInputBox as EventSetupFn);
