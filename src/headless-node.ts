import { NodePrototype } from "./node-types";
import NodeSvg from "./nodesvg";
import NodePrototypes from "./prototypes";


function newHeadlessNode(type: string) {
    const proto : NodePrototype = NodePrototypes[type as string] as NodePrototype;
    if (!proto) return;
    const node = new NodeSvg(proto);
    node.init();
    return node;
}

export default newHeadlessNode;