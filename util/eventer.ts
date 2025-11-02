import { Svg, Rect, Circle, G, Path, Element } from '@svgdotjs/svg.js';

export type EventType = string;
export type EventArgs = Record<string, any>;
export type EventSetupFn = (el: Element, args?: EventArgs) => (() => void) | void;

export interface RegisteredEl {
    tags: string[],
    el: Element;
    type: EventType;
    args?: EventArgs | undefined;      // allow undefined explicitly
    destroyFn?: (() => void) | undefined; // allow undefined explicitly
}

/**
 * Used by the Kabel renderer to tag svg.js elements as interactable with the kabel system.
 */
class Eventer {
    private elements: RegisteredEl[] = [];
    private eventRegistry: Map<EventType, EventSetupFn> = new Map();

    // Register an event type with a setup function
    registerEvent(type: EventType, setupFn: EventSetupFn) {
        this.eventRegistry.set(type, setupFn);
        return this; // allow chaining
    }
    tagElement(el: Element, tags?: string[] | string) {
        if (!tags) return this;
        const tagList = Array.isArray(tags) ? tags : [tags];

        // Find the registered elements for this el
        for (const reg of this.elements) {
            if (reg.el === el) {
                for (const t of tagList) {
                    if (!reg.tags.includes(t)) reg.tags.push(t);
                }
            }
        }
        return this;
    }

    destroyByTag(tag: string) {
        let destroyed = false;
        this.elements = this.elements.filter(reg => {
            if (reg.tags.includes(tag)) {
                if (reg.destroyFn) {
                    reg.destroyFn();
                    destroyed = true;
                }
                return false; // remove this element
            }
            return true; // keep element
        });
        return destroyed ? 1 : 0;
    }

    // addElement
    addElement(el: Element, types: EventType | EventType[], args?: EventArgs) {
        const typeList = Array.isArray(types) ? types : [types];
        for (const type of typeList) {
            const destroyFn = this.setupElement(el, type, args) as (() => void) | undefined;
            this.elements.push({
                tags: [],
                el,
                type,
                args,
                destroyFn
            });
        }
        return this;
    }

    // refresh
    refresh() {
        for (const reg of this.elements) {
            if (reg.destroyFn) reg.destroyFn();
            reg.destroyFn = this.setupElement(reg.el, reg.type, reg.args) as (() => void) | undefined;
        }
    }


    // Destroy event(s) for an element
    destroyElement(el: Element, type?: EventType) {
        let destroyed = false;
        for (const reg of this.elements) {
            if (reg.el === el && (!type || reg.type === type)) {
                if (reg.destroyFn) {
                    reg.destroyFn();
                    destroyed = true;
                }
                // Remove from elements array
                this.elements = this.elements.filter(r => r !== reg);
            }
        }
        return destroyed ? 1 : 0;
    }

    private setupElement(el: Element, type: EventType, args?: EventArgs): (() => void) | undefined {
        const setupFn = this.eventRegistry.get(type);
        if (!setupFn) return;
        const destroyFn = setupFn(el, args);
        return destroyFn instanceof Function ? destroyFn : undefined;
    }
}

const eventer = new Eventer();
export default eventer;
export { Eventer };
