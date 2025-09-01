type StateChangeCallback = (addedOrRemoved: 0 | 1) => void;
declare class UserState {
    private state;
    private callbacks;
    constructor();
    /** Adds a state */
    setState(name: string): void;
    /** Removes a state */
    removeState(name: string): void;
    /** Checks if state is active */
    hasState(name: string): boolean;
    /** Registers a callback for state changes */
    onStateChange(name: string, cb: StateChangeCallback): void;
    /** Internal: triggers callbacks for a state */
    private triggerCallbacks;
}
declare const userState: UserState;
export default userState;
export { UserState };
//# sourceMappingURL=user-state.d.ts.map