[**Kabel Project Docs v1.0.6**](../README.md)

***

[Kabel Project Docs](../globals.md) / Connection

# Class: Connection

Defined in: [src/connection.ts:12](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/connection.ts#L12)

Represents a connection between two connectable objects.

## Constructors

### Constructor

> **new Connection**(`from`, `to`, `isPrevious`): `Connection`

Defined in: [src/connection.ts:26](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/connection.ts#L26)

Creates a new Connection.

#### Parameters

##### from

[`Connectable`](../type-aliases/Connectable.md)

The source NodeSvg or Field

##### to

[`Connectable`](../type-aliases/Connectable.md)

The target NodeSvg or Field

##### isPrevious

`boolean` = `false`

True if this connection is a previous connection

#### Returns

`Connection`

## Properties

### from

> **from**: [`Connectable`](../type-aliases/Connectable.md)

Defined in: [src/connection.ts:14](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/connection.ts#L14)

The source of the connection

***

### isPrevious

> **isPrevious**: `boolean`

Defined in: [src/connection.ts:18](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/connection.ts#L18)

Whether this connection represents a previous connection (affects rendering/logic)

***

### to

> **to**: [`Connectable`](../type-aliases/Connectable.md)

Defined in: [src/connection.ts:16](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/connection.ts#L16)

The target of the connection

## Methods

### disconnectFrom()

> **disconnectFrom**(): `void`

Defined in: [src/connection.ts:71](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/connection.ts#L71)

Disconnects this connection from its source.
Safely handles NodeSvg chains and ConnectableFields.

#### Returns

`void`

***

### disconnectTo()

> **disconnectTo**(): `void`

Defined in: [src/connection.ts:46](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/connection.ts#L46)

Disconnects this connection from its target.
Safely handles NodeSvg chains and ConnectableFields.

#### Returns

`void`

***

### getFrom()

> **getFrom**(): [`Connectable`](../type-aliases/Connectable.md)

Defined in: [src/connection.ts:38](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/connection.ts#L38)

Returns the source of the connection

#### Returns

[`Connectable`](../type-aliases/Connectable.md)

***

### getTo()

> **getTo**(): [`Connectable`](../type-aliases/Connectable.md)

Defined in: [src/connection.ts:33](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/connection.ts#L33)

Returns the target of the connection

#### Returns

[`Connectable`](../type-aliases/Connectable.md)

***

### isolate()

> **isolate**(): `void`

Defined in: [src/connection.ts:108](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/connection.ts#L108)

Completely isolates this connection, clearing both ends

#### Returns

`void`

***

### setFrom()

> **setFrom**(`source`): `void`

Defined in: [src/connection.ts:103](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/connection.ts#L103)

Sets the source of this connection (used during deserialization)

#### Parameters

##### source

[`Connectable`](../type-aliases/Connectable.md)

New connection source

#### Returns

`void`

***

### setTo()

> **setTo**(`target`): `void`

Defined in: [src/connection.ts:95](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/connection.ts#L95)

Sets the target of this connection (used during deserialization)

#### Parameters

##### target

[`Connectable`](../type-aliases/Connectable.md)

New connection target

#### Returns

`void`
