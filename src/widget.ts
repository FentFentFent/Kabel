import WorkspaceSvg from "./workspace-svg";
import Coordinates from "./coordinates";
import { generateUID } from "../util/uid";

export interface WidgetOptions {
    cls?: typeof Widget;
    coords?: Coordinates;      // where to position the widget
    width?: number;            // optional width
    height?: number;           // optional height
    className?: string;        // optional CSS class
    html?: string;             // inner HTML
    name: string;
    init?: (this: WidgetOptions, widget: Widget, html: HTMLElement) => void;
}
class Widget {
    workspace: WorkspaceSvg;
    container: HTMLDivElement;
    coords: Coordinates;
    width: number;
    height: number;
    visible: boolean;
    name: string;
    id: string;
    options: WidgetOptions;
    static WIDGET_GLOBAL_ID = 0;
    constructor(workspace: WorkspaceSvg, options: WidgetOptions = { name: `Untitled(${Widget.WIDGET_GLOBAL_ID++})` }) {
        this.workspace = workspace;
        this.coords = options.coords ?? new Coordinates(0, 0);
        this.width = options.width ?? 200;
        this.height = options.height ?? 100;
        this.visible = false;
        this.name = options.name;
        this.id = generateUID('nanoid', { alphabet: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0129384756!)@(#*$&%^' });
        this.options = options;
        this.container = document.createElement("div");
        this.container.className = options.className ?? "KabelWidget";
        this.container.style.position = "absolute";
        this.container.style.left = `${this.coords.x}px`;
        this.container.style.top = `${this.coords.y}px`;
        this.container.style.width = `${this.width}px`;
        this.container.style.height = `${this.height}px`;
        this.container.style.background = "rgba(255,255,255,0.9)";
        this.container.style.border = "1px solid #aaa";
        this.container.style.borderRadius = "4px";
        this.container.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
        this.container.style.pointerEvents = "auto";
        this.container.style.zIndex = "1000"; // overlays nodes

        if (options.html) this.container.innerHTML = options.html;

        this.workspace._wsTop.appendChild(this.container);
        this.hide();
        if (typeof options.init !== 'undefined' && options.init) {
            options.init(this, this.container);
        }
    }

    // Show the widget
    show() {
        this.container.style.display = "block";
        this.visible = true;
    }

    // Hide the widget
    hide() {
        this.container.style.display = "none";
        this.visible = false;
    }

    // Move the widget to new coords
    setCoords(coords: Coordinates) {
        this.coords = coords;
        this.container.style.left = `${coords.x}px`;
        this.container.style.top = `${coords.y}px`;
    }

    // Update the HTML content
    setHTML(html: string) {
        this.container.innerHTML = html;
    }
    // Bring widget back from the dead after a .destroy call
    reanimate() {
        this.container = document.createElement("div");
        this.container.className = this.options.className ?? "KabelWidget";
        this.container.style.position = "absolute";
        this.container.style.left = `${this.coords.x}px`;
        this.container.style.top = `${this.coords.y}px`;
        this.container.style.width = `${this.width}px`;
        this.container.style.height = `${this.height}px`;
        this.container.style.background = "rgba(255,255,255,0.9)";
        this.container.style.border = "1px solid #aaa";
        this.container.style.borderRadius = "4px";
        this.container.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
        this.container.style.pointerEvents = "auto";
        this.container.style.zIndex = "1000"; // overlays nodes
        
        if (this.options.html) this.container.innerHTML = this.options.html;

        this.workspace._wsTop.appendChild(this.container);
        this.workspace._addWidgetToDB(this);
    }
    // Destroy widget & cleanup.
    destroy() {
        this.container.remove();
        this.workspace._delWidgetFromDB(this);
    }
}

export default Widget;
