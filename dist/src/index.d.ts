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
import Field, { FieldOptions, FieldVisualInfo, AnyFieldCls, AnyField, DummyField, FieldMap, NumberField, OptConnectField, TextField, ConnectableField, FieldRawBoxData, FieldConnectionData } from "./field";
import inject, { InjectMsg, InjectOptions, TblxCategoryStruct, TblxObjStruct, TblxFieldStruct, TblxNodeStruct, GridOptions } from "./inject";
import { clearMainWorkspace, getMainWorkspace, setMainWorkspace } from "./main-workspace";
import NodeSvg, { NodeJson, NodeEvents, InputFieldJson, SerializedNode } from "./nodesvg";
import NodePrototypes from "./prototypes";
import WorkspaceSvg from "./workspace-svg";
import WorkspaceCoords from "./workspace-coords";
import { NodePrototype } from "./node-types";
import { Color, ColorStyle, Hex, RGBObject, RGBString, RGBTuple } from "./visual-types";
import { Eventer, EventSetupFn, EventArgs, RegisteredEl } from "../util/eventer";
import { WidgetOptions } from "./widget";
import { WidgetPrototypeList } from "./widget-prototypes";
import Showable, { KabelInterface, KabelCommentRendering, KabelNodeRendering, KabelUIX, KabelUtils } from "./types";
declare const Kabel: KabelInterface;
export default Kabel;
export { KabelInterface, TblxCategoryStruct, TblxNodeStruct, TblxFieldStruct, TblxObjStruct, RendererConstants, Renderer, CategoryColors, Connection, Coordinates, Field, DummyField, FieldMap, NumberField, OptConnectField, TextField, FieldOptions, FieldVisualInfo, AnyFieldCls, AnyField, ConnectableField, FieldRawBoxData, FieldConnectionData, inject, InjectMsg, InjectOptions, clearMainWorkspace, getMainWorkspace, setMainWorkspace, NodeSvg, NodePrototypes, WorkspaceSvg, WorkspaceCoords, NodePrototype, Color, ColorStyle, Hex, RGBObject, RGBString, RGBTuple, NodeJson, NodeEvents, InputFieldJson, SerializedNode, Eventer, EventSetupFn, EventArgs, Connectable, DrawState, ConnectorToFrom, WidgetOptions, WidgetPrototypeList, KabelCommentRendering, KabelNodeRendering, KabelUIX, KabelUtils, Showable, RegisteredEl, GridOptions };
export { default as CommentModel } from './comment';
export { default as Toolbox } from './toolbox';
export { default as ContextMenuHTML } from './context-menu';
export { default as Widget } from './widget';
export { DropdownContainer } from './dropdown-menu';
export { RepresenterNode } from '../renderers/representer-node';
export { default as CommentRenderer } from '../comment-renderer/renderer';
export { default as Representer } from '../renderers/representer';
export { default as WorkspaceController } from '../controllers/base';
export { default as WASDController } from '../controllers/wasd';
//# sourceMappingURL=index.d.ts.map