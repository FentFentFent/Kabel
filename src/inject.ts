import WorkspaceController from "../controllers/base";
import Renderer from "../renderers/renderer";
import { clearMainWorkspace, getMainWorkspace, setMainWorkspace } from "./main-workspace";
import WorkspaceSvg from "./workspace-svg";
import NodePrototypes from "./prototypes"; // Object
import { FieldOptions } from "./field";
import { Color } from "./visual-types";
import styler from '../util/styler';
// @ts-ignore
import _kabelStyles from './styles.css'
const kabelStyles : string = _kabelStyles;

export interface TblxFieldStruct {
	value: any;
	[key: string]: any;
}

export interface TblxNodeStruct {
	type: keyof typeof NodePrototypes | string;
	arguments: {
		[key: string]: TblxFieldStruct;
	};
}

export interface TblxCategoryStruct {
	name: string;
	color: Color;
	contents: TblxNodeStruct[];
}

// Discriminated union for TlbxObjStruct
export type TblxObjStruct =
	| {
		type: 'flyout';
		contents: TblxNodeStruct[];
	}
	| {
		type?: 'category';
		contents: TblxCategoryStruct[];
	}
	| {
		type?: undefined; // when type is not provided
		contents: TblxCategoryStruct[];
	};


export interface InjectOptions {
    rendererOverrides?: {[key: string] : any};
    Controller?: typeof WorkspaceController;
    controls?: {
        wasd?: boolean;
        wasdSmooth?: boolean;
        wasdAccelerate?: number;
        wasdFriction?: number;
    }
    toolbox?: TblxObjStruct;
    moveSpeed?: number;
    renderer?: string|typeof Renderer;
}
export class InjectMsg {
    msg: string;
    constructor(msg: string) {
        this.msg = msg;
    }
    err() {
        console.error(`Failed to inject workspace: ${this.msg}`)
    }
    wrn() {
        console.warn(`Inject warning: ${this.msg}`)
    }
    info() {
        console.info(`Inject info: ${this.msg}`)
    }
}
export default function inject(element: HTMLElement | string, options: InjectOptions = {}) : undefined | WorkspaceSvg{
    styler.appendStyles('KabelStyles', kabelStyles);
    const root = typeof element == 'string' ? document.querySelector(`#${element}`) as HTMLElement : element as HTMLElement;
    if ((!root) && typeof element == 'string') {
        (new InjectMsg(`Document does not contain root element (Check element ID).`)).err();
        return;
    }
    if (!document.contains(root)) {
        (new InjectMsg(`Document does not contain root element.`)).err();
        return;
    }
    const wsTop = document.createElement('div');
    wsTop.className = `KabelWorkspaceWrapper`;
    root.appendChild(wsTop);
    const ws = new WorkspaceSvg(root, wsTop, options);
    setMainWorkspace(ws); // Set the main workspace to the newest created.

    return ws;
}