type StateChangeCallback = (addedOrRemoved: 0 | 1) => void;
declare class UserState {
    private state;
    private callbacks;
    /**
     * Stores the user's current UIX state
     * Ex: 'typing'
     */
    constructor();
    /**
     * Adds a state
     * @param name - The name of the state (ex: 'typing')
     */
    setState(name: string): void;
    /**
     * Removes a state
     * @param name - The name of the state (ex: 'typing')
     */
    removeState(name: string): void;
    /**
     * Checks if a state is active
     * @param name - The name of the state (ex: 'typing')
     */
    hasState(name: string): boolean;
    /**
     * Registers a callback for state changes
     * @param name - Name of the state to check changes for.
     * @param cb - Callback to call on state change.
     */
    onStateChange(name: string, cb: StateChangeCallback): void;
    /** Internal: triggers callbacks for a state */
    private triggerCallbacks;
}
declare const userState: UserState;
export default userState;
export { UserState };
//# sourceMappingURL=user-state.d.ts.map