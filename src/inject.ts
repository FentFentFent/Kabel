import WorkspaceController from "../controllers/base";
import Renderer from "../renderers/renderer";
import { clearMainWorkspace, getMainWorkspace, setMainWorkspace } from "./main-workspace";
import WorkspaceSvg from "./workspace-svg";



export interface InjectOptions {
    rendererOverrides?: {[key: string] : any};
    Controller?: typeof WorkspaceController;
    controls?: {
        wasd?: boolean;
        wasdSmooth?: boolean;
        wasdAccelerate?: number;
        wasdFriction?: number;
    }
    moveSpeed?: number;
    renderer?: string|typeof Renderer;
}
export class InjectMsg {
    msg: string;
    constructor(msg: string) {
        this.msg = msg;
    }
    err() {
        console.warn(`Failed to inject workspace: ${this.msg}`)
    }
    wrn() {
        console.warn(`Inject warning: ${this.msg}`)
    }
    info() {
        console.info(`Inject info: ${this.msg}`)
    }
}
export default function inject(element: HTMLElement | string, options: InjectOptions = {}) : undefined | WorkspaceSvg{
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