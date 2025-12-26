import { Svg, Pattern, Rect } from "@svgdotjs/svg.js";
import WorkspaceSvg from "./workspace-svg";
import { addWindowListener } from "../util/window-listeners";

/**
 * Options for configuring the workspace grid.
 * @typedef {Object} GridOptions
 * @property {"dotted"|"celled"} [type="dotted"] - The type of grid to render.
 * @property {number} [spacing=40] - The spacing between grid dots or cells.
 * @property {number} [dotSize=2] - The radius of the dots (only for dotted type).
 * @property {number} [strokeWidth=2] - Stroke width of the cells (only for celled type).
 * @property {string} [color="#bebebeff"] - Color of the grid.
 */
export interface GridOptions {
    type?: "dotted" | "celled";
    spacing?: number;
    dotSize?: number;
    strokeWidth?: number;
    color?: string;
}

/**
 * Handles drawing and managing a workspace background grid.
 */
export default class Grid {
    private ws: WorkspaceSvg;
    private svg: Svg;
    private pattern?: Pattern;
    private rect?: Rect;

    /** Cached + normalized grid values */
    private grid: Required<GridOptions>;

    /**
     * Creates a new Grid instance and attaches it to the given workspace SVG.
     * @param {WorkspaceSvg} ws - The workspace this grid belongs to.
     * @param {Svg} svg - The SVG element to draw the grid into.
     * @param {GridOptions} opts - Initial options for the grid.
     */
    constructor(ws: WorkspaceSvg, svg: Svg, opts: GridOptions) {
        this.ws = ws;
        this.svg = svg;

        this.grid = {
            type: opts.type ?? "dotted",
            spacing: opts.spacing ?? 40,
            dotSize: opts.dotSize ?? 2,
            strokeWidth: opts.strokeWidth ?? 2,
            color: opts.color ?? "#bebebeff",
        };

        this.init();
    }

    /**
     * Initializes the grid pattern, background rect, and attaches resize listener.
     * @private
     */
    private init() {
        if (this.rect) {
            this.rect.remove();
        }
        const { type, spacing, dotSize, strokeWidth, color } = this.grid;

        let defs = this.svg.findOne("defs");
        if (!defs) defs = this.svg.defs();

        this.pattern = this.svg.pattern(spacing, spacing, (add) => {
            if (type === "dotted") {
                add
                    .circle(dotSize * 2)
                    .fill(color)
                    .move(spacing / 2 - dotSize, spacing / 2 - dotSize);
            } else {
                add.rect(spacing, spacing).stroke({ color, width: strokeWidth }).fill("none");
            }
        });
        this.pattern.attr({ patternUnits: "userSpaceOnUse" });
        defs.add(this.pattern);

        const { width, height } = this.ws.getSize();
        this.rect = this.svg
            .rect(width, height)
            .fill(this.pattern)
            .back()
            .addClass("WorkspaceBgPattern");

        addWindowListener("resize", () => this.resize());
    }

    /**
     * Resizes the grid background rect to fit the workspace size.
     */
    resize() {
        if (!this.rect) return;
        const { width, height } = this.ws.getSize();
        this.rect.size(width, height).back();
        this.ws._backgroundRect.back();
    }

    /**
     * Updates the grid pattern transform according to zoom and camera position.
     * Scales the dots/cells to match zoom and repositions them based on camera.
     */
    updateTransform() {
        if (!this.pattern || !this.rect) return;
        const { type, spacing, dotSize, strokeWidth, color } = this.grid;

        const zoom = this.ws.getZoom();
        const scaledSpacing = spacing * zoom;

        this.pattern.attr({ width: scaledSpacing, height: scaledSpacing });
        this.pattern.clear();

        if (type === "dotted") {
            const scaledDot = Math.max(dotSize * zoom, 0.5);
            this.pattern
                .circle(scaledDot * 2)
                .fill(color)
                .move(scaledSpacing / 2 - scaledDot, scaledSpacing / 2 - scaledDot);
        } else {
            this.pattern
                .rect(scaledSpacing, scaledSpacing)
                .stroke({ color, width: strokeWidth * zoom })
                .fill("none");
        }

        const cam = this.ws._camera;
        this.pattern.attr({
            patternTransform: `translate(${-cam.x * zoom % scaledSpacing}, ${-cam.y * zoom % scaledSpacing})`,
        });

        this.resize();
        this.ws._backgroundRect.back();
    }

    /**
     * Updates internal grid options from the workspace configuration.
     */
    updateOptions() {
        const opts = this.ws.options!.grid;
        this.grid = {
            type: opts!.type ?? "dotted",
            spacing: opts!.spacing ?? 40,
            dotSize: opts!.dotSize ?? 2,
            strokeWidth: opts!.strokeWidth ?? 2,
            color: opts!.color ?? "#bebebeff",
        };
        this.init();
    }

    /**
     * Dynamically sets new grid options and rebuilds the grid pattern.
     * @param {Partial<GridOptions>} newOpts - New options to apply.
     */
    setOptions(newOpts: Partial<GridOptions>) {
        Object.assign(this.grid, newOpts);
        this.rect?.remove?.();
        this.pattern?.remove?.();
        this.init(); // rebuild
    }
}
