/**
 * Kabel Core Export Module
 * ------------------------
 * Aggregates all core Kabel modules, types, utilities, and components,
 * and exports them under a single namespace.
 */

import RendererConstants from "../renderers/constants";
import Renderer, { DrawState, ConnectorToFrom } from "../renderers/renderer";
import CategoryColors from "./colors";
import Connection, { Connectable } from "./connection";
import Coordinates from "./coordinates";
import Field, { 
    FieldOptions, FieldVisualInfo, AnyFieldCls, AnyField, DummyField, 
    FieldMap, NumberField, OptConnectField, TextField, ConnectableField, 
    FieldRawBoxData, FieldConnectionData 
} from "./field";
import inject, { 
    InjectMsg, InjectOptions, TblxCategoryStruct, TblxObjStruct, 
    TblxFieldStruct, TblxNodeStruct 
} from "./inject";
import { clearMainWorkspace, getMainWorkspace, setMainWorkspace } from "./main-workspace";
import NodeSvg, { NodeJson, NodeEvents, InputFieldJson, SerializedNode } from "./nodesvg";
import NodePrototypes from "./prototypes";
import WorkspaceSvg from "./workspace-svg";
import WorkspaceCoords from "./workspace-coords";
import { NodePrototype } from "./node-types";
import { Color, ColorStyle, Hex, RGBObject, RGBString, RGBTuple } from "./visual-types";
import { parseColor } from "../util/parse-color";
import eventer, { Eventer,  EventSetupFn, EventArgs, RegisteredEl } from "../util/eventer";
import hasProp from "../util/has-prop";
import EventEmitter from "../util/emitter";
import * as Path from "../util/path";
import * as SVG from "@svgdotjs/svg.js";
import * as UID from "../util/uid";

import K from "./core";
import Widget, { WidgetOptions } from "./widget";
import { WidgetPrototypeList } from "./widget-prototypes";
import Showable, { KabelInterface, KabelCommentRendering, KabelNodeRendering, KabelUIX, KabelUtils } from "./types";

//@ts-ignore
const Kabel: KabelInterface = K;
export default Kabel;

// Core types and utilities
export {
    KabelInterface,
    TblxCategoryStruct,
    TblxNodeStruct,
    TblxFieldStruct,
    TblxObjStruct,
    RendererConstants,
    Renderer,
    CategoryColors,
    Connection,
    Coordinates,
    Field,
    DummyField,
    FieldMap,
    NumberField,
    OptConnectField,
    TextField,
    FieldOptions,
    FieldVisualInfo,
    AnyFieldCls,
    AnyField,
    ConnectableField,
    FieldRawBoxData,
    FieldConnectionData,
    inject,
    InjectMsg,
    InjectOptions,
    clearMainWorkspace,
    getMainWorkspace,
    setMainWorkspace,
    NodeSvg,
    NodePrototypes,
    WorkspaceSvg,
    WorkspaceCoords,
    NodePrototype,
    Color, ColorStyle, Hex, RGBObject, RGBString, RGBTuple,
    NodeJson, NodeEvents, InputFieldJson,
    SerializedNode,
    Eventer,
    EventSetupFn,
    EventArgs,
    Connectable,
    DrawState,
    ConnectorToFrom,
    WidgetOptions,
    WidgetPrototypeList,
    KabelCommentRendering,
    KabelNodeRendering,
    KabelUIX,
    KabelUtils,
    Showable,
    RegisteredEl
};

// Core classes used by public API
export { default as CommentModel } from './comment';

export { default as Toolbox } from './toolbox';
export { default as ContextMenuHTML } from './context-menu';
export { default as Widget } from './widget';
export {  DropdownContainer } from './dropdown-menu';
export { RepresenterNode } from '../renderers/representer-node';
export { default as CommentRenderer } from '../comment-renderer/renderer';
export { default as Representer } from '../renderers/representer';

// Controllers
export { default as WorkspaceController } from '../controllers/base';
export { default as WASDController } from '../controllers/wasd';
