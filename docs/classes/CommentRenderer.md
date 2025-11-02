[**Kabel Project Docs v1.0.4**](../README.md)

***

[Kabel Project Docs](../globals.md) / CommentRenderer

# Class: CommentRenderer

Defined in: [comment-renderer/renderer.ts:8](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/comment-renderer/renderer.ts#L8)

## Constructors

### Constructor

> **new CommentRenderer**(`workspace`): `CommentRenderer`

Defined in: [comment-renderer/renderer.ts:29](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/comment-renderer/renderer.ts#L29)

#### Parameters

##### workspace

[`WorkspaceSvg`](WorkspaceSvg.md)

#### Returns

`CommentRenderer`

## Properties

### workspace

> **workspace**: [`WorkspaceSvg`](WorkspaceSvg.md)

Defined in: [comment-renderer/renderer.ts:27](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/comment-renderer/renderer.ts#L27)

## Accessors

### COMMENT\_DRAG\_EL

#### Get Signature

> **get** `static` **COMMENT\_DRAG\_EL**(): `string`

Defined in: [comment-renderer/renderer.ts:21](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/comment-renderer/renderer.ts#L21)

##### Returns

`string`

***

### COMMENT\_G\_TAG

#### Get Signature

> **get** `static` **COMMENT\_G\_TAG**(): `string`

Defined in: [comment-renderer/renderer.ts:12](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/comment-renderer/renderer.ts#L12)

##### Returns

`string`

***

### COMMENT\_LINE\_TAG

#### Get Signature

> **get** `static` **COMMENT\_LINE\_TAG**(): `string`

Defined in: [comment-renderer/renderer.ts:15](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/comment-renderer/renderer.ts#L15)

##### Returns

`string`

***

### COMMENT\_TEXT\_EL

#### Get Signature

> **get** `static` **COMMENT\_TEXT\_EL**(): `string`

Defined in: [comment-renderer/renderer.ts:18](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/comment-renderer/renderer.ts#L18)

##### Returns

`string`

***

### NAME

#### Get Signature

> **get** `static` **NAME**(): `string`

Defined in: [comment-renderer/renderer.ts:9](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/comment-renderer/renderer.ts#L9)

##### Returns

`string`

***

### RENDERER\_TAG\_EL

#### Get Signature

> **get** `static` **RENDERER\_TAG\_EL**(): `string`

Defined in: [comment-renderer/renderer.ts:24](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/comment-renderer/renderer.ts#L24)

##### Returns

`string`

## Methods

### \_drawLineToNode()

> `private` **\_drawLineToNode**(`comment`, `padding`): `void`

Defined in: [comment-renderer/renderer.ts:162](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/comment-renderer/renderer.ts#L162)

#### Parameters

##### comment

[`CommentModel`](CommentModel.md)

##### padding

`number`

#### Returns

`void`

***

### clearAllComments()

> **clearAllComments**(): `void`

Defined in: [comment-renderer/renderer.ts:200](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/comment-renderer/renderer.ts#L200)

#### Returns

`void`

***

### clearCommentLines()

> **clearCommentLines**(): `void`

Defined in: [comment-renderer/renderer.ts:213](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/comment-renderer/renderer.ts#L213)

#### Returns

`void`

***

### drawAllComments()

> **drawAllComments**(): `void`

Defined in: [comment-renderer/renderer.ts:217](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/comment-renderer/renderer.ts#L217)

#### Returns

`void`

***

### drawComment()

> **drawComment**(`comment`): `void`

Defined in: [comment-renderer/renderer.ts:45](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/comment-renderer/renderer.ts#L45)

#### Parameters

##### comment

[`CommentModel`](CommentModel.md)

#### Returns

`void`

***

### encodeForSvg()

> **encodeForSvg**(`s`): `string`

Defined in: [comment-renderer/renderer.ts:32](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/comment-renderer/renderer.ts#L32)

#### Parameters

##### s

`string`

#### Returns

`string`

***

### ensureTspansPreserve()

> **ensureTspansPreserve**(`node`): `void`

Defined in: [comment-renderer/renderer.ts:37](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/comment-renderer/renderer.ts#L37)

#### Parameters

##### node

`HTMLElement`

#### Returns

`void`

***

### getSvg()

> **getSvg**(): `Svg`

Defined in: [comment-renderer/renderer.ts:228](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/comment-renderer/renderer.ts#L228)

#### Returns

`Svg`

***

### refreshCommentTransforms()

> **refreshCommentTransforms**(): `void`

Defined in: [comment-renderer/renderer.ts:118](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/comment-renderer/renderer.ts#L118)

#### Returns

`void`
