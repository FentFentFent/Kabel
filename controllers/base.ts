import WorkspaceSvg from '../src/workspace-svg';
import userState from '../util/user-state';

interface Vec2 { x: number; y: number; }

export default class WorkspaceController {
    workspace: WorkspaceSvg;

    keysDown: Set<string>;
    mouseBtns: Set<number>;
    mousePos: Vec2;
    lastMousePos: Vec2;
    isDragging: boolean;

    wheelDelta: number;
    movedListeners: (() => void)[];
    _lastMoveFire = 0;
    _moveThrottleMs = 100; // bump this to whatever doesn't lag you
    _queuedMove = false;
    _moveTimeout: any = null;
    _updateInt: any;

    constructor(workspace: WorkspaceSvg) {
        this.workspace = workspace;

        this.keysDown = new Set();
        this.mouseBtns = new Set();
        this.mousePos = { x: 0, y: 0 };
        this.lastMousePos = { x: 0, y: 0 };
        this.isDragging = false;
        this.wheelDelta = 0;
        this.movedListeners = [];

        this._setupListeners();

        this._updateInt = setInterval(() => this.update(), 16);
    }
    addMoveListener(cb: () => void) {
        this.movedListeners.push(cb);
    }

    removeMoveListener(cb: () => void) {
        const i = this.movedListeners.indexOf(cb);
        if (i !== -1) this.movedListeners.splice(i, 1);
    }

    fireDidMove() {
        if (typeof queueMicrotask !== 'undefined') {
            queueMicrotask(() => {
                for (let cb of this.movedListeners) {
                    try { cb(); } catch (e) { console.error(e); }
                }
            });
        } else {
            Promise.resolve().then(() => {
                for (let cb of this.movedListeners) {
                    try { cb(); } catch (e) { console.error(e); }
                }
            });
        }
    }

    _throttledFireDidMove() {
        const now = performance.now();

        // enough time passed → fire instantly
        if (now - this._lastMoveFire >= this._moveThrottleMs) {
            this._lastMoveFire = now;
            this.fireDidMove();
            return;
        }

        // otherwise queue ONE fire
        if (!this._queuedMove) {
            this._queuedMove = true;
            const wait = this._moveThrottleMs - (now - this._lastMoveFire);

            this._moveTimeout = setTimeout(() => {
                this._queuedMove = false;
                this._lastMoveFire = performance.now();
                this.fireDidMove();
            }, wait);
        }
    }
    getZoom() {
        return 1;
    }
    canMove() {
        return true;
    }
    private _setupListeners() {
        window.addEventListener('keydown', e => this.keysDown.add(e.key));
        window.addEventListener('keyup', e => this.keysDown.delete(e.key));

        window.addEventListener('mousedown', e => this.mouseBtns.add(e.button));
        window.addEventListener('mouseup', e => this.mouseBtns.delete(e.button));

        window.addEventListener('mousemove', e => {
            this.lastMousePos = { ...this.mousePos };
            this.mousePos = { x: e.clientX, y: e.clientY };
        });

        window.addEventListener('wheel', e => {
            this.wheelDelta = e.deltaY;
        });

        window.addEventListener('mousedown', e => {
            if (e.button === 0) this.isDragging = true;
        });
        window.addEventListener('mouseup', e => {
            if (e.button === 0) this.isDragging = false;
        });
    }

    update() {
        // Can handle keyboard shortcuts or auto-pan here
    }

    // --- Camera methods ---
    pan(dx: number, dy: number) {
        const x = this.workspace._camera.x, y = this.workspace._camera.y;
        this.workspace._camera.x += dx;
        this.workspace._camera.y += dy;
        if (x == this.workspace._camera.x && y == this.workspace._camera.y) {
            return;
        }
        this._throttledFireDidMove();
        this.workspace.didMove = true;
        this.workspace.fireMoveListeners();
        this.refreshPos();
    }

    setCamera(pos: Vec2) {
        const x = this.workspace._camera.x, y = this.workspace._camera.y;
        this.workspace._camera.x = pos.x;
        this.workspace._camera.y = pos.y;
        if (x == this.workspace._camera.x && y == this.workspace._camera.y) {
            return;
        }
        this._throttledFireDidMove();
        this.workspace.didMove = true;
        this.workspace.fireMoveListeners();
        this.refreshPos();
    }

    centerOn(pos: Vec2) {
        const wsSize = this.workspace.getSize?.() ?? { width: 0, height: 0 };
        this.setCamera({
            x: pos.x - wsSize.width / 2,
            y: pos.y - wsSize.height / 2
        });
    }



    // --- Coordinate conversion ---
    screenToWorkspace(x: number, y: number): Vec2 {
        const cam = this.workspace._camera;
        return {
            x: x + cam.x,
            y: y + cam.y
        };
    }

    workspaceToScreen(x: number, y: number): Vec2 {
        const cam = this.workspace._camera;
        return {
            x: (x - cam.x),
            y: (y - cam.y)
        };
    }

    // --- Refresh ---
    refreshPos() {
        this.workspace.refresh?.();
    }

    redraw() {
        this.workspace.redraw?.();
    }

    // --- Cleanup ---
    stop() {
        clearInterval(this._updateInt);
    }
}
