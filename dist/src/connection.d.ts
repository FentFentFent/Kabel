import Field from "./field";
import NodeSvg from "./nodesvg";
/**
 * A node or field that can participate in a connection.
 */
export type Connectable = NodeSvg | null | Field;
/**
 * Represents a connection between two connectable objects.
 */
declare class Connection {
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
    constructor(from: Connectable, to: Connectable, isPrevious?: boolean);
    /** Returns the target of the connection */
    getTo(): Connectable;
    /** Returns the source of the connection */
    getFrom(): Connectable;
    /**
     * Disconnects this connection from its target.
     * Safely handles NodeSvg chains and ConnectableFields.
     */
    disconnectTo(): void;
    /**
     * Disconnects this connection from its source.
     * Safely handles NodeSvg chains and ConnectableFields.
     */
    disconnectFrom(): void;
    /**
     * Sets the target of this connection (used during deserialization)
     * @param target - New connection target
     */
    setTo(target: Connectable): void;
    /**
     * Sets the source of this connection (used during deserialization)
     * @param source - New connection source
     */
    setFrom(source: Connectable): void;
    /** Completely isolates this connection, clearing both ends */
    isolate(): void;
}
export default Connection;
//# sourceMappingURL=connection.d.ts.map