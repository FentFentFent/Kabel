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

	private _updateInt: any;

	constructor(workspace: WorkspaceSvg) {
		this.workspace = workspace;

		this.keysDown = new Set();
		this.mouseBtns = new Set();
		this.mousePos = { x: 0, y: 0 };
		this.lastMousePos = { x: 0, y: 0 };
		this.isDragging = false;
        this.wheelDelta = 0;

		this._setupListeners();

		this._updateInt = setInterval(() => this.update(), 16);
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
		this.workspace._camera.x += dx;
		this.workspace._camera.y += dy;
		this.refreshPos();
	}

	setCamera(pos: Vec2) {
		this.workspace._camera.x = pos.x;
		this.workspace._camera.y = pos.y;
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
