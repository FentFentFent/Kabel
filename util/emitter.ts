type EventHandler<T = any> = (payload: T) => void;

class EventEmitter<Events extends Record<string, any>> {
	private listeners: { [K in keyof Events]?: EventHandler<Events[K]>[] } = {};

	on<K extends keyof Events>(event: K, handler: EventHandler<Events[K]>) {
		if (!this.listeners[event]) this.listeners[event] = [];
		this.listeners[event]!.push(handler);
		return this;
	}

	off<K extends keyof Events>(event: K, handler: EventHandler<Events[K]>) {
		if (!this.listeners[event]) return this;
		this.listeners[event] = this.listeners[event]!.filter(h => h !== handler);
		return this;
	}

	emit<K extends keyof Events>(event: K, payload: Events[K]) {
		if (!this.listeners[event]) return false;
		this.listeners[event]!.forEach(handler => handler(payload));
		return true;
	}

	once<K extends keyof Events>(event: K, handler: EventHandler<Events[K]>) {
		const wrapper = (payload: Events[K]) => {
			handler(payload);
			this.off(event, wrapper);
		};
		this.on(event, wrapper);
		return this;
	}
}
export default EventEmitter;