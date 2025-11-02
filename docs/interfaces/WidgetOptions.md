[**Kabel Project Docs v1.0.4**](../README.md)

***

[Kabel Project Docs](../globals.md) / WidgetOptions

# Interface: WidgetOptions

Defined in: [src/widget.ts:5](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/widget.ts#L5)

## Properties

### className?

> `optional` **className**: `string`

Defined in: [src/widget.ts:25](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/widget.ts#L25)

Class to give the widget's html container.

***

### cls?

> `optional` **cls**: *typeof* [`Widget`](../classes/Widget.md)

Defined in: [src/widget.ts:9](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/widget.ts#L9)

Widget class to instantiate for the widget, by default it uses Kabel's

***

### coords?

> `optional` **coords**: [`Coordinates`](../classes/Coordinates.md)

Defined in: [src/widget.ts:13](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/widget.ts#L13)

Coordinates to spawn the widget at.

***

### height?

> `optional` **height**: `number`

Defined in: [src/widget.ts:21](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/widget.ts#L21)

Height of the widget.

***

### html?

> `optional` **html**: `string`

Defined in: [src/widget.ts:29](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/widget.ts#L29)

Widget inner HTML default content.

***

### init()?

> `optional` **init**: (`this`, `widget`, `html`) => `void`

Defined in: [src/widget.ts:41](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/widget.ts#L41)

Sets up a new widget of this type

#### Parameters

##### this

`WidgetOptions`

This context of the function points to widget.

##### widget

[`Widget`](../classes/Widget.md)

The widget this function is called on.

##### html

`HTMLElement`

The html container of the widget.

#### Returns

`void`

- Void.

***

### name

> **name**: `string`

Defined in: [src/widget.ts:33](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/widget.ts#L33)

Widget name

***

### width?

> `optional` **width**: `number`

Defined in: [src/widget.ts:17](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/widget.ts#L17)

Width of the widget
