[**Kabel Project Docs v1.0.4**](../README.md)

***

[Kabel Project Docs](../globals.md) / Coordinates

# Class: Coordinates

Defined in: [src/coordinates.ts:4](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/coordinates.ts#L4)

Represents a 2D coordinate in space.

## Extended by

- [`WorkspaceCoords`](WorkspaceCoords.md)

## Constructors

### Constructor

> **new Coordinates**(`x`, `y`): `Coordinates`

Defined in: [src/coordinates.ts:15](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/coordinates.ts#L15)

Creates a new Coordinates instance

#### Parameters

##### x

`number` = `0`

The x value (default 0)

##### y

`number` = `0`

The y value (default 0)

#### Returns

`Coordinates`

## Properties

### x

> **x**: `number`

Defined in: [src/coordinates.ts:6](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/coordinates.ts#L6)

X position

***

### y

> **y**: `number`

Defined in: [src/coordinates.ts:8](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/coordinates.ts#L8)

Y position

## Methods

### clone()

> **clone**(): `Coordinates`

Defined in: [src/coordinates.ts:34](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/coordinates.ts#L34)

Returns a copy of this coordinate

#### Returns

`Coordinates`

A new Coordinates instance with the same x and y

***

### distanceTo()

> **distanceTo**(`other`): `number`

Defined in: [src/coordinates.ts:43](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/coordinates.ts#L43)

Calculate the Euclidean distance to another coordinate

#### Parameters

##### other

`Coordinates`

The target coordinate

#### Returns

`number`

The distance as a number

***

### set()

> **set**(`x`, `y`): `void`

Defined in: [src/coordinates.ts:25](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/coordinates.ts#L25)

Set the coordinates to new values

#### Parameters

##### x

`number`

The new x value

##### y

`number`

The new y value

#### Returns

`void`

***

### toArray()

> **toArray**(): \[`number`, `number`\]

Defined in: [src/coordinates.ts:61](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/coordinates.ts#L61)

Convert the coordinate to an array [x, y]

#### Returns

\[`number`, `number`\]

Tuple of numbers [x, y]

***

### toObject()

> **toObject**(): `object`

Defined in: [src/coordinates.ts:69](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/coordinates.ts#L69)

Convert the coordinate to an object { x, y }

#### Returns

`object`

Object with x and y properties

##### x

> **x**: `number`

##### y

> **y**: `number`

***

### toString()

> **toString**(): `string`

Defined in: [src/coordinates.ts:53](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/coordinates.ts#L53)

Convert the coordinate to a string representation

#### Returns

`string`

A string like "(x, y)"
