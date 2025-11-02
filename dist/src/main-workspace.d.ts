import WorkspaceSvg from "./workspace-svg";
/**
 * Returns the current main workspace instance.
 *
 * @returns The main WorkspaceSvg or null if none is set.
 */
declare function getMainWorkspace(): WorkspaceSvg | null;
/**
 * Sets the main workspace reference.
 * Calling this updates the global "main workspace" for Kabel.
 *
 * @param ws - The WorkspaceSvg instance to set as main, or null to clear.
 * @returns The workspace that was set.
 */
declare function setMainWorkspace(ws: WorkspaceSvg | null): WorkspaceSvg | null;
/**
 * Clears the main workspace reference.
 * After calling, getMainWorkspace() will return null.
 *
 * @returns Always returns null.
 */
declare function clearMainWorkspace(): null;
export { getMainWorkspace, setMainWorkspace, clearMainWorkspace };
/**
 * Note:
 * This mimics the Blockly.getMainWorkspace API.
 * When you inject a new workspace in Kabel, calling setMainWorkspace
 * sets the global main workspace reference, so you can easily retrieve it later.
 */
//# sourceMappingURL=main-workspace.d.ts.map