[**Kabel Project Docs v1.0.6**](../README.md)

***

[Kabel Project Docs](../globals.md) / CommentRenderer

# Class: CommentRenderer

Defined in: [comment-renderer/renderer.ts:8](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/comment-renderer/renderer.ts#L8)

## Constructors

### Constructor

> **new CommentRenderer**(`workspace`): `CommentRenderer`

Defined in: [comment-renderer/renderer.ts:18](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/comment-renderer/renderer.ts#L18)

#### Parameters

##### workspace

[`WorkspaceSvg`](WorkspaceSvg.md)

#### Returns

`CommentRenderer`

## Properties

### workspace

> **workspace**: [`WorkspaceSvg`](WorkspaceSvg.md)

Defined in: [comment-renderer/renderer.ts:16](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/comment-renderer/renderer.ts#L16)

## Accessors

### COMMENT\_DRAG\_EL

#### Get Signature

> **get** `static` **COMMENT\_DRAG\_EL**(): `string`

Defined in: [comment-renderer/renderer.ts:13](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/comment-renderer/renderer.ts#L13)

##### Returns

`string`

***

### COMMENT\_G\_TAG

#### Get Signature

> **get** `static` **COMMENT\_G\_TAG**(): `string`

Defined in: [comment-renderer/renderer.ts:10](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/comment-renderer/renderer.ts#L10)

##### Returns

`string`

***

### COMMENT\_LINE\_TAG

#### Get Signature

> **get** `static` **COMMENT\_LINE\_TAG**(): `string`

Defined in: [comment-renderer/renderer.ts:11](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/comment-renderer/renderer.ts#L11)

##### Returns

`string`

***

### COMMENT\_TEXT\_EL

#### Get Signature

> **get** `static` **COMMENT\_TEXT\_EL**(): `string`

Defined in: [comment-renderer/renderer.ts:12](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/comment-renderer/renderer.ts#L12)

##### Returns

`string`

***

### NAME

#### Get Signature

> **get** `static` **NAME**(): `string`

Defined in: [comment-renderer/renderer.ts:9](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/comment-renderer/renderer.ts#L9)

##### Returns

`string`

***

### RENDERER\_TAG\_EL

#### Get Signature

> **get** `static` **RENDERER\_TAG\_EL**(): `string`

Defined in: [comment-renderer/renderer.ts:14](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/comment-renderer/renderer.ts#L14)

##### Returns

`string`

## Methods

### \_addEventer()

> `private` **\_addEventer**(`rect`, `dragHandle`, `comment`, `textEl`): `void`

Defined in: [comment-renderer/renderer.ts:136](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/comment-renderer/renderer.ts#L136)

#### Parameters

##### rect

`Element`

##### dragHandle

`Element`

##### comment

[`CommentModel`](CommentModel.md)

##### textEl

`Element`

#### Returns

`void`

***

### \_computeScreenPosition()

> `private` **\_computeScreenPosition**(`comment`): `object`

Defined in: [comment-renderer/renderer.ts:143](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/comment-renderer/renderer.ts#L143)

#### Parameters

##### comment

[`CommentModel`](CommentModel.md)

#### Returns

`object`

##### screenPos

> **screenPos**: `object`

###### screenPos.x

> **x**: `number`

###### screenPos.y

> **y**: `number`

##### zoom

> **zoom**: `number`

***

### \_createBackgroundRect()

> `private` **\_createBackgroundRect**(`parent`, `bbox`, `padding`, `handleRadius`): `any`

Defined in: [comment-renderer/renderer.ts:119](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/comment-renderer/renderer.ts#L119)

#### Parameters

##### parent

`Element`

##### bbox

`any`

##### padding

`number`

##### handleRadius

`number`

#### Returns

`any`

***

### \_createDragHandle()

> `private` **\_createDragHandle**(`parent`, `bbox`, `padding`, `handleRadius`): `any`

Defined in: [comment-renderer/renderer.ts:128](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/comment-renderer/renderer.ts#L128)

#### Parameters

##### parent

`Element`

##### bbox

`any`

##### padding

`number`

##### handleRadius

`number`

#### Returns

`any`

***

### \_createTextElement()

> `private` **\_createTextElement**(`parent`, `text`, `x`, `y`): `any`

Defined in: [comment-renderer/renderer.ts:101](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/comment-renderer/renderer.ts#L101)

#### Parameters

##### parent

`Element`

##### text

`string`

##### x

`number`

##### y

`number`

#### Returns

`any`

***

### \_drawLineToNode()

> `private` **\_drawLineToNode**(`comment`, `padding`): `void`

Defined in: [comment-renderer/renderer.ts:158](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/comment-renderer/renderer.ts#L158)

#### Parameters

##### comment

[`CommentModel`](CommentModel.md)

##### padding

`number`

#### Returns

`void`

***

### \_removeExistingElements()

> `private` **\_removeExistingElements**(`comment`): `void`

Defined in: [comment-renderer/renderer.ts:96](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/comment-renderer/renderer.ts#L96)

#### Parameters

##### comment

[`CommentModel`](CommentModel.md)

#### Returns

`void`

***

### clearAllComments()

> **clearAllComments**(): `void`

Defined in: [comment-renderer/renderer.ts:191](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/comment-renderer/renderer.ts#L191)

#### Returns

`void`

***

### clearCommentLines()

> **clearCommentLines**(): `void`

Defined in: [comment-renderer/renderer.ts:207](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/comment-renderer/renderer.ts#L207)

#### Returns

`void`

***

### drawAllComments()

> **drawAllComments**(): `void`

Defined in: [comment-renderer/renderer.ts:212](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/comment-renderer/renderer.ts#L212)

#### Returns

`void`

***

### drawComment()

> **drawComment**(`comment`): `void`

Defined in: [comment-renderer/renderer.ts:38](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/comment-renderer/renderer.ts#L38)

#### Parameters

##### comment

[`CommentModel`](CommentModel.md)

#### Returns

`void`

***

### encodeForSvg()

> **encodeForSvg**(`s`): `string`

Defined in: [comment-renderer/renderer.ts:22](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/comment-renderer/renderer.ts#L22)

#### Parameters

##### s

`string`

#### Returns

`string`

***

### ensureTspansPreserve()

> **ensureTspansPreserve**(`node`): `void`

Defined in: [comment-renderer/renderer.ts:26](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/comment-renderer/renderer.ts#L26)

#### Parameters

##### node

`HTMLElement`

#### Returns

`void`

***

### getSvg()

> **getSvg**(): `Svg`

Defined in: [comment-renderer/renderer.ts:220](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/comment-renderer/renderer.ts#L220)

#### Returns

`Svg`

***

### getWs()

> **getWs**(): [`WorkspaceSvg`](WorkspaceSvg.md)

Defined in: [comment-renderer/renderer.ts:223](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/comment-renderer/renderer.ts#L223)

#### Returns

[`WorkspaceSvg`](WorkspaceSvg.md)

***

### measureTextBbox()

> **measureTextBbox**(`textEl`): `Box`

Defined in: [comment-renderer/renderer.ts:34](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/comment-renderer/renderer.ts#L34)

#### Parameters

##### textEl

`Element`

#### Returns

`Box`

***

### refreshCommentTransforms()

> **refreshCommentTransforms**(): `void`

Defined in: [comment-renderer/renderer.ts:73](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/comment-renderer/renderer.ts#L73)

#### Returns

`void`
