[**Kabel Project Docs v1.0.4**](../README.md)

***

[Kabel Project Docs](../globals.md) / OptConnectField

# Class: OptConnectField

Defined in: [src/field.ts:382](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/field.ts#L382)

Optional connectable field.
Can store either a number or string depending on fld_type.

## Extends

- [`ConnectableField`](ConnectableField.md)\<`number` \| `string` \| [`NodeSvg`](NodeSvg.md)\>

## Constructors

### Constructor

> **new OptConnectField**(): `OptConnectField`

Defined in: [src/field.ts:385](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/field.ts#L385)

#### Returns

`OptConnectField`

#### Overrides

[`ConnectableField`](ConnectableField.md).[`constructor`](ConnectableField.md#constructor)

## Properties

### connection

> **connection**: [`Connection`](Connection.md)

Defined in: [src/field.ts:298](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/field.ts#L298)

#### Inherited from

[`ConnectableField`](ConnectableField.md).[`connection`](ConnectableField.md#connection)

***

### editable

> **editable**: `boolean`

Defined in: [src/field.ts:49](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/field.ts#L49)

#### Inherited from

[`ConnectableField`](ConnectableField.md).[`editable`](ConnectableField.md#editable)

***

### fldType

> **fldType**: `"string"` \| `"number"`

Defined in: [src/field.ts:383](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/field.ts#L383)

***

### label

> **label**: `string`

Defined in: [src/field.ts:45](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/field.ts#L45)

#### Inherited from

[`ConnectableField`](ConnectableField.md).[`label`](ConnectableField.md#label)

***

### name

> **name**: `string`

Defined in: [src/field.ts:46](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/field.ts#L46)

#### Inherited from

[`ConnectableField`](ConnectableField.md).[`name`](ConnectableField.md#name)

***

### node?

> `optional` **node**: [`NodeSvg`](NodeSvg.md)

Defined in: [src/field.ts:48](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/field.ts#L48)

#### Inherited from

[`ConnectableField`](ConnectableField.md).[`node`](ConnectableField.md#node)

***

### svgGroup?

> `optional` **svgGroup**: `G`

Defined in: [src/field.ts:50](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/field.ts#L50)

#### Inherited from

[`ConnectableField`](ConnectableField.md).[`svgGroup`](ConnectableField.md#svggroup)

***

### type

> **type**: `string`

Defined in: [src/field.ts:47](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/field.ts#L47)

#### Inherited from

[`ConnectableField`](ConnectableField.md).[`type`](ConnectableField.md#type)

***

### value

> `protected` **value**: `string` \| `number` \| [`NodeSvg`](NodeSvg.md) \| `null`

Defined in: [src/field.ts:51](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/field.ts#L51)

#### Inherited from

[`ConnectableField`](ConnectableField.md).[`value`](ConnectableField.md#value)

## Methods

### canEdit()

> **canEdit**(): `boolean`

Defined in: [src/field.ts:392](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/field.ts#L392)

Ask whether or not we can edit this field.

#### Returns

`boolean`

#### Overrides

[`ConnectableField`](ConnectableField.md).[`canEdit`](ConnectableField.md#canedit)

***

### canEditConnector()

> **canEditConnector**(): `boolean`

Defined in: [src/field.ts:389](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/field.ts#L389)

#### Returns

`boolean`

#### Overrides

[`ConnectableField`](ConnectableField.md).[`canEditConnector`](ConnectableField.md#caneditconnector)

***

### disconnect()

> **disconnect**(): `void`

Defined in: [src/field.ts:314](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/field.ts#L314)

Disconnect this field from any connected Connectable

#### Returns

`void`

#### Inherited from

[`ConnectableField`](ConnectableField.md).[`disconnect`](ConnectableField.md#disconnect)

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

#### Inherited from

[`ConnectableField`](ConnectableField.md).[`drawMyself`](ConnectableField.md#drawmyself)

***

### fromJson()

> **fromJson**(`json`, `workspace?`): `OptConnectField`

Defined in: [src/field.ts:422](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/field.ts#L422)

Initialize from JSON, respecting fld_type

#### Parameters

##### json

[`FieldOptions`](../interfaces/FieldOptions.md)

FieldOptions

##### workspace?

[`WorkspaceSvg`](WorkspaceSvg.md)

#### Returns

`OptConnectField`

#### Overrides

[`ConnectableField`](ConnectableField.md).[`fromJson`](ConnectableField.md#fromjson)

***

### getDisplayValue()

> **getDisplayValue**(): `string`

Defined in: [src/field.ts:443](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/field.ts#L443)

#### Returns

`string`

Display value for UI purposes (never null)

#### Overrides

[`ConnectableField`](ConnectableField.md).[`getDisplayValue`](ConnectableField.md#getdisplayvalue)

***

### getLabel()

> **getLabel**(): `string`

Defined in: [src/field.ts:109](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/field.ts#L109)

#### Returns

`string`

The human-readable label

#### Inherited from

[`ConnectableField`](ConnectableField.md).[`getLabel`](ConnectableField.md#getlabel)

***

### getName()

> **getName**(): `string`

Defined in: [src/field.ts:104](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/field.ts#L104)

#### Returns

`string`

The field's name/key

#### Inherited from

[`ConnectableField`](ConnectableField.md).[`getName`](ConnectableField.md#getname)

***

### getValue()

> **getValue**(): `string` \| `number` \| [`NodeSvg`](NodeSvg.md) \| `null`

Defined in: [src/field.ts:398](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/field.ts#L398)

#### Returns

`string` \| `number` \| [`NodeSvg`](NodeSvg.md) \| `null`

The stored value

#### Overrides

[`ConnectableField`](ConnectableField.md).[`getValue`](ConnectableField.md#getvalue)

***

### hasConnectable()

> **hasConnectable**(): `boolean`

Defined in: [src/field.ts:408](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/field.ts#L408)

#### Returns

`boolean`

Whether this field supports connections

#### Overrides

[`ConnectableField`](ConnectableField.md).[`hasConnectable`](ConnectableField.md#hasconnectable)

***

### hasRaw()

> **hasRaw**(): `boolean`

Defined in: [src/field.ts:405](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/field.ts#L405)

#### Returns

`boolean`

Whether this field is a raw value field (text/number)

#### Overrides

[`ConnectableField`](ConnectableField.md).[`hasRaw`](ConnectableField.md#hasraw)

***

### isCustomEditor()

> **isCustomEditor**(): `boolean`

Defined in: [src/field.ts:132](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/field.ts#L132)

#### Returns

`boolean`

Whether we have a custom editor/input look

#### Inherited from

[`ConnectableField`](ConnectableField.md).[`isCustomEditor`](ConnectableField.md#iscustomeditor)

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

#### Inherited from

[`ConnectableField`](ConnectableField.md).[`measureMyself`](ConnectableField.md#measuremyself)

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

#### Inherited from

[`ConnectableField`](ConnectableField.md).[`onDraw`](ConnectableField.md#ondraw)

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

#### Inherited from

[`ConnectableField`](ConnectableField.md).[`setEditable`](ConnectableField.md#seteditable)

***

### setFieldType()

> **setFieldType**(`type`): `void`

Defined in: [src/field.ts:415](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/field.ts#L415)

Set field type.

#### Parameters

##### type

"number"|"string"

`"string"` | `"number"`

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

#### Inherited from

[`ConnectableField`](ConnectableField.md).[`setLabel`](ConnectableField.md#setlabel)

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

#### Inherited from

[`ConnectableField`](ConnectableField.md).[`setName`](ConnectableField.md#setname)

***

### setValue()

> **setValue**(`val`): `void`

Defined in: [src/field.ts:435](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/field.ts#L435)

Set the value, converting to number or string depending on fld_type

#### Parameters

##### val

The new value

`string` | `number`

#### Returns

`void`

#### Overrides

[`ConnectableField`](ConnectableField.md).[`setValue`](ConnectableField.md#setvalue)

***

### toJson()

> **toJson**(`deep`, `alreadyProcessed`): [`FieldOptions`](../interfaces/FieldOptions.md)

Defined in: [src/field.ts:448](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/field.ts#L448)

#### Parameters

##### deep

`boolean`

##### alreadyProcessed

#### Returns

[`FieldOptions`](../interfaces/FieldOptions.md)

#### Overrides

[`ConnectableField`](ConnectableField.md).[`toJson`](ConnectableField.md#tojson)

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

#### Inherited from

[`ConnectableField`](ConnectableField.md).[`register`](ConnectableField.md#register)

***

### unregister()

> `static` **unregister**(`name`): `void`

Defined in: [src/field.ts:53](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/field.ts#L53)

#### Parameters

##### name

`string`

#### Returns

`void`

#### Inherited from

[`ConnectableField`](ConnectableField.md).[`unregister`](ConnectableField.md#unregister)
