[**Kabel Project Docs v1.0.6**](../README.md)

***

[Kabel Project Docs](../globals.md) / DummyField

# Class: DummyField

Defined in: [src/field.ts:175](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/field.ts#L175)

Used when you want just a label with no actual value. Any value related methods are no-op.

## Constructors

### Constructor

> **new DummyField**(): `DummyField`

Defined in: [src/field.ts:183](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/field.ts#L183)

#### Returns

`DummyField`

## Properties

### editable

> **editable**: `boolean`

Defined in: [src/field.ts:180](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/field.ts#L180)

***

### label

> **label**: `string`

Defined in: [src/field.ts:176](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/field.ts#L176)

***

### name

> **name**: `string`

Defined in: [src/field.ts:177](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/field.ts#L177)

***

### node?

> `optional` **node**: [`NodeSvg`](NodeSvg.md)

Defined in: [src/field.ts:179](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/field.ts#L179)

***

### svgGroup?

> `optional` **svgGroup**: `G`

Defined in: [src/field.ts:181](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/field.ts#L181)

***

### type

> **type**: `string`

Defined in: [src/field.ts:178](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/field.ts#L178)

## Methods

### canEdit()

> **canEdit**(): `boolean`

Defined in: [src/field.ts:208](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/field.ts#L208)

Ask whether or not we can edit this field.

#### Returns

`boolean`

***

### canEditConnector()

> **canEditConnector**(): `boolean`

Defined in: [src/field.ts:192](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/field.ts#L192)

#### Returns

`boolean`

***

### drawMyself()

> **drawMyself**(`fieldVisualInfo`): `void`

Defined in: [src/field.ts:262](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/field.ts#L262)

Make the input's custom look.

#### Parameters

##### fieldVisualInfo

[`FieldVisualInfo`](../interfaces/FieldVisualInfo.md)

The visual info of the field, mutate this if needed.

#### Returns

`void`

***

### fromJson()

> **fromJson**(`json`): `void`

Defined in: [src/field.ts:223](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/field.ts#L223)

Initialize the field from JSON options.

#### Parameters

##### json

[`FieldOptions`](../interfaces/FieldOptions.md)

FieldOptions object

#### Returns

`void`

***

### getDisplayValue()

> **getDisplayValue**(): `null`

Defined in: [src/field.ts:281](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/field.ts#L281)

#### Returns

`null`

The value as it should be displayed (can differ from internal value)

***

### getLabel()

> **getLabel**(): `string`

Defined in: [src/field.ts:243](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/field.ts#L243)

#### Returns

`string`

The human-readable label

***

### getName()

> **getName**(): `string`

Defined in: [src/field.ts:238](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/field.ts#L238)

#### Returns

`string`

The field's name/key

***

### getValue()

> **getValue**(): `null`

Defined in: [src/field.ts:273](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/field.ts#L273)

Dummy fields have no value.

#### Returns

`null`

***

### hasConnectable()

> **hasConnectable**(): `boolean`

Defined in: [src/field.ts:234](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/field.ts#L234)

#### Returns

`boolean`

Whether this field supports connections

***

### hasRaw()

> **hasRaw**(): `boolean`

Defined in: [src/field.ts:229](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/field.ts#L229)

#### Returns

`boolean`

Whether this field is a raw value field (text/number)

***

### isCustomEditor()

> **isCustomEditor**(): `boolean`

Defined in: [src/field.ts:255](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/field.ts#L255)

#### Returns

`boolean`

Whether we have a custom editor/input look

***

### measureMyself()

> **measureMyself**(): `object`

Defined in: [src/field.ts:266](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/field.ts#L266)

Return width & height of your field's custom editor

#### Returns

`object`

##### height

> **height**: `number` = `0`

##### width

> **width**: `number` = `0`

***

### onDraw()

> **onDraw**(`rawBox?`, `connectionBubble?`): `void`

Defined in: [src/field.ts:189](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/field.ts#L189)

#### Parameters

##### rawBox?

[`FieldRawBoxData`](../interfaces/FieldRawBoxData.md)

##### connectionBubble?

[`FieldConnectionData`](../interfaces/FieldConnectionData.md)

#### Returns

`void`

***

### setEditable()

> **setEditable**(`val`): `void`

Defined in: [src/field.ts:199](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/field.ts#L199)

Set whether or not you can edit this field.

#### Parameters

##### val

`boolean`

The value to set to.

#### Returns

`void`

***

### setLabel()

> **setLabel**(`label`): `string`

Defined in: [src/field.ts:251](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/field.ts#L251)

Set the human-readable label

#### Parameters

##### label

`string`

New label

#### Returns

`string`

The updated label

***

### setName()

> **setName**(`name`): `string`

Defined in: [src/field.ts:216](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/field.ts#L216)

Set field name to something else.

#### Parameters

##### name

`string`

string

#### Returns

`string`

the new name.

***

### setValue()

> **setValue**(`_`): `void`

Defined in: [src/field.ts:279](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/field.ts#L279)

No-op for dummy fields

#### Parameters

##### \_

`any`

#### Returns

`void`

***

### toJson()

> **toJson**(`deep`, `alreadyProcessed`): [`FieldOptions`](../interfaces/FieldOptions.md)

Defined in: [src/field.ts:284](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/field.ts#L284)

#### Parameters

##### deep

`boolean`

##### alreadyProcessed

#### Returns

[`FieldOptions`](../interfaces/FieldOptions.md)
