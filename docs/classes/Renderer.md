[**Kabel Project Docs v1.0.4**](../README.md)

***

[Kabel Project Docs](../globals.md) / Renderer

# Class: Renderer

Defined in: [renderers/renderer.ts:45](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/renderers/renderer.ts#L45)

## Constructors

### Constructor

> **new Renderer**(`workspace`, `overrides`): `Renderer`

Defined in: [renderers/renderer.ts:73](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/renderers/renderer.ts#L73)

#### Parameters

##### workspace

[`WorkspaceSvg`](WorkspaceSvg.md)

##### overrides

`Partial`\<[`RendererConstants`](RendererConstants.md)\> = `{}`

#### Returns

`Renderer`

## Properties

### \_commentDrawer

> **\_commentDrawer**: [`CommentRenderer`](CommentRenderer.md)

Defined in: [renderers/renderer.ts:52](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/renderers/renderer.ts#L52)

***

### \_constants

> **\_constants**: [`RendererConstants`](RendererConstants.md)

Defined in: [renderers/renderer.ts:46](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/renderers/renderer.ts#L46)

***

### \_currentNode

> **\_currentNode**: [`NodeSvg`](NodeSvg.md) \| `null`

Defined in: [renderers/renderer.ts:47](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/renderers/renderer.ts#L47)

***

### \_drawStates

> **\_drawStates**: [`DrawState`](../interfaces/DrawState.md)[]

Defined in: [renderers/renderer.ts:51](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/renderers/renderer.ts#L51)

***

### \_nodeDraw

> **\_nodeDraw**: [`DrawState`](../interfaces/DrawState.md) \| `null`

Defined in: [renderers/renderer.ts:49](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/renderers/renderer.ts#L49)

***

### \_nodeGroup

> **\_nodeGroup**: `G` \| `null`

Defined in: [renderers/renderer.ts:48](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/renderers/renderer.ts#L48)

***

### \_ws

> **\_ws**: [`WorkspaceSvg`](WorkspaceSvg.md)

Defined in: [renderers/renderer.ts:50](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/renderers/renderer.ts#L50)

***

### representer

> **representer**: [`Representer`](Representer.md)

Defined in: [renderers/renderer.ts:53](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/renderers/renderer.ts#L53)

## Accessors

### constants

#### Get Signature

> **get** **constants**(): [`RendererConstants`](RendererConstants.md)

Defined in: [renderers/renderer.ts:97](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/renderers/renderer.ts#L97)

##### Returns

[`RendererConstants`](RendererConstants.md)

#### Set Signature

> **set** **constants**(`c`): `void`

Defined in: [renderers/renderer.ts:108](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/renderers/renderer.ts#L108)

##### Parameters

###### c

`Partial`\<[`RendererConstants`](RendererConstants.md)\>

##### Returns

`void`

***

### node

#### Get Signature

> **get** **node**(): [`NodeSvg`](NodeSvg.md) \| `null`

Defined in: [renderers/renderer.ts:111](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/renderers/renderer.ts#L111)

##### Returns

[`NodeSvg`](NodeSvg.md) \| `null`

***

### state

#### Get Signature

> **get** **state**(): [`DrawState`](../interfaces/DrawState.md) \| `null` \| `undefined`

Defined in: [renderers/renderer.ts:117](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/renderers/renderer.ts#L117)

##### Returns

[`DrawState`](../interfaces/DrawState.md) \| `null` \| `undefined`

***

### svg

#### Get Signature

> **get** **svg**(): `Svg`

Defined in: [renderers/renderer.ts:114](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/renderers/renderer.ts#L114)

##### Returns

`Svg`

***

### CONN\_LINE\_TAG

#### Get Signature

> **get** `static` **CONN\_LINE\_TAG**(): `string`

Defined in: [renderers/renderer.ts:60](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/renderers/renderer.ts#L60)

##### Returns

`string`

***

### CONNECTOR\_TAG

#### Get Signature

> **get** `static` **CONNECTOR\_TAG**(): `string`

Defined in: [renderers/renderer.ts:63](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/renderers/renderer.ts#L63)

##### Returns

`string`

***

### ELEMENT\_TAG

#### Get Signature

> **get** `static` **ELEMENT\_TAG**(): `string`

Defined in: [renderers/renderer.ts:57](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/renderers/renderer.ts#L57)

##### Returns

`string`

***

### LINE\_X\_MARK\_TAG

#### Get Signature

> **get** `static` **LINE\_X\_MARK\_TAG**(): `string`

Defined in: [renderers/renderer.ts:66](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/renderers/renderer.ts#L66)

##### Returns

`string`

***

### NAME

#### Get Signature

> **get** `static` **NAME**(): `string`

Defined in: [renderers/renderer.ts:69](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/renderers/renderer.ts#L69)

##### Returns

`string`

***

### NODE\_G\_TAG

#### Get Signature

> **get** `static` **NODE\_G\_TAG**(): `string`

Defined in: [renderers/renderer.ts:54](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/renderers/renderer.ts#L54)

##### Returns

`string`

## Methods

### \_fillOtherNodeConnectorCircle()

> `private` **\_fillOtherNodeConnectorCircle**(`conn`, `circle`, `isPrevious`): `void`

Defined in: [renderers/renderer.ts:497](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/renderers/renderer.ts#L497)

#### Parameters

##### conn

[`Connection`](Connection.md)

##### circle

`Path`

##### isPrevious

`boolean`

#### Returns

`void`

***

### applyZoomToNode()

> **applyZoomToNode**(`nodeG`, `node`): `void`

Defined in: [renderers/renderer.ts:529](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/renderers/renderer.ts#L529)

#### Parameters

##### nodeG

`G`

##### node

[`NodeSvg`](NodeSvg.md)

#### Returns

`void`

***

### clearComments()

> **clearComments**(): `void`

Defined in: [renderers/renderer.ts:519](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/renderers/renderer.ts#L519)

#### Returns

`void`

***

### clearLines()

> **clearLines**(): `void`

Defined in: [renderers/renderer.ts:838](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/renderers/renderer.ts#L838)

#### Returns

`void`

***

### clearScreen()

> **clearScreen**(): `void`

Defined in: [renderers/renderer.ts:847](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/renderers/renderer.ts#L847)

#### Returns

`void`

***

### createNodeDrawState()

> **createNodeDrawState**(`nodeGroup`, `id`): [`DrawState`](../interfaces/DrawState.md)

Defined in: [renderers/renderer.ts:555](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/renderers/renderer.ts#L555)

#### Parameters

##### nodeGroup

`G`

##### id

`string`

#### Returns

[`DrawState`](../interfaces/DrawState.md)

***

### drawComments()

> **drawComments**(): `void`

Defined in: [renderers/renderer.ts:522](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/renderers/renderer.ts#L522)

#### Returns

`void`

***

### drawConnector()

> **drawConnector**(`nodeGroup`, `nodeBg`, `y`, `side`, `color`): `void` \| `Path` \| `null` \| `undefined`

Defined in: [renderers/renderer.ts:413](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/renderers/renderer.ts#L413)

#### Parameters

##### nodeGroup

`G`

##### nodeBg

`Path`

##### y

`number`

##### side

`"left"` | `"right"`

##### color

`string`

#### Returns

`void` \| `Path` \| `null` \| `undefined`

***

### drawFieldLabel()

> **drawFieldLabel**(`fieldGroup`, `field`, `startX`): `number`

Defined in: [renderers/renderer.ts:342](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/renderers/renderer.ts#L342)

#### Parameters

##### fieldGroup

`G`

##### field

[`AnyField`](../type-aliases/AnyField.md)

##### startX

`number` = `0`

#### Returns

`number`

***

### drawFieldRaw()

> **drawFieldRaw**(`fieldGroup`, `field`, `startX`): `object`

Defined in: [renderers/renderer.ts:300](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/renderers/renderer.ts#L300)

#### Parameters

##### fieldGroup

`G`

##### field

[`AnyField`](../type-aliases/AnyField.md)

##### startX

`number` = `0`

#### Returns

`object`

##### rawBox

> **rawBox**: [`FieldRawBoxData`](../interfaces/FieldRawBoxData.md)

##### rect

> **rect**: `Rect`

##### txt

> **txt**: `Text`

***

### drawLinesForAllNodes()

> **drawLinesForAllNodes**(): `void`

Defined in: [renderers/renderer.ts:768](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/renderers/renderer.ts#L768)

#### Returns

`void`

***

### drawNode()

> **drawNode**(): `void`

Defined in: [renderers/renderer.ts:558](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/renderers/renderer.ts#L558)

#### Returns

`void`

***

### drawNodeLabel()

> **drawNodeLabel**(`nodeGroup`): `void`

Defined in: [renderers/renderer.ts:456](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/renderers/renderer.ts#L456)

#### Parameters

##### nodeGroup

`G`

#### Returns

`void`

***

### drawNodeXButton()

> **drawNodeXButton**(): `void`

Defined in: [renderers/renderer.ts:365](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/renderers/renderer.ts#L365)

#### Returns

`void`

***

### enqueueSetConnect()

> **enqueueSetConnect**(`c`): `void`

Defined in: [renderers/renderer.ts:91](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/renderers/renderer.ts#L91)

#### Parameters

##### c

[`ConnectorToFrom`](../interfaces/ConnectorToFrom.md)

#### Returns

`void`

***

### fillAllNodeConnectorBubbles()

> **fillAllNodeConnectorBubbles**(): `void`

Defined in: [renderers/renderer.ts:742](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/renderers/renderer.ts#L742)

#### Returns

`void`

***

### getFieldMeasurementPadding()

> **getFieldMeasurementPadding**(): `object`

Defined in: [renderers/renderer.ts:210](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/renderers/renderer.ts#L210)

#### Returns

`object`

##### height

> **height**: `number` = `0`

##### width

> **width**: `number`

***

### getNodeBaseMeasurements()

> **getNodeBaseMeasurements**(): `object`

Defined in: [renderers/renderer.ts:123](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/renderers/renderer.ts#L123)

#### Returns

`object`

##### height

> **height**: `number` = `c.NODE_BASE_HEIGHT`

##### width

> **width**: `number` = `c.NODE_BASE_WIDTH`

***

### getWs()

> **getWs**(): [`WorkspaceSvg`](WorkspaceSvg.md)

Defined in: [renderers/renderer.ts:120](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/renderers/renderer.ts#L120)

#### Returns

[`WorkspaceSvg`](WorkspaceSvg.md)

***

### getZoom()

> **getZoom**(): `number`

Defined in: [renderers/renderer.ts:525](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/renderers/renderer.ts#L525)

#### Returns

`number`

***

### initCommentRenderer()

> **initCommentRenderer**(): `void`

Defined in: [renderers/renderer.ts:88](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/renderers/renderer.ts#L88)

#### Returns

`void`

***

### initRepresenter()

> **initRepresenter**(): `void`

Defined in: [renderers/renderer.ts:84](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/renderers/renderer.ts#L84)

#### Returns

`void`

***

### measureCustom()

> `private` **measureCustom**(`field`): `object`

Defined in: [renderers/renderer.ts:198](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/renderers/renderer.ts#L198)

#### Parameters

##### field

[`AnyField`](../type-aliases/AnyField.md)

#### Returns

`object`

##### height

> **height**: `number`

##### width

> **width**: `number`

***

### measureField()

> **measureField**(`field`): `object`

Defined in: [renderers/renderer.ts:213](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/renderers/renderer.ts#L213)

#### Parameters

##### field

[`AnyField`](../type-aliases/AnyField.md)

#### Returns

`object`

##### height

> **height**: `number`

##### width

> **width**: `number`

***

### measureLabel()

> `private` **measureLabel**(`field`): `object`

Defined in: [renderers/renderer.ts:176](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/renderers/renderer.ts#L176)

#### Parameters

##### field

[`AnyField`](../type-aliases/AnyField.md)

#### Returns

`object`

##### height

> **height**: `number`

##### width

> **width**: `number`

***

### measureNodeDimensions()

> **measureNodeDimensions**(): \{ `fields`: `object`[]; `height`: `number`; `width`: `number`; \} \| `undefined`

Defined in: [renderers/renderer.ts:232](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/renderers/renderer.ts#L232)

#### Returns

\{ `fields`: `object`[]; `height`: `number`; `width`: `number`; \} \| `undefined`

***

### measureRaw()

> `private` **measureRaw**(`field`): `object`

Defined in: [renderers/renderer.ts:187](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/renderers/renderer.ts#L187)

#### Parameters

##### field

[`AnyField`](../type-aliases/AnyField.md)

#### Returns

`object`

##### height

> **height**: `number`

##### width

> **width**: `number`

***

### measureRawField()

> **measureRawField**(`text`): `object`

Defined in: [renderers/renderer.ts:169](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/renderers/renderer.ts#L169)

#### Parameters

##### text

`string` = `""`

#### Returns

`object`

##### height

> **height**: `number`

##### width

> **width**: `number`

***

### measureTextHeight()

> **measureTextHeight**(`text`, `fontSize?`, `fontFamily?`): `number`

Defined in: [renderers/renderer.ts:148](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/renderers/renderer.ts#L148)

#### Parameters

##### text

`string`

##### fontSize?

`number`

##### fontFamily?

`string`

#### Returns

`number`

***

### measureTextWidth()

> **measureTextWidth**(`text`, `fontSize?`, `fontFamily?`): `number`

Defined in: [renderers/renderer.ts:130](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/renderers/renderer.ts#L130)

#### Parameters

##### text

`string`

##### fontSize?

`number`

##### fontFamily?

`string`

#### Returns

`number`

***

### refreshComments()

> **refreshComments**(): `void`

Defined in: [renderers/renderer.ts:516](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/renderers/renderer.ts#L516)

#### Returns

`void`

***

### refreshConnectionLines()

> **refreshConnectionLines**(): `void`

Defined in: [renderers/renderer.ts:551](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/renderers/renderer.ts#L551)

#### Returns

`void`

***

### refreshNodeTransforms()

> **refreshNodeTransforms**(): `void`

Defined in: [renderers/renderer.ts:535](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/renderers/renderer.ts#L535)

#### Returns

`void`

***

### renderNode()

> **renderNode**(`nodeIdOrNode`): `void`

Defined in: [renderers/renderer.ts:277](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/renderers/renderer.ts#L277)

#### Parameters

##### nodeIdOrNode

`string` | [`NodeSvg`](NodeSvg.md)

#### Returns

`void`

***

### rerenderNode()

> **rerenderNode**(`node`): `G` \| `null` \| `undefined`

Defined in: [renderers/renderer.ts:864](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/renderers/renderer.ts#L864)

#### Parameters

##### node

[`NodeSvg`](NodeSvg.md)

#### Returns

`G` \| `null` \| `undefined`

***

### resolveConnectable()

> **resolveConnectable**(`connectable`, `fromConn`): [`Connection`](Connection.md) \| `null` \| `undefined`

Defined in: [renderers/renderer.ts:479](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/renderers/renderer.ts#L479)

#### Parameters

##### connectable

[`Connectable`](../type-aliases/Connectable.md)

##### fromConn

[`Connection`](Connection.md)

#### Returns

[`Connection`](Connection.md) \| `null` \| `undefined`

***

### setConstants()

> **setConstants**(`c`): [`RendererConstants`](RendererConstants.md) & `Partial`\<[`RendererConstants`](RendererConstants.md)\>

Defined in: [renderers/renderer.ts:94](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/renderers/renderer.ts#L94)

#### Parameters

##### c

`Partial`\<[`RendererConstants`](RendererConstants.md)\> = `{}`

#### Returns

[`RendererConstants`](RendererConstants.md) & `Partial`\<[`RendererConstants`](RendererConstants.md)\>

***

### startNode()

> **startNode**(`nodeIdOrNode`): `void`

Defined in: [renderers/renderer.ts:284](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/renderers/renderer.ts#L284)

#### Parameters

##### nodeIdOrNode

`string` | [`NodeSvg`](NodeSvg.md)

#### Returns

`void`

***

### storeState()

> **storeState**(): `void`

Defined in: [renderers/renderer.ts:297](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/renderers/renderer.ts#L297)

#### Returns

`void`

***

### undoPendingConnsFor()

> **undoPendingConnsFor**(`conn`): `void`

Defined in: [renderers/renderer.ts:852](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/renderers/renderer.ts#L852)

#### Parameters

##### conn

[`ConnectorToFrom`](../interfaces/ConnectorToFrom.md)

#### Returns

`void`
