[**Kabel Project Docs v1.0.6**](../README.md)

***

[Kabel Project Docs](../globals.md) / GridOptions

# Interface: GridOptions

Defined in: [src/inject.ts:74](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/inject.ts#L74)

## Properties

### color?

> `optional` **color**: `` `#${string}` ``

Defined in: [src/inject.ts:96](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/inject.ts#L96)

Option color for any grid type. Color is #bebebeff by default.

***

### dotSize?

> `optional` **dotSize**: `number`

Defined in: [src/inject.ts:88](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/inject.ts#L88)

Dot size for 'dotted' grid type.

***

### spacing?

> `optional` **spacing**: `number`

Defined in: [src/inject.ts:84](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/inject.ts#L84)

Spacing, optional. Default is 40.

***

### strokeWidth?

> `optional` **strokeWidth**: `number`

Defined in: [src/inject.ts:92](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/inject.ts#L92)

stroke width for 'celled' grid type.

***

### type

> **type**: `"dotted"` \| `"celled"`

Defined in: [src/inject.ts:80](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/inject.ts#L80)

The grid's type.
'celled' - The grid is celled.
'dotted' - The grid is dotted.
