import Renderer from "../renderers/renderer";

interface RendererMap {
	[key: string]: typeof Renderer;
}

const RendererMap: RendererMap = {
	[Renderer.NAME]: Renderer,
	'default': Renderer
};

class RMap {
	static register(RendererCls: typeof Renderer, optName?: string) {
		const name = optName ?? RendererCls.NAME;
		RendererMap[name] = RendererCls;
	}

	static delete(name: string) {
		if (name === 'default') return false;
		if (RendererMap[name]) {
			delete RendererMap[name];
			return true;
		}
		return false;
	}

	static get(name: string) {
		return RendererMap[name] ?? RendererMap['default'];
	}

	static list() {
		return Object.keys(RendererMap);
	}

	/**
	 * Helper to normalize any renderer input into a valid Renderer class
	 * @param input - Either a string (renderer name), a class, or undefined
	 * @returns A Renderer constructor
	 */
	static resolve(input?: string | typeof Renderer): typeof Renderer {
		if (!input) return RendererMap['default'] as typeof Renderer;
		if (typeof input === 'string') {
            if (!RMap.get(input) ) {
                return RendererMap['default'] as typeof Renderer;
            }
            return RMap.get(input) as typeof Renderer;
        }
		return (typeof input == 'function') ? input as typeof Renderer : RendererMap['default'] as typeof Renderer;
	}
}

export { RMap, RendererMap };
