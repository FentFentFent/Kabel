import RendererConstants from "../renderers/constants";
import Renderer from "../renderers/renderer";
import CategoryColors from "./colors";
import Connection, {Connectable} from "./connection";
import Coordinates from "./coordinates";
import Field, { FieldOptions, FieldVisualInfo, AnyFieldCls, AnyField, DummyField, FieldMap, NumberField, OptConnectField, TextField } from "./field";
import inject, { InjectMsg, InjectOptions } from "./inject";
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
import userState from '../util/user-state';
import '../events/events'
import WorkspaceController from "../controllers/base";
import WASDController from "../controllers/wasd";
import { RMap } from "./renderer-map";
Field.register = function (name: string, cls: Function) {
    FieldMap[name] = cls as AnyFieldCls;
}
Field.unregister = function (name: string) {
    delete FieldMap[name];
}

const Kabel = {
    UIX: {
        events: eventer as Eventer,
        /**
         * State Manager, Makes thing possible: E.G (the 'typing' state when you type in a input box..)
         * Used in controllers so you dont move when typing characters like a w s or d etc.
         */
        userState
    },
    Utils: {
        Path,
        SVG,
        parseColor,
        UID,
        EventEmitter,
        hasProp
    },
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
    Nodes: NodePrototypes,
    WorkspaceSvg,
    WorkspaceController,
    WASDController,
    nodeRendering: {
        rendererMap: RMap,
        Renderer,
        RendererConstants
    }
};
// Export a getter/setter incase someone needs more internal access to main workspace and doesnt like the method interface.
Object.defineProperty(Kabel, '_mainWorkspace', {
    get(): WorkspaceSvg|null {
        return getMainWorkspace();
    },
    set(v: WorkspaceSvg|undefined|null|false|0|string) {
        if (v === undefined || v === null || v === false || v === 0 || typeof v === 'string') {
            return clearMainWorkspace();
        }
        return setMainWorkspace(v);
    }
})

export default Kabel;