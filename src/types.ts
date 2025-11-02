import Kabel from './core'; // your current module
import { DropdownContainer } from './dropdown-menu';
import WorkspaceSvg from './workspace-svg';

// -------------------- Types --------------------
/**
 * Represents the UIX (UI experience utilities) portion of Kabel.
 */
export interface KabelUIX {
    /**
     * Event system for SVG.js elements, allowing reusable functionality and event handling.
     */
    events: typeof Kabel.UIX.events;

    /**
     * Stores the current state of the user.
     */
    userState: typeof Kabel.UIX.userState;
}

/**
 * Utility functions and classes provided by Kabel.
 */
export interface KabelUtils {
    /** Path manipulation utilities. */
    Path: typeof Kabel.Utils.Path;

    /** Wait for a number of animation frames. */
    waitFrames: typeof Kabel.Utils.waitFrames;

    /** SVG utilities. */
    SVG: typeof Kabel.Utils.SVG;

    /** Parses a color string into an internal format. */
    parseColor: typeof Kabel.Utils.parseColor;

    /** Unique ID generation utilities. */
    UID: typeof Kabel.Utils.UID;

    /** Event emitter class for custom events. */
    EventEmitter: typeof Kabel.Utils.EventEmitter;

    /** Checks if an object has a property. */
    hasProp: typeof Kabel.Utils.hasProp;

    /** Styler helper functions. */
    styler: typeof Kabel.Utils.styler;

    /** Styler class for managing styles. */
    Styler: typeof Kabel.Utils.Styler;

    /** Escapes HTML for safe insertion into the DOM. */
    escapeHTML: typeof Kabel.Utils.escapeHTML;

    /** Unescapes HTML strings back to their original form. */
    unescapeHTML: typeof Kabel.Utils.unescapeHTML;
}

/**
 * Node rendering utilities and classes.
 */
export interface KabelNodeRendering {
    /** Map of registered node renderers. */
    rendererMap: typeof Kabel.nodeRendering.rendererMap;

    /** Node renderer class. */
    Renderer: typeof Kabel.nodeRendering.Renderer;

    /** Constant class to be instantiated and used in node rendering. */
    RendererConstants: typeof Kabel.nodeRendering.RendererConstants;
    /**
     * used by the renderer to create RepresenterNodes for each rendered node. (node.svg API is provided by this)
     */
    Representer: typeof Kabel.nodeRendering.Representer;
    /**
     * Class behind node.svg API. Represents a renderer's DrawState.
     */
    RepresenterNode: typeof Kabel.nodeRendering.RepresenterNode;
}

/**
 * Comment rendering utilities and classes.
 */
export interface KabelCommentRendering {
    /** Comment model class. */
    CommentModel: typeof Kabel.commentRendering.CommentModel;

    /** Comment renderer class. */
    CommentRenderer: typeof Kabel.commentRendering.CommentRenderer;
}

/**
 * The main Kabel interface exposing core functionality, utilities, renderers, and UI components.
 */
export interface KabelInterface {
    /** UI experience utilities section */
    UIX: KabelUIX;

    /** Context menu utilities. */
    ContextMenu: typeof Kabel.ContextMenu;

    /** Utility functions and classes. */
    Utils: KabelUtils;

    /** Widget system for creating interactive UI components. */
    Widget: typeof Kabel.Widget;

    /** Color categories for nodes and other UI elements. */
    CategoryColors: typeof Kabel.CategoryColors;

    /** Connection system for nodes. */
    Connection: typeof Kabel.Connection;

    /** Coordinates utility. */
    Coordinates: typeof Kabel.Coordinates;

    /** Base field class for node inputs. */
    Field: typeof Kabel.Field;

    /** Dummy field placeholder class. */
    DummyField: typeof Kabel.DummyField;

    /** Mapping of fields by type or ID. */
    FieldMap: typeof Kabel.FieldMap;

    /** Number input field for nodes. */
    NumberField: typeof Kabel.NumberField;

    /** Optional connection field. */
    OptConnectField: typeof Kabel.OptConnectField;

    /** Text input field for nodes. */
    TextField: typeof Kabel.TextField;

    /** Function to create a new workspace in kabel */
    inject: typeof Kabel.inject;

    /** Message type for injections. */
    InjectMsg: typeof Kabel.InjectMsg;

    /** Clears the main workspace. */
    clearMainWorkspace: typeof Kabel.clearMainWorkspace;

    /** Retrieves the main workspace instance. */
    getMainWorkspace: typeof Kabel.getMainWorkspace;

    /** Sets the main workspace instance. */
    setMainWorkspace: typeof Kabel.setMainWorkspace;

    /** NodeSVG class, represents a node in the workspace */
    NodeSvg: typeof Kabel.NodeSvg;

    /** Collection of registered node prototypes. */
    Nodes: typeof Kabel.Nodes;

    /** Collection of registered widget prototypes. */
    Widgets: typeof Kabel.Widgets;

    /** Workspace SVG class. */
    WorkspaceSvg: typeof Kabel.WorkspaceSvg;

    /** Workspace controller class which moves the workspace camera based on user interactions. */
    WorkspaceController: typeof Kabel.WorkspaceController;

    /** WASD controller for navigating the workspace. */
    WASDController: typeof Kabel.WASDController;

    /** Node rendering container, contains Renderer and RendererConstants classes */
    nodeRendering: KabelNodeRendering;

    /** Comment rendering container, contains CommentModel and CommentRenderer classes. */
    commentRendering: KabelCommentRendering;

    /** The currently active main workspace instance. */
    _mainWorkspace: WorkspaceSvg;

    /** Dropdown UI singleton container. */
    Dropdown: DropdownContainer;
}

export default KabelInterface;
