import NodeSvg from "./nodesvg"
import WorkspaceSvg from "./workspace-svg";

const Mutations : {[key: string]: MutatorData}= {
    // Stores mut_name: MutationData for MutatorModel
}

class MutatorModel {
    // ignore this class for now, but keep it.
}
interface MutatorData {
	/**
	 * Called to create a container representing the editable state of the node.
	 * Equivalent to Blockly's `decompose`.
	 */
	decompose(this: MutatorModel, workspace: WorkspaceSvg): NodeSvg;

	/**
	 * Called after the user edits the container; rebuilds the node from it.
	 * Equivalent to Blockly's `compose`.
	 */
	compose(this: NodeSvg, containerBlock: NodeSvg): void;

	/**
	 * Serialize the node’s mutation state to JSON for saving/exporting.
	 * Equivalent to Blockly's `mutationToDom`.
	 */
	mutationToJson(this: NodeSvg): {[key: string]: any};

	/**
	 * Load/apply mutation state from JSON when loading/importing.
	 * Equivalent to Blockly's `domToMutation`.
	 */
	jsonToMutation(this: NodeSvg, json: {[key: string]: any}): void;

	/**
	 * Whether Kabel should render the default UI for this mutator.
	 */
	isEditable: boolean;
}