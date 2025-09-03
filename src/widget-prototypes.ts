import { WidgetOptions } from "./widget";


export interface WidgetPrototypeList {
    [key: string]: WidgetOptions
}

const WidgetPrototypes: WidgetPrototypeList = {};
export default WidgetPrototypes;