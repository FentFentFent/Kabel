[**Kabel Project Docs v1.0.6**](../README.md)

***

[Kabel Project Docs](../globals.md) / NodeJson

# Interface: NodeJson

Defined in: [src/nodesvg.ts:42](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L42)

Represents a JSON structure for initializing a NodeSvg instance.
Includes colors, connections, label, fields, category, and type information.

## Properties

### arguments?

> `optional` **arguments**: [`InputFieldJson`](InputFieldJson.md)[]

Defined in: [src/nodesvg.ts:68](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L68)

Array of field definitions (InputFieldJson) to attach to this node

***

### category?

> `optional` **category**: `string`

Defined in: [src/nodesvg.ts:71](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L71)

Optional category name for color theming

***

### labelText?

> `optional` **labelText**: `string`

Defined in: [src/nodesvg.ts:65](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L65)

Optional node label text to display

***

### nextConnection?

> `optional` **nextConnection**: `any`

Defined in: [src/nodesvg.ts:62](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L62)

Optional next connection data.
Presence triggers creation of a next connection when initializing NodeSvg.

***

### previousConnection?

> `optional` **previousConnection**: `any`

Defined in: [src/nodesvg.ts:56](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L56)

Optional previous connection data.
Presence triggers creation of a previous connection when initializing NodeSvg.

***

### primaryColor?

> `optional` **primaryColor**: [`Color`](../type-aliases/Color.md)

Defined in: [src/nodesvg.ts:44](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L44)

Primary color of the node (e.g., top bar, main connections)

***

### secondaryColor?

> `optional` **secondaryColor**: [`Color`](../type-aliases/Color.md)

Defined in: [src/nodesvg.ts:47](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L47)

Secondary color of the node (e.g., field backgrounds)

***

### tertiaryColor?

> `optional` **tertiaryColor**: [`Color`](../type-aliases/Color.md)

Defined in: [src/nodesvg.ts:50](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L50)

Tertiary color of the node (e.g., outlines)

***

### type

> **type**: `string`

Defined in: [src/nodesvg.ts:74](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L74)

Node type identifier, used to look up the NodePrototype
