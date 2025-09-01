import Renderer from "../renderers/renderer";
interface RendererMap {
    [key: string]: typeof Renderer;
}
declare const RendererMap: RendererMap;
declare class RMap {
    static register(RendererCls: typeof Renderer, optName?: string): void;
    static delete(name: string): boolean;
    static get(name: string): typeof Renderer | undefined;
    static list(): string[];
    /**
     * Helper to normalize any renderer input into a valid Renderer class
     * @param input - Either a string (renderer name), a class, or undefined
     * @returns A Renderer constructor
     */
    static resolve(input?: string | typeof Renderer): typeof Renderer;
}
export { RMap, RendererMap };
//# sourceMappingURL=renderer-map.d.ts.map