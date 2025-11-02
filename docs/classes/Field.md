[**Kabel Project Docs v1.0.4**](../README.md)

***

[Kabel Project Docs](../globals.md) / Field

# Class: Field\<T\>

Defined in: [src/field.ts:44](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/field.ts#L44)

Base class for all fields.

## Extended by

- [`NumberField`](NumberField.md)
- [`TextField`](TextField.md)
- [`ConnectableField`](ConnectableField.md)

## Type Parameters

### T

`T` = `any`

The type of the value stored in the field

## Constructors

### Constructor

> **new Field**\<`T`\>(): `Field`\<`T`\>

Defined in: [src/field.ts:54](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/field.ts#L54)

#### Returns

`Field`\<`T`\>

## Properties

### editable

> **editable**: `boolean`

Defined in: [src/field.ts:49](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/field.ts#L49)

***

### label

> **label**: `string`

Defined in: [src/field.ts:45](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/field.ts#L45)

***

### name

> **name**: `string`

Defined in: [src/field.ts:46](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/field.ts#L46)

***

### node?

> `optional` **node**: [`NodeSvg`](NodeSvg.md)

Defined in: [src/field.ts:48](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/field.ts#L48)

***

### svgGroup?

> `optional` **svgGroup**: `G`

Defined in: [src/field.ts:50](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/field.ts#L50)

***

### type

> **type**: `string`

Defined in: [src/field.ts:47](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/field.ts#L47)

***

### value

> `protected` **value**: `T` \| `null`

Defined in: [src/field.ts:51](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/field.ts#L51)

## Methods

### canEdit()

> **canEdit**(): `boolean`

Defined in: [src/field.ts:80](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/field.ts#L80)

Ask whether or not we can edit this field.

#### Returns

`boolean`

***

### canEditConnector()

> **canEditConnector**(): `boolean`

Defined in: [src/field.ts:64](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/field.ts#L64)

#### Returns

`boolean`

***

### drawMyself()

> **drawMyself**(`fieldVisualInfo`): `void`

Defined in: [src/field.ts:139](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/field.ts#L139)

Make the input's custom look.

#### Parameters

##### fieldVisualInfo

[`FieldVisualInfo`](../interfaces/FieldVisualInfo.md)

The visual info of the field, mutate this if needed.

#### Returns

`void`

***

### fromJson()

> **fromJson**(`json`, `workspace?`): `void`

Defined in: [src/field.ts:95](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/field.ts#L95)

Initialize the field from JSON options.

#### Parameters

##### json

[`FieldOptions`](../interfaces/FieldOptions.md)

FieldOptions object

##### workspace?

[`WorkspaceSvg`](WorkspaceSvg.md)

#### Returns

`void`

***

### getDisplayValue()

> **getDisplayValue**(): `T` \| `null`

Defined in: [src/field.ts:160](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/field.ts#L160)

#### Returns

`T` \| `null`

The value as it should be displayed (can differ from internal value)

***

### getLabel()

> **getLabel**(): `string`

Defined in: [src/field.ts:109](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/field.ts#L109)

#### Returns

`string`

The human-readable label

***

### getName()

> **getName**(): `string`

Defined in: [src/field.ts:104](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/field.ts#L104)

#### Returns

`string`

The field's name/key

***

### getValue()

> **getValue**(): `T` \| `null`

Defined in: [src/field.ts:147](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/field.ts#L147)

#### Returns

`T` \| `null`

The stored value

***

### hasConnectable()

> **hasConnectable**(): `boolean`

Defined in: [src/field.ts:128](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/field.ts#L128)

#### Returns

`boolean`

Whether this field supports connections

***

### hasRaw()

> **hasRaw**(): `boolean`

Defined in: [src/field.ts:123](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/field.ts#L123)

#### Returns

`boolean`

Whether this field is a raw value field (text/number)

***

### isCustomEditor()

> **isCustomEditor**(): `boolean`

Defined in: [src/field.ts:132](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/field.ts#L132)

#### Returns

`boolean`

Whether we have a custom editor/input look

***

### measureMyself()

> **measureMyself**(): `object`

Defined in: [src/field.ts:143](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/field.ts#L143)

Return width & height of your field's custom editor

#### Returns

`object`

##### height

> **height**: `null` = `null`

##### width

> **width**: `null` = `null`

***

### onDraw()

> **onDraw**(`rawBox?`, `connectionBubble?`): `void`

Defined in: [src/field.ts:61](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/field.ts#L61)

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

Defined in: [src/field.ts:71](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/field.ts#L71)

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

Defined in: [src/field.ts:118](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/field.ts#L118)

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

Defined in: [src/field.ts:88](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/field.ts#L88)

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

> **setValue**(`val`): `void`

Defined in: [src/field.ts:155](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/field.ts#L155)

Set the stored value

#### Parameters

##### val

`T`

New value

#### Returns

`void`

***

### toJson()

> **toJson**(`deep`, `alreadyProcessed`): [`FieldOptions`](../interfaces/FieldOptions.md)

Defined in: [src/field.ts:163](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/field.ts#L163)

#### Parameters

##### deep

`boolean`

##### alreadyProcessed

#### Returns

[`FieldOptions`](../interfaces/FieldOptions.md)

***

### register()

> `static` **register**(`name`, `cls`): `void`

Defined in: [src/field.ts:52](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/field.ts#L52)

#### Parameters

##### name

`string`

##### cls

`Function`

#### Returns

`void`

***

### unregister()

> `static` **unregister**(`name`): `void`

Defined in: [src/field.ts:53](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/field.ts#L53)

#### Parameters

##### name

`string`

#### Returns

`void`
