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
    constructor(workspace: WorkspaceSvg, moveSpeed?: number);
    canMove(): boolean;
    update(): void;
}
export {};
//# sourceMappingURL=wasd.d.ts.map