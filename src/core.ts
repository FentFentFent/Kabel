import RendererConstants from '../renderers/constants'
import Renderer from '../renderers/renderer'
import CategoryColors from './colors'
import Connection, { Connectable } from './connection'
import Coordinates from './coordinates'
import Field, {
    FieldOptions,
    FieldVisualInfo,
    AnyFieldCls,
    AnyField,
    DummyField,
    FieldMap,
    NumberField,
    OptConnectField,
    TextField
} from './field'
import inject, { InjectMsg, InjectOptions } from './inject'
import {
    clearMainWorkspace,
    getMainWorkspace,
    setMainWorkspace
} from './main-workspace'
import NodeSvg, { NodeJson, NodeEvents, InputFieldJson } from './nodesvg'
import NodePrototypes from './prototypes'
import WorkspaceSvg from './workspace-svg'
import { NodePrototype } from './node-types'
import {
    Color,
    ColorStyle,
    Hex,
    RGBObject,
    RGBString,
    RGBTuple
} from './visual-types'
import { parseColor } from '../util/parse-color'
import eventer, { Eventer } from '../util/eventer'
import * as Path from '../util/path'
import * as SVG from '@svgdotjs/svg.js'
import * as UID from '../util/uid'
import hasProp from '../util/has-prop'
import EventEmitter from '../util/emitter'
import userState from '../util/user-state'
import '../events/events'
import WorkspaceController from '../controllers/base'
import WASDController from '../controllers/wasd'
import { RMap, RendererMap } from './renderer-map'
import styler, { Styler } from '../util/styler'
import WidgetPrototypes from './widget-prototypes'
import Widget from './widget'
import ContextOptsRegistry, { ContextMenu } from './ctx-menu-registry'
import { Showable } from './context-menu'
import escapeAttr from '../util/escape-html'
import unescapeAttr from '../util/unescape-html'
import waitFrames from '../util/wait-anim-frames'
import CommentModel from './comment'
import CommentRenderer from '../comment-renderer/renderer'
import dropdownContainer from './dropdown-menu'
import Representer from '../renderers/representer'
import { RepresenterNode } from '../renderers/representer-node'
import windowListeners, { addWindowListener, clearWindowListeners, removeWindowListener } from '../util/window-listeners'
import * as FontManager from './fonts-manager';
import env from "../util/env";
import Workspace from './workspace'
import injectHeadless from './inject-headless'
import createHeadlessNode from './headless-node';
import * as apollo from '../renderers/apollo/apollo';
import * as atlas from '../renderers/atlas/atlas';
import KabelWSTheme from '../themes/default'
import KabelDarkTheme from '../themes/dark'
/** Register default renderers. */
RendererMap['default'] = atlas.Renderer;
RendererMap[atlas.Renderer.NAME] = atlas.Renderer;
RendererMap[apollo.Renderer.NAME] = apollo.Renderer;

if (env.isBrowser) {
    // Use FontsManager to load default Kabel fonts.
    FontManager.loadGoogleFont('Fredoka');
}
/**
 * Utility method to register a field globally by name
 * @param name - Field identifier
 * @param cls - Class constructor for the field
 */
Field.register = function (name: string, cls: Function) {
    FieldMap[name] = cls as AnyFieldCls
}

/**
 * Utility method to unregister a field globally by name
 * @param name - Field identifier
 */
Field.unregister = function (name: string) {
    delete FieldMap[name]
}

/**
 * Central Kabel object exposing all main modules, utilities, and defaults
 */
const Kabel = {
    env, // Environment information
    UIX: { // User experience enhancing utilities.
        /** Event manager, loads events from '../events' and lets us attach them to svg.js elements to give them behavior that's seperated from the renderer. */
        events: eventer as Eventer,
        /** Font manager, used to load fonts. */
        FontManager,
        /** * State Manager, Makes things possible: E.G (the 'typing' state when you type in a input box..) * Used in controllers so you dont move when typing characters like a w s or d etc. */
        userState,
        /** Window listeners manager */
        windowListeners: {
            addWindowListener,
            removeWindowListener,
            clearWindowListeners,
            windowListeners
        }
    },
    Themes: {
        Classic: KabelWSTheme,
        Dark: KabelDarkTheme
    },
    /** Context menu manager */
    ContextMenu,
    /**
     * Utility methods and constants for various purposes.
     * @property Path - Utility methods for handling SVG paths.
     * @property waitFrames - Utility method to wait for a certain number of animation frames.
     */
    Utils: {
        Path,
        waitFrames,
        SVG, // Re-exporting svg.js for convenience
        parseColor,
        UID,
        EventEmitter,
        hasProp,
        styler,
        Styler,
        escapeHTML: escapeAttr,
        unescapeHTML: unescapeAttr
    },
    Widget,
    CategoryColors,
    Connection,
    Coordinates,
    Field,
    DummyField,
    FieldMap,
    NumberField,
    OptConnectField,
    TextField,
    inject,
    injectHeadless,
    createHeadlessNode,
    InjectMsg,
    clearMainWorkspace,
    getMainWorkspace,
    setMainWorkspace,
    NodeSvg,
    Nodes: NodePrototypes,
    Widgets: WidgetPrototypes,
    WorkspaceSvg,
    Workspace,
    WorkspaceController,
    WASDController,
    nodeRendering: {
        SVG: SVG, // also re-export svg.js here for easier access in renderers
        rendererMap: RMap,
        Apollo: apollo,
        Atlas: atlas,
        Renderer: Renderer,
        RendererConstants: RendererConstants,
        Representer: Representer,
        RepresenterNode: RepresenterNode
    },
    atlas,
    apollo,
    commentRendering: { CommentModel, CommentRenderer },
    Dropdown: dropdownContainer
}

/**
 * Provides a getter/setter for the main workspace
 * @property _mainWorkspace - Get or set the currently active workspace
 */
Object.defineProperty(Kabel, '_mainWorkspace', {
    get(): WorkspaceSvg | Workspace | null {
        return getMainWorkspace()
    },
    set(v: WorkspaceSvg | Workspace | undefined | null | false | 0 | string) {
        if (
            v === undefined ||
            v === null ||
            v === false ||
            v === 0 ||
            typeof v === 'string'
        ) {
            return clearMainWorkspace()
        }
        return setMainWorkspace(v)
    }
})

export default Kabel
