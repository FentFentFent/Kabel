import WorkspaceSvg from '../src/workspace-svg';
interface Vec2 {
    x: number;
    y: number;
}
export default class WorkspaceController {
    workspace: WorkspaceSvg;
    keysDown: Set<string>;
    mouseBtns: Set<number>;
    mousePos: Vec2;
    lastMousePos: Vec2;
    isDragging: boolean;
    wheelDelta: number;
    movedListeners: (() => void)[];
    _lastMoveFire: number;
    _moveThrottleMs: number;
    _queuedMove: boolean;
    _moveTimeout: any;
    _updateInt: any;
    constructor(workspace: WorkspaceSvg);
    addMoveListener(cb: () => void): void;
    removeMoveListener(cb: () => void): void;
    fireDidMove(): void;
    _throttledFireDidMove(): void;
    getZoom(): number;
    canMove(): boolean;
    private _setupListeners;
    update(): void;
    pan(dx: number, dy: number): void;
    setCamera(pos: Vec2): void;
    centerOn(pos: Vec2): void;
    screenToWorkspace(x: number, y: number): Vec2;
    workspaceToScreen(x: number, y: number): Vec2;
    refreshPos(): void;
    redraw(): void;
    stop(): void;
}
export {};
//# sourceMappingURL=base.d.ts.map