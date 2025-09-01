import WorkspaceController from "../controllers/base";
import Renderer from "../renderers/renderer";
import WorkspaceSvg from "./workspace-svg";
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