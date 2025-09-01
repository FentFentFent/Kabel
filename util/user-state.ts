type StateChangeCallback = (addedOrRemoved: 0 | 1) => void;

class UserState {
	private state: Set<string>;
	private callbacks: Map<string, StateChangeCallback[]>;

	constructor() {
		this.state = new Set();
		this.callbacks = new Map();
	}

	/** Adds a state */
	setState(name: string) {
		const wasPresent = this.state.has(name);
		if (!wasPresent) {
			this.state.add(name);
			this.triggerCallbacks(name, 1);
		}
	}

	/** Removes a state */
	removeState(name: string) {
		const wasPresent = this.state.has(name);
		if (wasPresent) {
			this.state.delete(name);
			this.triggerCallbacks(name, 0);
		}
	}

	/** Checks if state is active */
	hasState(name: string) {
		return this.state.has(name);
	}

	/** Registers a callback for state changes */
	onStateChange(name: string, cb: StateChangeCallback) {
		if (!this.callbacks.has(name)) this.callbacks.set(name, []);
		this.callbacks.get(name)!.push(cb);
	}

	/** Internal: triggers callbacks for a state */
	private triggerCallbacks(name: string, addedOrRemoved: 0 | 1) {
		const cbs = this.callbacks.get(name);
		if (!cbs) return;
		for (const cb of cbs) cb(addedOrRemoved);
	}
}
const userState = new UserState();
export default userState;
export { 
    UserState
};