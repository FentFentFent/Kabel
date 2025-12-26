[**Kabel Project Docs v1.0.6**](../README.md)

***

[Kabel Project Docs](../globals.md) / WidgetOptions

# Interface: WidgetOptions

Defined in: [src/widget.ts:6](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/widget.ts#L6)

## Properties

### className?

> `optional` **className**: `string`

Defined in: [src/widget.ts:26](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/widget.ts#L26)

Class to give the widget's html container.

***

### cls?

> `optional` **cls**: *typeof* [`Widget`](../classes/Widget.md)

Defined in: [src/widget.ts:10](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/widget.ts#L10)

Widget class to instantiate for the widget, by default it uses Kabel's

***

### coords?

> `optional` **coords**: [`Coordinates`](../classes/Coordinates.md)

Defined in: [src/widget.ts:14](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/widget.ts#L14)

Coordinates to spawn the widget at.

***

### height?

> `optional` **height**: `number`

Defined in: [src/widget.ts:22](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/widget.ts#L22)

Height of the widget.

***

### html?

> `optional` **html**: `string`

Defined in: [src/widget.ts:30](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/widget.ts#L30)

Widget inner HTML default content.

***

### init()?

> `optional` **init**: (`this`, `widget`, `html`) => `void`

Defined in: [src/widget.ts:42](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/widget.ts#L42)

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

Defined in: [src/widget.ts:34](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/widget.ts#L34)

Widget name

***

### width?

> `optional` **width**: `number`

Defined in: [src/widget.ts:18](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/widget.ts#L18)

Width of the widget
