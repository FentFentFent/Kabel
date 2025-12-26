import { InjectMsg } from "./inject";
import { setMainWorkspace } from "./main-workspace";
import Workspace from "./workspace";




function injectHeadless() : Workspace | undefined {
    try {
        const ws = new Workspace();
        setMainWorkspace(ws);
        return ws;
    } catch (e) {
        new InjectMsg(`Failed to initialize workspace: ${(e as Error).message}`).err();
    }
}

export default injectHeadless;