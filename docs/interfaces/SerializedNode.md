[**Kabel Project Docs v1.0.6**](../README.md)

***

[Kabel Project Docs](../globals.md) / SerializedNode

# Interface: SerializedNode

Defined in: [src/nodesvg.ts:81](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L81)

Represents a fully serialized node including its fields, colors, coordinates, connections, and optional comment.
Used for saving or transferring node data.

## Properties

### colors

> **colors**: [`ColorStyle`](ColorStyle.md)

Defined in: [src/nodesvg.ts:92](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L92)

Node colors including primary, secondary, tertiary, and category

***

### comment?

> `optional` **comment**: `CommentSerialized`

Defined in: [src/nodesvg.ts:98](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L98)

Optional comment text attached to the node

***

### fields?

> `optional` **fields**: `any`[]

Defined in: [src/nodesvg.ts:101](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L101)

Array of serialized fields, may contain any field-specific structure

***

### id

> **id**: `string`

Defined in: [src/nodesvg.ts:86](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L86)

Unique node ID

***

### label

> **label**: `string`

Defined in: [src/nodesvg.ts:89](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L89)

Display label of the node

***

### nextConnection?

> `optional` **nextConnection**: `object`

Defined in: [src/nodesvg.ts:113](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L113)

Serialized representation of the next connection.
If `field` is true, the connection originates from a field rather than a node.

#### field?

> `optional` **field**: `boolean`

#### node?

> `optional` **node**: `SerializedNode`

***

### previousConnection?

> `optional` **previousConnection**: `object`

Defined in: [src/nodesvg.ts:107](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L107)

Serialized representation of the previous connection.
If `field` is true, the connection originates from a field rather than a node.

#### field?

> `optional` **field**: `boolean`

#### node?

> `optional` **node**: `SerializedNode`

***

### relativeCoords

> **relativeCoords**: `object`

Defined in: [src/nodesvg.ts:95](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L95)

Coordinates of the node relative to its workspace

#### x

> **x**: `number`

#### y

> **y**: `number`

***

### type

> **type**: `string`

Defined in: [src/nodesvg.ts:83](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L83)

Node type string
