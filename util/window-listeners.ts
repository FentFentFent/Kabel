type WindowEventKeys =
	| 'resize'
	| 'scroll'
	| 'blur'
	| 'focus'
	| 'visibilitychange'
	| 'pointerlockchange'
	| 'beforeunload';

type WindowListenersMap = Record<WindowEventKeys, Array<(event: Event) => void>>;

const windowListeners: WindowListenersMap = {
	resize: [],
	scroll: [],
	blur: [],
	focus: [],
	visibilitychange: [],
	pointerlockchange: [],
	beforeunload: [],
};

function handleEvent(type: WindowEventKeys, event: Event) {
	const list = windowListeners[type];
	if (!list.length) return;
	for (const fn of list) {
		try {
			fn(event);
		} catch (err) {
			console.error(`[Kabel] Error in window listener for '${type}':`, err);
		}
	}
}

// auto attach
(Object.keys(windowListeners) as WindowEventKeys[]).forEach((type) => {
	window.addEventListener(type, (e) => handleEvent(type, e));
});

export function addWindowListener(
	type: WindowEventKeys,
	fn: (event: Event) => void
) {
	windowListeners[type].push(fn);
}

export function removeWindowListener(
	type: WindowEventKeys,
	fn: (event: Event) => void
) {
	const list = windowListeners[type];
	const i = list.indexOf(fn);
	if (i !== -1) list.splice(i, 1);
}

export function clearWindowListeners(type?: WindowEventKeys) {
	if (type) windowListeners[type].length = 0;
	else (Object.keys(windowListeners) as WindowEventKeys[]).forEach((k) => {
		windowListeners[k].length = 0;
	});
}

export default windowListeners;
