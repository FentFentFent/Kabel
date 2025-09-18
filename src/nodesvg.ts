import Connection from "./connection";
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
/** Represents a JSON structure to initialize a field on a node */
export interface InputFieldJson {
    label: string;
    type: string;
    name: string;
    [key: string]: any; // Extra field initialization properties
}

/** Represents a JSON structure to initialize a NodeSvg */
export interface NodeJson {
    primaryColor?: Color;
    secondaryColor?: Color;
    tertiaryColor?: Color;
    previousConnection?: any | undefined; // Presence triggers creation of a previous connection
    nextConnection?: any | undefined;     // Presence triggers creation of a next connection
    labelText?: string | undefined;
    arguments?: InputFieldJson[];
    category?: string | undefined;        // Optional node category for color theming
    type: string;
}
export interface SerializedNode {
    type: string;
    id: string;
    relativeCoords: { x: number, y: number };
    comment?: string | undefined;
    fields?: any[],
    previousConnection: {
        field?: FieldOptions;
        node?: SerializedNode;
    } | undefined;
    nextConnection: {
        field?: FieldOptions;
        node?: SerializedNode;
    } | undefined;
}
export type NodeStyle = ColorStyle & {
    [key in keyof RendererConstants]?: RendererConstants[key];
} & {
    [key: string]: any;
};


export interface NodeEvents {
    "REMOVING": null;
    "INITING": null;
    "NODE_DRAG": null;
}
class NodeSvg extends EventEmitter<NodeEvents> {
    previousConnection: Connection | null;
    nextConnection: Connection | null;
    type: string | null;
    prototype: NodePrototype | null;
    colors: NodeStyle;      // Node's color scheme
    labelText: string;       // Displayed node label
    _fieldColumn: Set<AnyField>; // Stores attached fields
    relativeCoords: Coordinates;
    id: string;
    svgGroup: G | null = null;
    workspace: WorkspaceSvg | null = null;
    comment: CommentModel | null
    static REMOVING: keyof NodeEvents = "REMOVING";
    static INITING: keyof NodeEvents = "INITING";
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
            this.workspace.addNode(this,)
        }
        if (svgGroup) {
            this.svgGroup = svgGroup;
        }
    }
    getCommentText() {
        return this.comment?.getText?.();
    }
    getComment() {
        return this.comment;
    }
    addComment() {
        if (!this.comment) {
            this.comment = new CommentModel(this);
            return;
        }
        console.warn('Comment already exists.')
    }
    setCommentText(text: string) {
        if (!this.comment) {
            this.comment = new CommentModel(this);
        }
        this.comment.setText(text);
    }
    removeComment() {
        this.comment = null;
        this.workspace?.redrawComments?.();
    }
    allFields() {
        return Array.from(this._fieldColumn);
    }
    /** Get field by name */
    getFieldByName(name: string): AnyField | null | undefined {
        let field: AnyField | null | undefined = this.allFields().find(fld => fld.getName() === name);

        return field;
    }
    getField(name: string): AnyField | null | undefined {
        return this.getFieldByName(name);
    }
    getFieldValue(name: string): any | undefined {
        const fld: AnyField | null | undefined = this.getFieldByName(name);
        if (fld) {
            return fld.getValue();
        }
        return undefined;
    }
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

    appendConnection(name: string): Field {
        const fld = new (FieldMap['connection'])();
        this._appendFieldItem(fld);
        fld.setName(name);
        fld.node = this;
        return fld;
    }

    appendNumber(name: string): Field {
        const fld = new (FieldMap['field_num'])();
        this._appendFieldItem(fld);
        fld.setName(name);
        fld.node = this;
        return fld;
    }

    appendText(name: string): Field {
        const fld = new (FieldMap['field_str'])();
        this._appendFieldItem(fld);
        fld.setName(name);
        fld.node = this;
        return fld;
    }

    /** Field that can hold a connection or raw value */
    appendOptLink(name: string): Field {
        const fld = new (FieldMap['field_both'])();
        this._appendFieldItem(fld);
        fld.setName(name);
        fld.node = this;
        return fld;
    }

    setCategoryName(name: string) {
        this.colors.category = name;
        return this;
    }

    setStyle(style: ColorStyle) {
        Object.assign(this.colors, {}, style);
        return this;
    }

    setColor(primary: Color, secondary: Color, tertiary: Color) {
        this.setStyle({ primary, secondary, tertiary });
        return this;
    }

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
    _serializeConnection(
        c: Connection,
        alreadyProcessed: { [key: string]: SerializedNode }
    ): {
        field?: FieldOptions;
        node?: SerializedNode;
    } {
        let connected = c.getTo();
        if (c.isPrevious) {
            connected = c.getFrom();
        }
        if (!connected) {
            return {};
        }

        const returned: {
            field?: FieldOptions;
            node?: SerializedNode;
        } = {};

        if (connected instanceof NodeSvg) {
            // 🔑 avoid recomputation if already serialized
            if (alreadyProcessed[connected.id]) {
                return { node: alreadyProcessed[connected.id] } as {
                    field?: FieldOptions;
                    node?: SerializedNode;
                };
            }
            returned.node = connected.serialize(alreadyProcessed);
        } else {
            // It's a field
            const fld = connected as unknown as AnyField;
            returned.field = fld.toJson(false);
            if (fld.node) {
                if (alreadyProcessed[fld.node.id]) {
                    returned.node = alreadyProcessed[fld.node.id] as SerializedNode;
                } else {
                    returned.node = fld.node.serialize(alreadyProcessed);
                }
            }
        }
        return returned;
    }

    serialize(alreadyProcessed: { [key: string]: SerializedNode } = {}): SerializedNode {
        if (alreadyProcessed[this.id]) {
            return alreadyProcessed[this.id] as SerializedNode;
        }

        // Put a placeholder in map *before* serializing connections
        const serialized: SerializedNode = {
            id: this.id,
            type: this.type || '',
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
                ? fld.toJson(true)
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



}

export default NodeSvg;
