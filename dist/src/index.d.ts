/**
 * Kabel Core Export Module
 * ------------------------
 * This file aggregates all core Kabel modules, types, utilities, and components,
 * and exports them under a single namespace. This allows consumers to import
 * everything from 'kabel' without deep paths.
 */
import RendererConstants from "../renderers/constants";
import Renderer, { DrawState, ConnectorToFrom } from "../renderers/renderer";
import CategoryColors from "./colors";
import Connection, { Connectable } from "./connection";
import Coordinates from "./coordinates";
import Field, { FieldOptions, FieldVisualInfo, AnyFieldCls, AnyField, DummyField, FieldMap, NumberField, OptConnectField, TextField } from "./field";
import inject, { InjectMsg, InjectOptions, TblxCategoryStruct, TblxObjStruct, TblxFieldStruct, TblxNodeStruct } from "./inject";
import { clearMainWorkspace, getMainWorkspace, setMainWorkspace } from "./main-workspace";
import NodeSvg, { NodeJson, NodeEvents, InputFieldJson } from "./nodesvg";
import NodePrototypes from "./prototypes";
import WorkspaceSvg from "./workspace-svg";
import { NodePrototype } from "./node-types";
import { Color, ColorStyle, Hex, RGBObject, RGBString, RGBTuple } from "./visual-types";
import { Eventer } from "../util/eventer";
import { WidgetOptions } from "./widget";
import { WidgetPrototypeList } from "./widget-prototypes";
import KabelInterface from "./types";
declare const Kabel: KabelInterface;
export default Kabel;
/**
 * Core exported types and utilities for Kabel.
 */
export type { 
/** Main Kabel interface */
KabelInterface, 
/** Toolbox category structure */
TblxCategoryStruct, 
/** Toolbox node structure */
TblxNodeStruct, 
/** Toolbox field structure */
TblxFieldStruct, 
/** Toolbox contents union type */
TblxObjStruct, 
/** Renderer constants */
RendererConstants, 
/** Renderer class */
Renderer, 
/** Category color definitions */
CategoryColors, 
/** Node connection */
Connection, 
/** 2D coordinates helper */
Coordinates, 
/** Base Field classes and helpers */
Field, DummyField, FieldMap, NumberField, OptConnectField, TextField, 
/** Workspace injection helpers */
inject, InjectMsg, clearMainWorkspace, getMainWorkspace, setMainWorkspace, 
/** Node system */
NodeSvg, NodePrototypes, WorkspaceSvg, AnyFieldCls, AnyField, InjectOptions, 
/** Node visual types */
Color, ColorStyle, Hex, RGBObject, RGBString, RGBTuple, NodePrototype, FieldOptions, FieldVisualInfo, 
/** Node JSON / serialization types */
NodeJson, NodeEvents, InputFieldJson, 
/** Eventing */
Eventer, Connectable, DrawState, ConnectorToFrom, 
/** Widget system */
WidgetOptions, WidgetPrototypeList };
//# sourceMappingURL=index.d.ts.map