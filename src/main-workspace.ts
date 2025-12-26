import Workspace from "./workspace";
import WorkspaceSvg from "./workspace-svg";

/**
 * Holds a reference to the main WorkspaceSvg instance.
 * Mimics Blockly's getMainWorkspace API for Kabel.
 */
let mainws: WorkspaceSvg | Workspace | null = null;

/**
 * Returns the current main workspace instance.
 * 
 * @returns The main WorkspaceSvg or null if none is set.
 */
function getMainWorkspace(): WorkspaceSvg | Workspace | null {
    return mainws;
}

/**
 * Sets the main workspace reference.
 * Calling this updates the global "main workspace" for Kabel.
 * 
 * @param ws - The WorkspaceSvg instance to set as main, or null to clear.
 * @returns The workspace that was set.
 */
function setMainWorkspace(ws: WorkspaceSvg | Workspace | null) {
    return (mainws = ws);
}

/**
 * Clears the main workspace reference.
 * After calling, getMainWorkspace() will return null.
 * 
 * @returns Always returns null.
 */
function clearMainWorkspace() {
    return (mainws = null);
}

export {
    getMainWorkspace,
    setMainWorkspace,
    clearMainWorkspace
};

/**
 * Note:
 * This mimics the Blockly.getMainWorkspace API.
 * When you inject a new workspace in Kabel, calling setMainWorkspace
 * sets the global main workspace reference, so you can easily retrieve it later.
 */
