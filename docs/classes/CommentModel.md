[**Kabel Project Docs v1.0.6**](../README.md)

***

[Kabel Project Docs](../globals.md) / CommentModel

# Class: CommentModel

Defined in: [src/comment.ts:18](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/comment.ts#L18)

Represents a comment attached to either a NodeSvg or a WorkspaceSvg.

## Constructors

### Constructor

> **new CommentModel**(`parent`): `CommentModel`

Defined in: [src/comment.ts:47](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/comment.ts#L47)

Creates a new comment attached to a node or workspace.

#### Parameters

##### parent

NodeSvg or WorkspaceSvg this comment belongs to

[`NodeSvg`](NodeSvg.md) | [`WorkspaceSvg`](WorkspaceSvg.md) | `Workspace`

#### Returns

`CommentModel`

## Properties

### \_isWorkspaceComment

> **\_isWorkspaceComment**: `boolean`

Defined in: [src/comment.ts:23](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/comment.ts#L23)

True if this comment belongs to the workspace instead of a node

***

### \_parent

> **\_parent**: [`NodeSvg`](NodeSvg.md) \| [`WorkspaceSvg`](WorkspaceSvg.md) \| `Workspace`

Defined in: [src/comment.ts:26](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/comment.ts#L26)

Parent NodeSvg or WorkspaceSvg to which this comment belongs

***

### \_tempInputBBox?

> `optional` **\_tempInputBBox**: `object`

Defined in: [src/comment.ts:38](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/comment.ts#L38)

Temporary bounding box info for input handling

#### height

> **height**: `number`

#### textX

> **textX**: `number`

#### textY

> **textY**: `number`

#### width

> **width**: `number`

***

### \_text

> **\_text**: `string`

Defined in: [src/comment.ts:20](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/comment.ts#L20)

The comment text

***

### id

> **id**: `string`

Defined in: [src/comment.ts:41](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/comment.ts#L41)

Unique identifier for this comment

***

### relativeCoords

> **relativeCoords**: [`Coordinates`](Coordinates.md)

Defined in: [src/comment.ts:32](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/comment.ts#L32)

Coordinates relative to parent

***

### svgGroup?

> `optional` **svgGroup**: `G`

Defined in: [src/comment.ts:29](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/comment.ts#L29)

SVG group representing this comment in the DOM

***

### svgLine?

> `optional` **svgLine**: `Line`

Defined in: [src/comment.ts:35](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/comment.ts#L35)

Optional SVG line connecting the comment to its node

## Methods

### getText()

> **getText**(): `string`

Defined in: [src/comment.ts:70](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/comment.ts#L70)

Retrieves the current text of the comment.

#### Returns

`string`

The comment text

***

### getWorkspace()

> **getWorkspace**(): [`WorkspaceSvg`](WorkspaceSvg.md)

Defined in: [src/comment.ts:104](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/comment.ts#L104)

Gets the workspace that owns this comment.

#### Returns

[`WorkspaceSvg`](WorkspaceSvg.md)

***

### isNodeComment()

> **isNodeComment**(): `boolean`

Defined in: [src/comment.ts:90](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/comment.ts#L90)

Returns true if this comment is attached to a node.

#### Returns

`boolean`

***

### isWorkspaceComment()

> **isWorkspaceComment**(): `boolean`

Defined in: [src/comment.ts:97](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/comment.ts#L97)

Returns true if this comment is attached to the workspace.

#### Returns

`boolean`

***

### setText()

> **setText**(`value`): `string`

Defined in: [src/comment.ts:79](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/comment.ts#L79)

Sets the text of the comment and triggers a redraw of all comments in the workspace.

#### Parameters

##### value

`string`

New text content

#### Returns

`string`

The updated text

***

### setTextNoRedraw()

> **setTextNoRedraw**(`value`): `string`

Defined in: [src/comment.ts:62](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/comment.ts#L62)

Sets the text of the comment without triggering a comment redraw.

#### Parameters

##### value

`string`

New text content

#### Returns

`string`

The updated text

***

### toJson()

> **toJson**(): `CommentSerialized`

Defined in: [src/comment.ts:114](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/comment.ts#L114)

Convert to JSON structure holding all important data.

#### Returns

`CommentSerialized`

***

### fromJson()

> `static` **fromJson**(`data`): `CommentModel`

Defined in: [src/comment.ts:129](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/comment.ts#L129)

Creates a CommentModel from serialized data.

#### Parameters

##### data

`CommentSerialized`

The serialized comment

#### Returns

`CommentModel`
