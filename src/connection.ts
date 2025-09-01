import Field from "./field";
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
        if (this.to instanceof NodeSvg) {
            this.to.previousConnection?.disconnectFrom();
        }
        this.to = null;
    }
    disconnectFrom() {
        this.from = null;
    }
    isolate() {
        this.from = null as any;
        this.to = null as any;
    }
}
export default Connection;