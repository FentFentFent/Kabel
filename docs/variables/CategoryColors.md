[**Kabel Project Docs v1.0.6**](../README.md)

***

[Kabel Project Docs](../globals.md) / CategoryColors

# Variable: CategoryColors

> `const` **CategoryColors**: `object` = `{}`

Defined in: [src/colors.ts:18](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/colors.ts#L18)

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
