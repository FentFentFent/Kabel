[**Kabel Project Docs v1.0.4**](../README.md)

***

[Kabel Project Docs](../globals.md) / TblxObjStruct

# Type Alias: TblxObjStruct

> **TblxObjStruct** = \{ `contents`: [`TblxNodeStruct`](../interfaces/TblxNodeStruct.md)[]; `type`: `"flyout"`; \} \| \{ `contents`: [`TblxCategoryStruct`](../interfaces/TblxCategoryStruct.md)[]; `type?`: `"category"`; \} \| \{ `contents`: [`TblxCategoryStruct`](../interfaces/TblxCategoryStruct.md)[]; `type?`: `undefined`; \}

Defined in: [src/inject.ts:57](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/inject.ts#L57)

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
