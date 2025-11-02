[**Kabel Project Docs v1.0.4**](../README.md)

***

[Kabel Project Docs](../globals.md) / NodePrototype

# Interface: NodePrototype

Defined in: [src/node-types.ts:7](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/node-types.ts#L7)

Represents a prototype definition for a NodeSvg.
Prototypes define behavior for initialization and removal of nodes.

## Properties

### init()

> **init**: (`this`, `prototype`, `block`) => `void`

Defined in: [src/node-types.ts:16](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/node-types.ts#L16)

Called when a node is initialized.
Use this to set up fields, connections, or any runtime state for the node.

#### Parameters

##### this

[`NodeSvg`](../classes/NodeSvg.md)

The NodeSvg instance being initialized

##### prototype

`NodePrototype`

The prototype object itself

##### block

[`NodeSvg`](../classes/NodeSvg.md)

The NodeSvg instance (same as `this`) for convenience

#### Returns

`void`

***

### removed()

> **removed**: (`this`, `prototype`, `block`) => `void`

Defined in: [src/node-types.ts:26](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/node-types.ts#L26)

Called when a node is being removed from the workspace.
Use this to clean up references, event listeners, or related resources.

#### Parameters

##### this

[`NodeSvg`](../classes/NodeSvg.md)

The NodeSvg instance being removed

##### prototype

`NodePrototype`

The prototype object itself

##### block

[`NodeSvg`](../classes/NodeSvg.md)

The NodeSvg instance (same as `this`) for convenience

#### Returns

`void`
