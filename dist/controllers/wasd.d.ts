import WorkspaceController from './base';
import WorkspaceSvg from '../src/workspace-svg';
interface Vec2 {
    x: number;
    y: number;
}
export default class WASDController extends WorkspaceController {
    moveSpeed: number;
    doAccelerate?: boolean;
    accelSpeed: number;
    friction: number;
    velocity: Vec2;
    zoom: number;
    zoomSpeed: number;
    minZoom: number;
    maxZoom: number;
    isFalloff: boolean;
    constructor(workspace: WorkspaceSvg, moveSpeed?: number);
    canMove(): boolean;
    update(): void;
    pan(dx: number, dy: number): void;
    /**
     * Handles wheel events for zooming.
     * Zooms around the mouse position for intuitive zooming.
     */
    onWheel(e: WheelEvent): void;
    /** Returns current zoom level */
    getZoom(): number;
    /** Sets zoom directly */
    setZoom(zoom: number): void;
}
export {};
//# sourceMappingURL=wasd.d.ts.map