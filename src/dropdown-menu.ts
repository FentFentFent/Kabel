import { G } from "@svgdotjs/svg.js";
import Field, { AnyField } from "./field";
import NodeSvg from "./nodesvg";

export type AllowedOwner = NodeSvg | AnyField;

function getAbsolutePosition(el: HTMLElement) {
    const rect = el.getBoundingClientRect();
    return {
        x: rect.left + window.scrollX,
        y: rect.top + window.scrollY,
        width: rect.width,
        height: rect.height,
    };
}

export interface DropdownOptions {
    items: { label: string; value: string }[];
    onSelect?: (value: string, item: { label: string; value: string }) => void;
    width?: number;
}

class DropdownContainer {
    private static current: DropdownContainer | null = null;
    private owner: AllowedOwner | null = null;
    private rootEl: HTMLDivElement;
    private options: DropdownOptions | null = null;
    private constraint: { x: number; y: number; width: number; height: number };
    private offset: { dx: number; dy: number };

    constructor() {
        this.rootEl = document.createElement("div");
        this.rootEl.className = "KabelDropdownMenu";
        this.rootEl.style.position = "absolute";
        this.rootEl.style.display = "none";
        document.body.appendChild(this.rootEl);

        this.constraint = { x: 0, y: 0, width: 0, height: 0 };
        this.offset = { dx: 0, dy: 0 };
    }

    move(dx: number, dy: number) {
        this.offset.dx = dx;
        this.offset.dy = dy;
        this.updatePosition();
    }

    private updatePosition() {
        const { x, y, height } = this.constraint;
        const { dx, dy } = this.offset;
        this.rootEl.style.left = `${x + dx}px`;
        this.rootEl.style.top = `${y + height + dy}px`; // anchored below, with offset
    }
    setContent(html: string) {
        this.rootEl.innerHTML = html;
    }
    appendChild(element: Element) {
        this.rootEl.appendChild(element);
        return element;
    }
    show(owner: AllowedOwner, options: DropdownOptions) {
        if (!owner.svgGroup) return;
        this.hide(); // close any existing one
        this.owner = owner;
        if (options) this.options = options;

        // compute constraint using bbox
        const groupRect = owner.svgGroup.node.getBoundingClientRect();
        this.constraint = {
            x: groupRect.left + window.scrollX,
            y: groupRect.top + window.scrollY,
            width: groupRect.width,
            height: groupRect.height,
        };

        // xy always 0 no matter what???
        // reset offset each time
        this.offset = { dx: 0, dy: 0 };

        // render dropdown items
        this.rootEl.innerHTML = "";
        if (options.width) this.rootEl.style.width = `${options.width}px`;
        this.rootEl.style.display = "block";

        if (options.items) options.items.forEach((item) => { // this is optional incase u want custom content via DropdownContainer.setContent or appendChild
            const el = document.createElement("div");
            el.className = "KabelDropdownItem";
            el.textContent = item.label;
            el.onclick = () => {
                options.onSelect?.(item.value, item);
                this.hide();
            };
            this.rootEl.appendChild(el);
        });

        this.updatePosition();
        DropdownContainer.current = this;
    }


    hide() {
        if (DropdownContainer.current !== this) return;
        this.rootEl.style.display = "none";
        this.rootEl.innerHTML = "";
        this.owner = null;
        this.options = null;
        DropdownContainer.current = null;
    }
    hideIfOwner(owner: AllowedOwner) {
        if (this.owner == owner) {
            this.hide();
        }
    }
    isVisible(): boolean {
        return DropdownContainer.current === this;
    }
    getOwner(): AllowedOwner | null {
        return this.owner;
    }
    static getCurrent(): DropdownContainer | null {
        return DropdownContainer.current;
    }
}

// singleton export
const dropdownContainer = new DropdownContainer();
export default dropdownContainer;
export { DropdownContainer }