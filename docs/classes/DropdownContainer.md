[**Kabel Project Docs v1.0.6**](../README.md)

***

[Kabel Project Docs](../globals.md) / DropdownContainer

# Class: DropdownContainer

Defined in: [src/dropdown-menu.ts:42](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/dropdown-menu.ts#L42)

Dropdown container for NodeSvg or Field elements.
Supports singleton behavior (only one dropdown visible at a time).

## Constructors

### Constructor

> **new DropdownContainer**(): `DropdownContainer`

Defined in: [src/dropdown-menu.ts:53](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/dropdown-menu.ts#L53)

Creates the dropdown container and attaches it to the DOM.

#### Returns

`DropdownContainer`

## Properties

### constraint

> `private` **constraint**: `object`

Defined in: [src/dropdown-menu.ts:47](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/dropdown-menu.ts#L47)

#### height

> **height**: `number`

#### width

> **width**: `number`

#### x

> **x**: `number`

#### y

> **y**: `number`

***

### currentRemoveListener

> `private` **currentRemoveListener**: () => `void` \| `null` = `null`

Defined in: [src/dropdown-menu.ts:49](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/dropdown-menu.ts#L49)

***

### offset

> `private` **offset**: `object`

Defined in: [src/dropdown-menu.ts:48](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/dropdown-menu.ts#L48)

#### dx

> **dx**: `number`

#### dy

> **dy**: `number`

***

### options

> `private` **options**: `DropdownOptions` \| `null` = `null`

Defined in: [src/dropdown-menu.ts:46](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/dropdown-menu.ts#L46)

***

### owner

> `private` **owner**: `AllowedOwner` \| `null` = `null`

Defined in: [src/dropdown-menu.ts:44](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/dropdown-menu.ts#L44)

***

### rootEl

> `private` **rootEl**: `HTMLDivElement`

Defined in: [src/dropdown-menu.ts:45](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/dropdown-menu.ts#L45)

***

### current

> `private` `static` **current**: `DropdownContainer` \| `null` = `null`

Defined in: [src/dropdown-menu.ts:43](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/dropdown-menu.ts#L43)

## Methods

### appendChild()

> **appendChild**(`element`): `Element`

Defined in: [src/dropdown-menu.ts:98](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/dropdown-menu.ts#L98)

Append an element as a child to the dropdown.

#### Parameters

##### element

`Element`

Element to append

#### Returns

`Element`

The appended element

***

### getOwner()

> **getOwner**(): `AllowedOwner` \| `null`

Defined in: [src/dropdown-menu.ts:202](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/dropdown-menu.ts#L202)

#### Returns

`AllowedOwner` \| `null`

The current owner of the dropdown, or null if none

***

### hide()

> **hide**(): `void`

Defined in: [src/dropdown-menu.ts:175](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/dropdown-menu.ts#L175)

Hide this dropdown.

#### Returns

`void`

***

### hideIfOwner()

> **hideIfOwner**(`owner`): `void`

Defined in: [src/dropdown-menu.ts:190](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/dropdown-menu.ts#L190)

Hide this dropdown if the given owner currently owns it.

#### Parameters

##### owner

`AllowedOwner`

The owner to check

#### Returns

`void`

***

### isVisible()

> **isVisible**(): `boolean`

Defined in: [src/dropdown-menu.ts:197](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/dropdown-menu.ts#L197)

#### Returns

`boolean`

True if the dropdown is currently visible

***

### move()

> **move**(`dx`, `dy`): `void`

Defined in: [src/dropdown-menu.ts:69](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/dropdown-menu.ts#L69)

Move the dropdown by an offset.

#### Parameters

##### dx

`number`

horizontal offset

##### dy

`number`

vertical offset

#### Returns

`void`

***

### setContent()

> **setContent**(`html`): `void`

Defined in: [src/dropdown-menu.ts:89](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/dropdown-menu.ts#L89)

Set inner HTML content of the dropdown.

#### Parameters

##### html

`string`

HTML string

#### Returns

`void`

***

### show()

> **show**(`owner`, `options`): `void`

Defined in: [src/dropdown-menu.ts:108](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/dropdown-menu.ts#L108)

Show the dropdown for a given owner.

#### Parameters

##### owner

`AllowedOwner`

NodeSvg or Field that owns this dropdown

##### options

`DropdownOptions`

Dropdown configuration options

#### Returns

`void`

***

### updatePosition()

> `private` **updatePosition**(): `void`

Defined in: [src/dropdown-menu.ts:78](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/dropdown-menu.ts#L78)

Update the dropdown position based on constraint and offset.

#### Returns

`void`

***

### getCurrent()

> `static` **getCurrent**(): `DropdownContainer` \| `null`

Defined in: [src/dropdown-menu.ts:207](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/dropdown-menu.ts#L207)

#### Returns

`DropdownContainer` \| `null`

The currently visible dropdown container singleton
