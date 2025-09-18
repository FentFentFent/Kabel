import Field, { ConnectableField } from "./field";
import NodeSvg from "./nodesvg";
export type Connectable = NodeSvg | null | Field;
class Connection {
    from: Connectable;
    to: Connectable;
    isPrevious: boolean;
    constructor(from: Connectable, to: Connectable, isPrevious: boolean = false) {
        this.from = from;
        this.to = to;
        this.isPrevious = isPrevious;
    }

    getTo(): Connectable {
        return this.to;
    }
    getFrom(): Connectable {
        return this.from;
    }
    disconnectTo() {
        if (!this.to) return;

        if (this.to instanceof NodeSvg && this.to.previousConnection) {
            const prevConn = this.to.previousConnection;
            const prevFrom = prevConn.from;

            // disconnect NodeSvg chain safely
            if (prevFrom instanceof NodeSvg && prevFrom.nextConnection?.to) {
                prevFrom.nextConnection.to = null;
            }

            // disconnect Field chain safely
            if (prevFrom instanceof Field && prevFrom.hasConnectable?.()) {
                (prevFrom as ConnectableField).disconnect();
            }
        }

        this.to = null;
    }

    disconnectFrom() {
        if (!this.from) {
            return;
        }
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

    isolate() {
        this.from = null as any;
        this.to = null as any;
    }
}
export default Connection;