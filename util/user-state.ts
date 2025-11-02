type StateChangeCallback = (addedOrRemoved: 0 | 1) => void;

class UserState {
    private state: Set<string>;
    private callbacks: Map<string, StateChangeCallback[]>;
    /**
     * Stores the user's current UIX state
     * Ex: 'typing'
     */
    constructor() {
        this.state = new Set();
        this.callbacks = new Map();
    }

    /** 
     * Adds a state
     * @param name - The name of the state (ex: 'typing')
     */
    setState(name: string) {
        const wasPresent = this.state.has(name);
        if (!wasPresent) {
            this.state.add(name);
            this.triggerCallbacks(name, 1);
        }
    }

    /** 
     * Removes a state
     * @param name - The name of the state (ex: 'typing')
     */
    removeState(name: string) {
        const wasPresent = this.state.has(name);
        if (wasPresent) {
            this.state.delete(name);
            this.triggerCallbacks(name, 0);
        }
    }

    /** 
     * Checks if a state is active
     * @param name - The name of the state (ex: 'typing')
     */
    hasState(name: string) {
        return this.state.has(name);
    }

    /** 
     * Registers a callback for state changes 
     * @param name - Name of the state to check changes for.
     * @param cb - Callback to call on state change.
     */
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