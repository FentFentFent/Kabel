import type RendererType from "../renderers/renderer";
interface RendererMapInterface {
    [key: string]: typeof RendererType;
}
declare const RendererMap: RendererMapInterface;
declare class RMap {
    static register(RendererCls: typeof RendererType, optName?: string): void;
    static delete(name: string): boolean;
    static get(name: string): typeof RendererType;
    static list(): string[];
    static resolve(input?: string | typeof RendererType): typeof RendererType;
}
export { RMap, RendererMap };
//# sourceMappingURL=renderer-map.d.ts.map