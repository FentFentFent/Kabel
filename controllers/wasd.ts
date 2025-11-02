import WorkspaceController from './base';
import WorkspaceSvg from '../src/workspace-svg';
import userState from '../util/user-state';

interface Vec2 { x: number; y: number; }

export default class WASDController extends WorkspaceController {
	moveSpeed: number;
	doAccelerate?: boolean;
	accelSpeed: number;
	friction: number;
	velocity: Vec2;
    zoom: number = 1;
	zoomSpeed: number;
	minZoom: number;
	maxZoom: number;

	constructor(workspace: WorkspaceSvg, moveSpeed?: number) {
		super(workspace);
		this.moveSpeed = workspace.options.moveSpeed || moveSpeed || 5;

		this.doAccelerate = workspace.options?.controls?.wasdSmooth ?? false;
		this.accelSpeed = workspace.options?.controls?.wasdAccelerate ?? 0.2;
		this.friction = workspace.options?.controls?.wasdFriction ?? 0.85;

		this.velocity = { x: 0, y: 0 };

		// Zoom settings
		this.zoomSpeed = workspace.options?.controls?.zoomSpeed ?? 0.1;
		this.minZoom = workspace.options?.controls?.minZoom ?? 0.1;
		this.maxZoom = workspace.options?.controls?.maxZoom ?? 4;
        this.zoom = 1;
		// Bind wheel for zoom
		workspace._wsTop.addEventListener('wheel', this.onWheel.bind(this), { passive: false });
	}

	canMove() {
		return !userState.hasState('typing');
	}

	update() {
		super.update();
		if (!this.canMove()) return;

		let inputX = 0;
		let inputY = 0;

		if (this.keysDown.has('w') || this.keysDown.has('ArrowUp')) inputY -= 1;
		if (this.keysDown.has('s') || this.keysDown.has('ArrowDown')) inputY += 1;
		if (this.keysDown.has('a') || this.keysDown.has('ArrowLeft')) inputX -= 1;
		if (this.keysDown.has('d') || this.keysDown.has('ArrowRight')) inputX += 1;

		if (this.doAccelerate) {
			// Accelerate velocity towards input direction
			this.velocity.x += inputX * this.accelSpeed;
			this.velocity.y += inputY * this.accelSpeed;

			// Apply friction
			this.velocity.x *= this.friction;
			this.velocity.y *= this.friction;

			// Only pan if velocity is noticeable
			if (Math.abs(this.velocity.x) > 0.01 || Math.abs(this.velocity.y) > 0.01) {
				this.pan(this.velocity.x, this.velocity.y);
			}
		} else {
			// Instant movement
			const dx = inputX * this.moveSpeed;
			const dy = inputY * this.moveSpeed;
			if (dx !== 0 || dy !== 0) this.pan(dx, dy);
		}
	}

	/**
	 * Handles wheel events for zooming.
	 * Zooms around the mouse position for intuitive zooming.
	 */
	onWheel(e: WheelEvent) {
		e.preventDefault();

		const oldZoom = this.getZoom();
		let delta = -e.deltaY * this.zoomSpeed * 0.01; // normalize wheel
		let newZoom = oldZoom * (1 + delta);

		// Clamp zoom
		newZoom = Math.max(this.minZoom, Math.min(this.maxZoom, newZoom));

		// Zoom around cursor
		const mouseX = e.clientX;
		const mouseY = e.clientY;

		const wsMouse = this.workspace.screenToWorkspace(mouseX, mouseY);

		// Apply new zoom
		this.setZoom(newZoom);

		// Adjust camera so the point under cursor stays stable
		this.workspace._camera.x = wsMouse.x - mouseX / newZoom;
		this.workspace._camera.y = wsMouse.y - mouseY / newZoom;

		this.workspace.refresh();
	}

	/** Returns current zoom level */
	getZoom() {
		return this.zoom;
	}

	/** Sets zoom directly */
	setZoom(zoom: number) {
		this.zoom = zoom;
	}
}
