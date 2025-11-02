import NodeSvg from '../src/nodesvg';
import Renderer, { DrawState } from './renderer';
import { RepresenterNode } from './representer-node';

export default class Representer {
	nodes: Map<string, RepresenterNode> = new Map();

	/** Build a representer node for a drawn node */
	build(node: NodeSvg, renderer: Renderer, state: DrawState) {
		if (!node) return;
		const repNode = new RepresenterNode(node, state, renderer);
		this.nodes.set(node.id, repNode);
		return repNode;
	}

	/** Get a representer node by node id */
	get(nodeId: string): RepresenterNode | undefined {
		return this.nodes.get(nodeId);
	}

	/** Remove a node from the representer */
	remove(nodeId: string) {
		this.nodes.delete(nodeId);
	}
}
