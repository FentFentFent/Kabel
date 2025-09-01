import Field from "./field";
import NodeSvg from "./nodesvg";
export type Connectable = NodeSvg | null | Field;
declare class Connection {
    from: Connectable;
    to: Connectable;
    isPrevious: boolean;
    constructor(from: Connectable, to: Connectable, isPrevious?: boolean);
    getTo(): Connectable;
    getFrom(): Connectable;
    disconnectTo(): void;
    disconnectFrom(): void;
    isolate(): void;
}
export default Connection;
//# sourceMappingURL=connection.d.ts.map