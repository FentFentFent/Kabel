[**Kabel Project Docs v1.0.4**](../README.md)

***

[Kabel Project Docs](../globals.md) / InputFieldJson

# Interface: InputFieldJson

Defined in: [src/nodesvg.ts:20](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/nodesvg.ts#L20)

Represents the JSON structure used to initialize a field on a node.
Each field has a type, label, and name. Additional properties can be included for field-specific configuration.

## Indexable

\[`key`: `string`\]: `any`

Optional additional properties for field initialization.
Can include type-specific options like min/max for number fields,
default values, dropdown options, etc.

## Properties

### label

> **label**: `string`

Defined in: [src/nodesvg.ts:22](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/nodesvg.ts#L22)

Human-readable label for the field, shown on the node UI

***

### name

> **name**: `string`

Defined in: [src/nodesvg.ts:28](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/nodesvg.ts#L28)

Unique field name within the node

***

### type

> **type**: `string`

Defined in: [src/nodesvg.ts:25](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/nodesvg.ts#L25)

Field type identifier, corresponding to a field constructor in FieldMap
