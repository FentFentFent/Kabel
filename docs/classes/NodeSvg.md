[**Kabel Project Docs v1.0.6**](../README.md)

***

[Kabel Project Docs](../globals.md) / NodeSvg

# Class: NodeSvg

Defined in: [src/nodesvg.ts:149](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L149)

Represents a node in the workspace.
Handles connections, fields, colors, serialization, and events.

## Extends

- `EventEmitter`\<[`NodeEvents`](../interfaces/NodeEvents.md)\>

## Constructors

### Constructor

> **new NodeSvg**(`prototype`, `workspace?`, `svgGroup?`): `NodeSvg`

Defined in: [src/nodesvg.ts:185](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L185)

Creates a NodeSvg instance.

#### Parameters

##### prototype

Optional NodePrototype to associate with this node.

[`NodePrototype`](../interfaces/NodePrototype.md) | `null`

##### workspace?

[`WorkspaceSvg`](WorkspaceSvg.md)

Optional WorkspaceSvg this node belongs to.

##### svgGroup?

`G`

Optional SVG group to attach node visuals.

#### Returns

`NodeSvg`

#### Overrides

`EventEmitter<NodeEvents>.constructor`

## Properties

### \_fieldColumn

> **\_fieldColumn**: `Set`\<[`AnyField`](../type-aliases/AnyField.md)\>

Defined in: [src/nodesvg.ts:163](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L163)

Set of fields attached to this node

***

### colors

> **colors**: `NodeStyle`

Defined in: [src/nodesvg.ts:159](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L159)

Node color style object

***

### comment

> **comment**: [`CommentModel`](CommentModel.md) \| `null`

Defined in: [src/nodesvg.ts:173](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L173)

Optional comment attached to this node

***

### id

> **id**: `string`

Defined in: [src/nodesvg.ts:167](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L167)

Unique node ID

***

### labelText

> **labelText**: `string`

Defined in: [src/nodesvg.ts:161](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L161)

Displayed label text for this node

***

### nextConnection

> **nextConnection**: [`Connection`](Connection.md) \| `null`

Defined in: [src/nodesvg.ts:153](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L153)

The next connection for this node (null if none)

***

### previousConnection

> **previousConnection**: [`Connection`](Connection.md) \| `null`

Defined in: [src/nodesvg.ts:151](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L151)

The previous connection for this node (null if none)

***

### prototype

> **prototype**: [`NodePrototype`](../interfaces/NodePrototype.md) \| `null`

Defined in: [src/nodesvg.ts:157](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L157)

Prototype object providing behavior for this node

***

### relativeCoords

> **relativeCoords**: [`Coordinates`](Coordinates.md)

Defined in: [src/nodesvg.ts:165](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L165)

Node coordinates relative to workspace

***

### svg?

> `optional` **svg**: `object` \| [`RepresenterNode`](RepresenterNode.md) \| `null` = `null`

Defined in: [src/nodesvg.ts:169](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L169)

SVG representation of this node

***

### type

> **type**: `string` \| `null`

Defined in: [src/nodesvg.ts:155](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L155)

Node type string, usually derived from prototype

***

### workspace

> **workspace**: [`WorkspaceSvg`](WorkspaceSvg.md) \| `null` = `null`

Defined in: [src/nodesvg.ts:171](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L171)

Workspace this node belongs to

***

### INITING

> `static` **INITING**: keyof [`NodeEvents`](../interfaces/NodeEvents.md) = `"INITING"`

Defined in: [src/nodesvg.ts:178](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L178)

Event key: "INITING"

***

### REMOVING

> `static` **REMOVING**: keyof [`NodeEvents`](../interfaces/NodeEvents.md) = `"REMOVING"`

Defined in: [src/nodesvg.ts:175](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L175)

Event key: "REMOVING"

## Accessors

### svgGroup

#### Get Signature

> **get** **svgGroup**(): `G` \| `null` \| `undefined`

Defined in: [src/nodesvg.ts:218](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L218)

Returns the raw SVG group element if present

##### Returns

`G` \| `null` \| `undefined`

***

### topLevel

#### Get Signature

> **get** **topLevel**(): `boolean`

Defined in: [src/nodesvg.ts:214](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L214)

Returns true if this node has no previous connection (i.e., top-level node)

##### Returns

`boolean`

## Methods

### \_appendFieldItem()

> **\_appendFieldItem**(`field`): `void`

Defined in: [src/nodesvg.ts:323](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L323)

Internal helper: attach a field to this node

#### Parameters

##### field

[`AnyField`](../type-aliases/AnyField.md)

#### Returns

`void`

***

### \_serializeConnection()

> **\_serializeConnection**(`c`, `alreadyProcessed`): `object`

Defined in: [src/nodesvg.ts:490](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L490)

Serializes a Connection object, handling fields and nested nodes

#### Parameters

##### c

[`Connection`](Connection.md)

##### alreadyProcessed

#### Returns

`object`

##### field?

> `optional` **field**: `boolean`

##### node?

> `optional` **node**: [`SerializedNode`](../interfaces/SerializedNode.md)

***

### addComment()

> **addComment**(): `void`

Defined in: [src/nodesvg.ts:230](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L230)

Adds a new comment to this node if none exists

#### Returns

`void`

***

### allFields()

> **allFields**(): [`AnyField`](../type-aliases/AnyField.md)[]

Defined in: [src/nodesvg.ts:250](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L250)

Returns an array of all fields attached to this node

#### Returns

[`AnyField`](../type-aliases/AnyField.md)[]

***

### appendConnection()

> **appendConnection**(`name`): [`Field`](Field.md)

Defined in: [src/nodesvg.ts:374](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L374)

Appends a connection field to this node

#### Parameters

##### name

`string`

#### Returns

[`Field`](Field.md)

***

### appendNumber()

> **appendNumber**(`name`): [`Field`](Field.md)

Defined in: [src/nodesvg.ts:382](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L382)

Appends a numeric input field to this node

#### Parameters

##### name

`string`

#### Returns

[`Field`](Field.md)

***

### appendOptLink()

> **appendOptLink**(`name`): [`Field`](Field.md)

Defined in: [src/nodesvg.ts:399](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L399)

Appends a field that can hold a connection or raw value

#### Parameters

##### name

`string`

#### Returns

[`Field`](Field.md)

***

### appendText()

> **appendText**(`name`): [`Field`](Field.md)

Defined in: [src/nodesvg.ts:390](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L390)

Appends a text input field to this node

#### Parameters

##### name

`string`

#### Returns

[`Field`](Field.md)

***

### applyJsonArguments()

> **applyJsonArguments**(`args`): `NodeSvg`

Defined in: [src/nodesvg.ts:353](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L353)

Apply field definitions from a JSON-like array without full NodeJson

#### Parameters

##### args

[`InputFieldJson`](../interfaces/InputFieldJson.md)[]

#### Returns

`NodeSvg`

***

### emit()

> **emit**\<`K`\>(`event`, `payload`): `boolean`

Defined in: [util/emitter.ts:18](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/util/emitter.ts#L18)

#### Type Parameters

##### K

`K` *extends* keyof [`NodeEvents`](../interfaces/NodeEvents.md)

#### Parameters

##### event

`K`

##### payload

[`NodeEvents`](../interfaces/NodeEvents.md)\[`K`\]

#### Returns

`boolean`

#### Inherited from

`EventEmitter.emit`

***

### fromNode()

> **fromNode**(`other`): `NodeSvg` \| `undefined`

Defined in: [src/nodesvg.ts:444](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L444)

Copies another NodeSvg into this node

#### Parameters

##### other

`NodeSvg`

#### Returns

`NodeSvg` \| `undefined`

***

### getCategoryName()

> **getCategoryName**(): `string` \| `null`

Defined in: [src/nodesvg.ts:313](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L313)

Returns the category name or null if none

#### Returns

`string` \| `null`

***

### getComment()

> **getComment**(): [`CommentModel`](CommentModel.md) \| `null`

Defined in: [src/nodesvg.ts:226](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L226)

Returns the CommentModel instance for this node, if any

#### Returns

[`CommentModel`](CommentModel.md) \| `null`

***

### getCommentText()

> **getCommentText**(): `string` \| `undefined`

Defined in: [src/nodesvg.ts:222](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L222)

Returns the text of the node's comment, if any

#### Returns

`string` \| `undefined`

***

### getField()

> **getField**(`name`): [`AnyField`](../type-aliases/AnyField.md) \| `null` \| `undefined`

Defined in: [src/nodesvg.ts:260](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L260)

Alias for getFieldByName

#### Parameters

##### name

`string`

#### Returns

[`AnyField`](../type-aliases/AnyField.md) \| `null` \| `undefined`

***

### getFieldByName()

> **getFieldByName**(`name`): [`AnyField`](../type-aliases/AnyField.md) \| `null` \| `undefined`

Defined in: [src/nodesvg.ts:254](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L254)

Retrieves a field by name from this node

#### Parameters

##### name

`string`

#### Returns

[`AnyField`](../type-aliases/AnyField.md) \| `null` \| `undefined`

***

### getFieldDisplayValue()

> **getFieldDisplayValue**(`name`): `any`

Defined in: [src/nodesvg.ts:272](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L272)

Retrieves the display value of a field by name

#### Parameters

##### name

`string`

#### Returns

`any`

***

### getFieldValue()

> **getFieldValue**(`name`): `any`

Defined in: [src/nodesvg.ts:264](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L264)

Retrieves the current value of a field by name

#### Parameters

##### name

`string`

#### Returns

`any`

***

### getStyle()

> **getStyle**(): `NodeStyle`

Defined in: [src/nodesvg.ts:318](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L318)

Returns the node's current ColorStyle

#### Returns

`NodeStyle`

***

### hasCategoryStyle()

> **hasCategoryStyle**(): `boolean`

Defined in: [src/nodesvg.ts:308](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L308)

Returns whether this node has a category style applied

#### Returns

`boolean`

***

### init()

> **init**(): `void`

Defined in: [src/nodesvg.ts:291](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L291)

Initiates the node, calling prototype methods.

#### Returns

`void`

***

### jsonInit()

> **jsonInit**(`json`): `void`

Defined in: [src/nodesvg.ts:329](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L329)

Initialize node from a NodeJson object

#### Parameters

##### json

[`NodeJson`](../interfaces/NodeJson.md)

#### Returns

`void`

***

### off()

> **off**\<`K`\>(`event`, `handler`): `NodeSvg`

Defined in: [util/emitter.ts:12](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/util/emitter.ts#L12)

#### Type Parameters

##### K

`K` *extends* keyof [`NodeEvents`](../interfaces/NodeEvents.md)

#### Parameters

##### event

`K`

##### handler

`EventHandler`\<[`NodeEvents`](../interfaces/NodeEvents.md)\[`K`\]\>

#### Returns

`NodeSvg`

#### Inherited from

`EventEmitter.off`

***

### on()

> **on**\<`K`\>(`event`, `handler`): `NodeSvg`

Defined in: [util/emitter.ts:6](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/util/emitter.ts#L6)

#### Type Parameters

##### K

`K` *extends* keyof [`NodeEvents`](../interfaces/NodeEvents.md)

#### Parameters

##### event

`K`

##### handler

`EventHandler`\<[`NodeEvents`](../interfaces/NodeEvents.md)\[`K`\]\>

#### Returns

`NodeSvg`

#### Inherited from

`EventEmitter.on`

***

### once()

> **once**\<`K`\>(`event`, `handler`): `NodeSvg`

Defined in: [util/emitter.ts:24](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/util/emitter.ts#L24)

#### Type Parameters

##### K

`K` *extends* keyof [`NodeEvents`](../interfaces/NodeEvents.md)

#### Parameters

##### event

`K`

##### handler

`EventHandler`\<[`NodeEvents`](../interfaces/NodeEvents.md)\[`K`\]\>

#### Returns

`NodeSvg`

#### Inherited from

`EventEmitter.once`

***

### removeComment()

> **removeComment**(): `void`

Defined in: [src/nodesvg.ts:245](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L245)

Removes the comment from the node and triggers workspace redraw

#### Returns

`void`

***

### serialize()

> **serialize**(`alreadyProcessed`): [`SerializedNode`](../interfaces/SerializedNode.md)

Defined in: [src/nodesvg.ts:529](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L529)

Serialize a node, this includes circular references. use toJson to avoid those.

#### Parameters

##### alreadyProcessed

Internal.

#### Returns

[`SerializedNode`](../interfaces/SerializedNode.md)

***

### setCategoryName()

> **setCategoryName**(`name`): `NodeSvg`

Defined in: [src/nodesvg.ts:407](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L407)

Sets the category name for the node

#### Parameters

##### name

`string`

#### Returns

`NodeSvg`

***

### setColor()

> **setColor**(`primary`, `secondary`, `tertiary`): `NodeSvg`

Defined in: [src/nodesvg.ts:419](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L419)

Sets primary, secondary, and tertiary colors for the node

#### Parameters

##### primary

[`Color`](../type-aliases/Color.md)

##### secondary

[`Color`](../type-aliases/Color.md)

##### tertiary

[`Color`](../type-aliases/Color.md)

#### Returns

`NodeSvg`

***

### setCommentText()

> **setCommentText**(`text`): `void`

Defined in: [src/nodesvg.ts:238](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L238)

Sets the text for the node's comment, creating one if needed

#### Parameters

##### text

`string`

#### Returns

`void`

***

### setConnection()

> **setConnection**(`prevOrNext`): `NodeSvg`

Defined in: [src/nodesvg.ts:430](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L430)

Add or replace a previous/next connection based on argument

#### Parameters

##### prevOrNext

`string` | `number` | `boolean`

#### Returns

`NodeSvg`

***

### setFieldValue()

> **setFieldValue**(`name`, `value`): [`AnyField`](../type-aliases/AnyField.md) \| `null` \| `undefined`

Defined in: [src/nodesvg.ts:280](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L280)

Sets the value of a field by name

#### Parameters

##### name

`string`

##### value

`any`

#### Returns

[`AnyField`](../type-aliases/AnyField.md) \| `null` \| `undefined`

***

### setLabelText()

> **setLabelText**(`text`): `NodeSvg`

Defined in: [src/nodesvg.ts:424](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L424)

Sets the label text for the node

#### Parameters

##### text

`string`

#### Returns

`NodeSvg`

***

### setStyle()

> **setStyle**(`style`): `NodeSvg`

Defined in: [src/nodesvg.ts:412](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L412)

Applies a ColorStyle to the node

#### Parameters

##### style

[`ColorStyle`](../interfaces/ColorStyle.md)

#### Returns

`NodeSvg`

***

### toJson()

> **toJson**(): `object`

Defined in: [src/nodesvg.ts:574](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L574)

Return a flattened version of the serialized node structure, which is non-circular.
Any node reference inside connections or fields is replaced by its ID.

#### Returns

`object`

***

### \_deserialize()

> `static` **\_deserialize**(`data`, `allNodes`, `workspace?`): `NodeSvg`

Defined in: [src/nodesvg.ts:630](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L630)

Reconstruct a NodeSvg from a SerializedNode structure (handles circular references)

#### Parameters

##### data

[`SerializedNode`](../interfaces/SerializedNode.md)

##### allNodes

##### workspace?

[`WorkspaceSvg`](WorkspaceSvg.md)

#### Returns

`NodeSvg`

***

### deserialize()

> `static` **deserialize**(`json`, `workspace`): `NodeSvg`

Defined in: [src/nodesvg.ts:702](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L702)

Public: Deserialize a SerializedNode or plain object into a NodeSvg attached to a workspace

#### Parameters

##### json

`any`

##### workspace

[`WorkspaceSvg`](WorkspaceSvg.md)

#### Returns

`NodeSvg`

***

### fromJson()

> `static` **fromJson**(`flat`, `workspace`): `any`

Defined in: [src/nodesvg.ts:706](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/nodesvg.ts#L706)

Reconstructs nodes from a flattened JSON structure into a NodeSvg tree

#### Parameters

##### flat

`Record`\<`string`, `any`\>

##### workspace

[`WorkspaceSvg`](WorkspaceSvg.md)

#### Returns

`any`
