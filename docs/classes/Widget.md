[**Kabel Project Docs v1.0.4**](../README.md)

***

[Kabel Project Docs](../globals.md) / Widget

# Class: Widget

Defined in: [src/widget.ts:43](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/widget.ts#L43)

## Constructors

### Constructor

> **new Widget**(`workspace`, `options`): `Widget`

Defined in: [src/widget.ts:54](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/widget.ts#L54)

#### Parameters

##### workspace

[`WorkspaceSvg`](WorkspaceSvg.md)

##### options

[`WidgetOptions`](../interfaces/WidgetOptions.md) = `...`

#### Returns

`Widget`

## Properties

### container

> **container**: `HTMLDivElement`

Defined in: [src/widget.ts:45](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/widget.ts#L45)

***

### coords

> **coords**: [`Coordinates`](Coordinates.md)

Defined in: [src/widget.ts:46](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/widget.ts#L46)

***

### height

> **height**: `number`

Defined in: [src/widget.ts:48](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/widget.ts#L48)

***

### id

> **id**: `string`

Defined in: [src/widget.ts:51](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/widget.ts#L51)

***

### name

> **name**: `string`

Defined in: [src/widget.ts:50](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/widget.ts#L50)

***

### options

> **options**: [`WidgetOptions`](../interfaces/WidgetOptions.md)

Defined in: [src/widget.ts:52](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/widget.ts#L52)

***

### visible

> **visible**: `boolean`

Defined in: [src/widget.ts:49](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/widget.ts#L49)

***

### width

> **width**: `number`

Defined in: [src/widget.ts:47](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/widget.ts#L47)

***

### workspace

> **workspace**: [`WorkspaceSvg`](WorkspaceSvg.md)

Defined in: [src/widget.ts:44](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/widget.ts#L44)

***

### WIDGET\_GLOBAL\_ID

> `static` **WIDGET\_GLOBAL\_ID**: `number` = `0`

Defined in: [src/widget.ts:53](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/widget.ts#L53)

## Methods

### destroy()

> **destroy**(): `void`

Defined in: [src/widget.ts:131](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/widget.ts#L131)

#### Returns

`void`

***

### hide()

> **hide**(): `void`

Defined in: [src/widget.ts:93](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/widget.ts#L93)

#### Returns

`void`

***

### reanimate()

> **reanimate**(): `void`

Defined in: [src/widget.ts:110](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/widget.ts#L110)

#### Returns

`void`

***

### setCoords()

> **setCoords**(`coords`): `void`

Defined in: [src/widget.ts:99](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/widget.ts#L99)

#### Parameters

##### coords

[`Coordinates`](Coordinates.md)

#### Returns

`void`

***

### setHTML()

> **setHTML**(`html`): `void`

Defined in: [src/widget.ts:106](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/widget.ts#L106)

#### Parameters

##### html

`string`

#### Returns

`void`

***

### show()

> **show**(): `void`

Defined in: [src/widget.ts:87](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/widget.ts#L87)

#### Returns

`void`
