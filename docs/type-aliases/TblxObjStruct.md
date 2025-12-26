[**Kabel Project Docs v1.0.6**](../README.md)

***

[Kabel Project Docs](../globals.md) / TblxObjStruct

# Type Alias: TblxObjStruct

> **TblxObjStruct** = \{ `contents`: [`TblxNodeStruct`](../interfaces/TblxNodeStruct.md)[]; `type`: `"flyout"`; \} \| \{ `contents`: [`TblxCategoryStruct`](../interfaces/TblxCategoryStruct.md)[]; `type?`: `"category"`; \} \| \{ `contents`: [`TblxCategoryStruct`](../interfaces/TblxCategoryStruct.md)[]; `type?`: `undefined`; \}

Defined in: [src/inject.ts:58](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/inject.ts#L58)

Discriminated union type representing possible toolbox structures.
Can be a flyout (list of nodes) or a categorized toolbox.

## Type Declaration

\{ `contents`: [`TblxNodeStruct`](../interfaces/TblxNodeStruct.md)[]; `type`: `"flyout"`; \}

### contents

> **contents**: [`TblxNodeStruct`](../interfaces/TblxNodeStruct.md)[]

### type

> **type**: `"flyout"`

Flyout toolbox type

\{ `contents`: [`TblxCategoryStruct`](../interfaces/TblxCategoryStruct.md)[]; `type?`: `"category"`; \}

### contents

> **contents**: [`TblxCategoryStruct`](../interfaces/TblxCategoryStruct.md)[]

### type?

> `optional` **type**: `"category"`

Categorized toolbox type

\{ `contents`: [`TblxCategoryStruct`](../interfaces/TblxCategoryStruct.md)[]; `type?`: `undefined`; \}

### contents

> **contents**: [`TblxCategoryStruct`](../interfaces/TblxCategoryStruct.md)[]

### type?

> `optional` **type**: `undefined`

When type is omitted, defaults to categories
