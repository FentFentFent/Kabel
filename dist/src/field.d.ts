import Connection from "./connection";
import { G, Path, Rect, Svg, Text } from '@svgdotjs/svg.js';
import NodeSvg from "./nodesvg";
import { ConnectorToFrom } from "../renderers/renderer";
/**
 * Options used to initialize a Field.
 */
export interface FieldOptions {
    name: string;
    /** Human-readable label for the field */
    label: string;
    /** Key used to identify the field type in FieldTypesMap */
    type: string;
    /** Field value (optional) */
    value?: any;
    /** Only used by OptConnectField to determine internal value type */
    fld_type?: "number" | "string";
    [key: string]: any;
}
export interface FieldVisualInfo {
    measuredWidth: number;
    measuredHeight: number;
    background: Rect;
    svg: Svg;
    nodeGroup: G;
    fieldGroup: G;
    xUsed: number;
}
export interface FieldRawBoxData {
    box: Rect;
    txt: Text;
}
export interface FieldConnectionData {
    connector: Path;
    connState: ConnectorToFrom;
}
/**
 * Base class for all fields.
 * @template T The type of the value stored in the field
 */
declare class Field<T = any> {
    label: string;
    name: string;
    type: string;
    node?: NodeSvg;
    editable: boolean;
    svgGroup?: G;
    protected value: T | null;
    static register(name: string, cls: Function): void;
    static unregister(name: string): void;
    constructor();
    onDraw(rawBox?: FieldRawBoxData, connectionBubble?: FieldConnectionData): void;
    canEditConnector(): boolean;
    /**
     * Set whether or not you can edit this field.
     * @param val - The value to set to.
     */
    setEditable(val: boolean): void;
    /**
     * Ask whether or not we can edit this field.
     */
    canEdit(): boolean;
    /**
     * Set field name to something else.
     * @param name string
     * @returns the new name.
     */
    setName(name: string): string;
    /**
     * Initialize the field from JSON options.
     * @param json FieldOptions object
     */
    fromJson(json: FieldOptions): void;
    /** @returns The field's name/key */
    getName(): string;
    /** @returns The human-readable label */
    getLabel(): string;
    /**
     * Set the human-readable label
     * @param label New label
     * @returns The updated label
     */
    setLabel(label: string): string;
    /** @returns Whether this field is a raw value field (text/number) */
    hasRaw(): boolean;
    /** @returns Whether this field supports connections */
    hasConnectable(): boolean;
    /** @returns Whether we have a custom editor/input look */
    isCustomEditor(): boolean;
    /**
     * Make the input's custom look.
     * @param fieldVisualInfo - The visual info of the field, mutate this if needed.
     */
    drawMyself(fieldVisualInfo: FieldVisualInfo): void;
    /** Return width & height of your field's custom editor */
    measureMyself(): {
        width: null;
        height: null;
    };
    /** @returns The stored value */
    getValue(): T | null;
    /**
     * Set the stored value
     * @param val New value
     */
    setValue(val: T): void;
    /** @returns The value as it should be displayed (can differ from internal value) */
    getDisplayValue(): T | null;
    toJson(deep: boolean): FieldOptions;
}
/**
 * Used when you want just a label with no actual value. Any value related methods are no-op.
 */
export declare class DummyField {
    label: string;
    name: string;
    type: string;
    node?: NodeSvg;
    editable: boolean;
    svgGroup?: G;
    constructor();
    onDraw(rawBox?: FieldRawBoxData, connectionBubble?: FieldConnectionData): void;
    canEditConnector(): boolean;
    /**
     * Set whether or not you can edit this field.
     * @param val - The value to set to.
     */
    setEditable(val: boolean): void;
    /**
     * Ask whether or not we can edit this field.
     */
    canEdit(): boolean;
    /**
     * Set field name to something else.
     * @param name string
     * @returns the new name.
     */
    setName(name: string): string;
    /**
     * Initialize the field from JSON options.
     * @param json FieldOptions object
     */
    fromJson(json: FieldOptions): void;
    /** @returns Whether this field is a raw value field (text/number) */
    hasRaw(): boolean;
    /** @returns Whether this field supports connections */
    hasConnectable(): boolean;
    /** @returns The field's name/key */
    getName(): string;
    /** @returns The human-readable label */
    getLabel(): string;
    /**
     * Set the human-readable label
     * @param label New label
     * @returns The updated label
     */
    setLabel(label: string): string;
    /** @returns Whether we have a custom editor/input look */
    isCustomEditor(): boolean;
    /**
     * Make the input's custom look.
     * @param fieldVisualInfo - The visual info of the field, mutate this if needed.
     */
    drawMyself(fieldVisualInfo: FieldVisualInfo): void;
    /** Return width & height of your field's custom editor */
    measureMyself(): {
        width: number;
        height: number;
    };
    /**
     * Dummy fields have no value.
     * @returns {null}
     */
    getValue(): null;
    /**
     * No-op for dummy fields
     */
    setValue(_: any): void;
    /** @returns The value as it should be displayed (can differ from internal value) */
    getDisplayValue(): null;
    toJson(deep: boolean): FieldOptions;
}
/**
 * Base class for fields that can be connected to other fields.
 * @template T The type of the value stored in the field
 */
export declare class ConnectableField<T = any> extends Field<T> {
    connection: Connection;
    constructor();
    hasConnectable(): boolean;
    hasRaw(): boolean;
    /** Disconnect this field from any connected Connectable */
    disconnect(): void;
}
/** Field storing a numeric value */
export declare class NumberField extends Field<number> {
    constructor();
    setValue(val: number): void;
}
/** Field storing a string value */
export declare class TextField extends Field<string> {
    constructor();
    setValue(val: string): void;
}
/**
 * Optional connectable field.
 * Can store either a number or string depending on fld_type.
 */
export declare class OptConnectField extends ConnectableField<number | string | NodeSvg> {
    fldType: "number" | "string";
    constructor();
    canEditConnector(): boolean;
    canEdit(): boolean;
    getValue(): string | number | NodeSvg | null;
    hasRaw(): boolean;
    hasConnectable(): boolean;
    /**
     * Set field type.
     * @param type "number"|"string"
     */
    setFieldType(type: "number" | "string"): void;
    /**
     * Initialize from JSON, respecting fld_type
     * @param json FieldOptions
     */
    fromJson(json: FieldOptions): void;
    /**
     * Set the value, converting to number or string depending on fld_type
     * @param val The new value
     */
    setValue(val: number | string): void;
    /**
     * @returns Display value for UI purposes (never null)
     */
    getDisplayValue(): string;
    toJson(deep: boolean): FieldOptions;
}
export type DropdownItem = {
    text: string;
    value: string;
} | string;
export declare class DropdownField extends Field<string> {
    options: DropdownItem[] | null;
    _selected: DropdownItem | null;
    _isOpen: boolean;
    constructor();
    onDraw(rawBox?: FieldRawBoxData): void;
    private toggleDropdown;
    private openDropdown;
    private closeDropdown;
    canEdit(): boolean;
    getSelected(): DropdownItem | null;
    fromJson(options: FieldOptions): void;
    getDisplayValue(): string;
    setOptions(options: DropdownItem[]): void;
    toJson(deep: boolean): FieldOptions;
}
export type AnyField = Field | OptConnectField | NumberField | TextField | DummyField | ConnectableField;
export type AnyFieldCls = typeof Field | typeof OptConnectField | typeof ConnectableField | typeof NumberField | typeof TextField | typeof DummyField;
export declare const FieldMap: {
    field_both: typeof OptConnectField;
    field_string: typeof TextField;
    field_num: typeof NumberField;
    field_dummy: typeof DummyField;
    field_str: typeof TextField;
    connection: typeof ConnectableField;
    [key: string]: AnyFieldCls;
};
export default Field;
//# sourceMappingURL=field.d.ts.map