import { Color, Hex } from "../src/visual-types";

class RendererConstants {
    CORNER_RADIUS!: number;
    NODE_BASE_WIDTH!: number;
    NODE_BASE_HEIGHT!: number;
    TOPBAR_HEIGHT!: number;
    FOOTER_HEIGHT!: number;
    PADDING_BIG!: number;
    PADDING_MEDIUM!: number;
    PADDING_SMALL!: number;
    FIELD_SPACEY!: number;
    FIELD_SPACEX!: number;
    FIELD_RAW_BASE_WIDTH!: number;
    FIELD_RAW_BASE_HEIGHT!: number;
    INPUT_BOX_PADDING!: number;
    INPUT_BOX_TEXT_ANCHOR!: 'start' | 'middle';
    LABEL_SPACING!: number;

    FIELD_RAW_COLOR: Color = '#2b2d36ff';
    FIELD_RAW_TEXT_COLOR: Color = '#e0e2e8ff';
    FIELD_RAW_OUTLINE_COLOR: Color = '#1f2027ff';
    FIELD_RAW_OUTLINE_STROKE!: number;
    FIELD_CONN_COLOR: Color = '#0c7cccff'
    NODE_BG_COLOR: Color = '#2c2d3aff';
    NODE_OUTLINE_COLOR: Color = '#1d1e25ff';
    CONNECTOR_TRIANGLE!: boolean;
    CONNECTION_STROKE_WIDTH!: number;
    CONNECTION_STROKE_COLOR_CHOICE!: number;
    CONNECTOR_TRI_SIZE!: number;
    CONNECTOR_RADIUS!: number;
    FONT_FAMILY: string =
        '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
    FONT_SIZE!: number;
    FONT_COLOR: Color = '#e0e2e8ff';

    FIELD_MARGIN_X!: number;
    FIELD_MARGIN_Y!: number;
    TOPBAR_LABEL_MARGIN_X!: number;
    TOPBAR_LABEL_MARGIN_Y!: number;
    TOPBAR_LABEL_BOLDED!: boolean;
    CONNECTOR_LINE_WIDTH: number = 6;
    CONNECTOR_LINE_CURVED: boolean = true;
    ZOOM_BASE: number = 1; // default scale factor for workspace

    constructor(overrides: Partial<RendererConstants> = {}) {
        this.CONNECTOR_TRI_SIZE = 8;
        this.CONNECTOR_RADIUS = 10;
        this.CORNER_RADIUS = 6;
        this.NODE_BASE_WIDTH = 200;
        this.NODE_BASE_HEIGHT = 240;

        this.TOPBAR_HEIGHT = 50;
        this.FOOTER_HEIGHT = 25;
        this.PADDING_BIG = 16;
        this.PADDING_MEDIUM = 8;
        this.PADDING_SMALL = 4;
        this.FIELD_RAW_BASE_WIDTH = 80;
        this.FIELD_RAW_BASE_HEIGHT = 42;
        this.INPUT_BOX_PADDING = 6;
        this.LABEL_SPACING = 5;
        this.INPUT_BOX_TEXT_ANCHOR = 'middle';
        this.CONNECTOR_TRIANGLE = false;
        this.CONNECTION_STROKE_WIDTH = 2;
        this.CONNECTION_STROKE_COLOR_CHOICE = 1;
        this.FIELD_RAW_OUTLINE_STROKE = 2;
        this.FIELD_SPACEY = 20;
        this.FIELD_SPACEX = 20;
        this.FONT_SIZE = 20;
        this.TOPBAR_LABEL_BOLDED = true;
        this.FIELD_MARGIN_X = 16;
        this.FIELD_MARGIN_Y = 16;
        this.TOPBAR_LABEL_MARGIN_X = 12;
        this.TOPBAR_LABEL_MARGIN_Y = 0;

        Object.assign(this, overrides);
    }
}

export default RendererConstants;
