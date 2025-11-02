[**Kabel Project Docs v1.0.4**](../README.md)

***

[Kabel Project Docs](../globals.md) / CategoryColors

# Variable: CategoryColors

> `const` **CategoryColors**: `object` = `{}`

Defined in: [src/colors.ts:18](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/colors.ts#L18)

Stores color styles for node categories.

Each key is a category name, and the value is a ColorStyle object
containing colors like primary, secondary, and tertiary.

Example:
```ts
CategoryColors["logic"] = {
  primary: "#FF0000",
  secondary: "#00FF00",
  tertiary: "#0000FF"
};
```

## Index Signature

\[`key`: `string`\]: [`ColorStyle`](../interfaces/ColorStyle.md)
