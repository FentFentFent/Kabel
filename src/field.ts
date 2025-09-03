import Connection from "./connection";
import { G, Rect, Svg, SVG } from '@svgdotjs/svg.js';
/**
 * Options used to initialize a Field.
 */
export interface FieldOptions {    /** Name of the field */
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
};

export interface FieldVisualInfo {
    measuredWidth: number; // The width approximated by renderer
    measuredHeight: number; // The height approximated by renderer
    background: Rect; // The node's background element.
    svg: Svg; // The workspace's SVG.js svg
    nodeGroup: G; // Group for the node
    fieldGroup: G; // A group containing the label & input.
}
/**
 * Base class for all fields.
 * @template T The type of the value stored in the field
 */
class Field<T = any> {
    label: string;
    name: string;
    type: string;
    protected value: T | null;
    static register(name: string, cls: Function) {};
    static unregister(name: string) {};
    constructor() {
        this.label = '';
        this.name = '';
        this.type = '';
        this.value = null;
    }
    /**
     * Set field name to something else.
     * @param name string
     * @returns the new name.
     */
    setName(name: string) {
        return this.name = name;
    }
    /**
     * Initialize the field from JSON options.
     * @param json FieldOptions object
     */
    fromJson(json: FieldOptions) {
        if (json.name!== undefined) this.name = json.name;
        if (json.label !== undefined) this.label = json.label;
        if (json.type !== undefined) this.type = json.type;
        if (json.value !== undefined) this.value = json.value;
    }

    /** @returns The field's name/key */
    getName(): string {
        return this.name;
    }

    /** @returns The human-readable label */
    getLabel(): string {
        return this.label;
    }

    /**
     * Set the human-readable label
     * @param label New label
     * @returns The updated label
     */
    setLabel(label: string): string {
        return this.label = label;
    }

    /** @returns Whether this field is a raw value field (text/number) */
    hasRaw(): boolean {
        return true;
    }

    /** @returns Whether this field supports connections */
    hasConnectable(): boolean {
        return false;
    }
    /** @returns Whether we have a custom editor/input look */
    isCustomEditor(): boolean {
        return false;
    }
    /**
     * Make the input's custom look.
     * @param fieldVisualInfo - The visual info of the field, mutate this if needed.
     */
    makeInputMain(fieldVisualInfo: FieldVisualInfo) {
        return;
    }
    /** Return width & height of your field's custom editor */
    measureMyself() {
        return { width: null, height: null }; // if either is null then the renderer measures for us (meaning we have a connection or other type of raw field.)
    }
    /** @returns The stored value */
    getValue(): T | null {
        return this.value;
    }

    /**
     * Set the stored value
     * @param val New value
     */
    setValue(val: T) {
        this.value = val;
    }

    /** @returns The value as it should be displayed (can differ from internal value) */
    getDisplayValue(): T | null {
        return this.getValue();
    }
}
/**
 * Used when you want just a label with no actual value. Any value related methods are no-op.
 */
export class DummyField {
    label: string;
    name: string;
    type: string;

    constructor() {
        this.label = '';
        this.name = '';
        this.type = '';
    }
    /**
     * Set field name to something else.
     * @param name string
     * @returns the new name.
     */
    setName(name: string) {
        return this.name = name;
    }
    /**
     * Initialize the field from JSON options.
     * @param json FieldOptions object
     */
    fromJson(json: FieldOptions) {
        if (json.name!== undefined) this.name = json.name;
        if (json.label !== undefined) this.label = json.label;
        if (json.type !== undefined) this.type = json.type;
    }
    /** @returns Whether this field is a raw value field (text/number) */
    hasRaw(): boolean {
        return false;
    }

    /** @returns Whether this field supports connections */
    hasConnectable(): boolean {
        return false;
    }
    /** @returns The field's name/key */
    getName(): string {
        return this.name;
    }

    /** @returns The human-readable label */
    getLabel(): string {
        return this.label;
    }
    /**
     * Set the human-readable label
     * @param label New label
     * @returns The updated label
     */
    setLabel(label: string): string {
        return this.label = label;
    }
    /** @returns Whether we have a custom editor/input look */
    isCustomEditor(): boolean {
        return false;
    }
    /**
     * Make the input.
     * @param fieldVisualInfo - The visual info of the field, mutate this if needed.
     */
    makeInputMain(fieldVisualInfo: FieldVisualInfo) {
        return;
    }
    /** Return width & height of your field's custom editor */
    measureMyself() {
        return { width: 0, height: 0 }; // if either is null then the renderer measures for us (meaning we have a connection or other type of raw field.)
    }
    /**
     * Dummy fields have no value.
     * @returns {null}
     */
    getValue() {
        return null;
    }
    /**
     * No-op for dummy fields
     */
    setValue(_: any) { }
    /** @returns The value as it should be displayed (can differ from internal value) */
    getDisplayValue() {
        return this.getValue();
    }

}
/**
 * Base class for fields that can be connected to other fields.
 * @template T The type of the value stored in the field
 */
export class ConnectableField<T = any> extends Field<T> {
    connection: Connection;

    constructor() {
        super();
        this.connection = new Connection(this, null);
    }

    hasConnectable(): boolean {
        return true;
    }

    hasRaw(): boolean {
        return false;
    }

    /** Disconnect this field from any connected field */
    disconnect() {
        this.connection.disconnectTo();
    }
}

/** Field storing a numeric value */
export class NumberField extends Field<number> {
    constructor() {
        super();
    }

    setValue(val: number) {
        this.value = Number(val);
    }
}

/** Field storing a string value */
export class TextField extends Field<string> {
    constructor() {
        super();
    }

    setValue(val: string) {
        this.value = String(val);
    }
}

/**
 * Optional connectable field.
 * Can store either a number or string depending on fld_type.
 */
export class OptConnectField extends ConnectableField<number | string> {
    fldType: "number" | "string";

    constructor() {
        super();
        this.fldType = "string";
    }
    /**
     * Set field type.
     * @param type "number"|"string"
     */
    setFieldType(type: "number" | "string") {
        this.fldType = type;
    }
    /**
     * Initialize from JSON, respecting fld_type
     * @param json FieldOptions
     */
    fromJson(json: FieldOptions) {
        super.fromJson(json);
        this.fldType = json.fld_type || "string";
        if (this.value != null) {
            this.setValue(this.value);
        }
    }

    /**
     * Set the value, converting to number or string depending on fld_type
     * @param val The new value
     */
    setValue(val: number | string) {
        if (this.fldType === "number") this.value = Number(val);
        else this.value = String(val);
    }

    /**
     * @returns Display value for UI purposes (never null)
     */
    getDisplayValue(): string {
        if (this.value == null) return this.fldType === "number" ? "0" : "";
        return String(this.value);
    }
}
export type AnyField = Field | OptConnectField | NumberField | TextField | DummyField;
export type AnyFieldCls = typeof Field | typeof OptConnectField | typeof NumberField | typeof TextField | typeof DummyField;
export const FieldMap: {
    field_both: typeof OptConnectField;
    field_string: typeof TextField;
    field_num: typeof NumberField;
    field_dummy: typeof DummyField;
    field_str: typeof TextField;
    connection: typeof ConnectableField;
    [key: string]: AnyFieldCls;
} = {
    'field_both': OptConnectField,
    'field_string': TextField,
    'field_num': NumberField,
    'field_dummy': DummyField,
    'field_str': TextField,
    'connection': ConnectableField
}


export default Field;
