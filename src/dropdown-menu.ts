import { G } from "@svgdotjs/svg.js";
import Field, { AnyField } from "./field";
import NodeSvg from "./nodesvg";

/**
 * Allowed owner types for the dropdown container.
 * Can be either a NodeSvg or a Field.
 */
export type AllowedOwner = NodeSvg | AnyField;

/**
 * Get absolute position of an HTMLElement relative to the document.
 * @param el - The HTML element to measure.
 * @returns The bounding box with scroll offset.
 */
function getAbsolutePosition(el: HTMLElement) {
    const rect = el.getBoundingClientRect();
    return {
        x: rect.left + window.scrollX,
        y: rect.top + window.scrollY,
        width: rect.width,
        height: rect.height,
    };
}

/**
 * Options for creating a dropdown menu.
 */
export interface DropdownOptions {
    /** List of items to display in the dropdown */
    items: { label: string; value: string }[];
    /** Callback when an item is selected */
    onSelect?: (value: string, item: { label: string; value: string }) => void;
    /** Optional fixed width of the dropdown */
    width?: number;
}

/**
 * Dropdown container for NodeSvg or Field elements.
 * Supports singleton behavior (only one dropdown visible at a time).
 */
class DropdownContainer {
    private static current: DropdownContainer | null = null;
    private owner: AllowedOwner | null = null;
    private rootEl: HTMLDivElement;
    private options: DropdownOptions | null = null;
    private constraint: { x: number; y: number; width: number; height: number };
    private offset: { dx: number; dy: number };
    private currentRemoveListener: (() => void) | null = null;
    /**
     * Creates the dropdown container and attaches it to the DOM.
     */
    constructor() {
        this.rootEl = document.createElement("div");
        this.rootEl.className = "KabelDropdownMenu";
        this.rootEl.style.position = "absolute";
        this.rootEl.style.display = "none";
        document.body.appendChild(this.rootEl);

        this.constraint = { x: 0, y: 0, width: 0, height: 0 };
        this.offset = { dx: 0, dy: 0 };
    }

    /**
     * Move the dropdown by an offset.
     * @param dx - horizontal offset
     * @param dy - vertical offset
     */
    move(dx: number, dy: number) {
        this.offset.dx = dx;
        this.offset.dy = dy;
        this.updatePosition();
    }

    /**
     * Update the dropdown position based on constraint and offset.
     */
    private updatePosition() {
        const { x, y, height } = this.constraint;
        const { dx, dy } = this.offset;
        this.rootEl.style.left = `${x + dx}px`;
        this.rootEl.style.top = `${y + height + dy}px`; // anchored below
    }

    /**
     * Set inner HTML content of the dropdown.
     * @param html - HTML string
     */
    setContent(html: string) {
        this.rootEl.innerHTML = html;
    }

    /**
     * Append an element as a child to the dropdown.
     * @param element - Element to append
     * @returns The appended element
     */
    appendChild(element: Element) {
        this.rootEl.appendChild(element);
        return element;
    }

    /**
     * Show the dropdown for a given owner.
     * @param owner - NodeSvg or Field that owns this dropdown
     * @param options - Dropdown configuration options
     */
    show(owner: AllowedOwner, options: DropdownOptions) {
        if (!owner.svgGroup) return;
        this.hide(); // close existing dropdown first
        this.owner = owner;
        if (options) this.options = options;
        if (this.currentRemoveListener) this.currentRemoveListener();
        this.currentRemoveListener = null;
        const groupRect = owner.svgGroup.node.getBoundingClientRect();
        this.constraint = {
            x: groupRect.left + window.scrollX,
            y: groupRect.top + window.scrollY,
            width: groupRect.width,
            height: groupRect.height,
        };

        this.offset = { dx: 0, dy: 0 };

        this.rootEl.innerHTML = "";
        if (options.width) this.rootEl.style.width = `${options.width}px`;
        this.rootEl.style.display = "block";

        // Render items
        if (options.items) {
            options.items.forEach((item) => {
                const el = document.createElement("div");
                el.className = "KabelDropdownItem";
                el.textContent = item.label;
                el.onclick = () => {
                    options.onSelect?.(item.value, item);
                    this.hide();
                };
                this.rootEl.appendChild(el);
            });
        }
        if (owner instanceof NodeSvg) {
            // Add a move listener to the node's workspace.
            const ws = owner.workspace;
            let remove = ws?.addMoveListener(() => {
                if (this.owner !== owner) {
                    remove!(); // disconnect when owner changes.
                    return;
                }
                this.hideIfOwner(owner)
            });
            this.currentRemoveListener = remove as () => void;
        }
        if (owner instanceof Field) {
            // Add a move listener to the field's workspace.
            const ws = owner.node!.workspace;
            let remove = ws?.addMoveListener(() => {
                if (this.owner !== owner) {
                    console.log("Disconnecting..");
                    remove!(); // disconnect when owner changes.
                    return;
                }
                console.log("Hiding..");
                this.hide();
            });
            this.currentRemoveListener = remove as () => void;
        }
        this.updatePosition();
        DropdownContainer.current = this;
    }

    /**
     * Hide this dropdown.
     */
    hide() {
        if (DropdownContainer.current !== this) return;
        this.rootEl.style.display = "none";
        this.rootEl.innerHTML = "";
        this.owner = null;
        this.options = null;
        DropdownContainer.current = null;
        if (this.currentRemoveListener) this.currentRemoveListener();
        this.currentRemoveListener = null;
    }

    /**
     * Hide this dropdown if the given owner currently owns it.
     * @param owner - The owner to check
     */
    hideIfOwner(owner: AllowedOwner) {
        if (this.owner === owner) {
            this.hide();
        }
    }

    /** @returns True if the dropdown is currently visible */
    isVisible(): boolean {
        return DropdownContainer.current === this;
    }

    /** @returns The current owner of the dropdown, or null if none */
    getOwner(): AllowedOwner | null {
        return this.owner;
    }

    /** @returns The currently visible dropdown container singleton */
    static getCurrent(): DropdownContainer | null {
        return DropdownContainer.current;
    }
}

// Singleton export
const dropdownContainer = new DropdownContainer();
export default dropdownContainer;
export { DropdownContainer };
