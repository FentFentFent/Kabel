import type RendererType from "../renderers/renderer";

interface RendererMapInterface {
	[key: string]: typeof RendererType;
}

// top-level map is fine
const RendererMap: RendererMapInterface = {};

// merged RMap class
class RMap {
	// register a renderer
	static register(RendererCls: typeof RendererType, optName?: string) {
		const name = optName ?? RendererCls.NAME;
		RendererMap[name] = RendererCls;
	}

	// delete a renderer by name
	static delete(name: string) {
		if (name === 'default') return false;
		if (RendererMap[name]) {
			delete RendererMap[name];
			return true;
		}
		return false;
	}

	// get a renderer by name
	static get(name: string): typeof RendererType {
		const Renderer = require("../renderers/renderer").default as typeof RendererType;
		return RendererMap[name] ?? RendererMap['default'] ?? Renderer;
	}

	// list all registered renderers
	static list() {
		return Object.keys(RendererMap);
	}

	// resolve any input into a renderer class
	static resolve(input?: string | typeof RendererType): typeof RendererType {
		const Renderer = require("../renderers/renderer").default as typeof RendererType;

		if (!input) return RendererMap['default'] ?? Renderer;

		if (typeof input === 'string') return RMap.get(input);

		if (typeof input === 'function') return input as typeof RendererType;

		return RendererMap['default'] ?? Renderer;
	}
}

// pre-register default renderers if needed
const DefaultRenderer = require("../renderers/renderer").default as typeof RendererType;
RendererMap['atlas'] = DefaultRenderer;
RendererMap['default'] = DefaultRenderer;

export { RMap, RendererMap };
