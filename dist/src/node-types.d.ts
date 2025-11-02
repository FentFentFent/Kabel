import NodeSvg from "./nodesvg";
/**
 * Represents a prototype definition for a NodeSvg.
 * Prototypes define behavior for initialization and removal of nodes.
 */
export interface NodePrototype {
    /**
     * Called when a node is initialized.
     * Use this to set up fields, connections, or any runtime state for the node.
     *
     * @param this - The NodeSvg instance being initialized
     * @param prototype - The prototype object itself
     * @param block - The NodeSvg instance (same as `this`) for convenience
     */
    init: (this: NodeSvg, prototype: NodePrototype, block: NodeSvg) => void;
    /**
     * Called when a node is being removed from the workspace.
     * Use this to clean up references, event listeners, or related resources.
     *
     * @param this - The NodeSvg instance being removed
     * @param prototype - The prototype object itself
     * @param block - The NodeSvg instance (same as `this`) for convenience
     */
    removed: (this: NodeSvg, prototype: NodePrototype, block: NodeSvg) => void;
}
//# sourceMappingURL=node-types.d.ts.map