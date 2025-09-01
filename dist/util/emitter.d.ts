type EventHandler<T = any> = (payload: T) => void;
declare class EventEmitter<Events extends Record<string, any>> {
    private listeners;
    on<K extends keyof Events>(event: K, handler: EventHandler<Events[K]>): this;
    off<K extends keyof Events>(event: K, handler: EventHandler<Events[K]>): this;
    emit<K extends keyof Events>(event: K, payload: Events[K]): boolean;
    once<K extends keyof Events>(event: K, handler: EventHandler<Events[K]>): this;
}
export default EventEmitter;
//# sourceMappingURL=emitter.d.ts.map