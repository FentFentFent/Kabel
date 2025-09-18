import Connection from "./connection";
import { G, Path, Rect, Svg, SVG, Text } from '@svgdotjs/svg.js';
import NodeSvg from "./nodesvg";
import { ConnectorToFrom } from "../renderers/renderer";
import dropdownContainer, { DropdownOptions } from "./dropdown-menu";
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
    measuredWidth: number; // The width approximated by the field itself.
    measuredHeight: number; // The height approximated by the field itself.
    background: Rect; // The node's background element.
    svg: Svg; // The workspace's SVG.js svg
    nodeGroup: G; // Group for the node
    fieldGroup: G; // A group containing the label & input.
    xUsed: number; // The amount of x space used up by the label.
}
export interface FieldRawBoxData {
    box: Rect;
    txt: Text;
}
export interface FieldConnectionData {
    connector: Path;
    connState: ConnectorToFrom
}
/**
 * Base class for all fields.
 * @template T The type of the value stored in the field
 */
class Field<T = any> {
    label: string;
    name: string;
    type: string;
    node?: NodeSvg;
    editable: boolean;
    svgGroup?: G;
    protected value: T | null;
    static register(name: string, cls: Function) { };
    static unregister(name: string) { };
    constructor() {
        this.label = '';
        this.name = '';
        this.type = '';
        this.value = null;
        this.editable = true;
    }
    onDraw(rawBox?: FieldRawBoxData, connectionBubble?: FieldConnectionData) {

    }
    canEditConnector() {
        return false;
    }
    /**
     * Set whether or not you can edit this field.
     * @param val - The value to set to.
     */
    setEditable(val: boolean) {
        this.editable = val;
        if (this.node) {
            this.node?.workspace?.renderer?.rerenderNode?.(this.node)
        }
    }
    /**
     * Ask whether or not we can edit this field.
     */
    canEdit() {
        return this.editable;
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
        if (json.name !== undefined) this.name = json.name;
        if (json.label !== undefined) this.label = json.label;
        if (json.type !== undefined) this.type = json.type;
        if (json.value !== undefined) this.value = json.value;
        if (json.editable) this.setEditable(Boolean(json.editable));
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
    drawMyself(fieldVisualInfo: FieldVisualInfo) {
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
    toJson(deep: boolean): FieldOptions {
        return {
            name: this.name,
            label: this.label,
            type: this.type,
            value: this.getValue()
        };
    }
}
/**
 * Used when you want just a label with no actual value. Any value related methods are no-op.
 */
export class DummyField {
    label: string;
    name: string;
    type: string;
    node?: NodeSvg;
    editable: boolean;
    svgGroup?: G;

    constructor() {
        this.label = '';
        this.name = '';
        this.type = '';
        this.editable = false;
    }
    onDraw(rawBox?: FieldRawBoxData, connectionBubble?: FieldConnectionData) {

    }
    canEditConnector() {
        return false;
    }
    /**
     * Set whether or not you can edit this field.
     * @param val - The value to set to.
     */
    setEditable(val: boolean) {
        this.editable = val;
        if (this.node) {
            this.node?.workspace?.renderer?.rerenderNode?.(this.node)
        }
    }
    /**
     * Ask whether or not we can edit this field.
     */
    canEdit() {
        return this.editable;
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
        if (json.name !== undefined) this.name = json.name;
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
     * Make the input's custom look.
     * @param fieldVisualInfo - The visual info of the field, mutate this if needed.
     */
    drawMyself(fieldVisualInfo: FieldVisualInfo) {
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
    toJson(deep: boolean): FieldOptions {
        return {
            name: this.name,
            label: this.label,
            type: this.type,
            value: this.getValue()
        };
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
        this.value = null as T;
    }
    hasConnectable(): boolean {
        return true;
    }

    hasRaw(): boolean {
        return false;
    }

    /** Disconnect this field from any connected Connectable */
    disconnect() {
        const to = this.connection.to;
        if (to instanceof NodeSvg && to?.previousConnection?.from) {
            to.previousConnection.from = null;
            this.connection.to = null;
        }
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
export class OptConnectField extends ConnectableField<number | string | NodeSvg> {
    fldType: "number" | "string";

    constructor() {
        super();
        this.fldType = "string";
    }
    canEditConnector(): boolean {
        return true;
    }
    canEdit() {
        if (this.getValue() instanceof NodeSvg) {
            return false;
        }
        return this.editable;
    }
    getValue(): string | number | NodeSvg | null {
        if (this.connection && this.connection.getTo()) {
            return this.connection.getTo() as NodeSvg;
        } else {
            return this.value;
        }
    }
    hasRaw() {
        return true;
    }
    hasConnectable() {
        return true;
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
        if (this.value != null && typeof this.value == this.fldType) {
            this.setValue(this.value as string | number);
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
        if (this.getValue() instanceof NodeSvg) return '[NODE]'; // If theres a connection
        return String(this.value);
    }
    toJson(deep: boolean): FieldOptions {
        let val: any = this.getValue();
        // If it's connected to a node, store it's serialized form.
        if (val instanceof NodeSvg) val = { node: deep ? val.serialize() : val.id };

        return {
            ...super.toJson(true),
            fld_type: this.fldType,
            value: val
        };
    }
}
export type DropdownItem = { text: string, value: string } | string
export class DropdownField extends Field<string> {
    options: DropdownItem[] | null;
    _selected: DropdownItem | null;
    _isOpen: boolean;

    constructor() {
        super();
        this.options = null;
        this._selected = null;
        this._isOpen = false;
    }

    onDraw(rawBox?: FieldRawBoxData) {
        if (!rawBox || !this.options) return;

        const { box, txt } = rawBox;
        const toggle = () => this.toggleDropdown(rawBox);
        box.click(toggle);
        txt.click(toggle);
    }

    private toggleDropdown(rawBox: FieldRawBoxData) {
        if (dropdownContainer.getOwner() === this) {
            this.closeDropdown();
        } else {
            this.openDropdown(rawBox);
        }
        rawBox.txt.text(this.getDisplayValue());
    }

    private openDropdown(rawBox: FieldRawBoxData) {
        if (!this.options) return;

        const items = this.options.map(option => ({
            label: typeof option === 'string' ? option : option.text,
            value: typeof option === 'string' ? option : option.value
        }));

        dropdownContainer.show(this, {
            items,
            width: rawBox.box.bbox().width * 2,
            onSelect: (value: string) => {
                if (!this.options) return;
                const original = this.options.find(
                    e => e === value || (typeof e !== 'string' && e.value === value)
                );
                if (original) {
                    this._selected = original;
                    this.setValue(value);
                    this.closeDropdown();
                    this?.node?.workspace?.renderer?.rerenderNode?.(this.node);
                }
            }
        } as DropdownOptions);
    }

    private closeDropdown() {
        dropdownContainer.hideIfOwner(this);
    }

    canEdit() {
        return false;
    }

    getSelected() {
        return this._selected;
    }

    fromJson(options: FieldOptions) {
        super.fromJson(options);
        this.options = options.options as DropdownItem[];
        this._selected = this.options?.[0] ?? null;
        if (this._selected) this.setValue(
            typeof this._selected === 'string' ? this._selected : this._selected.value
        );
    }

    // Up/down arrows
    getDisplayValue(): string {
        const text = typeof this._selected === 'string' ? this._selected : this._selected?.text || '';
        const arrow = dropdownContainer.getOwner() == this ? '▲' : '▼'; // toggles open/closed
        return text + '  ' + arrow;
    }


    setOptions(options: DropdownItem[]) {
        this.options = options;
        this._selected = this.options?.[0] ?? null;
        if (this._selected) this.setValue(
            typeof this._selected === 'string' ? this._selected : this._selected.value
        );
    }

    toJson(deep: boolean): FieldOptions {
        return { ...super.toJson(deep), options: this.options };
    }
}


export type AnyField = Field | OptConnectField | NumberField | TextField | DummyField | ConnectableField;
export type AnyFieldCls = typeof Field | typeof OptConnectField | typeof ConnectableField | typeof NumberField | typeof TextField | typeof DummyField;
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
    'connection': ConnectableField,
    'dropdown': DropdownField
}


export default Field;
