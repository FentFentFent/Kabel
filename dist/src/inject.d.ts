import WorkspaceController from "../controllers/base";
import Renderer from "../renderers/renderer";
import WorkspaceSvg from "./workspace-svg";
import NodePrototypes from "./prototypes";
import { Color } from "./visual-types";
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
export type TblxObjStruct = {
    type: 'flyout';
    contents: TblxNodeStruct[];
} | {
    type?: 'category';
    contents: TblxCategoryStruct[];
} | {
    type?: undefined;
    contents: TblxCategoryStruct[];
};
export interface InjectOptions {
    rendererOverrides?: {
        [key: string]: any;
    };
    Controller?: typeof WorkspaceController;
    controls?: {
        wasd?: boolean;
        wasdSmooth?: boolean;
        wasdAccelerate?: number;
        wasdFriction?: number;
    };
    toolbox?: TblxObjStruct;
    moveSpeed?: number;
    renderer?: string | typeof Renderer;
}
export declare class InjectMsg {
    msg: string;
    constructor(msg: string);
    err(): void;
    wrn(): void;
    info(): void;
}
export default function inject(element: HTMLElement | string, options?: InjectOptions): undefined | WorkspaceSvg;
//# sourceMappingURL=inject.d.ts.map