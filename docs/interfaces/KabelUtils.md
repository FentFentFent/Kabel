[**Kabel Project Docs v1.0.4**](../README.md)

***

[Kabel Project Docs](../globals.md) / KabelUtils

# Interface: KabelUtils

Defined in: [src/types.ts:24](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/types.ts#L24)

Utility functions and classes provided by Kabel.

## Properties

### escapeHTML()

> **escapeHTML**: (`s`) => `string`

Defined in: [src/types.ts:53](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/types.ts#L53)

Escapes HTML for safe insertion into the DOM.

Escapes special characters in a string to their corresponding HTML entities.

Specifically, it replaces:
- `&` with `&amp;`
- `'` with `&apos;`
- `"` with `&quot;`
- `<` with `&lt;`
- `>` with `&gt;`

#### Parameters

##### s

`string`

The string to escape.

#### Returns

`string`

The escaped string with special characters replaced by HTML entities.

***

### EventEmitter

> **EventEmitter**: *typeof* `EventEmitter`

Defined in: [src/types.ts:41](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/types.ts#L41)

Event emitter class for custom events.

***

### hasProp()

> **hasProp**: (`obj`, `name`) => `boolean`

Defined in: [src/types.ts:44](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/types.ts#L44)

Checks if an object has a property.

#### Parameters

##### obj

`object`

##### name

`string`

#### Returns

`boolean`

***

### parseColor()

> **parseColor**: (`color`) => `` `#${string}` ``

Defined in: [src/types.ts:35](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/types.ts#L35)

Parses a color string into an internal format.

Parse any Color type into a hex string "#RRGGBB"

#### Parameters

##### color

[`Color`](../type-aliases/Color.md)

#### Returns

`` `#${string}` ``

***

### Path

> **Path**: `__module`

Defined in: [src/types.ts:26](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/types.ts#L26)

Path manipulation utilities.

***

### styler

> **styler**: `Styler`

Defined in: [src/types.ts:47](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/types.ts#L47)

Styler helper functions.

***

### Styler

> **Styler**: *typeof* `Styler`

Defined in: [src/types.ts:50](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/types.ts#L50)

Styler class for managing styles.

***

### SVG

> **SVG**: `__module`

Defined in: [src/types.ts:32](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/types.ts#L32)

SVG utilities.

***

### UID

> **UID**: `__module`

Defined in: [src/types.ts:38](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/types.ts#L38)

Unique ID generation utilities.

***

### unescapeHTML()

> **unescapeHTML**: (`s`) => `string`

Defined in: [src/types.ts:56](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/types.ts#L56)

Unescapes HTML strings back to their original form.

Converts HTML-escaped characters in a string back to their literal form.

Specifically, it replaces:
- `&lt;` with `<`
- `&gt;` with `>`
- `&quot;` with `"`
- `&apos;` with `'`
- `&amp;` with `&`

#### Parameters

##### s

`string`

The string containing HTML-escaped characters.

#### Returns

`string`

The unescaped string with HTML entities replaced by their literal characters.

***

### waitFrames()

> **waitFrames**: (`frames`, `callback`) => `void`

Defined in: [src/types.ts:29](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/types.ts#L29)

Wait for a number of animation frames.

Delays execution of a callback by a specified number of animation frames.

Uses `requestAnimationFrame` to count frames, then calls the provided callback.

#### Parameters

##### frames

`number`

The number of animation frames to wait before executing the callback.

##### callback

() => `void`

The function to execute after the specified frames have passed.

#### Returns

`void`
