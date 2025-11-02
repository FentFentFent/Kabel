import Field, { ConnectableField } from "./field";
import NodeSvg from "./nodesvg";

/**
 * A node or field that can participate in a connection.
 */
export type Connectable = NodeSvg | null | Field;

/**
 * Represents a connection between two connectable objects.
 */
class Connection {
	/** The source of the connection */
	from: Connectable;
	/** The target of the connection */
	to: Connectable;
	/** Whether this connection represents a previous connection (affects rendering/logic) */
	isPrevious: boolean;

	/**
	 * Creates a new Connection.
	 * @param from - The source NodeSvg or Field
	 * @param to - The target NodeSvg or Field
	 * @param isPrevious - True if this connection is a previous connection
	 */
	constructor(from: Connectable, to: Connectable, isPrevious: boolean = false) {
		this.from = from;
		this.to = to;
		this.isPrevious = isPrevious;
	}

	/** Returns the target of the connection */
	getTo(): Connectable {
		return this.to;
	}

	/** Returns the source of the connection */
	getFrom(): Connectable {
		return this.from;
	}

	/**
	 * Disconnects this connection from its target.
	 * Safely handles NodeSvg chains and ConnectableFields.
	 */
	disconnectTo() {
		if (!this.to) return;

		if (this.to instanceof NodeSvg && this.to.previousConnection) {
			const prevConn = this.to.previousConnection;
			const prevFrom = prevConn.from;

			// Disconnect NodeSvg chain
			if (prevFrom instanceof NodeSvg && prevFrom.nextConnection?.to) {
				prevFrom.nextConnection.to = null;
			}

			// Disconnect Field chain
			if (prevFrom instanceof Field && prevFrom.hasConnectable?.()) {
				(prevFrom as ConnectableField).disconnect();
			}
		}

		this.to = null;
	}

	/**
	 * Disconnects this connection from its source.
	 * Safely handles NodeSvg chains and ConnectableFields.
	 */
	disconnectFrom() {
		if (!this.from) return;

		if (this.from instanceof NodeSvg && this.from.nextConnection) {
			const next = this.from.nextConnection;

			if (next.to instanceof NodeSvg && next.to.previousConnection?.from) {
				next.to.previousConnection.from = null;
			} else if (next.to instanceof Field && next.to.hasConnectable()) {
				(next.to as ConnectableField).disconnect();
			}

			next.to = null;
		} else if (this.from instanceof Field && this.from.hasConnectable()) {
			(this.from as ConnectableField).disconnect();
		}

		this.from = null;
	}

	/**
	 * Sets the target of this connection (used during deserialization)
	 * @param target - New connection target
	 */
	setTo(target: Connectable) {
		this.to = target;
	}

	/**
	 * Sets the source of this connection (used during deserialization)
	 * @param source - New connection source
	 */
	setFrom(source: Connectable) {
		this.from = source;
	}

	/** Completely isolates this connection, clearing both ends */
	isolate() {
		this.from = null as any;
		this.to = null as any;
	}
}

export default Connection;
