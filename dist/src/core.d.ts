import RendererConstants from '../renderers/constants';
import Renderer from '../renderers/renderer';
import Connection from './connection';
import Coordinates from './coordinates';
import Field, { AnyFieldCls, DummyField, NumberField, OptConnectField, TextField } from './field';
import inject, { InjectMsg } from './inject';
import { clearMainWorkspace, getMainWorkspace, setMainWorkspace } from './main-workspace';
import NodeSvg from './nodesvg';
import WorkspaceSvg from './workspace-svg';
import { NodePrototype } from './node-types';
import { ColorStyle } from './visual-types';
import { parseColor } from '../util/parse-color';
import { Eventer } from '../util/eventer';
import * as Path from '../util/path';
import * as SVG from '@svgdotjs/svg.js';
import * as UID from '../util/uid';
import hasProp from '../util/has-prop';
import EventEmitter from '../util/emitter';
import '../events/events';
import WorkspaceController from '../controllers/base';
import WASDController from '../controllers/wasd';
import { RMap } from './renderer-map';
import { Styler } from '../util/styler';
import Widget from './widget';
import escapeAttr from '../util/escape-html';
import unescapeAttr from '../util/unescape-html';
import waitFrames from '../util/wait-anim-frames';
import CommentModel from './comment';
import CommentRenderer from '../comment-renderer/renderer';
import Representer from '../renderers/representer';
import { RepresenterNode } from '../renderers/representer-node';
import { addWindowListener, clearWindowListeners, removeWindowListener } from '../util/window-listeners';
import * as FontManager from './fonts-manager';
import Workspace from './workspace';
import injectHeadless from './inject-headless';
import createHeadlessNode from './headless-node';
import * as apollo from '../renderers/apollo/apollo';
import * as atlas from '../renderers/atlas/atlas';
/**
 * Central Kabel object exposing all main modules, utilities, and defaults
 */
declare const Kabel: {
    env: {
        isBrowser: boolean;
        isNode: boolean;
        isWebWorker: boolean;
    };
    UIX: {
        /** Event manager, loads events from '../events' and lets us attach them to svg.js elements to give them behavior that's seperated from the renderer. */
        events: Eventer;
        /** Font manager, used to load fonts. */
        FontManager: typeof FontManager;
        /** * State Manager, Makes things possible: E.G (the 'typing' state when you type in a input box..) * Used in controllers so you dont move when typing characters like a w s or d etc. */
        userState: import("../util/user-state").UserState;
        /** Window listeners manager */
        windowListeners: {
            addWindowListener: typeof addWindowListener;
            removeWindowListener: typeof removeWindowListener;
            clearWindowListeners: typeof clearWindowListeners;
            windowListeners: {
                resize: ((event: Event) => void)[];
                scroll: ((event: Event) => void)[];
                blur: ((event: Event) => void)[];
                focus: ((event: Event) => void)[];
                visibilitychange: ((event: Event) => void)[];
                pointerlockchange: ((event: Event) => void)[];
                beforeunload: ((event: Event) => void)[];
            };
        };
    };
    Themes: {
        Classic: import("./workspace-svg").WSTheme;
        Dark: import("./workspace-svg").WSTheme;
    };
    /** Context menu manager */
    ContextMenu: {
        registerOption(id: string, option: Omit<import("./context-menu").ContextMenuOpts, "id">): void;
        unregisterOption(id: string): void;
    };
    /**
     * Utility methods and constants for various purposes.
     * @property Path - Utility methods for handling SVG paths.
     * @property waitFrames - Utility method to wait for a certain number of animation frames.
     */
    Utils: {
        Path: typeof Path;
        waitFrames: typeof waitFrames;
        SVG: typeof SVG;
        parseColor: typeof parseColor;
        UID: typeof UID;
        EventEmitter: typeof EventEmitter;
        hasProp: typeof hasProp;
        styler: Styler;
        Styler: typeof Styler;
        escapeHTML: typeof escapeAttr;
        unescapeHTML: typeof unescapeAttr;
    };
    Widget: typeof Widget;
    CategoryColors: {
        [key: string]: ColorStyle;
    };
    Connection: typeof Connection;
    Coordinates: typeof Coordinates;
    Field: typeof Field;
    DummyField: typeof DummyField;
    FieldMap: {
        [key: string]: AnyFieldCls;
        field_both: typeof OptConnectField;
        field_string: typeof TextField;
        field_num: typeof NumberField;
        field_dummy: typeof DummyField;
        field_str: typeof TextField;
        connection: typeof import("./field").ConnectableField;
    };
    NumberField: typeof NumberField;
    OptConnectField: typeof OptConnectField;
    TextField: typeof TextField;
    inject: typeof inject;
    injectHeadless: typeof injectHeadless;
    createHeadlessNode: typeof createHeadlessNode;
    InjectMsg: typeof InjectMsg;
    clearMainWorkspace: typeof clearMainWorkspace;
    getMainWorkspace: typeof getMainWorkspace;
    setMainWorkspace: typeof setMainWorkspace;
    NodeSvg: typeof NodeSvg;
    Nodes: {
        [key: string]: NodePrototype;
    };
    Widgets: import("./widget-prototypes").WidgetPrototypeList;
    WorkspaceSvg: typeof WorkspaceSvg;
    Workspace: typeof Workspace;
    WorkspaceController: typeof WorkspaceController;
    WASDController: typeof WASDController;
    nodeRendering: {
        SVG: typeof SVG;
        rendererMap: typeof RMap;
        Apollo: typeof apollo;
        Atlas: typeof atlas;
        Renderer: typeof Renderer;
        RendererConstants: typeof RendererConstants;
        Representer: typeof Representer;
        RepresenterNode: typeof RepresenterNode;
    };
    atlas: typeof atlas;
    apollo: typeof apollo;
    commentRendering: {
        CommentModel: typeof CommentModel;
        CommentRenderer: typeof CommentRenderer;
    };
    Dropdown: import("./dropdown-menu").DropdownContainer;
};
export default Kabel;
//# sourceMappingURL=core.d.ts.map