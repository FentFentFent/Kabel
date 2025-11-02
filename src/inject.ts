import WorkspaceController from "../controllers/base";
import Renderer from "../renderers/renderer";
import { clearMainWorkspace, getMainWorkspace, setMainWorkspace } from "./main-workspace";
import WorkspaceSvg from "./workspace-svg";
import NodePrototypes from "./prototypes"; // Object
import { FieldOptions } from "./field";
import { Color } from "./visual-types";
import styler from '../util/styler';
// @ts-ignore
import _kabelStyles from './styles.css';

const kabelStyles: string = _kabelStyles;

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
export type TblxObjStruct =
    | {
        /** Flyout toolbox type */
        type: 'flyout';
        contents: TblxNodeStruct[];
    }
    | {
        /** Categorized toolbox type */
        type?: 'category';
        contents: TblxCategoryStruct[];
    }
    | {
        /** When type is omitted, defaults to categories */
        type?: undefined;
        contents: TblxCategoryStruct[];
    };

/**
 * Options used when injecting a new workspace.
 */
export interface InjectOptions {
    /** Optional renderer overrides */
    rendererOverrides?: { [key: string]: any };

    /** Optional custom controller class */
    Controller?: typeof WorkspaceController;

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
}

/**
 * Utility class for logging injection messages in a structured way.
 */
export class InjectMsg {
    /** Message content */
    msg: string;

    /**
     * Creates a new InjectMsg instance.
     * @param msg - Message text
     */
    constructor(msg: string) {
        this.msg = msg;
    }

    /** Log as error */
    err() {
        console.error(`Failed to inject workspace: ${this.msg}`);
    }

    /** Log as warning */
    wrn() {
        console.warn(`Inject warning: ${this.msg}`);
    }

    /** Log as info */
    info() {
        console.info(`Inject info: ${this.msg}`);
    }
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
export default function inject(
    element: HTMLElement | string,
    options: InjectOptions = {}
): WorkspaceSvg | undefined {
    // Apply global Kabel styles
    styler.appendStyles('KabelStyles', kabelStyles);

    const root =
        typeof element === 'string'
            ? document.querySelector(`#${element}`) as HTMLElement
            : element as HTMLElement;

    if (!root) {
        new InjectMsg(`Document does not contain root element (Check element ID).`).err();
        return;
    }

    if (!document.contains(root)) {
        new InjectMsg(`Document does not contain root element.`).err();
        return;
    }

    // Create workspace wrapper element
    const wsTop = document.createElement('div');
    wsTop.className = `KabelWorkspaceWrapper`;
    root.appendChild(wsTop);

    // Initialize workspace
    const ws = new WorkspaceSvg(root, wsTop, options);

    // Set as the main workspace globally
    setMainWorkspace(ws);

    return ws;
}
