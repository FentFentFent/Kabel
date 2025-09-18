import RendererConstants from "../renderers/constants";
import Renderer, {DrawState, ConnectorToFrom} from "../renderers/renderer";
import CategoryColors from "./colors";
import Connection, {Connectable} from "./connection";
import Coordinates from "./coordinates";
import Field, { FieldOptions, FieldVisualInfo, AnyFieldCls, AnyField, DummyField, FieldMap, NumberField, OptConnectField, TextField } from "./field";
import inject, { InjectMsg, InjectOptions, TblxCategoryStruct, TblxObjStruct, TblxFieldStruct, TblxNodeStruct } from "./inject";
import { clearMainWorkspace, getMainWorkspace, setMainWorkspace } from "./main-workspace";
import NodeSvg, {NodeJson, NodeEvents, InputFieldJson} from "./nodesvg";
import NodePrototypes from "./prototypes";
import WorkspaceSvg from "./workspace-svg";
import { NodePrototype } from "./node-types";
import { Color, ColorStyle, Hex, RGBObject, RGBString, RGBTuple } from "./visual-types";
import { parseColor } from "../util/parse-color";
import eventer, {Eventer} from "../util/eventer";
import * as Path from '../util/path';
import * as SVG from '@svgdotjs/svg.js';
import * as UID from '../util/uid';
import hasProp from "../util/has-prop";
import EventEmitter from "../util/emitter";

import K from './core';
import { WidgetOptions } from "./widget";
import { WidgetPrototypeList } from "./widget-prototypes";
import KabelInterface from "./types";

//@ts-ignore
const Kabel: KabelInterface = K;

export default Kabel;

export type {
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
    inject,
    InjectMsg,
    clearMainWorkspace,
    getMainWorkspace,
    setMainWorkspace,
    NodeSvg,
    NodePrototypes,
    WorkspaceSvg,
    AnyFieldCls,
    AnyField,
    InjectOptions,
    Color, ColorStyle, Hex, RGBObject, RGBString, RGBTuple,
    NodePrototype,
    FieldOptions,
    FieldVisualInfo,
    NodeJson, NodeEvents, InputFieldJson,
    Eventer,
    Connectable,
    DrawState,
    ConnectorToFrom,
    WidgetOptions,
    WidgetPrototypeList
}