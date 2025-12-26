[**Kabel Project Docs v1.0.6**](../README.md)

***

[Kabel Project Docs](../globals.md) / Widget

# Class: Widget

Defined in: [src/widget.ts:44](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/widget.ts#L44)

## Constructors

### Constructor

> **new Widget**(`workspace`, `options`): `Widget`

Defined in: [src/widget.ts:55](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/widget.ts#L55)

#### Parameters

##### workspace

[`WorkspaceSvg`](WorkspaceSvg.md) | `Workspace`

##### options

[`WidgetOptions`](../interfaces/WidgetOptions.md) = `...`

#### Returns

`Widget`

## Properties

### container

> **container**: `HTMLDivElement`

Defined in: [src/widget.ts:46](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/widget.ts#L46)

***

### coords

> **coords**: [`Coordinates`](Coordinates.md)

Defined in: [src/widget.ts:47](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/widget.ts#L47)

***

### height

> **height**: `number`

Defined in: [src/widget.ts:49](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/widget.ts#L49)

***

### id

> **id**: `string`

Defined in: [src/widget.ts:52](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/widget.ts#L52)

***

### name

> **name**: `string`

Defined in: [src/widget.ts:51](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/widget.ts#L51)

***

### options

> **options**: [`WidgetOptions`](../interfaces/WidgetOptions.md)

Defined in: [src/widget.ts:53](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/widget.ts#L53)

***

### visible

> **visible**: `boolean`

Defined in: [src/widget.ts:50](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/widget.ts#L50)

***

### width

> **width**: `number`

Defined in: [src/widget.ts:48](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/widget.ts#L48)

***

### workspace

> **workspace**: [`WorkspaceSvg`](WorkspaceSvg.md) \| `Workspace`

Defined in: [src/widget.ts:45](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/widget.ts#L45)

***

### WIDGET\_GLOBAL\_ID

> `static` **WIDGET\_GLOBAL\_ID**: `number` = `0`

Defined in: [src/widget.ts:54](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/widget.ts#L54)

## Methods

### destroy()

> **destroy**(): `void`

Defined in: [src/widget.ts:133](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/widget.ts#L133)

#### Returns

`void`

***

### hide()

> **hide**(): `void`

Defined in: [src/widget.ts:94](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/widget.ts#L94)

#### Returns

`void`

***

### reanimate()

> **reanimate**(): `void`

Defined in: [src/widget.ts:111](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/widget.ts#L111)

#### Returns

`void`

***

### setCoords()

> **setCoords**(`coords`): `void`

Defined in: [src/widget.ts:100](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/widget.ts#L100)

#### Parameters

##### coords

[`Coordinates`](Coordinates.md)

#### Returns

`void`

***

### setHTML()

> **setHTML**(`html`): `void`

Defined in: [src/widget.ts:107](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/widget.ts#L107)

#### Parameters

##### html

`string`

#### Returns

`void`

***

### show()

> **show**(): `void`

Defined in: [src/widget.ts:88](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/widget.ts#L88)

#### Returns

`void`
