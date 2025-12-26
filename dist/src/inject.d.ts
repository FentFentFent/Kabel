import WorkspaceController from "../controllers/base";
import Renderer from "../renderers/renderer";
import WorkspaceSvg, { WSTheme } from "./workspace-svg";
import NodePrototypes from "./prototypes";
import { Color, Hex } from "./visual-types";
/**
 * Represents a field in a toolbox node.
 * Can contain any extra properties as needed by the field type.
 */
export interface TblxFieldStruct {
    /** Field value */
    value: any;
    /** Additional field-specific properties */
    [key: string]: any;
}
/**
 * Represents a node in a toolbox.
 */
export interface TblxNodeStruct {
    /** Node type (matches NodePrototypes key or arbitrary string) */
    type: keyof typeof NodePrototypes | string;
    /** Map of field names to field data */
    arguments: {
        [key: string]: TblxFieldStruct;
    };
}
/**
 * Represents a category in the toolbox, which contains multiple nodes.
 */
export interface TblxCategoryStruct {
    /** Category name */
    name: string;
    /** Category color */
    color: Color;
    /** Nodes contained in this category */
    contents: TblxNodeStruct[];
}
/**
 * Discriminated union type representing possible toolbox structures.
 * Can be a flyout (list of nodes) or a categorized toolbox.
 */
export type TblxObjStruct = {
    /** Flyout toolbox type */
    type: 'flyout';
    contents: TblxNodeStruct[];
} | {
    /** Categorized toolbox type */
    type?: 'category';
    contents: TblxCategoryStruct[];
} | {
    /** When type is omitted, defaults to categories */
    type?: undefined;
    contents: TblxCategoryStruct[];
};
export interface GridOptions {
    /**
     * The grid's type.
     * 'celled' - The grid is celled.
     * 'dotted' - The grid is dotted.
     */
    type: 'celled' | 'dotted';
    /**
     * Spacing, optional. Default is 40.
     */
    spacing?: number;
    /**
     * Dot size for 'dotted' grid type.
     */
    dotSize?: number;
    /**
     * stroke width for 'celled' grid type.
     */
    strokeWidth?: number;
    /**
     * Option color for any grid type. Color is #bebebeff by default.
     */
    color?: Hex;
}
/**
 * Options used when injecting a new workspace.
 */
export interface InjectOptions {
    /** Optional renderer overrides */
    rendererOverrides?: {
        [key: string]: any;
    };
    /** Theme for the workspace */
    theme?: string | WSTheme;
    /** Optional custom controller class */
    Controller?: typeof WorkspaceController;
    /** Init the workspace's undo state for you, or not. */
    initUndoRedo?: boolean;
    /** Optional controls configuration */
    controls?: {
        zoomSpeed?: number;
        minZoom?: number;
        maxZoom?: number;
        wasd?: boolean;
        wasdSmooth?: boolean;
        wasdAccelerate?: number;
        wasdFriction?: number;
    };
    /** Optional toolbox structure */
    toolbox?: TblxObjStruct;
    /** Optional movement speed of the workspace */
    moveSpeed?: number;
    /** Optional renderer: name string or class */
    renderer?: string | typeof Renderer;
    /**
     * Optional grid settings.
     */
    grid?: GridOptions;
}
/**
 * Utility class for logging injection messages in a structured way.
 */
export declare class InjectMsg {
    /** Message content */
    msg: string;
    /**
     * Creates a new InjectMsg instance.
     * @param msg - Message text
     */
    constructor(msg: string);
    /** Log as error */
    err(): void;
    /** Log as warning */
    wrn(): void;
    /** Log as info */
    info(): void;
}
/**
 * Injects a new Kabel workspace into the document.
 * Appends the workspace container to the given element (or element ID) and
 * sets it as the main workspace.
 *
 * @param element - HTMLElement or string ID to attach the workspace to
 * @param options - Optional InjectOptions to configure the workspace
 * @returns The newly created WorkspaceSvg instance, or undefined if injection failed
 */
export default function inject(element: HTMLElement | string, options?: InjectOptions): WorkspaceSvg | undefined;
//# sourceMappingURL=inject.d.ts.map