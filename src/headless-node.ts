import { NodePrototype } from "./node-types";
import NodeSvg from "./nodesvg";
import NodePrototypes from "./prototypes";

/**
 * Creates a new headless NodeSvg instance without attaching it to a workspace.
 * This is useful for programmatic node generation, testing, or serialization.
 *
 * @param type - The type of node to create. Must exist in NodePrototypes.
 * @returns The initialized NodeSvg instance, or `undefined` if the prototype does not exist.
 */
function newHeadlessNode(type: string): NodeSvg | undefined {
    const proto: NodePrototype = NodePrototypes[type as string] as NodePrototype;

    // Return undefined if prototype not found
    if (!proto) return;

    // Create a new node instance
    const node = new NodeSvg(proto);

    // Initialize the node (calls prototype init, sets defaults)
    node.init();

    return node;
}

export default newHeadlessNode;
