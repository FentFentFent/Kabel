import Connection from "./connection";
import { NodePrototype } from "./node-types";
import { ColorStyle, Color } from './visual-types';
import Field, { AnyField, FieldOptions } from "./field";
import Coordinates from "./coordinates";
import EventEmitter from '../util/emitter';
import { G } from "@svgdotjs/svg.js";
import WorkspaceSvg from "./workspace-svg";
import RendererConstants from "../renderers/constants";
import CommentModel from "./comment";
import { RepresenterNode } from '../renderers/representer-node';
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
    relativeCoords: {
        x: number;
        y: number;
    };
    /** Optional comment text attached to the node */
    comment?: string | undefined;
    /** Array of serialized fields, may contain any field-specific structure */
    fields?: any[] | undefined;
    /**
     * Serialized representation of the previous connection.
     * If `field` is true, the connection originates from a field rather than a node.
     */
    previousConnection?: {
        field?: boolean | undefined;
        node?: SerializedNode | undefined;
    } | undefined;
    /**
     * Serialized representation of the next connection.
     * If `field` is true, the connection originates from a field rather than a node.
     */
    nextConnection?: {
        field?: boolean | undefined;
        node?: SerializedNode | undefined;
    } | undefined;
}
/**
 * NodeStyle represents the styling configuration of a node.
 * Includes ColorStyle properties plus optional renderer-specific constants and arbitrary additional fields.
 */
export type NodeStyle = ColorStyle & {
    [key in keyof RendererConstants]?: RendererConstants[key];
} & {
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
declare class NodeSvg extends EventEmitter<NodeEvents> {
    /** The previous connection for this node (null if none) */
    previousConnection: Connection | null;
    /** The next connection for this node (null if none) */
    nextConnection: Connection | null;
    /** Node type string, usually derived from prototype */
    type: string | null;
    /** Prototype object providing behavior for this node */
    prototype: NodePrototype | null;
    /** Node color style object */
    colors: NodeStyle;
    /** Displayed label text for this node */
    labelText: string;
    /** Set of fields attached to this node */
    _fieldColumn: Set<AnyField>;
    /** Node coordinates relative to workspace */
    relativeCoords: Coordinates;
    /** Unique node ID */
    id: string;
    /** SVG representation of this node */
    svg?: RepresenterNode | object | null;
    /** Workspace this node belongs to */
    workspace: WorkspaceSvg | null;
    /** Optional comment attached to this node */
    comment: CommentModel | null;
    /** Event key: "REMOVING" */
    static REMOVING: keyof NodeEvents;
    /** Event key: "INITING" */
    static INITING: keyof NodeEvents;
    /**
     * Creates a NodeSvg instance.
     * @param prototype Optional NodePrototype to associate with this node.
     * @param workspace Optional WorkspaceSvg this node belongs to.
     * @param svgGroup Optional SVG group to attach node visuals.
     */
    constructor(prototype: NodePrototype | null, workspace?: WorkspaceSvg, svgGroup?: G);
    /** Returns true if this node has no previous connection (i.e., top-level node) */
    get topLevel(): boolean;
    /** Returns the raw SVG group element if present */
    get svgGroup(): G | null | undefined;
    /** Returns the text of the node's comment, if any */
    getCommentText(): string | undefined;
    /** Returns the CommentModel instance for this node, if any */
    getComment(): CommentModel | null;
    /** Adds a new comment to this node if none exists */
    addComment(): void;
    /** Sets the text for the node's comment, creating one if needed */
    setCommentText(text: string): void;
    /** Removes the comment from the node and triggers workspace redraw */
    removeComment(): void;
    /** Returns an array of all fields attached to this node */
    allFields(): AnyField[];
    /** Retrieves a field by name from this node */
    getFieldByName(name: string): AnyField | null | undefined;
    /** Alias for getFieldByName */
    getField(name: string): AnyField | null | undefined;
    /** Retrieves the current value of a field by name */
    getFieldValue(name: string): any | undefined;
    /** Retrieves the display value of a field by name */
    getFieldDisplayValue(name: string): any | undefined;
    /**
     * Initiates the node, calling prototype methods.
     */
    init(): void;
    /** Returns whether this node has a category style applied */
    hasCategoryStyle(): boolean;
    /** Returns the category name or null if none */
    getCategoryName(): string | null;
    /** Returns the node's current ColorStyle */
    getStyle(): NodeStyle;
    /** Internal helper: attach a field to this node */
    _appendFieldItem(field: AnyField): void;
    /** Initialize node from a NodeJson object */
    jsonInit(json: NodeJson): void;
    /** Apply field definitions from a JSON-like array without full NodeJson */
    applyJsonArguments(args: InputFieldJson[]): this;
    /** Appends a connection field to this node */
    appendConnection(name: string): Field;
    /** Appends a numeric input field to this node */
    appendNumber(name: string): Field;
    /** Appends a text input field to this node */
    appendText(name: string): Field;
    /** Appends a field that can hold a connection or raw value */
    appendOptLink(name: string): Field;
    /** Sets the category name for the node */
    setCategoryName(name: string): this;
    /** Applies a ColorStyle to the node */
    setStyle(style: ColorStyle): this;
    /** Sets primary, secondary, and tertiary colors for the node */
    setColor(primary: Color, secondary: Color, tertiary: Color): this;
    /** Sets the label text for the node */
    setLabelText(text: string): this;
    /** Add or replace a previous/next connection based on argument */
    setConnection(prevOrNext: string | number | boolean): this;
    /** Copies another NodeSvg into this node */
    fromNode(other: NodeSvg): this | undefined;
    /** Serializes a Connection object, handling fields and nested nodes */
    _serializeConnection(c: Connection, alreadyProcessed: {
        [key: string]: SerializedNode;
    }): {
        field?: boolean | undefined;
        node?: SerializedNode | undefined;
    };
    /**
     * Serialize a node, this includes circular references. use toJson to avoid those.
     * @param alreadyProcessed - Internal.
     * @returns
     */
    serialize(alreadyProcessed?: {
        [key: string]: SerializedNode;
    }): SerializedNode;
    /**
     * Return a flattened version of the serialized node structure, which is non-circular.
     * Any node reference inside connections or fields is replaced by its ID.
     */
    toJson(): {
        [id: string]: Omit<SerializedNode, 'previousConnection' | 'nextConnection'> & {
            previousConnection?: {
                field?: FieldOptions;
                node?: string;
            };
            nextConnection?: {
                field?: FieldOptions;
                node?: string;
            };
        };
    };
    /**
      * Reconstruct a NodeSvg from a SerializedNode structure (handles circular references)
      */
    static _deserialize(data: SerializedNode, allNodes?: {
        [id: string]: NodeSvg;
    }, workspace?: WorkspaceSvg): NodeSvg;
    /** Public: Deserialize a SerializedNode or plain object into a NodeSvg attached to a workspace */
    static deserialize(json: SerializedNode | any, workspace: WorkspaceSvg): NodeSvg;
    /** Reconstructs nodes from a flattened JSON structure into a NodeSvg tree */
    static fromJson(flat: Record<string, any>, workspace: WorkspaceSvg): any;
}
export default NodeSvg;
//# sourceMappingURL=nodesvg.d.ts.map