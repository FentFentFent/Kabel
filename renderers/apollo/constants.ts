import { Color } from "../../src/visual-types";
import RendererConstants from "../constants";

// Define the new Dogear shape
type DogearShape = {
    PathMain: string;
    Width: number;
    Height: number;
};

// Extend the original SHAPES type
type ApolloShapes = RendererConstants['SHAPES'] & {
    Dogear?: DogearShape;
};

class ApolloConstants extends RendererConstants {
    SHAPES: ApolloShapes = {};
    CONNECTOR_COLOR: Color = '#9912e8ff'
    FIELD_RAW_COLOR: Color = '#343745ff';
    FIELD_RAW_TEXT_COLOR: Color = '#cfd4e4ff';
    FIELD_RAW_OUTLINE_COLOR: Color = '#202128ff';
    constructor(overrides: Partial<ApolloConstants>) {
        super(overrides);
        this.CONNECTOR_LINE_WIDTH = 2.5;
        this.CORNER_RADIUS = 10;
        this.FOOTER_HEIGHT = 25;
        this.CONNECTOR_LINE_WIDTH = 7;
        this.init();
    }

    init() {
        this.SHAPES.Dogear = {
            PathMain: `M -1 1 Q -1 21 0 30 L 26 0 Q 2 -1 0 0 Z`,
            Width: 26,
            Height: 30
        };
    }
}

export default ApolloConstants;
