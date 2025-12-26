[**Kabel Project Docs v1.0.6**](../README.md)

***

[Kabel Project Docs](../globals.md) / TextField

# Class: TextField

Defined in: [src/field.ts:365](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/field.ts#L365)

Field storing a string value

## Extends

- [`Field`](Field.md)\<`string`\>

## Constructors

### Constructor

> **new TextField**(): `TextField`

Defined in: [src/field.ts:366](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/field.ts#L366)

#### Returns

`TextField`

#### Overrides

[`Field`](Field.md).[`constructor`](Field.md#constructor)

## Properties

### editable

> **editable**: `boolean`

Defined in: [src/field.ts:49](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/field.ts#L49)

#### Inherited from

[`Field`](Field.md).[`editable`](Field.md#editable)

***

### label

> **label**: `string`

Defined in: [src/field.ts:45](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/field.ts#L45)

#### Inherited from

[`Field`](Field.md).[`label`](Field.md#label)

***

### name

> **name**: `string`

Defined in: [src/field.ts:46](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/field.ts#L46)

#### Inherited from

[`Field`](Field.md).[`name`](Field.md#name)

***

### node?

> `optional` **node**: [`NodeSvg`](NodeSvg.md)

Defined in: [src/field.ts:48](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/field.ts#L48)

#### Inherited from

[`Field`](Field.md).[`node`](Field.md#node)

***

### svgGroup?

> `optional` **svgGroup**: `G`

Defined in: [src/field.ts:50](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/field.ts#L50)

#### Inherited from

[`Field`](Field.md).[`svgGroup`](Field.md#svggroup)

***

### type

> **type**: `string`

Defined in: [src/field.ts:47](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/field.ts#L47)

#### Inherited from

[`Field`](Field.md).[`type`](Field.md#type)

***

### value

> `protected` **value**: `string` \| `null`

Defined in: [src/field.ts:51](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/field.ts#L51)

#### Inherited from

[`Field`](Field.md).[`value`](Field.md#value)

## Methods

### canEdit()

> **canEdit**(): `boolean`

Defined in: [src/field.ts:80](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/field.ts#L80)

Ask whether or not we can edit this field.

#### Returns

`boolean`

#### Inherited from

[`Field`](Field.md).[`canEdit`](Field.md#canedit)

***

### canEditConnector()

> **canEditConnector**(): `boolean`

Defined in: [src/field.ts:64](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/field.ts#L64)

#### Returns

`boolean`

#### Inherited from

[`Field`](Field.md).[`canEditConnector`](Field.md#caneditconnector)

***

### drawMyself()

> **drawMyself**(`fieldVisualInfo`): `void`

Defined in: [src/field.ts:139](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/field.ts#L139)

Make the input's custom look.

#### Parameters

##### fieldVisualInfo

[`FieldVisualInfo`](../interfaces/FieldVisualInfo.md)

The visual info of the field, mutate this if needed.

#### Returns

`void`

#### Inherited from

[`Field`](Field.md).[`drawMyself`](Field.md#drawmyself)

***

### fromJson()

> **fromJson**(`json`): `void`

Defined in: [src/field.ts:369](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/field.ts#L369)

Initialize the field from JSON options.

#### Parameters

##### json

[`FieldOptions`](../interfaces/FieldOptions.md)

FieldOptions object

#### Returns

`void`

#### Overrides

[`Field`](Field.md).[`fromJson`](Field.md#fromjson)

***

### getDisplayValue()

> **getDisplayValue**(): `string` \| `null`

Defined in: [src/field.ts:160](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/field.ts#L160)

#### Returns

`string` \| `null`

The value as it should be displayed (can differ from internal value)

#### Inherited from

[`Field`](Field.md).[`getDisplayValue`](Field.md#getdisplayvalue)

***

### getLabel()

> **getLabel**(): `string`

Defined in: [src/field.ts:109](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/field.ts#L109)

#### Returns

`string`

The human-readable label

#### Inherited from

[`Field`](Field.md).[`getLabel`](Field.md#getlabel)

***

### getName()

> **getName**(): `string`

Defined in: [src/field.ts:104](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/field.ts#L104)

#### Returns

`string`

The field's name/key

#### Inherited from

[`Field`](Field.md).[`getName`](Field.md#getname)

***

### getValue()

> **getValue**(): `string` \| `null`

Defined in: [src/field.ts:147](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/field.ts#L147)

#### Returns

`string` \| `null`

The stored value

#### Inherited from

[`Field`](Field.md).[`getValue`](Field.md#getvalue)

***

### hasConnectable()

> **hasConnectable**(): `boolean`

Defined in: [src/field.ts:128](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/field.ts#L128)

#### Returns

`boolean`

Whether this field supports connections

#### Inherited from

[`Field`](Field.md).[`hasConnectable`](Field.md#hasconnectable)

***

### hasRaw()

> **hasRaw**(): `boolean`

Defined in: [src/field.ts:123](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/field.ts#L123)

#### Returns

`boolean`

Whether this field is a raw value field (text/number)

#### Inherited from

[`Field`](Field.md).[`hasRaw`](Field.md#hasraw)

***

### isCustomEditor()

> **isCustomEditor**(): `boolean`

Defined in: [src/field.ts:132](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/field.ts#L132)

#### Returns

`boolean`

Whether we have a custom editor/input look

#### Inherited from

[`Field`](Field.md).[`isCustomEditor`](Field.md#iscustomeditor)

***

### measureMyself()

> **measureMyself**(): `object`

Defined in: [src/field.ts:143](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/field.ts#L143)

Return width & height of your field's custom editor

#### Returns

`object`

##### height

> **height**: `null` = `null`

##### width

> **width**: `null` = `null`

#### Inherited from

[`Field`](Field.md).[`measureMyself`](Field.md#measuremyself)

***

### onDraw()

> **onDraw**(`rawBox?`, `connectionBubble?`): `void`

Defined in: [src/field.ts:61](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/field.ts#L61)

#### Parameters

##### rawBox?

[`FieldRawBoxData`](../interfaces/FieldRawBoxData.md)

##### connectionBubble?

[`FieldConnectionData`](../interfaces/FieldConnectionData.md)

#### Returns

`void`

#### Inherited from

[`Field`](Field.md).[`onDraw`](Field.md#ondraw)

***

### setEditable()

> **setEditable**(`val`): `void`

Defined in: [src/field.ts:71](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/field.ts#L71)

Set whether or not you can edit this field.

#### Parameters

##### val

`boolean`

The value to set to.

#### Returns

`void`

#### Inherited from

[`Field`](Field.md).[`setEditable`](Field.md#seteditable)

***

### setLabel()

> **setLabel**(`label`): `string`

Defined in: [src/field.ts:118](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/field.ts#L118)

Set the human-readable label

#### Parameters

##### label

`string`

New label

#### Returns

`string`

The updated label

#### Inherited from

[`Field`](Field.md).[`setLabel`](Field.md#setlabel)

***

### setName()

> **setName**(`name`): `string`

Defined in: [src/field.ts:88](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/field.ts#L88)

Set field name to something else.

#### Parameters

##### name

`string`

string

#### Returns

`string`

the new name.

#### Inherited from

[`Field`](Field.md).[`setName`](Field.md#setname)

***

### setValue()

> **setValue**(`val`): `void`

Defined in: [src/field.ts:373](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/field.ts#L373)

Set the stored value

#### Parameters

##### val

`string`

New value

#### Returns

`void`

#### Overrides

[`Field`](Field.md).[`setValue`](Field.md#setvalue)

***

### toJson()

> **toJson**(`deep`, `alreadyProcessed`): [`FieldOptions`](../interfaces/FieldOptions.md)

Defined in: [src/field.ts:163](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/field.ts#L163)

#### Parameters

##### deep

`boolean`

##### alreadyProcessed

#### Returns

[`FieldOptions`](../interfaces/FieldOptions.md)

#### Inherited from

[`Field`](Field.md).[`toJson`](Field.md#tojson)

***

### register()

> `static` **register**(`name`, `cls`): `void`

Defined in: [src/field.ts:52](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/field.ts#L52)

#### Parameters

##### name

`string`

##### cls

`Function`

#### Returns

`void`

#### Inherited from

[`Field`](Field.md).[`register`](Field.md#register)

***

### unregister()

> `static` **unregister**(`name`): `void`

Defined in: [src/field.ts:53](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/field.ts#L53)

#### Parameters

##### name

`string`

#### Returns

`void`

#### Inherited from

[`Field`](Field.md).[`unregister`](Field.md#unregister)
