[**Kabel Project Docs v1.0.6**](../README.md)

***

[Kabel Project Docs](../globals.md) / KabelUIX

# Interface: KabelUIX

Defined in: [src/types.ts:9](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/types.ts#L9)

Represents the UIX (UI experience utilities) portion of Kabel.

## Properties

### events

> **events**: [`Eventer`](../classes/Eventer.md)

Defined in: [src/types.ts:13](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/types.ts#L13)

Event system for SVG.js elements, allowing reusable functionality and event handling.

***

### FontManager

> **FontManager**: `__module`

Defined in: [src/types.ts:15](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/types.ts#L15)

handles loading fonts from Google fonts and possibly other CDNs in the future.

***

### userState

> **userState**: `UserState`

Defined in: [src/types.ts:19](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/types.ts#L19)

Stores the current state of the user.

***

### windowListeners

> **windowListeners**: `object`

Defined in: [src/types.ts:24](https://github.com/FentFentFent/Kabel/blob/6a658c7afa967c18ecfb5cdff24af90b7d7319c3/src/types.ts#L24)

window listener system.

#### addWindowListener()

> **addWindowListener**: (`type`, `fn`) => `void`

##### Parameters

###### type

`WindowEventKeys`

###### fn

(`event`) => `void`

##### Returns

`void`

#### clearWindowListeners()

> **clearWindowListeners**: (`type?`) => `void`

##### Parameters

###### type?

`WindowEventKeys`

##### Returns

`void`

#### removeWindowListener()

> **removeWindowListener**: (`type`, `fn`) => `void`

##### Parameters

###### type

`WindowEventKeys`

###### fn

(`event`) => `void`

##### Returns

`void`

#### windowListeners

> **windowListeners**: `WindowListenersMap`
