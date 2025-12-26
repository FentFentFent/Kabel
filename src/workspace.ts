import NodePrototypes from "./prototypes";
import newHeadlessNode from "./headless-node";
import Widget from "./widget";
import WidgetPrototypes from "./widget-prototypes";
import CommentModel from "./comment";
import UndoRedoHistory from "./undo-redo";
import { ConnectableField } from "./field";

/**
 * Headless workspace that holds nodes, widgets, and comments without any rendering or camera.
 */
class Workspace {
	_nodeDB: Map<string, any>; // Node storage
	_widgetDB: Map<string, Widget>;
	_commentDB: Set<CommentModel>;
    isHeadless: boolean = true;
	constructor() {
		this._nodeDB = new Map();
		this._widgetDB = new Map();
		this._commentDB = new Set();
	}

	/** Node management */
	addNode(node: any, nodeId?: string) {
		const id = nodeId || node.id;
		if (this._nodeDB.has(id)) {
			console.warn(`Node with id ${id} already exists, overwriting.`);
		}
		if (node.workspace !== this) node.workspace = this;
		this._nodeDB.set(id, node);
	}

	newNode(type: keyof typeof NodePrototypes, add: boolean = true) {
		if (!NodePrototypes[type]) return;
		const node = newHeadlessNode(type as string);
		if (!node) return;
		if (add) this.addNode(node);
		return node;
	}

	spawnAt(type: keyof typeof NodePrototypes, x: number, y: number) {
		const node = this.newNode(type, false);
		if (!node) return;
		node.relativeCoords.set(x, y);
		this.addNode(node);
		return node;
	}

	getNode(id: string | any) {
		if (id instanceof Object && id.id) return id;
		return this._nodeDB.get(id);
	}

	removeNodeById(id: string) {
		const node = this._nodeDB.get(id);
		if (!node) return;
		this.derefNode(node);
		this._nodeDB.delete(id);
	}

	removeNode(node: any) {
		if (!node) return;
		this.removeNodeById(node.id);
	}

	derefNode(node: any) {
		const prev = node.previousConnection?.getFrom?.();
		if (prev?.nextConnection) prev.nextConnection.disconnectTo?.();
		const next = node.nextConnection?.getTo?.();
		if (next?.previousConnection) next.previousConnection.disconnectFrom?.();

		for (let field of node.allFields()) {
			if ((field as ConnectableField).hasConnectable?.()) {
				(field as ConnectableField).disconnect();
			}
		}
	}

	/** Widget management */
	newWidget(type: string): Widget | void {
		const opts = WidgetPrototypes[type];
		if (!opts) return;
		const wdgt = opts.cls ? new opts.cls(this, opts) : new Widget(this, opts);
		this._widgetDB.set(wdgt.id, wdgt);
		return wdgt;
	}

	getWidget(id: string): Widget | undefined {
		return this._widgetDB.get(id);
	}

	/** Comment management */
	addComment() {
		const model = new CommentModel(this);
		this._commentDB.add(model);
		return model;
	}

	getComment(id: string) {
		return Array.from(this._commentDB).find(e => e.id === id);
	}

	removeComment(commentOrId: CommentModel | string) {
		let comment: CommentModel | undefined;
		if (typeof commentOrId === "string") comment = this.getComment(commentOrId);
		else comment = commentOrId;
		if (!comment) return false;
		this._commentDB.delete(comment);
		return true;
	}

	getComments() {
		return Array.from(this._commentDB);
	}

    /**
     * Internal: Add widget to DB
     * @param wdgt - The widget
     */
    _addWidgetToDB(wdgt: Widget) {
        this._widgetDB.set(wdgt.id, wdgt);
    }
    /**
     * Internal: Delete a widget from DB.
     * @param wdgt - Widget to delete
     */
    _delWidgetFromDB(wdgt: Widget) {
        this._widgetDB.delete(wdgt.id);
    }
    
	/** Serialization */
	fromJson(json: { nodes: any[]; circular: boolean }, recordBigEvent: boolean = false) {
		for (let [, node] of this._nodeDB.entries()) this.removeNode(node);

		if (json.circular) {
			for (let node of json.nodes) {
				(node.constructor as any).deserialize(node, this);
			}
		} else {
			for (let node of json.nodes) {
				(node.constructor as any).fromJson(node, this);
			}
		}
	}

	toJson(circular: boolean) {
		const nodes = [];
		for (let [, node] of this._nodeDB) {
			if (node.topLevel) nodes.push(circular ? node.serialize() : node.toJson());
		}
		return { circular, nodes };
	}
}

export default Workspace;
