import type RendererType from "../renderers/renderer";
import Renderer from "../renderers/renderer";
/**
 * Interface for the renderer map.
 * Maps a string key (renderer name) to a renderer class.
 */
interface RendererMapInterface {
    [key: string]: typeof RendererType;
}

// Top-level renderer map storage
const RendererMap: RendererMapInterface = {};

/**
 * Class for managing registered renderer classes.
 * Provides methods to register, delete, get, list, and resolve renderers.
 */
class RMap {
    /**
     * Registers a renderer class under a given name.
     * @param RendererCls The renderer class to register
     * @param optName Optional name to register under. Defaults to `RendererCls.NAME`
     */
    static register(RendererCls: typeof RendererType, optName?: string) {
        const name = optName ?? RendererCls.NAME;
        RendererMap[name] = RendererCls;
    }

    /**
     * Deletes a renderer from the map by name.
     * Cannot delete the "default" renderer.
     * @param name The name of the renderer to delete
     * @returns `true` if deleted, `false` otherwise
     */
    static delete(name: string) {
        if (name === 'default') return false;
        if (RendererMap[name]) {
            delete RendererMap[name];
            return true;
        }
        return false;
    }

    /**
     * Retrieves a renderer class by name.
     * Returns the default renderer if the name is not found.
     * @param name The name of the renderer to get
     * @returns The renderer class
     */
    static get(name: string): typeof RendererType {
        const Renderer = require("../renderers/renderer").default as typeof RendererType;
        return RendererMap[name] ?? RendererMap['default'] ?? Renderer;
    }

    /**
     * Lists all registered renderer names.
     * @returns Array of registered renderer names
     */
    static list() {
        return Object.keys(RendererMap);
    }

    /**
     * Resolves input into a renderer class.
     * - If `input` is undefined, returns the default renderer
     * - If `input` is a string, returns the renderer with that name
     * - If `input` is a class, returns the class itself
     * @param input Optional renderer name or class
     * @returns Renderer class
     */
    static resolve(input?: string | typeof RendererType): typeof RendererType {
        const Renderer = require("../renderers/renderer").default as typeof RendererType;

        if (!input) return RendererMap['default'] ?? Renderer;

        if (typeof input === 'string') return RMap.get(input);

        if (typeof input === 'function') return input as typeof RendererType;

        return RendererMap['default'] ?? Renderer;
    }
}

// Default renderers registered in core.ts

export { RMap, RendererMap };
