[**Kabel Project Docs v1.0.4**](../README.md)

***

[Kabel Project Docs](../globals.md) / Eventer

# Class: Eventer

Defined in: [util/eventer.ts:18](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/util/eventer.ts#L18)

Used by the Kabel renderer to tag svg.js elements as interactable with the kabel system.

## Constructors

### Constructor

> **new Eventer**(): `Eventer`

#### Returns

`Eventer`

## Properties

### elements

> `private` **elements**: [`RegisteredEl`](../interfaces/RegisteredEl.md)[] = `[]`

Defined in: [util/eventer.ts:19](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/util/eventer.ts#L19)

***

### eventRegistry

> `private` **eventRegistry**: `Map`\<`string`, [`EventSetupFn`](../type-aliases/EventSetupFn.md)\>

Defined in: [util/eventer.ts:20](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/util/eventer.ts#L20)

## Methods

### addElement()

> **addElement**(`el`, `types`, `args?`): `Eventer`

Defined in: [util/eventer.ts:58](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/util/eventer.ts#L58)

#### Parameters

##### el

`Element`

##### types

`string` | `string`[]

##### args?

[`EventArgs`](../type-aliases/EventArgs.md)

#### Returns

`Eventer`

***

### destroyByTag()

> **destroyByTag**(`tag`): `0` \| `1`

Defined in: [util/eventer.ts:42](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/util/eventer.ts#L42)

#### Parameters

##### tag

`string`

#### Returns

`0` \| `1`

***

### destroyElement()

> **destroyElement**(`el`, `type?`): `0` \| `1`

Defined in: [util/eventer.ts:83](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/util/eventer.ts#L83)

#### Parameters

##### el

`Element`

##### type?

`string`

#### Returns

`0` \| `1`

***

### refresh()

> **refresh**(): `void`

Defined in: [util/eventer.ts:74](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/util/eventer.ts#L74)

#### Returns

`void`

***

### registerEvent()

> **registerEvent**(`type`, `setupFn`): `Eventer`

Defined in: [util/eventer.ts:23](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/util/eventer.ts#L23)

#### Parameters

##### type

`string`

##### setupFn

[`EventSetupFn`](../type-aliases/EventSetupFn.md)

#### Returns

`Eventer`

***

### setupElement()

> `private` **setupElement**(`el`, `type`, `args?`): () => `void` \| `undefined`

Defined in: [util/eventer.ts:98](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/util/eventer.ts#L98)

#### Parameters

##### el

`Element`

##### type

`string`

##### args?

[`EventArgs`](../type-aliases/EventArgs.md)

#### Returns

() => `void` \| `undefined`

***

### tagElement()

> **tagElement**(`el`, `tags?`): `Eventer`

Defined in: [util/eventer.ts:27](https://github.com/FentFentFent/Kabel/blob/c6879758347c3b72d279bd4d891c0f9066fe3112/util/eventer.ts#L27)

#### Parameters

##### el

`Element`

##### tags?

`string` | `string`[]

#### Returns

`Eventer`
