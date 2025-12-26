import { Element } from '@svgdotjs/svg.js';
export type EventType = string;
export type EventArgs = Record<string, any>;
export type EventSetupFn = (el: Element, args?: EventArgs) => (() => void) | void;
export interface RegisteredEl {
    tags: string[];
    el: Element;
    type: EventType;
    args?: EventArgs | undefined;
    destroyFn?: (() => void) | undefined;
}
/**
 * Used by the Kabel renderer to tag svg.js elements as interactable with the kabel system.
 */
declare class Eventer {
    private elements;
    private eventRegistry;
    registerEvent(type: EventType, setupFn: EventSetupFn): this;
    tagElement(el: Element, tags?: string[] | string): this;
    destroyByTag(tag: string): 1 | 0;
    addElement(el: Element, types: EventType | EventType[], args?: EventArgs): this;
    refresh(): void;
    destroyElement(el: Element, type?: EventType): 1 | 0;
    private setupElement;
}
declare const eventer: Eventer;
export default eventer;
export { Eventer };
//# sourceMappingURL=eventer.d.ts.map