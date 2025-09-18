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
/** Represents a JSON structure to initialize a field on a node */
export interface InputFieldJson {
    label: string;
    type: string;
    name: string;
    [key: string]: any;
}
/** Represents a JSON structure to initialize a NodeSvg */
export interface NodeJson {
    primaryColor?: Color;
    secondaryColor?: Color;
    tertiaryColor?: Color;
    previousConnection?: any | undefined;
    nextConnection?: any | undefined;
    labelText?: string | undefined;
    arguments?: InputFieldJson[];
    category?: string | undefined;
    type: string;
}
export interface SerializedNode {
    type: string;
    id: string;
    relativeCoords: {
        x: number;
        y: number;
    };
    comment?: string | undefined;
    fields?: any[];
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
declare class NodeSvg extends EventEmitter<NodeEvents> {
    previousConnection: Connection | null;
    nextConnection: Connection | null;
    type: string | null;
    prototype: NodePrototype | null;
    colors: NodeStyle;
    labelText: string;
    _fieldColumn: Set<AnyField>;
    relativeCoords: Coordinates;
    id: string;
    svgGroup: G | null;
    workspace: WorkspaceSvg | null;
    comment: CommentModel | null;
    static REMOVING: keyof NodeEvents;
    static INITING: keyof NodeEvents;
    constructor(prototype: NodePrototype | null, workspace?: WorkspaceSvg, svgGroup?: G);
    getCommentText(): string | undefined;
    getComment(): CommentModel | null;
    addComment(): void;
    setCommentText(text: string): void;
    removeComment(): void;
    allFields(): AnyField[];
    /** Get field by name */
    getFieldByName(name: string): AnyField | null | undefined;
    getField(name: string): AnyField | null | undefined;
    getFieldValue(name: string): any | undefined;
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
    appendConnection(name: string): Field;
    appendNumber(name: string): Field;
    appendText(name: string): Field;
    /** Field that can hold a connection or raw value */
    appendOptLink(name: string): Field;
    setCategoryName(name: string): this;
    setStyle(style: ColorStyle): this;
    setColor(primary: Color, secondary: Color, tertiary: Color): this;
    setLabelText(text: string): this;
    /** Add or replace a previous/next connection based on argument */
    setConnection(prevOrNext: string | number | boolean): this;
    /** Copies another NodeSvg into this node */
    fromNode(other: NodeSvg): this | undefined;
    _serializeConnection(c: Connection, alreadyProcessed: {
        [key: string]: SerializedNode;
    }): {
        field?: FieldOptions;
        node?: SerializedNode;
    };
    serialize(alreadyProcessed?: {
        [key: string]: SerializedNode;
    }): SerializedNode;
}
export default NodeSvg;
//# sourceMappingURL=nodesvg.d.ts.map