[**Kabel Project Docs v1.0.4**](../README.md)

***

[Kabel Project Docs](../globals.md) / WorkspaceCoords

# Class: WorkspaceCoords

Defined in: [src/workspace-coords.ts:9](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/workspace-coords.ts#L9)

A class that represents Workspace Camera Coords.
May be used in the future, right now its a no-op Coords wrapper.

## Extends

- [`Coordinates`](Coordinates.md)

## Constructors

### Constructor

> **new WorkspaceCoords**(`x`, `y`): `WorkspaceCoords`

Defined in: [src/workspace-coords.ts:10](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/workspace-coords.ts#L10)

#### Parameters

##### x

`number` = `0`

##### y

`number` = `0`

#### Returns

`WorkspaceCoords`

#### Overrides

[`Coordinates`](Coordinates.md).[`constructor`](Coordinates.md#constructor)

## Properties

### x

> **x**: `number`

Defined in: [src/coordinates.ts:6](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/coordinates.ts#L6)

X position

#### Inherited from

[`Coordinates`](Coordinates.md).[`x`](Coordinates.md#x)

***

### y

> **y**: `number`

Defined in: [src/coordinates.ts:8](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/coordinates.ts#L8)

Y position

#### Inherited from

[`Coordinates`](Coordinates.md).[`y`](Coordinates.md#y)

## Methods

### clone()

> **clone**(): [`Coordinates`](Coordinates.md)

Defined in: [src/coordinates.ts:34](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/coordinates.ts#L34)

Returns a copy of this coordinate

#### Returns

[`Coordinates`](Coordinates.md)

A new Coordinates instance with the same x and y

#### Inherited from

[`Coordinates`](Coordinates.md).[`clone`](Coordinates.md#clone)

***

### distanceTo()

> **distanceTo**(`other`): `number`

Defined in: [src/coordinates.ts:43](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/coordinates.ts#L43)

Calculate the Euclidean distance to another coordinate

#### Parameters

##### other

[`Coordinates`](Coordinates.md)

The target coordinate

#### Returns

`number`

The distance as a number

#### Inherited from

[`Coordinates`](Coordinates.md).[`distanceTo`](Coordinates.md#distanceto)

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

#### Inherited from

[`Coordinates`](Coordinates.md).[`set`](Coordinates.md#set)

***

### toArray()

> **toArray**(): \[`number`, `number`\]

Defined in: [src/coordinates.ts:61](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/coordinates.ts#L61)

Convert the coordinate to an array [x, y]

#### Returns

\[`number`, `number`\]

Tuple of numbers [x, y]

#### Inherited from

[`Coordinates`](Coordinates.md).[`toArray`](Coordinates.md#toarray)

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

#### Inherited from

[`Coordinates`](Coordinates.md).[`toObject`](Coordinates.md#toobject)

***

### toString()

> **toString**(): `string`

Defined in: [src/coordinates.ts:53](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/src/coordinates.ts#L53)

Convert the coordinate to a string representation

#### Returns

`string`

A string like "(x, y)"

#### Inherited from

[`Coordinates`](Coordinates.md).[`toString`](Coordinates.md#tostring)
