import { WidgetOptions } from "./widget";

/**
 * A list of prototypes for widgets.
 */
export interface WidgetPrototypeList {
    [key: string]: WidgetOptions
}

const WidgetPrototypes: WidgetPrototypeList = {};
export default WidgetPrototypes;