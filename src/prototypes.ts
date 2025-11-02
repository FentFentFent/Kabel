import { NodePrototype } from "./node-types";

/**
 * A registry of all node prototypes by name.
 * Maps a string key (node type name) to a NodePrototype object
 */
const NodePrototypes: { [key: string]: NodePrototype } = {};

export default NodePrototypes;
