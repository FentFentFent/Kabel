import Connection, { Connectable } from "./connection";
import { NodePrototype } from "./node-types";
import { ColorStyle, Color } from './visual-types';
import hasProp from '../util/has-prop';
import Field, { AnyField, AnyFieldCls, DummyField, FieldMap, FieldOptions } from "./field";
import CategoryColors from "./colors";
import Coordinates from "./coordinates";
import { generateUID } from "../util/uid";
import EventEmitter from '../util/emitter';
import { G } from "@svgdotjs/svg.js";
import WorkspaceSvg from "./workspace-svg";
import RendererConstants from "../renderers/constants";
import CommentModel from "./comment";
import { RepresenterNode } from '../renderers/representer-node';
import NodePrototypes from "./prototypes";
/**
 * Represents the JSON structure used to initialize a field on a node.
 * Each field has a type, label, and name. Additional properties can be included for field-specific configuration.
 */
export interface InputFieldJson {
    /** Human-readable label for the field, shown on the node UI */
    label: string;

    /** Field type identifier, corresponding to a field constructor in FieldMap */
    type: string;

    /** Unique field name within the node */
    name: string;

    /**
     * Optional additional properties for field initialization.
     * Can include type-specific options like min/max for number fields,
     * default values, dropdown options, etc.
     */
    [key: string]: any;
}

/**
 * Represents a JSON structure for initializing a NodeSvg instance.
 * Includes colors, connections, label, fields, category, and type information.
 */
export interface NodeJson {
    /** Primary color of the node (e.g., top bar, main connections) */
    primaryColor?: Color | undefined;

    /** Secondary color of the node (e.g., field backgrounds) */
    secondaryColor?: Color | undefined;

    /** Tertiary color of the node (e.g., outlines) */
    tertiaryColor?: Color | undefined;

    /**
     * Optional previous connection data.
     * Presence triggers creation of a previous connection when initializing NodeSvg.
     */
    previousConnection?: any | undefined;

    /**
     * Optional next connection data.
     * Presence triggers creation of a next connection when initializing NodeSvg.
     */
    nextConnection?: any | undefined;

    /** Optional node label text to display */
    labelText?: string | undefined;

    /** Array of field definitions (InputFieldJson) to attach to this node */
    arguments?: InputFieldJson[] | undefined;

    /** Optional category name for color theming */
    category?: string | undefined;

    /** Node type identifier, used to look up the NodePrototype */
    type: string;
}

/**
 * Represents a fully serialized node including its fields, colors, coordinates, connections, and optional comment.
 * Used for saving or transferring node data.
 */
export interface SerializedNode {
    /** Node type string */
    type: string;

    /** Unique node ID */
    id: string;

    /** Display label of the node */
    label: string;

    /** Node colors including primary, secondary, tertiary, and category */
    colors: ColorStyle;

    /** Coordinates of the node relative to its workspace */
    relativeCoords: { x: number; y: number };

    /** Optional comment text attached to the node */
    comment?: string | undefined;

    /** Array of serialized fields, may contain any field-specific structure */
    fields?: any[] | undefined;

    /**
     * Serialized representation of the previous connection.
     * If `field` is true, the connection originates from a field rather than a node.
     */
    previousConnection?: { field?: boolean|undefined; node?: SerializedNode | undefined } | undefined;

    /**
     * Serialized representation of the next connection.
     * If `field` is true, the connection originates from a field rather than a node.
     */
    nextConnection?: { field?: boolean|undefined; node?: SerializedNode | undefined } | undefined;
}

/**
 * NodeStyle represents the styling configuration of a node.
 * Includes ColorStyle properties plus optional renderer-specific constants and arbitrary additional fields.
 */
export type NodeStyle = ColorStyle &
{
    /** Optional renderer-specific constants from RendererConstants */
    [key in keyof RendererConstants]?: RendererConstants[key];
} &
{
    /** Any additional style properties supported by extensions or custom renderers */
    [key: string]: any;
};

/**
 * Events emitted by NodeSvg instances.
 * Consumers can listen to these events to react to node lifecycle changes.
 */
export interface NodeEvents {
    /** Triggered before the node is removed from the workspace */
    "REMOVING": null;

    /** Triggered immediately after node initialization */
    "INITING": null;

    /** Triggered while the node is being dragged */
    "NODE_DRAG": null;
}

/**
 * Represents a node in the workspace.
 * Handles connections, fields, colors, serialization, and events.
 */
class NodeSvg extends EventEmitter<NodeEvents> {
    /** The previous connection for this node (null if none) */
    previousConnection: Connection | null;
    /** The next connection for this node (null if none) */
    nextConnection: Connection | null;
    /** Node type string, usually derived from prototype */
    type: string | null;
    /** Prototype object providing behavior for this node */
    prototype: NodePrototype | null;
    /** Node color style object */
    colors: NodeStyle;      // Node's color scheme
    /** Displayed label text for this node */
    labelText: string;       // Displayed node label
    /** Set of fields attached to this node */
    _fieldColumn: Set<AnyField>; // Stores attached fields
    /** Node coordinates relative to workspace */
    relativeCoords: Coordinates;
    /** Unique node ID */
    id: string;
    /** SVG representation of this node */
    svg?: RepresenterNode | object | null = null;
    /** Workspace this node belongs to */
    workspace: WorkspaceSvg | null = null;
    /** Optional comment attached to this node */
    comment: CommentModel | null
    /** Event key: "REMOVING" */
    static REMOVING: keyof NodeEvents = "REMOVING";

    /** Event key: "INITING" */
    static INITING: keyof NodeEvents = "INITING";
    /**
     * Creates a NodeSvg instance.
     * @param prototype Optional NodePrototype to associate with this node.
     * @param workspace Optional WorkspaceSvg this node belongs to.
     * @param svgGroup Optional SVG group to attach node visuals.
     */
    constructor(prototype: NodePrototype | null, workspace?: WorkspaceSvg, svgGroup?: G) {
        super();
        this.type = null;
        this.comment = null;
        this.prototype = prototype;
        this.colors = {
            primary: '#000000',   // Topbar & connection color
            secondary: '#000000', // Field & dropdown backgrounds
            tertiary: '#000000', // Outline color
            category: ''          // Node category name (optional)
        };
        this.previousConnection = new Connection(null, this, true); //1st arg is from, 2nd is to, third is if this conn is prev
        this.nextConnection = new Connection(this, null, false); //1st arg is from, 2nd is to, third is if this conn is prev
        this.labelText = '';
        this._fieldColumn = new Set();
        this.relativeCoords = new Coordinates(0, 0);
        this.id = generateUID('nanoid', { alphabet: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0129384756!)@(#*$&%^' });
        if (workspace) {
            this.workspace = workspace;
        }
        if (svgGroup) {
            this.svg = new RepresenterNode(this, {
                id: this.id,
                pendingConnections: [],
                group: svgGroup
            }, workspace!.renderer)
        }
    }
    /** Returns true if this node has no previous connection (i.e., top-level node) */
    get topLevel() {
        return !(this.previousConnection?.getFrom());
    }
    /** Returns the raw SVG group element if present */
    get svgGroup() {
        return (this.svg as RepresenterNode)?.getRaw?.();
    }
    /** Returns the text of the node's comment, if any */
    getCommentText() {
        return this.comment?.getText?.();
    }
    /** Returns the CommentModel instance for this node, if any */
    getComment() {
        return this.comment;
    }
    /** Adds a new comment to this node if none exists */
    addComment() {
        if (!this.comment) {
            this.comment = new CommentModel(this);
            return;
        }
        console.warn('Comment already exists.')
    }
    /** Sets the text for the node's comment, creating one if needed */
    setCommentText(text: string) {
        if (!this.comment) {
            this.comment = new CommentModel(this);
        }
        this.comment.setText(text);
    }
    /** Removes the comment from the node and triggers workspace redraw */
    removeComment() {
        this.comment = null;
        this.workspace?.redrawComments?.();
    }
    /** Returns an array of all fields attached to this node */
    allFields() {
        return Array.from(this._fieldColumn);
    }
    /** Retrieves a field by name from this node */
    getFieldByName(name: string): AnyField | null | undefined {
        let field: AnyField | null | undefined = this.allFields().find(fld => fld.getName() === name);

        return field;
    }
    /** Alias for getFieldByName */
    getField(name: string): AnyField | null | undefined {
        return this.getFieldByName(name);
    }
    /** Retrieves the current value of a field by name */
    getFieldValue(name: string): any | undefined {
        const fld: AnyField | null | undefined = this.getFieldByName(name);
        if (fld) {
            return fld.getValue();
        }
        return undefined;
    }
    /** Retrieves the display value of a field by name */
    getFieldDisplayValue(name: string): any | undefined {
        const fld: AnyField | null | undefined = this.getFieldByName(name);
        if (fld) {
            return fld.getDisplayValue();
        }
        return undefined;
    }
    /**
     * Initiates the node, calling prototype methods.
     */
    init() {
        this.emit(NodeSvg.INITING, null);
        if (this.prototype) {
            if (this.prototype.init) this.prototype.init.call(this, this.prototype, this);
            if (this.workspace) {
                this.workspace.addNode(this)
            }
            if (this.prototype.removed) {
                this.on(NodeSvg.REMOVING, () => {
                    this.prototype?.removed.call(this, this.prototype, this);
                })
            }
        } else {
            console.warn(`Node with id ${this.id} is missing a prototype.`)
        }
    }
    /** Returns whether this node has a category style applied */
    hasCategoryStyle() {
        return !!this.colors?.category && this.colors?.category?.length > 0;
    }

    /** Returns the category name or null if none */
    getCategoryName() {
        return this.colors?.category || null;
    }

    /** Returns the node's current ColorStyle */
    getStyle() {
        return this.colors;
    }

    /** Internal helper: attach a field to this node */
    _appendFieldItem(field: AnyField) {
        if (!field) console.warn("Falsey field passed to _appendFieldItem.");
        this._fieldColumn.add(field);
    }

    /** Initialize node from a NodeJson object */
    jsonInit(json: NodeJson) {
        if (json.primaryColor) this.colors.primary = json.primaryColor;
        if (json.secondaryColor) this.colors.secondary = json.secondaryColor;
        if (json.tertiaryColor) this.colors.tertiary = json.tertiaryColor;

        // Apply category colors if defined
        if (json.category && CategoryColors[json.category]) {
            const style: ColorStyle = CategoryColors[json.category] as ColorStyle;
            Object.assign(this.colors, { category: json.category }, style);
        }

        this.previousConnection = hasProp(json, 'previousConnection') ? new Connection(null, this, true) : null;
        this.nextConnection = hasProp(json, 'nextConnection') ? new Connection(this, null, false) : null;

        if (json.labelText) this.labelText = json.labelText;
        if (json.arguments) this.applyJsonArguments(json.arguments);
        if (json.type) {
            this.type = json.type;
        }
    }

    /* JAVASCRIPT API */

    /** Apply field definitions from a JSON-like array without full NodeJson */
    applyJsonArguments(args: InputFieldJson[]) {
        for (let field of args) {
            if (!field.type || !field.name) {
                console.warn(`Invalid argument definition at: ${args.indexOf(field)}.`);
                continue;
            }

            const FieldConstructor: AnyFieldCls | undefined = FieldMap[field.type] as AnyFieldCls | undefined;
            if (!FieldConstructor) {
                console.warn(`Missing field constructor for ${field.type}!`);
                continue;
            }

            const fld: AnyField = new FieldConstructor();
            fld.fromJson(field); // initialize field
            fld.node = this;
            this._appendFieldItem(fld);
        }
        return this;
    }
    /** Appends a connection field to this node */
    appendConnection(name: string): Field {
        const fld = new (FieldMap['connection'])();
        this._appendFieldItem(fld);
        fld.setName(name);
        fld.node = this;
        return fld;
    }
    /** Appends a numeric input field to this node */
    appendNumber(name: string): Field {
        const fld = new (FieldMap['field_num'])();
        this._appendFieldItem(fld);
        fld.setName(name);
        fld.node = this;
        return fld;
    }
    /** Appends a text input field to this node */
    appendText(name: string): Field {
        const fld = new (FieldMap['field_str'])();
        this._appendFieldItem(fld);
        fld.setName(name);
        fld.node = this;
        return fld;
    }

    /** Appends a field that can hold a connection or raw value */
    appendOptLink(name: string): Field {
        const fld = new (FieldMap['field_both'])();
        this._appendFieldItem(fld);
        fld.setName(name);
        fld.node = this;
        return fld;
    }
    /** Sets the category name for the node */
    setCategoryName(name: string) {
        this.colors.category = name;
        return this;
    }
    /** Applies a ColorStyle to the node */
    setStyle(style: ColorStyle) {
        // apply properties from style into this.colors
        Object.assign(this.colors, style);
        return this;
    }

    /** Sets primary, secondary, and tertiary colors for the node */
    setColor(primary: Color, secondary: Color, tertiary: Color) {
        this.setStyle({ primary, secondary, tertiary });
        return this;
    }
    /** Sets the label text for the node */
    setLabelText(text: string) {
        this.labelText = text;
        return this;
    }

    /** Add or replace a previous/next connection based on argument */
    setConnection(prevOrNext: string | number | boolean) {
        const stringed = String(prevOrNext).toLowerCase();
        const cast = stringed == '0' ? 0 : (stringed == '1' ? 1 : (stringed == 'true' ? 1 : (stringed == 'false' ? 0 : 3)));

        if (cast === 0) {
            this.previousConnection = new Connection(null, this, true);
        } else if (cast === 1) {
            this.nextConnection = new Connection(this, null, false);
        } else {
            console.warn('Invalid prevOrNext argument for NodeSvg.setConnection');
        }
        return this;
    }
    /** Copies another NodeSvg into this node */
    fromNode(other: NodeSvg) {
        if (!other) return;

        // Copy primitive props
        this.type = other.type;
        this.labelText = other.labelText;
        this.relativeCoords = new Coordinates(other.relativeCoords.x, other.relativeCoords.y);

        // Copy colors
        this.colors = { ...other.colors };

        // Copy connections
        this.previousConnection = other.previousConnection
            ? new Connection(null, this, true)
            : null;
        this.nextConnection = other.nextConnection
            ? new Connection(this, null, false)
            : null;

        // Copy fields
        this._fieldColumn.clear();
        for (let field of other._fieldColumn) {
            const FieldCls = field.constructor as AnyFieldCls;
            const newField = (new FieldCls()) as any;

            // Copy basic properties
            newField.setName(field.getName());
            if ('getValue' in field && 'setValue' in newField) {
                newField.setValue(field.getValue());
            }
            if ('getLabel' in field && 'setLabel' in newField) {
                newField.setLabel(field.getLabel())
            }
            this._appendFieldItem(newField);
        }

        // Copy workspace reference
        this.workspace = other.workspace;

        // Copy prototype reference
        this.prototype = other.prototype;


        return this;
    }
    /** Serializes a Connection object, handling fields and nested nodes */
    _serializeConnection(
        c: Connection,
        alreadyProcessed: { [key: string]: SerializedNode }
    ): { field?: boolean | undefined; node?: SerializedNode | undefined } {
        const returned: { field?: boolean; node?: SerializedNode } = {};
        let connected: NodeSvg | AnyField | null = c.isPrevious ? c.getFrom() : c.getTo();

        if (!connected) return returned;

        if (connected instanceof NodeSvg) {
            // Avoid serializing the same node twice
            if (alreadyProcessed[connected.id]) {
                return { node: alreadyProcessed[connected.id] };
            }
            returned.node = connected.serialize(alreadyProcessed);
        } else {
            // Field serialization
            const fld = connected as AnyField;
            // If the field has a node, we serialize the node first
            let fieldNode: SerializedNode | undefined;
            if (fld.node) {
                if (alreadyProcessed[fld.node.id]) {
                    fieldNode = alreadyProcessed[fld.node.id];
                } else {
                    fieldNode = fld.node.serialize(alreadyProcessed);
                }
            }
            returned.field = true;
            if (fieldNode) returned.node = fieldNode;
        }

        return returned;
    }

    /**
     * Serialize a node, this includes circular references. use toJson to avoid those.
     * @param alreadyProcessed - Internal.
     * @returns 
     */
    serialize(alreadyProcessed: { [key: string]: SerializedNode } = {}): SerializedNode {
        if (alreadyProcessed[this.id]) {
            return alreadyProcessed[this.id] as SerializedNode;
        }

        // Put a placeholder in map *before* serializing connections
        const serialized: SerializedNode = {
            id: this.id,
            type: this.type || '',
            colors: { primary: this.colors.primary, secondary: this.colors.secondary, tertiary: this.colors.tertiary, category: this.colors.category } as ColorStyle,
            label: this.labelText,
            previousConnection: undefined,
            nextConnection: undefined,
            relativeCoords: { x: this.relativeCoords.x, y: this.relativeCoords.y },
            comment: this.comment?.getText?.(),
            fields: [], // fill after placeholder
        };
        alreadyProcessed[this.id] = serialized;

        // Now safely fill in the heavy parts
        serialized.fields = this.allFields().map(fld =>
            fld.toJson
                ? fld.toJson(true, alreadyProcessed)
                : {
                    name: fld.getName(),
                    type: fld.constructor.name,
                    value: fld.getValue ? fld.getValue() : undefined,
                }
        );

        serialized.previousConnection = this.previousConnection
            ? this._serializeConnection(this.previousConnection, alreadyProcessed)
            : undefined;

        serialized.nextConnection = this.nextConnection
            ? this._serializeConnection(this.nextConnection, alreadyProcessed)
            : undefined;

        return serialized;
    }

    /**
     * Return a flattened version of the serialized node structure, which is non-circular.
     * Any node reference inside connections or fields is replaced by its ID.
     */
    toJson(): {
        [id: string]: Omit<SerializedNode, 'previousConnection' | 'nextConnection'> & {
            previousConnection?: { field?: FieldOptions; node?: string };
            nextConnection?: { field?: FieldOptions; node?: string };
        }
    } {
        const serialized = this.serialize();
        const flat: { [id: string]: any } = {};

        const processNode = (node: SerializedNode) => {
            if (flat[node.id]) return;

            const copy: any = {
                ...node,
                previousConnection: node.previousConnection ? { ...node.previousConnection } : undefined,
                nextConnection: node.nextConnection ? { ...node.nextConnection } : undefined,
            };

            flat[node.id] = copy;

            // Handle connections
            if (copy.previousConnection?.node) {
                const prevNode = copy.previousConnection.node;
                copy.previousConnection.node = prevNode.id;
                processNode(prevNode);
            }
            if (copy.nextConnection?.node) {
                const nextNode = copy.nextConnection.node;
                copy.nextConnection.node = nextNode.id;
                processNode(nextNode);
            }

            // Handle fields recursively
            if (Array.isArray(copy.fields)) {
                for (let fld of copy.fields) {
                    if (fld.node) {
                        processNode(fld.node);
                        fld.node = fld.node.id;
                    }
                    for (let key in fld) {
                        if (fld[key]?.node) {
                            processNode(fld[key]?.node);
                            fld[key].node = fld[key].node.id;
                        }
                    }
                }
            }
        };

        processNode(serialized);
        return flat;
    }

    /**
      * Reconstruct a NodeSvg from a SerializedNode structure (handles circular references)
      */
    static _deserialize(
        data: SerializedNode,
        allNodes: { [id: string]: NodeSvg } = {},
        workspace?: WorkspaceSvg
    ): NodeSvg {
        // If already created, return the existing instance
        if (allNodes[data.id]) return allNodes[data.id] as NodeSvg;

        // Create a new node with minimal prototype info (can be patched later)
        const node = new NodeSvg(NodePrototypes[data.type] as NodePrototype, workspace);
        node.id = data.id;
        node.init();
        node.type = data.type;
        node.relativeCoords = new Coordinates(data.relativeCoords.x, data.relativeCoords.y);
        node.labelText = data.label || '';
        if (data.comment) {
            node.setCommentText(data.comment);

        }
        // IMPORTANT: restore colors from serialized data (if present)
        if (data.colors) {
            // Start with category colors if a category is present and known
            if (data.colors.category && CategoryColors[data.colors.category]) {
                const style: ColorStyle = CategoryColors[data.colors.category] as ColorStyle;
                Object.assign(node.colors, style, { category: data.colors.category });
            }
            // Then override with explicit serialized colors (primary/secondary/tertiary)
            // This preserves explicit color values even when a category was saved
            const explicit: Partial<ColorStyle> = {};
            if (data.colors.primary) explicit.primary = data.colors.primary;
            if (data.colors.secondary) explicit.secondary = data.colors.secondary;
            if (data.colors.tertiary) explicit.tertiary = data.colors.tertiary;
            if (data.colors.category) explicit.category = data.colors.category;
            node.setStyle(explicit as ColorStyle);
        }
        // Register placeholder before deserializing connections to handle circular refs
        allNodes[node.id] = node;

        // Deserialize fields
        if (Array.isArray(data.fields)) {
            node._fieldColumn = new Set();
            for (let fldData of data.fields) {
                const FieldConstructor = FieldMap[fldData.type];
                if (!FieldConstructor) continue;

                const fld: AnyField = new FieldConstructor();
                fld.fromJson(fldData, workspace); // ONLY fldData and workspace
                fld.node = node;
                node._appendFieldItem(fld);
            }
        }

        // Deserialize previous/next connections
        if (data.previousConnection?.node) {
            node.previousConnection = new Connection(null, node, true);
            node.previousConnection.setFrom(NodeSvg._deserialize(data.previousConnection.node, allNodes, workspace));
        }

        if (data.nextConnection?.node) {
            node.nextConnection = new Connection(node, null, false);
            node.nextConnection.setTo(NodeSvg._deserialize(data.nextConnection.node, allNodes, workspace));
        }
        workspace?.redraw();
        return node;
    }
    /** Public: Deserialize a SerializedNode or plain object into a NodeSvg attached to a workspace */
    static deserialize(json: SerializedNode | any, workspace: WorkspaceSvg) {
        return this._deserialize(json as SerializedNode, {}, workspace);
    }
    /** Reconstructs nodes from a flattened JSON structure into a NodeSvg tree */
    static fromJson(flat: Record<string, any>, workspace: WorkspaceSvg): any {
        const nodes: Record<string, any> = {};

        // shallow clone so we can safely mutate
        for (const id in flat)
            nodes[id] = { ...flat[id] };

        // rebuild references
        for (const id in nodes) {
            const node = nodes[id];

            // fix connection refs
            if (node.previousConnection?.node) {
                const refId = node.previousConnection.node as string;
                node.previousConnection = {
                    ...node.previousConnection,
                    node: nodes[refId],
                };
            }
            if (node.nextConnection?.node) {
                const refId = node.nextConnection.node as string;
                node.nextConnection = {
                    ...node.nextConnection,
                    node: nodes[refId],
                };
            }

            // fix fields
            if (Array.isArray(node.fields)) {
                for (const fld of node.fields) {
                    if (typeof fld.node === 'string')
                        fld.node = nodes[fld.node];

                    for (const key in fld) {
                        const maybe = fld[key];
                        if (maybe?.node && typeof maybe.node === 'string')
                            maybe.node = nodes[maybe.node];
                    }
                }
            }
        }

        // the root is just the one w/ no previousConnection
        const root = Object.values(nodes).find(n => !n.previousConnection?.node) ?? null;
        return this._deserialize(root, {}, workspace);
    }


}

export default NodeSvg;
