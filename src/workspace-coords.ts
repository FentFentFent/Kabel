import Coordinates from "./coordinates";



/**
 * A class that represents Workspace Camera Coords.
 * May be used in the future, right now its a no-op Coords wrapper.
 */
class WorkspaceCoords extends Coordinates {
    constructor(x = 0, y = 0) {
        super(x, y);
    }
}
export default WorkspaceCoords;