import WorkspaceSvg from "./workspace-svg";



let mainws : WorkspaceSvg | null = null;

function getMainWorkspace(): WorkspaceSvg|null {
    return mainws;
}
function setMainWorkspace(ws: WorkspaceSvg | null) {
    return mainws = ws;
}
function clearMainWorkspace() {
    return mainws = null;
}

export {
    getMainWorkspace,
    setMainWorkspace,
    clearMainWorkspace
}