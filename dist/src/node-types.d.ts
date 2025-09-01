import NodeSvg from "./nodesvg";
export interface NodePrototype {
    init: (this: NodeSvg, prototype: NodePrototype, block: NodeSvg) => void;
    removed: (this: NodeSvg, prototype: NodePrototype, block: NodeSvg) => void;
}
//# sourceMappingURL=node-types.d.ts.map