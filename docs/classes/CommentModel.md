[**Kabel Project Docs v1.0.4**](../README.md)

***

[Kabel Project Docs](../globals.md) / CommentModel

# Class: CommentModel

Defined in: [src/comment.ts:10](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/comment.ts#L10)

Represents a comment attached to either a NodeSvg or a WorkspaceSvg.

## Constructors

### Constructor

> **new CommentModel**(`parent`): `CommentModel`

Defined in: [src/comment.ts:39](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/comment.ts#L39)

Creates a new comment attached to a node or workspace.

#### Parameters

##### parent

NodeSvg or WorkspaceSvg this comment belongs to

[`NodeSvg`](NodeSvg.md) | [`WorkspaceSvg`](WorkspaceSvg.md)

#### Returns

`CommentModel`

## Properties

### \_isWorkspaceComment

> **\_isWorkspaceComment**: `boolean`

Defined in: [src/comment.ts:15](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/comment.ts#L15)

True if this comment belongs to the workspace instead of a node

***

### \_parent

> **\_parent**: [`NodeSvg`](NodeSvg.md) \| [`WorkspaceSvg`](WorkspaceSvg.md)

Defined in: [src/comment.ts:18](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/comment.ts#L18)

Parent NodeSvg or WorkspaceSvg to which this comment belongs

***

### \_tempInputBBox?

> `optional` **\_tempInputBBox**: `object`

Defined in: [src/comment.ts:30](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/comment.ts#L30)

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

Defined in: [src/comment.ts:12](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/comment.ts#L12)

The comment text

***

### id

> **id**: `string`

Defined in: [src/comment.ts:33](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/comment.ts#L33)

Unique identifier for this comment

***

### relativeCoords

> **relativeCoords**: [`Coordinates`](Coordinates.md)

Defined in: [src/comment.ts:24](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/comment.ts#L24)

Coordinates relative to parent

***

### svgGroup?

> `optional` **svgGroup**: `G`

Defined in: [src/comment.ts:21](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/comment.ts#L21)

SVG group representing this comment in the DOM

***

### svgLine?

> `optional` **svgLine**: `Line`

Defined in: [src/comment.ts:27](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/comment.ts#L27)

Optional SVG line connecting the comment to its node

## Methods

### getText()

> **getText**(): `string`

Defined in: [src/comment.ts:62](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/comment.ts#L62)

Retrieves the current text of the comment.

#### Returns

`string`

The comment text

***

### getWorkspace()

> **getWorkspace**(): [`WorkspaceSvg`](WorkspaceSvg.md)

Defined in: [src/comment.ts:95](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/comment.ts#L95)

Gets the workspace that owns this comment.

#### Returns

[`WorkspaceSvg`](WorkspaceSvg.md)

***

### isNodeComment()

> **isNodeComment**(): `boolean`

Defined in: [src/comment.ts:81](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/comment.ts#L81)

Returns true if this comment is attached to a node.

#### Returns

`boolean`

***

### isWorkspaceComment()

> **isWorkspaceComment**(): `boolean`

Defined in: [src/comment.ts:88](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/comment.ts#L88)

Returns true if this comment is attached to the workspace.

#### Returns

`boolean`

***

### setText()

> **setText**(`value`): `string`

Defined in: [src/comment.ts:71](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/comment.ts#L71)

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

Defined in: [src/comment.ts:54](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/comment.ts#L54)

Sets the text of the comment without triggering a redraw.

#### Parameters

##### value

`string`

New text content

#### Returns

`string`

The updated text
