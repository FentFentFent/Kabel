(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Kabel"] = factory();
	else
		root["Kabel"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./controllers/base.ts":
/*!*****************************!*\
  !*** ./controllers/base.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const user_state_1 = __importDefault(__webpack_require__(/*! ../util/user-state */ "./util/user-state.ts"));
class WorkspaceController {
    workspace;
    keysDown;
    mouseBtns;
    mousePos;
    lastMousePos;
    isDragging;
    wheelDelta;
    _updateInt;
    constructor(workspace) {
        this.workspace = workspace;
        this.keysDown = new Set();
        this.mouseBtns = new Set();
        this.mousePos = { x: 0, y: 0 };
        this.lastMousePos = { x: 0, y: 0 };
        this.isDragging = false;
        this.wheelDelta = 0;
        this._setupListeners();
        this._updateInt = setInterval(() => this.update(), 16);
    }
    canMove() {
        return !user_state_1.default.hasState('typing');
    }
    _setupListeners() {
        window.addEventListener('keydown', e => this.keysDown.add(e.key));
        window.addEventListener('keyup', e => this.keysDown.delete(e.key));
        window.addEventListener('mousedown', e => this.mouseBtns.add(e.button));
        window.addEventListener('mouseup', e => this.mouseBtns.delete(e.button));
        window.addEventListener('mousemove', e => {
            this.lastMousePos = { ...this.mousePos };
            this.mousePos = { x: e.clientX, y: e.clientY };
        });
        window.addEventListener('wheel', e => {
            this.wheelDelta = e.deltaY;
        });
        window.addEventListener('mousedown', e => {
            if (e.button === 0)
                this.isDragging = true;
        });
        window.addEventListener('mouseup', e => {
            if (e.button === 0)
                this.isDragging = false;
        });
    }
    update() {
        // Can handle keyboard shortcuts or auto-pan here
    }
    // --- Camera methods ---
    pan(dx, dy) {
        this.workspace._camera.x += dx;
        this.workspace._camera.y += dy;
        this.refreshPos();
    }
    setCamera(pos) {
        this.workspace._camera.x = pos.x;
        this.workspace._camera.y = pos.y;
        this.refreshPos();
    }
    centerOn(pos) {
        const wsSize = this.workspace.getSize?.() ?? { width: 0, height: 0 };
        this.setCamera({
            x: pos.x - wsSize.width / 2,
            y: pos.y - wsSize.height / 2
        });
    }
    // --- Coordinate conversion ---
    screenToWorkspace(x, y) {
        const cam = this.workspace._camera;
        return {
            x: x + cam.x,
            y: y + cam.y
        };
    }
    workspaceToScreen(x, y) {
        const cam = this.workspace._camera;
        return {
            x: (x - cam.x),
            y: (y - cam.y)
        };
    }
    // --- Refresh ---
    refreshPos() {
        this.workspace.refresh?.();
    }
    redraw() {
        this.workspace.redraw?.();
    }
    // --- Cleanup ---
    stop() {
        clearInterval(this._updateInt);
    }
}
exports["default"] = WorkspaceController;


/***/ }),

/***/ "./controllers/wasd.ts":
/*!*****************************!*\
  !*** ./controllers/wasd.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const base_1 = __importDefault(__webpack_require__(/*! ./base */ "./controllers/base.ts"));
class WASDController extends base_1.default {
    moveSpeed;
    doAccelerate;
    accelSpeed;
    friction;
    velocity;
    constructor(workspace, moveSpeed) {
        super(workspace);
        this.moveSpeed = workspace.options.moveSpeed || moveSpeed || 5;
        this.doAccelerate = workspace.options?.controls?.wasdSmooth ?? false;
        this.accelSpeed = workspace.options?.controls?.wasdAccelerate ?? 0.2;
        this.friction = workspace.options?.controls?.wasdFriction ?? 0.85;
        this.velocity = { x: 0, y: 0 };
    }
    update() {
        super.update();
        if (!this.canMove())
            return;
        let inputX = 0;
        let inputY = 0;
        if (this.keysDown.has('w') || this.keysDown.has('ArrowUp'))
            inputY -= 1;
        if (this.keysDown.has('s') || this.keysDown.has('ArrowDown'))
            inputY += 1;
        if (this.keysDown.has('a') || this.keysDown.has('ArrowLeft'))
            inputX -= 1;
        if (this.keysDown.has('d') || this.keysDown.has('ArrowRight'))
            inputX += 1;
        if (this.doAccelerate) {
            // Accelerate velocity towards input direction
            this.velocity.x += inputX * this.accelSpeed;
            this.velocity.y += inputY * this.accelSpeed;
            // Apply friction
            this.velocity.x *= this.friction;
            this.velocity.y *= this.friction;
            // Only pan if velocity is noticeable
            if (Math.abs(this.velocity.x) > 0.01 || Math.abs(this.velocity.y) > 0.01) {
                this.pan(this.velocity.x, this.velocity.y);
            }
        }
        else {
            // Instant movement
            const dx = inputX * this.moveSpeed;
            const dy = inputY * this.moveSpeed;
            if (dx !== 0 || dy !== 0)
                this.pan(dx, dy);
        }
    }
}
exports["default"] = WASDController;


/***/ }),

/***/ "./events/draggable.ts":
/*!*****************************!*\
  !*** ./events/draggable.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const nodesvg_1 = __importDefault(__webpack_require__(/*! ../src/nodesvg */ "./src/nodesvg.ts"));
const eventer_1 = __importDefault(__webpack_require__(/*! ../util/eventer */ "./util/eventer.ts"));
const user_state_1 = __importDefault(__webpack_require__(/*! ../util/user-state */ "./util/user-state.ts"));
const draggableStore = {};
function initDraggable(element, args) {
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;
    // fallback to element itself if no drag handle is given
    const dragTarget = args.dragel ?? element;
    // Restore position if previously stored (type 3)
    if (args.type === 3 && args.id && draggableStore[args.id]) {
        const pos = draggableStore[args.id];
        if (pos)
            element.move(pos.x, pos.y);
    }
    function onMouseDown(e) {
        if (args.type === 2 && args.node) {
            const ws = args.node.workspace;
            if (!ws)
                return;
            const start = ws.screenToWorkspace(e.clientX, e.clientY);
            const nodePos = args.node.relativeCoords;
            offsetX = start.x - nodePos.x;
            offsetY = start.y - nodePos.y;
        }
        else {
            const bbox = element.bbox();
            offsetX = e.clientX - bbox.x;
            offsetY = e.clientY - bbox.y;
        }
        isDragging = false;
        // Mark user as dragging
        user_state_1.default.setState('dragging');
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        if (args.type === 1 && args.ondrag)
            args.ondrag(e);
    }
    function onMouseMove(e) {
        if (!isDragging) {
            const dx = e.movementX || 0;
            const dy = e.movementY || 0;
            if (Math.abs(dx) > 2 || Math.abs(dy) > 2)
                isDragging = true;
        }
        if (!isDragging)
            return;
        if (args.type === 2 && args.node && args.node instanceof nodesvg_1.default) {
            const ws = args.node.workspace;
            if (!ws)
                return;
            // Compute new workspace coordinates
            const mouseWS = ws.screenToWorkspace(e.clientX, e.clientY);
            const newX = mouseWS.x - offsetX;
            const newY = mouseWS.y - offsetY;
            args.node.relativeCoords.set(newX, newY);
            ws.refresh();
            // Move node visually
            const screenPos = ws.workspaceToScreen(newX, newY);
            element.attr({ transform: `translate(${screenPos.x}, ${screenPos.y})` });
            args.node.emit('NODE_DRAG', null);
        }
        else if (args.type === 1 && args.onmove) {
            const newX = e.clientX - offsetX;
            const newY = e.clientY - offsetY;
            element.move(newX, newY);
            args.onmove({ x: newX, y: newY });
        }
        else if (args.type === 3 && args.id) {
            const newX = e.clientX - offsetX;
            const newY = e.clientY - offsetY;
            element.move(newX, newY);
            draggableStore[args.id] = { x: newX, y: newY };
        }
    }
    function onMouseUp(e) {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        // Remove dragging state
        user_state_1.default.removeState('dragging');
        if (args.type === 1 && args.enddrag)
            args.enddrag(e);
        isDragging = false;
    }
    dragTarget.node.addEventListener('mousedown', onMouseDown);
    // cleanup
    return () => {
        dragTarget.node.removeEventListener('mousedown', onMouseDown);
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };
}
eventer_1.default.registerEvent('k_draggable', initDraggable);


/***/ }),

/***/ "./events/events.ts":
/*!**************************!*\
  !*** ./events/events.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! ./draggable */ "./events/draggable.ts");
__webpack_require__(/*! ./input-box */ "./events/input-box.ts");
__webpack_require__(/*! ./node-x-btn */ "./events/node-x-btn.ts");


/***/ }),

/***/ "./events/input-box.ts":
/*!*****************************!*\
  !*** ./events/input-box.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const eventer_1 = __importDefault(__webpack_require__(/*! ../util/eventer */ "./util/eventer.ts"));
const user_state_1 = __importDefault(__webpack_require__(/*! ../util/user-state */ "./util/user-state.ts"));
function initInputBox(element, args) {
    let editing = false;
    let skipNextClick = false;
    let buffer = args.field.getDisplayValue?.() ?? "";
    let cursorPos = buffer.length; // index in buffer
    const txt = args.text;
    const rect = element;
    const renderer = args.renderer;
    txt.style('user-select', 'none');
    //@ts-ignore
    rect.style('user-select', 'none');
    const { height } = renderer.measureRawField("");
    const offsetY = (height - txt.bbox().height) / 2;
    function updateText() {
        // insert caret as a vertical bar into string
        const display = buffer.slice(0, cursorPos) + (editing ? '|' : '') + buffer.slice(cursorPos);
        txt.text(display);
        const { width } = renderer.measureRawField(buffer);
        rect.size(width, height);
        rect.move(args.startX, 0);
        txt.move(args.startX + renderer.constants.INPUT_BOX_PADDING, offsetY);
    }
    function onKeyDown(e) {
        if (!editing)
            return;
        if (e.key === "Enter") {
            stopEditing();
            return;
        }
        if (e.key === "Backspace") {
            if (cursorPos > 0) {
                buffer = buffer.slice(0, cursorPos - 1) + buffer.slice(cursorPos);
                cursorPos--;
            }
        }
        else if (e.key === "Delete") {
            buffer = buffer.slice(0, cursorPos) + buffer.slice(cursorPos + 1);
        }
        else if (e.key === "ArrowLeft") {
            if (cursorPos > 0)
                cursorPos--;
        }
        else if (e.key === "ArrowRight") {
            if (cursorPos < buffer.length)
                cursorPos++;
        }
        else if (e.key.length === 1) {
            let ch = e.key;
            if (e.shiftKey)
                ch = ch.toUpperCase();
            buffer = buffer.slice(0, cursorPos) + ch + buffer.slice(cursorPos);
            cursorPos++;
        }
        else
            return;
        e.preventDefault();
        updateText();
        args.field.setValue(buffer);
    }
    function onClickOutside(ev) {
        if (!editing)
            return;
        if (skipNextClick) {
            skipNextClick = false;
            return;
        }
        const target = ev.target;
        if (target !== rect.node && target !== txt.node)
            stopEditing();
    }
    function startEditing(ev) {
        editing = true;
        buffer = args.field.getValue?.() ?? "";
        cursorPos = buffer.length; // default to end
        // mark that the user is typing
        user_state_1.default.setState('typing');
        if (ev) {
            const rectBox = rect.node.getBoundingClientRect();
            const clickX = ev.clientX - rectBox.left - renderer.constants.INPUT_BOX_PADDING;
            let cumulativeWidth = 0;
            cursorPos = 0;
            for (let i = 0; i < buffer.length; i++) {
                const charWidth = renderer.measureTextWidth(buffer[i]);
                if (cumulativeWidth + charWidth / 2 >= clickX)
                    break; // place after closest char
                cumulativeWidth += charWidth;
                cursorPos = i + 1;
            }
        }
        updateText();
        skipNextClick = true;
        document.addEventListener("keydown", onKeyDown);
        document.addEventListener("mousedown", onClickOutside);
    }
    function stopEditing() {
        editing = false;
        // remove typing state
        user_state_1.default.removeState('typing');
        document.removeEventListener("keydown", onKeyDown);
        document.removeEventListener("mousedown", onClickOutside);
        args.field.setValue(buffer); // store without caret
        updateText();
        renderer.getWs().redraw();
    }
    rect.on("mousedown", (ev) => startEditing(ev));
    txt.on("mousedown", (ev) => startEditing(ev));
    updateText();
    return () => {
        rect.off("mousedown", startEditing);
        txt.off("mousedown", startEditing);
        document.removeEventListener("keydown", onKeyDown);
        document.removeEventListener("mousedown", onClickOutside);
    };
}
eventer_1.default.registerEvent("k_inputbox", initInputBox);


/***/ }),

/***/ "./events/node-x-btn.ts":
/*!******************************!*\
  !*** ./events/node-x-btn.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const eventer_1 = __importDefault(__webpack_require__(/*! ../util/eventer */ "./util/eventer.ts"));
function initXButton(element, args) {
    const xBtnGroup = element;
    const ws = args.workspace;
    // click handler
    const onClick = () => {
        ws.removeNode(args.node);
    };
    // attach
    xBtnGroup.on('click', onClick);
    // return cleanup function
    return () => {
        xBtnGroup.off('click', onClick);
    };
}
// register as Kabel event
eventer_1.default.registerEvent('k_closenode', initXButton);


/***/ }),

/***/ "./node_modules/@svgdotjs/svg.js/dist/svg.node.cjs":
/*!*********************************************************!*\
  !*** ./node_modules/@svgdotjs/svg.js/dist/svg.node.cjs ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports) => {

/*!
* @svgdotjs/svg.js - A lightweight library for manipulating and animating SVG.
* @version 3.2.4
* https://svgjs.dev/
*
* @copyright Wout Fierens <wout@mick-wout.com>
* @license MIT
*
* BUILT: Thu Jun 27 2024 12:00:16 GMT+0200 (Central European Summer Time)
*/;
'use strict';

const methods$1 = {};
const names = [];
function registerMethods(name, m) {
  if (Array.isArray(name)) {
    for (const _name of name) {
      registerMethods(_name, m);
    }
    return;
  }
  if (typeof name === 'object') {
    for (const _name in name) {
      registerMethods(_name, name[_name]);
    }
    return;
  }
  addMethodNames(Object.getOwnPropertyNames(m));
  methods$1[name] = Object.assign(methods$1[name] || {}, m);
}
function getMethodsFor(name) {
  return methods$1[name] || {};
}
function getMethodNames() {
  return [...new Set(names)];
}
function addMethodNames(_names) {
  names.push(..._names);
}

// Map function
function map(array, block) {
  let i;
  const il = array.length;
  const result = [];
  for (i = 0; i < il; i++) {
    result.push(block(array[i]));
  }
  return result;
}

// Filter function
function filter(array, block) {
  let i;
  const il = array.length;
  const result = [];
  for (i = 0; i < il; i++) {
    if (block(array[i])) {
      result.push(array[i]);
    }
  }
  return result;
}

// Degrees to radians
function radians(d) {
  return d % 360 * Math.PI / 180;
}

// Radians to degrees
function degrees(r) {
  return r * 180 / Math.PI % 360;
}

// Convert camel cased string to dash separated
function unCamelCase(s) {
  return s.replace(/([A-Z])/g, function (m, g) {
    return '-' + g.toLowerCase();
  });
}

// Capitalize first letter of a string
function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// Calculate proportional width and height values when necessary
function proportionalSize(element, width, height, box) {
  if (width == null || height == null) {
    box = box || element.bbox();
    if (width == null) {
      width = box.width / box.height * height;
    } else if (height == null) {
      height = box.height / box.width * width;
    }
  }
  return {
    width: width,
    height: height
  };
}

/**
 * This function adds support for string origins.
 * It searches for an origin in o.origin o.ox and o.originX.
 * This way, origin: {x: 'center', y: 50} can be passed as well as ox: 'center', oy: 50
 **/
function getOrigin(o, element) {
  const origin = o.origin;
  // First check if origin is in ox or originX
  let ox = o.ox != null ? o.ox : o.originX != null ? o.originX : 'center';
  let oy = o.oy != null ? o.oy : o.originY != null ? o.originY : 'center';

  // Then check if origin was used and overwrite in that case
  if (origin != null) {
    [ox, oy] = Array.isArray(origin) ? origin : typeof origin === 'object' ? [origin.x, origin.y] : [origin, origin];
  }

  // Make sure to only call bbox when actually needed
  const condX = typeof ox === 'string';
  const condY = typeof oy === 'string';
  if (condX || condY) {
    const {
      height,
      width,
      x,
      y
    } = element.bbox();

    // And only overwrite if string was passed for this specific axis
    if (condX) {
      ox = ox.includes('left') ? x : ox.includes('right') ? x + width : x + width / 2;
    }
    if (condY) {
      oy = oy.includes('top') ? y : oy.includes('bottom') ? y + height : y + height / 2;
    }
  }

  // Return the origin as it is if it wasn't a string
  return [ox, oy];
}
const descriptiveElements = new Set(['desc', 'metadata', 'title']);
const isDescriptive = element => descriptiveElements.has(element.nodeName);
const writeDataToDom = (element, data, defaults = {}) => {
  const cloned = {
    ...data
  };
  for (const key in cloned) {
    if (cloned[key].valueOf() === defaults[key]) {
      delete cloned[key];
    }
  }
  if (Object.keys(cloned).length) {
    element.node.setAttribute('data-svgjs', JSON.stringify(cloned)); // see #428
  } else {
    element.node.removeAttribute('data-svgjs');
    element.node.removeAttribute('svgjs:data');
  }
};

var utils = {
  __proto__: null,
  capitalize: capitalize,
  degrees: degrees,
  filter: filter,
  getOrigin: getOrigin,
  isDescriptive: isDescriptive,
  map: map,
  proportionalSize: proportionalSize,
  radians: radians,
  unCamelCase: unCamelCase,
  writeDataToDom: writeDataToDom
};

// Default namespaces
const svg = 'http://www.w3.org/2000/svg';
const html = 'http://www.w3.org/1999/xhtml';
const xmlns = 'http://www.w3.org/2000/xmlns/';
const xlink = 'http://www.w3.org/1999/xlink';

var namespaces = {
  __proto__: null,
  html: html,
  svg: svg,
  xlink: xlink,
  xmlns: xmlns
};

const globals = {
  window: typeof window === 'undefined' ? null : window,
  document: typeof document === 'undefined' ? null : document
};
function registerWindow(win = null, doc = null) {
  globals.window = win;
  globals.document = doc;
}
const save = {};
function saveWindow() {
  save.window = globals.window;
  save.document = globals.document;
}
function restoreWindow() {
  globals.window = save.window;
  globals.document = save.document;
}
function withWindow(win, fn) {
  saveWindow();
  registerWindow(win, win.document);
  fn(win, win.document);
  restoreWindow();
}
function getWindow() {
  return globals.window;
}

class Base {
  // constructor (node/*, {extensions = []} */) {
  //   // this.tags = []
  //   //
  //   // for (let extension of extensions) {
  //   //   extension.setup.call(this, node)
  //   //   this.tags.push(extension.name)
  //   // }
  // }
}

const elements = {};
const root = '___SYMBOL___ROOT___';

// Method for element creation
function create(name, ns = svg) {
  // create element
  return globals.document.createElementNS(ns, name);
}
function makeInstance(element, isHTML = false) {
  if (element instanceof Base) return element;
  if (typeof element === 'object') {
    return adopter(element);
  }
  if (element == null) {
    return new elements[root]();
  }
  if (typeof element === 'string' && element.charAt(0) !== '<') {
    return adopter(globals.document.querySelector(element));
  }

  // Make sure, that HTML elements are created with the correct namespace
  const wrapper = isHTML ? globals.document.createElement('div') : create('svg');
  wrapper.innerHTML = element;

  // We can use firstChild here because we know,
  // that the first char is < and thus an element
  element = adopter(wrapper.firstChild);

  // make sure, that element doesn't have its wrapper attached
  wrapper.removeChild(wrapper.firstChild);
  return element;
}
function nodeOrNew(name, node) {
  return node && (node instanceof globals.window.Node || node.ownerDocument && node instanceof node.ownerDocument.defaultView.Node) ? node : create(name);
}

// Adopt existing svg elements
function adopt(node) {
  // check for presence of node
  if (!node) return null;

  // make sure a node isn't already adopted
  if (node.instance instanceof Base) return node.instance;
  if (node.nodeName === '#document-fragment') {
    return new elements.Fragment(node);
  }

  // initialize variables
  let className = capitalize(node.nodeName || 'Dom');

  // Make sure that gradients are adopted correctly
  if (className === 'LinearGradient' || className === 'RadialGradient') {
    className = 'Gradient';

    // Fallback to Dom if element is not known
  } else if (!elements[className]) {
    className = 'Dom';
  }
  return new elements[className](node);
}
let adopter = adopt;
function mockAdopt(mock = adopt) {
  adopter = mock;
}
function register(element, name = element.name, asRoot = false) {
  elements[name] = element;
  if (asRoot) elements[root] = element;
  addMethodNames(Object.getOwnPropertyNames(element.prototype));
  return element;
}
function getClass(name) {
  return elements[name];
}

// Element id sequence
let did = 1000;

// Get next named element id
function eid(name) {
  return 'Svgjs' + capitalize(name) + did++;
}

// Deep new id assignment
function assignNewId(node) {
  // do the same for SVG child nodes as well
  for (let i = node.children.length - 1; i >= 0; i--) {
    assignNewId(node.children[i]);
  }
  if (node.id) {
    node.id = eid(node.nodeName);
    return node;
  }
  return node;
}

// Method for extending objects
function extend(modules, methods) {
  let key, i;
  modules = Array.isArray(modules) ? modules : [modules];
  for (i = modules.length - 1; i >= 0; i--) {
    for (key in methods) {
      modules[i].prototype[key] = methods[key];
    }
  }
}
function wrapWithAttrCheck(fn) {
  return function (...args) {
    const o = args[args.length - 1];
    if (o && o.constructor === Object && !(o instanceof Array)) {
      return fn.apply(this, args.slice(0, -1)).attr(o);
    } else {
      return fn.apply(this, args);
    }
  };
}

// Get all siblings, including myself
function siblings() {
  return this.parent().children();
}

// Get the current position siblings
function position() {
  return this.parent().index(this);
}

// Get the next element (will return null if there is none)
function next() {
  return this.siblings()[this.position() + 1];
}

// Get the next element (will return null if there is none)
function prev() {
  return this.siblings()[this.position() - 1];
}

// Send given element one step forward
function forward() {
  const i = this.position();
  const p = this.parent();

  // move node one step forward
  p.add(this.remove(), i + 1);
  return this;
}

// Send given element one step backward
function backward() {
  const i = this.position();
  const p = this.parent();
  p.add(this.remove(), i ? i - 1 : 0);
  return this;
}

// Send given element all the way to the front
function front() {
  const p = this.parent();

  // Move node forward
  p.add(this.remove());
  return this;
}

// Send given element all the way to the back
function back() {
  const p = this.parent();

  // Move node back
  p.add(this.remove(), 0);
  return this;
}

// Inserts a given element before the targeted element
function before(element) {
  element = makeInstance(element);
  element.remove();
  const i = this.position();
  this.parent().add(element, i);
  return this;
}

// Inserts a given element after the targeted element
function after(element) {
  element = makeInstance(element);
  element.remove();
  const i = this.position();
  this.parent().add(element, i + 1);
  return this;
}
function insertBefore(element) {
  element = makeInstance(element);
  element.before(this);
  return this;
}
function insertAfter(element) {
  element = makeInstance(element);
  element.after(this);
  return this;
}
registerMethods('Dom', {
  siblings,
  position,
  next,
  prev,
  forward,
  backward,
  front,
  back,
  before,
  after,
  insertBefore,
  insertAfter
});

// Parse unit value
const numberAndUnit = /^([+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?)([a-z%]*)$/i;

// Parse hex value
const hex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;

// Parse rgb value
const rgb = /rgb\((\d+),(\d+),(\d+)\)/;

// Parse reference id
const reference = /(#[a-z_][a-z0-9\-_]*)/i;

// splits a transformation chain
const transforms = /\)\s*,?\s*/;

// Whitespace
const whitespace = /\s/g;

// Test hex value
const isHex = /^#[a-f0-9]{3}$|^#[a-f0-9]{6}$/i;

// Test rgb value
const isRgb = /^rgb\(/;

// Test for blank string
const isBlank = /^(\s+)?$/;

// Test for numeric string
const isNumber = /^[+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;

// Test for image url
const isImage = /\.(jpg|jpeg|png|gif|svg)(\?[^=]+.*)?/i;

// split at whitespace and comma
const delimiter = /[\s,]+/;

// Test for path letter
const isPathLetter = /[MLHVCSQTAZ]/i;

var regex = {
  __proto__: null,
  delimiter: delimiter,
  hex: hex,
  isBlank: isBlank,
  isHex: isHex,
  isImage: isImage,
  isNumber: isNumber,
  isPathLetter: isPathLetter,
  isRgb: isRgb,
  numberAndUnit: numberAndUnit,
  reference: reference,
  rgb: rgb,
  transforms: transforms,
  whitespace: whitespace
};

// Return array of classes on the node
function classes() {
  const attr = this.attr('class');
  return attr == null ? [] : attr.trim().split(delimiter);
}

// Return true if class exists on the node, false otherwise
function hasClass(name) {
  return this.classes().indexOf(name) !== -1;
}

// Add class to the node
function addClass(name) {
  if (!this.hasClass(name)) {
    const array = this.classes();
    array.push(name);
    this.attr('class', array.join(' '));
  }
  return this;
}

// Remove class from the node
function removeClass(name) {
  if (this.hasClass(name)) {
    this.attr('class', this.classes().filter(function (c) {
      return c !== name;
    }).join(' '));
  }
  return this;
}

// Toggle the presence of a class on the node
function toggleClass(name) {
  return this.hasClass(name) ? this.removeClass(name) : this.addClass(name);
}
registerMethods('Dom', {
  classes,
  hasClass,
  addClass,
  removeClass,
  toggleClass
});

// Dynamic style generator
function css(style, val) {
  const ret = {};
  if (arguments.length === 0) {
    // get full style as object
    this.node.style.cssText.split(/\s*;\s*/).filter(function (el) {
      return !!el.length;
    }).forEach(function (el) {
      const t = el.split(/\s*:\s*/);
      ret[t[0]] = t[1];
    });
    return ret;
  }
  if (arguments.length < 2) {
    // get style properties as array
    if (Array.isArray(style)) {
      for (const name of style) {
        const cased = name;
        ret[name] = this.node.style.getPropertyValue(cased);
      }
      return ret;
    }

    // get style for property
    if (typeof style === 'string') {
      return this.node.style.getPropertyValue(style);
    }

    // set styles in object
    if (typeof style === 'object') {
      for (const name in style) {
        // set empty string if null/undefined/'' was given
        this.node.style.setProperty(name, style[name] == null || isBlank.test(style[name]) ? '' : style[name]);
      }
    }
  }

  // set style for property
  if (arguments.length === 2) {
    this.node.style.setProperty(style, val == null || isBlank.test(val) ? '' : val);
  }
  return this;
}

// Show element
function show() {
  return this.css('display', '');
}

// Hide element
function hide() {
  return this.css('display', 'none');
}

// Is element visible?
function visible() {
  return this.css('display') !== 'none';
}
registerMethods('Dom', {
  css,
  show,
  hide,
  visible
});

// Store data values on svg nodes
function data(a, v, r) {
  if (a == null) {
    // get an object of attributes
    return this.data(map(filter(this.node.attributes, el => el.nodeName.indexOf('data-') === 0), el => el.nodeName.slice(5)));
  } else if (a instanceof Array) {
    const data = {};
    for (const key of a) {
      data[key] = this.data(key);
    }
    return data;
  } else if (typeof a === 'object') {
    for (v in a) {
      this.data(v, a[v]);
    }
  } else if (arguments.length < 2) {
    try {
      return JSON.parse(this.attr('data-' + a));
    } catch (e) {
      return this.attr('data-' + a);
    }
  } else {
    this.attr('data-' + a, v === null ? null : r === true || typeof v === 'string' || typeof v === 'number' ? v : JSON.stringify(v));
  }
  return this;
}
registerMethods('Dom', {
  data
});

// Remember arbitrary data
function remember(k, v) {
  // remember every item in an object individually
  if (typeof arguments[0] === 'object') {
    for (const key in k) {
      this.remember(key, k[key]);
    }
  } else if (arguments.length === 1) {
    // retrieve memory
    return this.memory()[k];
  } else {
    // store memory
    this.memory()[k] = v;
  }
  return this;
}

// Erase a given memory
function forget() {
  if (arguments.length === 0) {
    this._memory = {};
  } else {
    for (let i = arguments.length - 1; i >= 0; i--) {
      delete this.memory()[arguments[i]];
    }
  }
  return this;
}

// This triggers creation of a new hidden class which is not performant
// However, this function is not rarely used so it will not happen frequently
// Return local memory object
function memory() {
  return this._memory = this._memory || {};
}
registerMethods('Dom', {
  remember,
  forget,
  memory
});

function sixDigitHex(hex) {
  return hex.length === 4 ? ['#', hex.substring(1, 2), hex.substring(1, 2), hex.substring(2, 3), hex.substring(2, 3), hex.substring(3, 4), hex.substring(3, 4)].join('') : hex;
}
function componentHex(component) {
  const integer = Math.round(component);
  const bounded = Math.max(0, Math.min(255, integer));
  const hex = bounded.toString(16);
  return hex.length === 1 ? '0' + hex : hex;
}
function is(object, space) {
  for (let i = space.length; i--;) {
    if (object[space[i]] == null) {
      return false;
    }
  }
  return true;
}
function getParameters(a, b) {
  const params = is(a, 'rgb') ? {
    _a: a.r,
    _b: a.g,
    _c: a.b,
    _d: 0,
    space: 'rgb'
  } : is(a, 'xyz') ? {
    _a: a.x,
    _b: a.y,
    _c: a.z,
    _d: 0,
    space: 'xyz'
  } : is(a, 'hsl') ? {
    _a: a.h,
    _b: a.s,
    _c: a.l,
    _d: 0,
    space: 'hsl'
  } : is(a, 'lab') ? {
    _a: a.l,
    _b: a.a,
    _c: a.b,
    _d: 0,
    space: 'lab'
  } : is(a, 'lch') ? {
    _a: a.l,
    _b: a.c,
    _c: a.h,
    _d: 0,
    space: 'lch'
  } : is(a, 'cmyk') ? {
    _a: a.c,
    _b: a.m,
    _c: a.y,
    _d: a.k,
    space: 'cmyk'
  } : {
    _a: 0,
    _b: 0,
    _c: 0,
    space: 'rgb'
  };
  params.space = b || params.space;
  return params;
}
function cieSpace(space) {
  if (space === 'lab' || space === 'xyz' || space === 'lch') {
    return true;
  } else {
    return false;
  }
}
function hueToRgb(p, q, t) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}
class Color {
  constructor(...inputs) {
    this.init(...inputs);
  }

  // Test if given value is a color
  static isColor(color) {
    return color && (color instanceof Color || this.isRgb(color) || this.test(color));
  }

  // Test if given value is an rgb object
  static isRgb(color) {
    return color && typeof color.r === 'number' && typeof color.g === 'number' && typeof color.b === 'number';
  }

  /*
  Generating random colors
  */
  static random(mode = 'vibrant', t) {
    // Get the math modules
    const {
      random,
      round,
      sin,
      PI: pi
    } = Math;

    // Run the correct generator
    if (mode === 'vibrant') {
      const l = (81 - 57) * random() + 57;
      const c = (83 - 45) * random() + 45;
      const h = 360 * random();
      const color = new Color(l, c, h, 'lch');
      return color;
    } else if (mode === 'sine') {
      t = t == null ? random() : t;
      const r = round(80 * sin(2 * pi * t / 0.5 + 0.01) + 150);
      const g = round(50 * sin(2 * pi * t / 0.5 + 4.6) + 200);
      const b = round(100 * sin(2 * pi * t / 0.5 + 2.3) + 150);
      const color = new Color(r, g, b);
      return color;
    } else if (mode === 'pastel') {
      const l = (94 - 86) * random() + 86;
      const c = (26 - 9) * random() + 9;
      const h = 360 * random();
      const color = new Color(l, c, h, 'lch');
      return color;
    } else if (mode === 'dark') {
      const l = 10 + 10 * random();
      const c = (125 - 75) * random() + 86;
      const h = 360 * random();
      const color = new Color(l, c, h, 'lch');
      return color;
    } else if (mode === 'rgb') {
      const r = 255 * random();
      const g = 255 * random();
      const b = 255 * random();
      const color = new Color(r, g, b);
      return color;
    } else if (mode === 'lab') {
      const l = 100 * random();
      const a = 256 * random() - 128;
      const b = 256 * random() - 128;
      const color = new Color(l, a, b, 'lab');
      return color;
    } else if (mode === 'grey') {
      const grey = 255 * random();
      const color = new Color(grey, grey, grey);
      return color;
    } else {
      throw new Error('Unsupported random color mode');
    }
  }

  // Test if given value is a color string
  static test(color) {
    return typeof color === 'string' && (isHex.test(color) || isRgb.test(color));
  }
  cmyk() {
    // Get the rgb values for the current color
    const {
      _a,
      _b,
      _c
    } = this.rgb();
    const [r, g, b] = [_a, _b, _c].map(v => v / 255);

    // Get the cmyk values in an unbounded format
    const k = Math.min(1 - r, 1 - g, 1 - b);
    if (k === 1) {
      // Catch the black case
      return new Color(0, 0, 0, 1, 'cmyk');
    }
    const c = (1 - r - k) / (1 - k);
    const m = (1 - g - k) / (1 - k);
    const y = (1 - b - k) / (1 - k);

    // Construct the new color
    const color = new Color(c, m, y, k, 'cmyk');
    return color;
  }
  hsl() {
    // Get the rgb values
    const {
      _a,
      _b,
      _c
    } = this.rgb();
    const [r, g, b] = [_a, _b, _c].map(v => v / 255);

    // Find the maximum and minimum values to get the lightness
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const l = (max + min) / 2;

    // If the r, g, v values are identical then we are grey
    const isGrey = max === min;

    // Calculate the hue and saturation
    const delta = max - min;
    const s = isGrey ? 0 : l > 0.5 ? delta / (2 - max - min) : delta / (max + min);
    const h = isGrey ? 0 : max === r ? ((g - b) / delta + (g < b ? 6 : 0)) / 6 : max === g ? ((b - r) / delta + 2) / 6 : max === b ? ((r - g) / delta + 4) / 6 : 0;

    // Construct and return the new color
    const color = new Color(360 * h, 100 * s, 100 * l, 'hsl');
    return color;
  }
  init(a = 0, b = 0, c = 0, d = 0, space = 'rgb') {
    // This catches the case when a falsy value is passed like ''
    a = !a ? 0 : a;

    // Reset all values in case the init function is rerun with new color space
    if (this.space) {
      for (const component in this.space) {
        delete this[this.space[component]];
      }
    }
    if (typeof a === 'number') {
      // Allow for the case that we don't need d...
      space = typeof d === 'string' ? d : space;
      d = typeof d === 'string' ? 0 : d;

      // Assign the values straight to the color
      Object.assign(this, {
        _a: a,
        _b: b,
        _c: c,
        _d: d,
        space
      });
      // If the user gave us an array, make the color from it
    } else if (a instanceof Array) {
      this.space = b || (typeof a[3] === 'string' ? a[3] : a[4]) || 'rgb';
      Object.assign(this, {
        _a: a[0],
        _b: a[1],
        _c: a[2],
        _d: a[3] || 0
      });
    } else if (a instanceof Object) {
      // Set the object up and assign its values directly
      const values = getParameters(a, b);
      Object.assign(this, values);
    } else if (typeof a === 'string') {
      if (isRgb.test(a)) {
        const noWhitespace = a.replace(whitespace, '');
        const [_a, _b, _c] = rgb.exec(noWhitespace).slice(1, 4).map(v => parseInt(v));
        Object.assign(this, {
          _a,
          _b,
          _c,
          _d: 0,
          space: 'rgb'
        });
      } else if (isHex.test(a)) {
        const hexParse = v => parseInt(v, 16);
        const [, _a, _b, _c] = hex.exec(sixDigitHex(a)).map(hexParse);
        Object.assign(this, {
          _a,
          _b,
          _c,
          _d: 0,
          space: 'rgb'
        });
      } else throw Error("Unsupported string format, can't construct Color");
    }

    // Now add the components as a convenience
    const {
      _a,
      _b,
      _c,
      _d
    } = this;
    const components = this.space === 'rgb' ? {
      r: _a,
      g: _b,
      b: _c
    } : this.space === 'xyz' ? {
      x: _a,
      y: _b,
      z: _c
    } : this.space === 'hsl' ? {
      h: _a,
      s: _b,
      l: _c
    } : this.space === 'lab' ? {
      l: _a,
      a: _b,
      b: _c
    } : this.space === 'lch' ? {
      l: _a,
      c: _b,
      h: _c
    } : this.space === 'cmyk' ? {
      c: _a,
      m: _b,
      y: _c,
      k: _d
    } : {};
    Object.assign(this, components);
  }
  lab() {
    // Get the xyz color
    const {
      x,
      y,
      z
    } = this.xyz();

    // Get the lab components
    const l = 116 * y - 16;
    const a = 500 * (x - y);
    const b = 200 * (y - z);

    // Construct and return a new color
    const color = new Color(l, a, b, 'lab');
    return color;
  }
  lch() {
    // Get the lab color directly
    const {
      l,
      a,
      b
    } = this.lab();

    // Get the chromaticity and the hue using polar coordinates
    const c = Math.sqrt(a ** 2 + b ** 2);
    let h = 180 * Math.atan2(b, a) / Math.PI;
    if (h < 0) {
      h *= -1;
      h = 360 - h;
    }

    // Make a new color and return it
    const color = new Color(l, c, h, 'lch');
    return color;
  }
  /*
  Conversion Methods
  */

  rgb() {
    if (this.space === 'rgb') {
      return this;
    } else if (cieSpace(this.space)) {
      // Convert to the xyz color space
      let {
        x,
        y,
        z
      } = this;
      if (this.space === 'lab' || this.space === 'lch') {
        // Get the values in the lab space
        let {
          l,
          a,
          b
        } = this;
        if (this.space === 'lch') {
          const {
            c,
            h
          } = this;
          const dToR = Math.PI / 180;
          a = c * Math.cos(dToR * h);
          b = c * Math.sin(dToR * h);
        }

        // Undo the nonlinear function
        const yL = (l + 16) / 116;
        const xL = a / 500 + yL;
        const zL = yL - b / 200;

        // Get the xyz values
        const ct = 16 / 116;
        const mx = 0.008856;
        const nm = 7.787;
        x = 0.95047 * (xL ** 3 > mx ? xL ** 3 : (xL - ct) / nm);
        y = 1.0 * (yL ** 3 > mx ? yL ** 3 : (yL - ct) / nm);
        z = 1.08883 * (zL ** 3 > mx ? zL ** 3 : (zL - ct) / nm);
      }

      // Convert xyz to unbounded rgb values
      const rU = x * 3.2406 + y * -1.5372 + z * -0.4986;
      const gU = x * -0.9689 + y * 1.8758 + z * 0.0415;
      const bU = x * 0.0557 + y * -0.204 + z * 1.057;

      // Convert the values to true rgb values
      const pow = Math.pow;
      const bd = 0.0031308;
      const r = rU > bd ? 1.055 * pow(rU, 1 / 2.4) - 0.055 : 12.92 * rU;
      const g = gU > bd ? 1.055 * pow(gU, 1 / 2.4) - 0.055 : 12.92 * gU;
      const b = bU > bd ? 1.055 * pow(bU, 1 / 2.4) - 0.055 : 12.92 * bU;

      // Make and return the color
      const color = new Color(255 * r, 255 * g, 255 * b);
      return color;
    } else if (this.space === 'hsl') {
      // https://bgrins.github.io/TinyColor/docs/tinycolor.html
      // Get the current hsl values
      let {
        h,
        s,
        l
      } = this;
      h /= 360;
      s /= 100;
      l /= 100;

      // If we are grey, then just make the color directly
      if (s === 0) {
        l *= 255;
        const color = new Color(l, l, l);
        return color;
      }

      // TODO I have no idea what this does :D If you figure it out, tell me!
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;

      // Get the rgb values
      const r = 255 * hueToRgb(p, q, h + 1 / 3);
      const g = 255 * hueToRgb(p, q, h);
      const b = 255 * hueToRgb(p, q, h - 1 / 3);

      // Make a new color
      const color = new Color(r, g, b);
      return color;
    } else if (this.space === 'cmyk') {
      // https://gist.github.com/felipesabino/5066336
      // Get the normalised cmyk values
      const {
        c,
        m,
        y,
        k
      } = this;

      // Get the rgb values
      const r = 255 * (1 - Math.min(1, c * (1 - k) + k));
      const g = 255 * (1 - Math.min(1, m * (1 - k) + k));
      const b = 255 * (1 - Math.min(1, y * (1 - k) + k));

      // Form the color and return it
      const color = new Color(r, g, b);
      return color;
    } else {
      return this;
    }
  }
  toArray() {
    const {
      _a,
      _b,
      _c,
      _d,
      space
    } = this;
    return [_a, _b, _c, _d, space];
  }
  toHex() {
    const [r, g, b] = this._clamped().map(componentHex);
    return `#${r}${g}${b}`;
  }
  toRgb() {
    const [rV, gV, bV] = this._clamped();
    const string = `rgb(${rV},${gV},${bV})`;
    return string;
  }
  toString() {
    return this.toHex();
  }
  xyz() {
    // Normalise the red, green and blue values
    const {
      _a: r255,
      _b: g255,
      _c: b255
    } = this.rgb();
    const [r, g, b] = [r255, g255, b255].map(v => v / 255);

    // Convert to the lab rgb space
    const rL = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
    const gL = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
    const bL = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

    // Convert to the xyz color space without bounding the values
    const xU = (rL * 0.4124 + gL * 0.3576 + bL * 0.1805) / 0.95047;
    const yU = (rL * 0.2126 + gL * 0.7152 + bL * 0.0722) / 1.0;
    const zU = (rL * 0.0193 + gL * 0.1192 + bL * 0.9505) / 1.08883;

    // Get the proper xyz values by applying the bounding
    const x = xU > 0.008856 ? Math.pow(xU, 1 / 3) : 7.787 * xU + 16 / 116;
    const y = yU > 0.008856 ? Math.pow(yU, 1 / 3) : 7.787 * yU + 16 / 116;
    const z = zU > 0.008856 ? Math.pow(zU, 1 / 3) : 7.787 * zU + 16 / 116;

    // Make and return the color
    const color = new Color(x, y, z, 'xyz');
    return color;
  }

  /*
  Input and Output methods
  */

  _clamped() {
    const {
      _a,
      _b,
      _c
    } = this.rgb();
    const {
      max,
      min,
      round
    } = Math;
    const format = v => max(0, min(round(v), 255));
    return [_a, _b, _c].map(format);
  }

  /*
  Constructing colors
  */
}

class Point {
  // Initialize
  constructor(...args) {
    this.init(...args);
  }

  // Clone point
  clone() {
    return new Point(this);
  }
  init(x, y) {
    const base = {
      x: 0,
      y: 0
    };

    // ensure source as object
    const source = Array.isArray(x) ? {
      x: x[0],
      y: x[1]
    } : typeof x === 'object' ? {
      x: x.x,
      y: x.y
    } : {
      x: x,
      y: y
    };

    // merge source
    this.x = source.x == null ? base.x : source.x;
    this.y = source.y == null ? base.y : source.y;
    return this;
  }
  toArray() {
    return [this.x, this.y];
  }
  transform(m) {
    return this.clone().transformO(m);
  }

  // Transform point with matrix
  transformO(m) {
    if (!Matrix.isMatrixLike(m)) {
      m = new Matrix(m);
    }
    const {
      x,
      y
    } = this;

    // Perform the matrix multiplication
    this.x = m.a * x + m.c * y + m.e;
    this.y = m.b * x + m.d * y + m.f;
    return this;
  }
}
function point(x, y) {
  return new Point(x, y).transformO(this.screenCTM().inverseO());
}

function closeEnough(a, b, threshold) {
  return Math.abs(b - a) < (1e-6);
}
class Matrix {
  constructor(...args) {
    this.init(...args);
  }
  static formatTransforms(o) {
    // Get all of the parameters required to form the matrix
    const flipBoth = o.flip === 'both' || o.flip === true;
    const flipX = o.flip && (flipBoth || o.flip === 'x') ? -1 : 1;
    const flipY = o.flip && (flipBoth || o.flip === 'y') ? -1 : 1;
    const skewX = o.skew && o.skew.length ? o.skew[0] : isFinite(o.skew) ? o.skew : isFinite(o.skewX) ? o.skewX : 0;
    const skewY = o.skew && o.skew.length ? o.skew[1] : isFinite(o.skew) ? o.skew : isFinite(o.skewY) ? o.skewY : 0;
    const scaleX = o.scale && o.scale.length ? o.scale[0] * flipX : isFinite(o.scale) ? o.scale * flipX : isFinite(o.scaleX) ? o.scaleX * flipX : flipX;
    const scaleY = o.scale && o.scale.length ? o.scale[1] * flipY : isFinite(o.scale) ? o.scale * flipY : isFinite(o.scaleY) ? o.scaleY * flipY : flipY;
    const shear = o.shear || 0;
    const theta = o.rotate || o.theta || 0;
    const origin = new Point(o.origin || o.around || o.ox || o.originX, o.oy || o.originY);
    const ox = origin.x;
    const oy = origin.y;
    // We need Point to be invalid if nothing was passed because we cannot default to 0 here. That is why NaN
    const position = new Point(o.position || o.px || o.positionX || NaN, o.py || o.positionY || NaN);
    const px = position.x;
    const py = position.y;
    const translate = new Point(o.translate || o.tx || o.translateX, o.ty || o.translateY);
    const tx = translate.x;
    const ty = translate.y;
    const relative = new Point(o.relative || o.rx || o.relativeX, o.ry || o.relativeY);
    const rx = relative.x;
    const ry = relative.y;

    // Populate all of the values
    return {
      scaleX,
      scaleY,
      skewX,
      skewY,
      shear,
      theta,
      rx,
      ry,
      tx,
      ty,
      ox,
      oy,
      px,
      py
    };
  }
  static fromArray(a) {
    return {
      a: a[0],
      b: a[1],
      c: a[2],
      d: a[3],
      e: a[4],
      f: a[5]
    };
  }
  static isMatrixLike(o) {
    return o.a != null || o.b != null || o.c != null || o.d != null || o.e != null || o.f != null;
  }

  // left matrix, right matrix, target matrix which is overwritten
  static matrixMultiply(l, r, o) {
    // Work out the product directly
    const a = l.a * r.a + l.c * r.b;
    const b = l.b * r.a + l.d * r.b;
    const c = l.a * r.c + l.c * r.d;
    const d = l.b * r.c + l.d * r.d;
    const e = l.e + l.a * r.e + l.c * r.f;
    const f = l.f + l.b * r.e + l.d * r.f;

    // make sure to use local variables because l/r and o could be the same
    o.a = a;
    o.b = b;
    o.c = c;
    o.d = d;
    o.e = e;
    o.f = f;
    return o;
  }
  around(cx, cy, matrix) {
    return this.clone().aroundO(cx, cy, matrix);
  }

  // Transform around a center point
  aroundO(cx, cy, matrix) {
    const dx = cx || 0;
    const dy = cy || 0;
    return this.translateO(-dx, -dy).lmultiplyO(matrix).translateO(dx, dy);
  }

  // Clones this matrix
  clone() {
    return new Matrix(this);
  }

  // Decomposes this matrix into its affine parameters
  decompose(cx = 0, cy = 0) {
    // Get the parameters from the matrix
    const a = this.a;
    const b = this.b;
    const c = this.c;
    const d = this.d;
    const e = this.e;
    const f = this.f;

    // Figure out if the winding direction is clockwise or counterclockwise
    const determinant = a * d - b * c;
    const ccw = determinant > 0 ? 1 : -1;

    // Since we only shear in x, we can use the x basis to get the x scale
    // and the rotation of the resulting matrix
    const sx = ccw * Math.sqrt(a * a + b * b);
    const thetaRad = Math.atan2(ccw * b, ccw * a);
    const theta = 180 / Math.PI * thetaRad;
    const ct = Math.cos(thetaRad);
    const st = Math.sin(thetaRad);

    // We can then solve the y basis vector simultaneously to get the other
    // two affine parameters directly from these parameters
    const lam = (a * c + b * d) / determinant;
    const sy = c * sx / (lam * a - b) || d * sx / (lam * b + a);

    // Use the translations
    const tx = e - cx + cx * ct * sx + cy * (lam * ct * sx - st * sy);
    const ty = f - cy + cx * st * sx + cy * (lam * st * sx + ct * sy);

    // Construct the decomposition and return it
    return {
      // Return the affine parameters
      scaleX: sx,
      scaleY: sy,
      shear: lam,
      rotate: theta,
      translateX: tx,
      translateY: ty,
      originX: cx,
      originY: cy,
      // Return the matrix parameters
      a: this.a,
      b: this.b,
      c: this.c,
      d: this.d,
      e: this.e,
      f: this.f
    };
  }

  // Check if two matrices are equal
  equals(other) {
    if (other === this) return true;
    const comp = new Matrix(other);
    return closeEnough(this.a, comp.a) && closeEnough(this.b, comp.b) && closeEnough(this.c, comp.c) && closeEnough(this.d, comp.d) && closeEnough(this.e, comp.e) && closeEnough(this.f, comp.f);
  }

  // Flip matrix on x or y, at a given offset
  flip(axis, around) {
    return this.clone().flipO(axis, around);
  }
  flipO(axis, around) {
    return axis === 'x' ? this.scaleO(-1, 1, around, 0) : axis === 'y' ? this.scaleO(1, -1, 0, around) : this.scaleO(-1, -1, axis, around || axis); // Define an x, y flip point
  }

  // Initialize
  init(source) {
    const base = Matrix.fromArray([1, 0, 0, 1, 0, 0]);

    // ensure source as object
    source = source instanceof Element ? source.matrixify() : typeof source === 'string' ? Matrix.fromArray(source.split(delimiter).map(parseFloat)) : Array.isArray(source) ? Matrix.fromArray(source) : typeof source === 'object' && Matrix.isMatrixLike(source) ? source : typeof source === 'object' ? new Matrix().transform(source) : arguments.length === 6 ? Matrix.fromArray([].slice.call(arguments)) : base;

    // Merge the source matrix with the base matrix
    this.a = source.a != null ? source.a : base.a;
    this.b = source.b != null ? source.b : base.b;
    this.c = source.c != null ? source.c : base.c;
    this.d = source.d != null ? source.d : base.d;
    this.e = source.e != null ? source.e : base.e;
    this.f = source.f != null ? source.f : base.f;
    return this;
  }
  inverse() {
    return this.clone().inverseO();
  }

  // Inverses matrix
  inverseO() {
    // Get the current parameters out of the matrix
    const a = this.a;
    const b = this.b;
    const c = this.c;
    const d = this.d;
    const e = this.e;
    const f = this.f;

    // Invert the 2x2 matrix in the top left
    const det = a * d - b * c;
    if (!det) throw new Error('Cannot invert ' + this);

    // Calculate the top 2x2 matrix
    const na = d / det;
    const nb = -b / det;
    const nc = -c / det;
    const nd = a / det;

    // Apply the inverted matrix to the top right
    const ne = -(na * e + nc * f);
    const nf = -(nb * e + nd * f);

    // Construct the inverted matrix
    this.a = na;
    this.b = nb;
    this.c = nc;
    this.d = nd;
    this.e = ne;
    this.f = nf;
    return this;
  }
  lmultiply(matrix) {
    return this.clone().lmultiplyO(matrix);
  }
  lmultiplyO(matrix) {
    const r = this;
    const l = matrix instanceof Matrix ? matrix : new Matrix(matrix);
    return Matrix.matrixMultiply(l, r, this);
  }

  // Left multiplies by the given matrix
  multiply(matrix) {
    return this.clone().multiplyO(matrix);
  }
  multiplyO(matrix) {
    // Get the matrices
    const l = this;
    const r = matrix instanceof Matrix ? matrix : new Matrix(matrix);
    return Matrix.matrixMultiply(l, r, this);
  }

  // Rotate matrix
  rotate(r, cx, cy) {
    return this.clone().rotateO(r, cx, cy);
  }
  rotateO(r, cx = 0, cy = 0) {
    // Convert degrees to radians
    r = radians(r);
    const cos = Math.cos(r);
    const sin = Math.sin(r);
    const {
      a,
      b,
      c,
      d,
      e,
      f
    } = this;
    this.a = a * cos - b * sin;
    this.b = b * cos + a * sin;
    this.c = c * cos - d * sin;
    this.d = d * cos + c * sin;
    this.e = e * cos - f * sin + cy * sin - cx * cos + cx;
    this.f = f * cos + e * sin - cx * sin - cy * cos + cy;
    return this;
  }

  // Scale matrix
  scale() {
    return this.clone().scaleO(...arguments);
  }
  scaleO(x, y = x, cx = 0, cy = 0) {
    // Support uniform scaling
    if (arguments.length === 3) {
      cy = cx;
      cx = y;
      y = x;
    }
    const {
      a,
      b,
      c,
      d,
      e,
      f
    } = this;
    this.a = a * x;
    this.b = b * y;
    this.c = c * x;
    this.d = d * y;
    this.e = e * x - cx * x + cx;
    this.f = f * y - cy * y + cy;
    return this;
  }

  // Shear matrix
  shear(a, cx, cy) {
    return this.clone().shearO(a, cx, cy);
  }

  // eslint-disable-next-line no-unused-vars
  shearO(lx, cx = 0, cy = 0) {
    const {
      a,
      b,
      c,
      d,
      e,
      f
    } = this;
    this.a = a + b * lx;
    this.c = c + d * lx;
    this.e = e + f * lx - cy * lx;
    return this;
  }

  // Skew Matrix
  skew() {
    return this.clone().skewO(...arguments);
  }
  skewO(x, y = x, cx = 0, cy = 0) {
    // support uniformal skew
    if (arguments.length === 3) {
      cy = cx;
      cx = y;
      y = x;
    }

    // Convert degrees to radians
    x = radians(x);
    y = radians(y);
    const lx = Math.tan(x);
    const ly = Math.tan(y);
    const {
      a,
      b,
      c,
      d,
      e,
      f
    } = this;
    this.a = a + b * lx;
    this.b = b + a * ly;
    this.c = c + d * lx;
    this.d = d + c * ly;
    this.e = e + f * lx - cy * lx;
    this.f = f + e * ly - cx * ly;
    return this;
  }

  // SkewX
  skewX(x, cx, cy) {
    return this.skew(x, 0, cx, cy);
  }

  // SkewY
  skewY(y, cx, cy) {
    return this.skew(0, y, cx, cy);
  }
  toArray() {
    return [this.a, this.b, this.c, this.d, this.e, this.f];
  }

  // Convert matrix to string
  toString() {
    return 'matrix(' + this.a + ',' + this.b + ',' + this.c + ',' + this.d + ',' + this.e + ',' + this.f + ')';
  }

  // Transform a matrix into another matrix by manipulating the space
  transform(o) {
    // Check if o is a matrix and then left multiply it directly
    if (Matrix.isMatrixLike(o)) {
      const matrix = new Matrix(o);
      return matrix.multiplyO(this);
    }

    // Get the proposed transformations and the current transformations
    const t = Matrix.formatTransforms(o);
    const current = this;
    const {
      x: ox,
      y: oy
    } = new Point(t.ox, t.oy).transform(current);

    // Construct the resulting matrix
    const transformer = new Matrix().translateO(t.rx, t.ry).lmultiplyO(current).translateO(-ox, -oy).scaleO(t.scaleX, t.scaleY).skewO(t.skewX, t.skewY).shearO(t.shear).rotateO(t.theta).translateO(ox, oy);

    // If we want the origin at a particular place, we force it there
    if (isFinite(t.px) || isFinite(t.py)) {
      const origin = new Point(ox, oy).transform(transformer);
      // TODO: Replace t.px with isFinite(t.px)
      // Doesn't work because t.px is also 0 if it wasn't passed
      const dx = isFinite(t.px) ? t.px - origin.x : 0;
      const dy = isFinite(t.py) ? t.py - origin.y : 0;
      transformer.translateO(dx, dy);
    }

    // Translate now after positioning
    transformer.translateO(t.tx, t.ty);
    return transformer;
  }

  // Translate matrix
  translate(x, y) {
    return this.clone().translateO(x, y);
  }
  translateO(x, y) {
    this.e += x || 0;
    this.f += y || 0;
    return this;
  }
  valueOf() {
    return {
      a: this.a,
      b: this.b,
      c: this.c,
      d: this.d,
      e: this.e,
      f: this.f
    };
  }
}
function ctm() {
  return new Matrix(this.node.getCTM());
}
function screenCTM() {
  try {
    /* https://bugzilla.mozilla.org/show_bug.cgi?id=1344537
       This is needed because FF does not return the transformation matrix
       for the inner coordinate system when getScreenCTM() is called on nested svgs.
       However all other Browsers do that */
    if (typeof this.isRoot === 'function' && !this.isRoot()) {
      const rect = this.rect(1, 1);
      const m = rect.node.getScreenCTM();
      rect.remove();
      return new Matrix(m);
    }
    return new Matrix(this.node.getScreenCTM());
  } catch (e) {
    console.warn(`Cannot get CTM from SVG node ${this.node.nodeName}. Is the element rendered?`);
    return new Matrix();
  }
}
register(Matrix, 'Matrix');

function parser() {
  // Reuse cached element if possible
  if (!parser.nodes) {
    const svg = makeInstance().size(2, 0);
    svg.node.style.cssText = ['opacity: 0', 'position: absolute', 'left: -100%', 'top: -100%', 'overflow: hidden'].join(';');
    svg.attr('focusable', 'false');
    svg.attr('aria-hidden', 'true');
    const path = svg.path().node;
    parser.nodes = {
      svg,
      path
    };
  }
  if (!parser.nodes.svg.node.parentNode) {
    const b = globals.document.body || globals.document.documentElement;
    parser.nodes.svg.addTo(b);
  }
  return parser.nodes;
}

function isNulledBox(box) {
  return !box.width && !box.height && !box.x && !box.y;
}
function domContains(node) {
  return node === globals.document || (globals.document.documentElement.contains || function (node) {
    // This is IE - it does not support contains() for top-level SVGs
    while (node.parentNode) {
      node = node.parentNode;
    }
    return node === globals.document;
  }).call(globals.document.documentElement, node);
}
class Box {
  constructor(...args) {
    this.init(...args);
  }
  addOffset() {
    // offset by window scroll position, because getBoundingClientRect changes when window is scrolled
    this.x += globals.window.pageXOffset;
    this.y += globals.window.pageYOffset;
    return new Box(this);
  }
  init(source) {
    const base = [0, 0, 0, 0];
    source = typeof source === 'string' ? source.split(delimiter).map(parseFloat) : Array.isArray(source) ? source : typeof source === 'object' ? [source.left != null ? source.left : source.x, source.top != null ? source.top : source.y, source.width, source.height] : arguments.length === 4 ? [].slice.call(arguments) : base;
    this.x = source[0] || 0;
    this.y = source[1] || 0;
    this.width = this.w = source[2] || 0;
    this.height = this.h = source[3] || 0;

    // Add more bounding box properties
    this.x2 = this.x + this.w;
    this.y2 = this.y + this.h;
    this.cx = this.x + this.w / 2;
    this.cy = this.y + this.h / 2;
    return this;
  }
  isNulled() {
    return isNulledBox(this);
  }

  // Merge rect box with another, return a new instance
  merge(box) {
    const x = Math.min(this.x, box.x);
    const y = Math.min(this.y, box.y);
    const width = Math.max(this.x + this.width, box.x + box.width) - x;
    const height = Math.max(this.y + this.height, box.y + box.height) - y;
    return new Box(x, y, width, height);
  }
  toArray() {
    return [this.x, this.y, this.width, this.height];
  }
  toString() {
    return this.x + ' ' + this.y + ' ' + this.width + ' ' + this.height;
  }
  transform(m) {
    if (!(m instanceof Matrix)) {
      m = new Matrix(m);
    }
    let xMin = Infinity;
    let xMax = -Infinity;
    let yMin = Infinity;
    let yMax = -Infinity;
    const pts = [new Point(this.x, this.y), new Point(this.x2, this.y), new Point(this.x, this.y2), new Point(this.x2, this.y2)];
    pts.forEach(function (p) {
      p = p.transform(m);
      xMin = Math.min(xMin, p.x);
      xMax = Math.max(xMax, p.x);
      yMin = Math.min(yMin, p.y);
      yMax = Math.max(yMax, p.y);
    });
    return new Box(xMin, yMin, xMax - xMin, yMax - yMin);
  }
}
function getBox(el, getBBoxFn, retry) {
  let box;
  try {
    // Try to get the box with the provided function
    box = getBBoxFn(el.node);

    // If the box is worthless and not even in the dom, retry
    // by throwing an error here...
    if (isNulledBox(box) && !domContains(el.node)) {
      throw new Error('Element not in the dom');
    }
  } catch (e) {
    // ... and calling the retry handler here
    box = retry(el);
  }
  return box;
}
function bbox() {
  // Function to get bbox is getBBox()
  const getBBox = node => node.getBBox();

  // Take all measures so that a stupid browser renders the element
  // so we can get the bbox from it when we try again
  const retry = el => {
    try {
      const clone = el.clone().addTo(parser().svg).show();
      const box = clone.node.getBBox();
      clone.remove();
      return box;
    } catch (e) {
      // We give up...
      throw new Error(`Getting bbox of element "${el.node.nodeName}" is not possible: ${e.toString()}`);
    }
  };
  const box = getBox(this, getBBox, retry);
  const bbox = new Box(box);
  return bbox;
}
function rbox(el) {
  const getRBox = node => node.getBoundingClientRect();
  const retry = el => {
    // There is no point in trying tricks here because if we insert the element into the dom ourselves
    // it obviously will be at the wrong position
    throw new Error(`Getting rbox of element "${el.node.nodeName}" is not possible`);
  };
  const box = getBox(this, getRBox, retry);
  const rbox = new Box(box);

  // If an element was passed, we want the bbox in the coordinate system of that element
  if (el) {
    return rbox.transform(el.screenCTM().inverseO());
  }

  // Else we want it in absolute screen coordinates
  // Therefore we need to add the scrollOffset
  return rbox.addOffset();
}

// Checks whether the given point is inside the bounding box
function inside(x, y) {
  const box = this.bbox();
  return x > box.x && y > box.y && x < box.x + box.width && y < box.y + box.height;
}
registerMethods({
  viewbox: {
    viewbox(x, y, width, height) {
      // act as getter
      if (x == null) return new Box(this.attr('viewBox'));

      // act as setter
      return this.attr('viewBox', new Box(x, y, width, height));
    },
    zoom(level, point) {
      // Its best to rely on the attributes here and here is why:
      // clientXYZ: Doesn't work on non-root svgs because they dont have a CSSBox (silly!)
      // getBoundingClientRect: Doesn't work because Chrome just ignores width and height of nested svgs completely
      //                        that means, their clientRect is always as big as the content.
      //                        Furthermore this size is incorrect if the element is further transformed by its parents
      // computedStyle: Only returns meaningful values if css was used with px. We dont go this route here!
      // getBBox: returns the bounding box of its content - that doesn't help!
      let {
        width,
        height
      } = this.attr(['width', 'height']);

      // Width and height is a string when a number with a unit is present which we can't use
      // So we try clientXYZ
      if (!width && !height || typeof width === 'string' || typeof height === 'string') {
        width = this.node.clientWidth;
        height = this.node.clientHeight;
      }

      // Giving up...
      if (!width || !height) {
        throw new Error('Impossible to get absolute width and height. Please provide an absolute width and height attribute on the zooming element');
      }
      const v = this.viewbox();
      const zoomX = width / v.width;
      const zoomY = height / v.height;
      const zoom = Math.min(zoomX, zoomY);
      if (level == null) {
        return zoom;
      }
      let zoomAmount = zoom / level;

      // Set the zoomAmount to the highest value which is safe to process and recover from
      // The * 100 is a bit of wiggle room for the matrix transformation
      if (zoomAmount === Infinity) zoomAmount = Number.MAX_SAFE_INTEGER / 100;
      point = point || new Point(width / 2 / zoomX + v.x, height / 2 / zoomY + v.y);
      const box = new Box(v).transform(new Matrix({
        scale: zoomAmount,
        origin: point
      }));
      return this.viewbox(box);
    }
  }
});
register(Box, 'Box');

// import { subClassArray } from './ArrayPolyfill.js'

class List extends Array {
  constructor(arr = [], ...args) {
    super(arr, ...args);
    if (typeof arr === 'number') return this;
    this.length = 0;
    this.push(...arr);
  }
}
extend([List], {
  each(fnOrMethodName, ...args) {
    if (typeof fnOrMethodName === 'function') {
      return this.map((el, i, arr) => {
        return fnOrMethodName.call(el, el, i, arr);
      });
    } else {
      return this.map(el => {
        return el[fnOrMethodName](...args);
      });
    }
  },
  toArray() {
    return Array.prototype.concat.apply([], this);
  }
});
const reserved = ['toArray', 'constructor', 'each'];
List.extend = function (methods) {
  methods = methods.reduce((obj, name) => {
    // Don't overwrite own methods
    if (reserved.includes(name)) return obj;

    // Don't add private methods
    if (name[0] === '_') return obj;

    // Allow access to original Array methods through a prefix
    if (name in Array.prototype) {
      obj['$' + name] = Array.prototype[name];
    }

    // Relay every call to each()
    obj[name] = function (...attrs) {
      return this.each(name, ...attrs);
    };
    return obj;
  }, {});
  extend([List], methods);
};

function baseFind(query, parent) {
  return new List(map((parent || globals.document).querySelectorAll(query), function (node) {
    return adopt(node);
  }));
}

// Scoped find method
function find(query) {
  return baseFind(query, this.node);
}
function findOne(query) {
  return adopt(this.node.querySelector(query));
}

let listenerId = 0;
const windowEvents = {};
function getEvents(instance) {
  let n = instance.getEventHolder();

  // We dont want to save events in global space
  if (n === globals.window) n = windowEvents;
  if (!n.events) n.events = {};
  return n.events;
}
function getEventTarget(instance) {
  return instance.getEventTarget();
}
function clearEvents(instance) {
  let n = instance.getEventHolder();
  if (n === globals.window) n = windowEvents;
  if (n.events) n.events = {};
}

// Add event binder in the SVG namespace
function on(node, events, listener, binding, options) {
  const l = listener.bind(binding || node);
  const instance = makeInstance(node);
  const bag = getEvents(instance);
  const n = getEventTarget(instance);

  // events can be an array of events or a string of events
  events = Array.isArray(events) ? events : events.split(delimiter);

  // add id to listener
  if (!listener._svgjsListenerId) {
    listener._svgjsListenerId = ++listenerId;
  }
  events.forEach(function (event) {
    const ev = event.split('.')[0];
    const ns = event.split('.')[1] || '*';

    // ensure valid object
    bag[ev] = bag[ev] || {};
    bag[ev][ns] = bag[ev][ns] || {};

    // reference listener
    bag[ev][ns][listener._svgjsListenerId] = l;

    // add listener
    n.addEventListener(ev, l, options || false);
  });
}

// Add event unbinder in the SVG namespace
function off(node, events, listener, options) {
  const instance = makeInstance(node);
  const bag = getEvents(instance);
  const n = getEventTarget(instance);

  // listener can be a function or a number
  if (typeof listener === 'function') {
    listener = listener._svgjsListenerId;
    if (!listener) return;
  }

  // events can be an array of events or a string or undefined
  events = Array.isArray(events) ? events : (events || '').split(delimiter);
  events.forEach(function (event) {
    const ev = event && event.split('.')[0];
    const ns = event && event.split('.')[1];
    let namespace, l;
    if (listener) {
      // remove listener reference
      if (bag[ev] && bag[ev][ns || '*']) {
        // removeListener
        n.removeEventListener(ev, bag[ev][ns || '*'][listener], options || false);
        delete bag[ev][ns || '*'][listener];
      }
    } else if (ev && ns) {
      // remove all listeners for a namespaced event
      if (bag[ev] && bag[ev][ns]) {
        for (l in bag[ev][ns]) {
          off(n, [ev, ns].join('.'), l);
        }
        delete bag[ev][ns];
      }
    } else if (ns) {
      // remove all listeners for a specific namespace
      for (event in bag) {
        for (namespace in bag[event]) {
          if (ns === namespace) {
            off(n, [event, ns].join('.'));
          }
        }
      }
    } else if (ev) {
      // remove all listeners for the event
      if (bag[ev]) {
        for (namespace in bag[ev]) {
          off(n, [ev, namespace].join('.'));
        }
        delete bag[ev];
      }
    } else {
      // remove all listeners on a given node
      for (event in bag) {
        off(n, event);
      }
      clearEvents(instance);
    }
  });
}
function dispatch(node, event, data, options) {
  const n = getEventTarget(node);

  // Dispatch event
  if (event instanceof globals.window.Event) {
    n.dispatchEvent(event);
  } else {
    event = new globals.window.CustomEvent(event, {
      detail: data,
      cancelable: true,
      ...options
    });
    n.dispatchEvent(event);
  }
  return event;
}

class EventTarget extends Base {
  addEventListener() {}
  dispatch(event, data, options) {
    return dispatch(this, event, data, options);
  }
  dispatchEvent(event) {
    const bag = this.getEventHolder().events;
    if (!bag) return true;
    const events = bag[event.type];
    for (const i in events) {
      for (const j in events[i]) {
        events[i][j](event);
      }
    }
    return !event.defaultPrevented;
  }

  // Fire given event
  fire(event, data, options) {
    this.dispatch(event, data, options);
    return this;
  }
  getEventHolder() {
    return this;
  }
  getEventTarget() {
    return this;
  }

  // Unbind event from listener
  off(event, listener, options) {
    off(this, event, listener, options);
    return this;
  }

  // Bind given event to listener
  on(event, listener, binding, options) {
    on(this, event, listener, binding, options);
    return this;
  }
  removeEventListener() {}
}
register(EventTarget, 'EventTarget');

function noop() {}

// Default animation values
const timeline = {
  duration: 400,
  ease: '>',
  delay: 0
};

// Default attribute values
const attrs = {
  // fill and stroke
  'fill-opacity': 1,
  'stroke-opacity': 1,
  'stroke-width': 0,
  'stroke-linejoin': 'miter',
  'stroke-linecap': 'butt',
  fill: '#000000',
  stroke: '#000000',
  opacity: 1,
  // position
  x: 0,
  y: 0,
  cx: 0,
  cy: 0,
  // size
  width: 0,
  height: 0,
  // radius
  r: 0,
  rx: 0,
  ry: 0,
  // gradient
  offset: 0,
  'stop-opacity': 1,
  'stop-color': '#000000',
  // text
  'text-anchor': 'start'
};

var defaults = {
  __proto__: null,
  attrs: attrs,
  noop: noop,
  timeline: timeline
};

class SVGArray extends Array {
  constructor(...args) {
    super(...args);
    this.init(...args);
  }
  clone() {
    return new this.constructor(this);
  }
  init(arr) {
    // This catches the case, that native map tries to create an array with new Array(1)
    if (typeof arr === 'number') return this;
    this.length = 0;
    this.push(...this.parse(arr));
    return this;
  }

  // Parse whitespace separated string
  parse(array = []) {
    // If already is an array, no need to parse it
    if (array instanceof Array) return array;
    return array.trim().split(delimiter).map(parseFloat);
  }
  toArray() {
    return Array.prototype.concat.apply([], this);
  }
  toSet() {
    return new Set(this);
  }
  toString() {
    return this.join(' ');
  }

  // Flattens the array if needed
  valueOf() {
    const ret = [];
    ret.push(...this);
    return ret;
  }
}

// Module for unit conversions
class SVGNumber {
  // Initialize
  constructor(...args) {
    this.init(...args);
  }
  convert(unit) {
    return new SVGNumber(this.value, unit);
  }

  // Divide number
  divide(number) {
    number = new SVGNumber(number);
    return new SVGNumber(this / number, this.unit || number.unit);
  }
  init(value, unit) {
    unit = Array.isArray(value) ? value[1] : unit;
    value = Array.isArray(value) ? value[0] : value;

    // initialize defaults
    this.value = 0;
    this.unit = unit || '';

    // parse value
    if (typeof value === 'number') {
      // ensure a valid numeric value
      this.value = isNaN(value) ? 0 : !isFinite(value) ? value < 0 ? -3.4e38 : +3.4e38 : value;
    } else if (typeof value === 'string') {
      unit = value.match(numberAndUnit);
      if (unit) {
        // make value numeric
        this.value = parseFloat(unit[1]);

        // normalize
        if (unit[5] === '%') {
          this.value /= 100;
        } else if (unit[5] === 's') {
          this.value *= 1000;
        }

        // store unit
        this.unit = unit[5];
      }
    } else {
      if (value instanceof SVGNumber) {
        this.value = value.valueOf();
        this.unit = value.unit;
      }
    }
    return this;
  }

  // Subtract number
  minus(number) {
    number = new SVGNumber(number);
    return new SVGNumber(this - number, this.unit || number.unit);
  }

  // Add number
  plus(number) {
    number = new SVGNumber(number);
    return new SVGNumber(this + number, this.unit || number.unit);
  }

  // Multiply number
  times(number) {
    number = new SVGNumber(number);
    return new SVGNumber(this * number, this.unit || number.unit);
  }
  toArray() {
    return [this.value, this.unit];
  }
  toJSON() {
    return this.toString();
  }
  toString() {
    return (this.unit === '%' ? ~~(this.value * 1e8) / 1e6 : this.unit === 's' ? this.value / 1e3 : this.value) + this.unit;
  }
  valueOf() {
    return this.value;
  }
}

const colorAttributes = new Set(['fill', 'stroke', 'color', 'bgcolor', 'stop-color', 'flood-color', 'lighting-color']);
const hooks = [];
function registerAttrHook(fn) {
  hooks.push(fn);
}

// Set svg element attribute
function attr(attr, val, ns) {
  // act as full getter
  if (attr == null) {
    // get an object of attributes
    attr = {};
    val = this.node.attributes;
    for (const node of val) {
      attr[node.nodeName] = isNumber.test(node.nodeValue) ? parseFloat(node.nodeValue) : node.nodeValue;
    }
    return attr;
  } else if (attr instanceof Array) {
    // loop through array and get all values
    return attr.reduce((last, curr) => {
      last[curr] = this.attr(curr);
      return last;
    }, {});
  } else if (typeof attr === 'object' && attr.constructor === Object) {
    // apply every attribute individually if an object is passed
    for (val in attr) this.attr(val, attr[val]);
  } else if (val === null) {
    // remove value
    this.node.removeAttribute(attr);
  } else if (val == null) {
    // act as a getter if the first and only argument is not an object
    val = this.node.getAttribute(attr);
    return val == null ? attrs[attr] : isNumber.test(val) ? parseFloat(val) : val;
  } else {
    // Loop through hooks and execute them to convert value
    val = hooks.reduce((_val, hook) => {
      return hook(attr, _val, this);
    }, val);

    // ensure correct numeric values (also accepts NaN and Infinity)
    if (typeof val === 'number') {
      val = new SVGNumber(val);
    } else if (colorAttributes.has(attr) && Color.isColor(val)) {
      // ensure full hex color
      val = new Color(val);
    } else if (val.constructor === Array) {
      // Check for plain arrays and parse array values
      val = new SVGArray(val);
    }

    // if the passed attribute is leading...
    if (attr === 'leading') {
      // ... call the leading method instead
      if (this.leading) {
        this.leading(val);
      }
    } else {
      // set given attribute on node
      typeof ns === 'string' ? this.node.setAttributeNS(ns, attr, val.toString()) : this.node.setAttribute(attr, val.toString());
    }

    // rebuild if required
    if (this.rebuild && (attr === 'font-size' || attr === 'x')) {
      this.rebuild();
    }
  }
  return this;
}

class Dom extends EventTarget {
  constructor(node, attrs) {
    super();
    this.node = node;
    this.type = node.nodeName;
    if (attrs && node !== attrs) {
      this.attr(attrs);
    }
  }

  // Add given element at a position
  add(element, i) {
    element = makeInstance(element);

    // If non-root svg nodes are added we have to remove their namespaces
    if (element.removeNamespace && this.node instanceof globals.window.SVGElement) {
      element.removeNamespace();
    }
    if (i == null) {
      this.node.appendChild(element.node);
    } else if (element.node !== this.node.childNodes[i]) {
      this.node.insertBefore(element.node, this.node.childNodes[i]);
    }
    return this;
  }

  // Add element to given container and return self
  addTo(parent, i) {
    return makeInstance(parent).put(this, i);
  }

  // Returns all child elements
  children() {
    return new List(map(this.node.children, function (node) {
      return adopt(node);
    }));
  }

  // Remove all elements in this container
  clear() {
    // remove children
    while (this.node.hasChildNodes()) {
      this.node.removeChild(this.node.lastChild);
    }
    return this;
  }

  // Clone element
  clone(deep = true, assignNewIds = true) {
    // write dom data to the dom so the clone can pickup the data
    this.writeDataToDom();

    // clone element
    let nodeClone = this.node.cloneNode(deep);
    if (assignNewIds) {
      // assign new id
      nodeClone = assignNewId(nodeClone);
    }
    return new this.constructor(nodeClone);
  }

  // Iterates over all children and invokes a given block
  each(block, deep) {
    const children = this.children();
    let i, il;
    for (i = 0, il = children.length; i < il; i++) {
      block.apply(children[i], [i, children]);
      if (deep) {
        children[i].each(block, deep);
      }
    }
    return this;
  }
  element(nodeName, attrs) {
    return this.put(new Dom(create(nodeName), attrs));
  }

  // Get first child
  first() {
    return adopt(this.node.firstChild);
  }

  // Get a element at the given index
  get(i) {
    return adopt(this.node.childNodes[i]);
  }
  getEventHolder() {
    return this.node;
  }
  getEventTarget() {
    return this.node;
  }

  // Checks if the given element is a child
  has(element) {
    return this.index(element) >= 0;
  }
  html(htmlOrFn, outerHTML) {
    return this.xml(htmlOrFn, outerHTML, html);
  }

  // Get / set id
  id(id) {
    // generate new id if no id set
    if (typeof id === 'undefined' && !this.node.id) {
      this.node.id = eid(this.type);
    }

    // don't set directly with this.node.id to make `null` work correctly
    return this.attr('id', id);
  }

  // Gets index of given element
  index(element) {
    return [].slice.call(this.node.childNodes).indexOf(element.node);
  }

  // Get the last child
  last() {
    return adopt(this.node.lastChild);
  }

  // matches the element vs a css selector
  matches(selector) {
    const el = this.node;
    const matcher = el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector || null;
    return matcher && matcher.call(el, selector);
  }

  // Returns the parent element instance
  parent(type) {
    let parent = this;

    // check for parent
    if (!parent.node.parentNode) return null;

    // get parent element
    parent = adopt(parent.node.parentNode);
    if (!type) return parent;

    // loop through ancestors if type is given
    do {
      if (typeof type === 'string' ? parent.matches(type) : parent instanceof type) return parent;
    } while (parent = adopt(parent.node.parentNode));
    return parent;
  }

  // Basically does the same as `add()` but returns the added element instead
  put(element, i) {
    element = makeInstance(element);
    this.add(element, i);
    return element;
  }

  // Add element to given container and return container
  putIn(parent, i) {
    return makeInstance(parent).add(this, i);
  }

  // Remove element
  remove() {
    if (this.parent()) {
      this.parent().removeElement(this);
    }
    return this;
  }

  // Remove a given child
  removeElement(element) {
    this.node.removeChild(element.node);
    return this;
  }

  // Replace this with element
  replace(element) {
    element = makeInstance(element);
    if (this.node.parentNode) {
      this.node.parentNode.replaceChild(element.node, this.node);
    }
    return element;
  }
  round(precision = 2, map = null) {
    const factor = 10 ** precision;
    const attrs = this.attr(map);
    for (const i in attrs) {
      if (typeof attrs[i] === 'number') {
        attrs[i] = Math.round(attrs[i] * factor) / factor;
      }
    }
    this.attr(attrs);
    return this;
  }

  // Import / Export raw svg
  svg(svgOrFn, outerSVG) {
    return this.xml(svgOrFn, outerSVG, svg);
  }

  // Return id on string conversion
  toString() {
    return this.id();
  }
  words(text) {
    // This is faster than removing all children and adding a new one
    this.node.textContent = text;
    return this;
  }
  wrap(node) {
    const parent = this.parent();
    if (!parent) {
      return this.addTo(node);
    }
    const position = parent.index(this);
    return parent.put(node, position).put(this);
  }

  // write svgjs data to the dom
  writeDataToDom() {
    // dump variables recursively
    this.each(function () {
      this.writeDataToDom();
    });
    return this;
  }

  // Import / Export raw svg
  xml(xmlOrFn, outerXML, ns) {
    if (typeof xmlOrFn === 'boolean') {
      ns = outerXML;
      outerXML = xmlOrFn;
      xmlOrFn = null;
    }

    // act as getter if no svg string is given
    if (xmlOrFn == null || typeof xmlOrFn === 'function') {
      // The default for exports is, that the outerNode is included
      outerXML = outerXML == null ? true : outerXML;

      // write svgjs data to the dom
      this.writeDataToDom();
      let current = this;

      // An export modifier was passed
      if (xmlOrFn != null) {
        current = adopt(current.node.cloneNode(true));

        // If the user wants outerHTML we need to process this node, too
        if (outerXML) {
          const result = xmlOrFn(current);
          current = result || current;

          // The user does not want this node? Well, then he gets nothing
          if (result === false) return '';
        }

        // Deep loop through all children and apply modifier
        current.each(function () {
          const result = xmlOrFn(this);
          const _this = result || this;

          // If modifier returns false, discard node
          if (result === false) {
            this.remove();

            // If modifier returns new node, use it
          } else if (result && this !== _this) {
            this.replace(_this);
          }
        }, true);
      }

      // Return outer or inner content
      return outerXML ? current.node.outerHTML : current.node.innerHTML;
    }

    // Act as setter if we got a string

    // The default for import is, that the current node is not replaced
    outerXML = outerXML == null ? false : outerXML;

    // Create temporary holder
    const well = create('wrapper', ns);
    const fragment = globals.document.createDocumentFragment();

    // Dump raw svg
    well.innerHTML = xmlOrFn;

    // Transplant nodes into the fragment
    for (let len = well.children.length; len--;) {
      fragment.appendChild(well.firstElementChild);
    }
    const parent = this.parent();

    // Add the whole fragment at once
    return outerXML ? this.replace(fragment) && parent : this.add(fragment);
  }
}
extend(Dom, {
  attr,
  find,
  findOne
});
register(Dom, 'Dom');

class Element extends Dom {
  constructor(node, attrs) {
    super(node, attrs);

    // initialize data object
    this.dom = {};

    // create circular reference
    this.node.instance = this;
    if (node.hasAttribute('data-svgjs') || node.hasAttribute('svgjs:data')) {
      // pull svgjs data from the dom (getAttributeNS doesn't work in html5)
      this.setData(JSON.parse(node.getAttribute('data-svgjs')) ?? JSON.parse(node.getAttribute('svgjs:data')) ?? {});
    }
  }

  // Move element by its center
  center(x, y) {
    return this.cx(x).cy(y);
  }

  // Move by center over x-axis
  cx(x) {
    return x == null ? this.x() + this.width() / 2 : this.x(x - this.width() / 2);
  }

  // Move by center over y-axis
  cy(y) {
    return y == null ? this.y() + this.height() / 2 : this.y(y - this.height() / 2);
  }

  // Get defs
  defs() {
    const root = this.root();
    return root && root.defs();
  }

  // Relative move over x and y axes
  dmove(x, y) {
    return this.dx(x).dy(y);
  }

  // Relative move over x axis
  dx(x = 0) {
    return this.x(new SVGNumber(x).plus(this.x()));
  }

  // Relative move over y axis
  dy(y = 0) {
    return this.y(new SVGNumber(y).plus(this.y()));
  }
  getEventHolder() {
    return this;
  }

  // Set height of element
  height(height) {
    return this.attr('height', height);
  }

  // Move element to given x and y values
  move(x, y) {
    return this.x(x).y(y);
  }

  // return array of all ancestors of given type up to the root svg
  parents(until = this.root()) {
    const isSelector = typeof until === 'string';
    if (!isSelector) {
      until = makeInstance(until);
    }
    const parents = new List();
    let parent = this;
    while ((parent = parent.parent()) && parent.node !== globals.document && parent.nodeName !== '#document-fragment') {
      parents.push(parent);
      if (!isSelector && parent.node === until.node) {
        break;
      }
      if (isSelector && parent.matches(until)) {
        break;
      }
      if (parent.node === this.root().node) {
        // We worked our way to the root and didn't match `until`
        return null;
      }
    }
    return parents;
  }

  // Get referenced element form attribute value
  reference(attr) {
    attr = this.attr(attr);
    if (!attr) return null;
    const m = (attr + '').match(reference);
    return m ? makeInstance(m[1]) : null;
  }

  // Get parent document
  root() {
    const p = this.parent(getClass(root));
    return p && p.root();
  }

  // set given data to the elements data property
  setData(o) {
    this.dom = o;
    return this;
  }

  // Set element size to given width and height
  size(width, height) {
    const p = proportionalSize(this, width, height);
    return this.width(new SVGNumber(p.width)).height(new SVGNumber(p.height));
  }

  // Set width of element
  width(width) {
    return this.attr('width', width);
  }

  // write svgjs data to the dom
  writeDataToDom() {
    writeDataToDom(this, this.dom);
    return super.writeDataToDom();
  }

  // Move over x-axis
  x(x) {
    return this.attr('x', x);
  }

  // Move over y-axis
  y(y) {
    return this.attr('y', y);
  }
}
extend(Element, {
  bbox,
  rbox,
  inside,
  point,
  ctm,
  screenCTM
});
register(Element, 'Element');

// Define list of available attributes for stroke and fill
const sugar = {
  stroke: ['color', 'width', 'opacity', 'linecap', 'linejoin', 'miterlimit', 'dasharray', 'dashoffset'],
  fill: ['color', 'opacity', 'rule'],
  prefix: function (t, a) {
    return a === 'color' ? t : t + '-' + a;
  }
}

// Add sugar for fill and stroke
;
['fill', 'stroke'].forEach(function (m) {
  const extension = {};
  let i;
  extension[m] = function (o) {
    if (typeof o === 'undefined') {
      return this.attr(m);
    }
    if (typeof o === 'string' || o instanceof Color || Color.isRgb(o) || o instanceof Element) {
      this.attr(m, o);
    } else {
      // set all attributes from sugar.fill and sugar.stroke list
      for (i = sugar[m].length - 1; i >= 0; i--) {
        if (o[sugar[m][i]] != null) {
          this.attr(sugar.prefix(m, sugar[m][i]), o[sugar[m][i]]);
        }
      }
    }
    return this;
  };
  registerMethods(['Element', 'Runner'], extension);
});
registerMethods(['Element', 'Runner'], {
  // Let the user set the matrix directly
  matrix: function (mat, b, c, d, e, f) {
    // Act as a getter
    if (mat == null) {
      return new Matrix(this);
    }

    // Act as a setter, the user can pass a matrix or a set of numbers
    return this.attr('transform', new Matrix(mat, b, c, d, e, f));
  },
  // Map rotation to transform
  rotate: function (angle, cx, cy) {
    return this.transform({
      rotate: angle,
      ox: cx,
      oy: cy
    }, true);
  },
  // Map skew to transform
  skew: function (x, y, cx, cy) {
    return arguments.length === 1 || arguments.length === 3 ? this.transform({
      skew: x,
      ox: y,
      oy: cx
    }, true) : this.transform({
      skew: [x, y],
      ox: cx,
      oy: cy
    }, true);
  },
  shear: function (lam, cx, cy) {
    return this.transform({
      shear: lam,
      ox: cx,
      oy: cy
    }, true);
  },
  // Map scale to transform
  scale: function (x, y, cx, cy) {
    return arguments.length === 1 || arguments.length === 3 ? this.transform({
      scale: x,
      ox: y,
      oy: cx
    }, true) : this.transform({
      scale: [x, y],
      ox: cx,
      oy: cy
    }, true);
  },
  // Map translate to transform
  translate: function (x, y) {
    return this.transform({
      translate: [x, y]
    }, true);
  },
  // Map relative translations to transform
  relative: function (x, y) {
    return this.transform({
      relative: [x, y]
    }, true);
  },
  // Map flip to transform
  flip: function (direction = 'both', origin = 'center') {
    if ('xybothtrue'.indexOf(direction) === -1) {
      origin = direction;
      direction = 'both';
    }
    return this.transform({
      flip: direction,
      origin: origin
    }, true);
  },
  // Opacity
  opacity: function (value) {
    return this.attr('opacity', value);
  }
});
registerMethods('radius', {
  // Add x and y radius
  radius: function (x, y = x) {
    const type = (this._element || this).type;
    return type === 'radialGradient' ? this.attr('r', new SVGNumber(x)) : this.rx(x).ry(y);
  }
});
registerMethods('Path', {
  // Get path length
  length: function () {
    return this.node.getTotalLength();
  },
  // Get point at length
  pointAt: function (length) {
    return new Point(this.node.getPointAtLength(length));
  }
});
registerMethods(['Element', 'Runner'], {
  // Set font
  font: function (a, v) {
    if (typeof a === 'object') {
      for (v in a) this.font(v, a[v]);
      return this;
    }
    return a === 'leading' ? this.leading(v) : a === 'anchor' ? this.attr('text-anchor', v) : a === 'size' || a === 'family' || a === 'weight' || a === 'stretch' || a === 'variant' || a === 'style' ? this.attr('font-' + a, v) : this.attr(a, v);
  }
});

// Add events to elements
const methods = ['click', 'dblclick', 'mousedown', 'mouseup', 'mouseover', 'mouseout', 'mousemove', 'mouseenter', 'mouseleave', 'touchstart', 'touchmove', 'touchleave', 'touchend', 'touchcancel', 'contextmenu', 'wheel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel'].reduce(function (last, event) {
  // add event to Element
  const fn = function (f) {
    if (f === null) {
      this.off(event);
    } else {
      this.on(event, f);
    }
    return this;
  };
  last[event] = fn;
  return last;
}, {});
registerMethods('Element', methods);

// Reset all transformations
function untransform() {
  return this.attr('transform', null);
}

// merge the whole transformation chain into one matrix and returns it
function matrixify() {
  const matrix = (this.attr('transform') || ''
  // split transformations
  ).split(transforms).slice(0, -1).map(function (str) {
    // generate key => value pairs
    const kv = str.trim().split('(');
    return [kv[0], kv[1].split(delimiter).map(function (str) {
      return parseFloat(str);
    })];
  }).reverse()
  // merge every transformation into one matrix
  .reduce(function (matrix, transform) {
    if (transform[0] === 'matrix') {
      return matrix.lmultiply(Matrix.fromArray(transform[1]));
    }
    return matrix[transform[0]].apply(matrix, transform[1]);
  }, new Matrix());
  return matrix;
}

// add an element to another parent without changing the visual representation on the screen
function toParent(parent, i) {
  if (this === parent) return this;
  if (isDescriptive(this.node)) return this.addTo(parent, i);
  const ctm = this.screenCTM();
  const pCtm = parent.screenCTM().inverse();
  this.addTo(parent, i).untransform().transform(pCtm.multiply(ctm));
  return this;
}

// same as above with parent equals root-svg
function toRoot(i) {
  return this.toParent(this.root(), i);
}

// Add transformations
function transform(o, relative) {
  // Act as a getter if no object was passed
  if (o == null || typeof o === 'string') {
    const decomposed = new Matrix(this).decompose();
    return o == null ? decomposed : decomposed[o];
  }
  if (!Matrix.isMatrixLike(o)) {
    // Set the origin according to the defined transform
    o = {
      ...o,
      origin: getOrigin(o, this)
    };
  }

  // The user can pass a boolean, an Element or an Matrix or nothing
  const cleanRelative = relative === true ? this : relative || false;
  const result = new Matrix(cleanRelative).transform(o);
  return this.attr('transform', result);
}
registerMethods('Element', {
  untransform,
  matrixify,
  toParent,
  toRoot,
  transform
});

class Container extends Element {
  flatten() {
    this.each(function () {
      if (this instanceof Container) {
        return this.flatten().ungroup();
      }
    });
    return this;
  }
  ungroup(parent = this.parent(), index = parent.index(this)) {
    // when parent != this, we want append all elements to the end
    index = index === -1 ? parent.children().length : index;
    this.each(function (i, children) {
      // reverse each
      return children[children.length - i - 1].toParent(parent, index);
    });
    return this.remove();
  }
}
register(Container, 'Container');

class Defs extends Container {
  constructor(node, attrs = node) {
    super(nodeOrNew('defs', node), attrs);
  }
  flatten() {
    return this;
  }
  ungroup() {
    return this;
  }
}
register(Defs, 'Defs');

class Shape extends Element {}
register(Shape, 'Shape');

// Radius x value
function rx(rx) {
  return this.attr('rx', rx);
}

// Radius y value
function ry(ry) {
  return this.attr('ry', ry);
}

// Move over x-axis
function x$3(x) {
  return x == null ? this.cx() - this.rx() : this.cx(x + this.rx());
}

// Move over y-axis
function y$3(y) {
  return y == null ? this.cy() - this.ry() : this.cy(y + this.ry());
}

// Move by center over x-axis
function cx$1(x) {
  return this.attr('cx', x);
}

// Move by center over y-axis
function cy$1(y) {
  return this.attr('cy', y);
}

// Set width of element
function width$2(width) {
  return width == null ? this.rx() * 2 : this.rx(new SVGNumber(width).divide(2));
}

// Set height of element
function height$2(height) {
  return height == null ? this.ry() * 2 : this.ry(new SVGNumber(height).divide(2));
}

var circled = {
  __proto__: null,
  cx: cx$1,
  cy: cy$1,
  height: height$2,
  rx: rx,
  ry: ry,
  width: width$2,
  x: x$3,
  y: y$3
};

class Ellipse extends Shape {
  constructor(node, attrs = node) {
    super(nodeOrNew('ellipse', node), attrs);
  }
  size(width, height) {
    const p = proportionalSize(this, width, height);
    return this.rx(new SVGNumber(p.width).divide(2)).ry(new SVGNumber(p.height).divide(2));
  }
}
extend(Ellipse, circled);
registerMethods('Container', {
  // Create an ellipse
  ellipse: wrapWithAttrCheck(function (width = 0, height = width) {
    return this.put(new Ellipse()).size(width, height).move(0, 0);
  })
});
register(Ellipse, 'Ellipse');

class Fragment extends Dom {
  constructor(node = globals.document.createDocumentFragment()) {
    super(node);
  }

  // Import / Export raw xml
  xml(xmlOrFn, outerXML, ns) {
    if (typeof xmlOrFn === 'boolean') {
      ns = outerXML;
      outerXML = xmlOrFn;
      xmlOrFn = null;
    }

    // because this is a fragment we have to put all elements into a wrapper first
    // before we can get the innerXML from it
    if (xmlOrFn == null || typeof xmlOrFn === 'function') {
      const wrapper = new Dom(create('wrapper', ns));
      wrapper.add(this.node.cloneNode(true));
      return wrapper.xml(false, ns);
    }

    // Act as setter if we got a string
    return super.xml(xmlOrFn, false, ns);
  }
}
register(Fragment, 'Fragment');

function from(x, y) {
  return (this._element || this).type === 'radialGradient' ? this.attr({
    fx: new SVGNumber(x),
    fy: new SVGNumber(y)
  }) : this.attr({
    x1: new SVGNumber(x),
    y1: new SVGNumber(y)
  });
}
function to(x, y) {
  return (this._element || this).type === 'radialGradient' ? this.attr({
    cx: new SVGNumber(x),
    cy: new SVGNumber(y)
  }) : this.attr({
    x2: new SVGNumber(x),
    y2: new SVGNumber(y)
  });
}

var gradiented = {
  __proto__: null,
  from: from,
  to: to
};

class Gradient extends Container {
  constructor(type, attrs) {
    super(nodeOrNew(type + 'Gradient', typeof type === 'string' ? null : type), attrs);
  }

  // custom attr to handle transform
  attr(a, b, c) {
    if (a === 'transform') a = 'gradientTransform';
    return super.attr(a, b, c);
  }
  bbox() {
    return new Box();
  }
  targets() {
    return baseFind('svg [fill*=' + this.id() + ']');
  }

  // Alias string conversion to fill
  toString() {
    return this.url();
  }

  // Update gradient
  update(block) {
    // remove all stops
    this.clear();

    // invoke passed block
    if (typeof block === 'function') {
      block.call(this, this);
    }
    return this;
  }

  // Return the fill id
  url() {
    return 'url(#' + this.id() + ')';
  }
}
extend(Gradient, gradiented);
registerMethods({
  Container: {
    // Create gradient element in defs
    gradient(...args) {
      return this.defs().gradient(...args);
    }
  },
  // define gradient
  Defs: {
    gradient: wrapWithAttrCheck(function (type, block) {
      return this.put(new Gradient(type)).update(block);
    })
  }
});
register(Gradient, 'Gradient');

class Pattern extends Container {
  // Initialize node
  constructor(node, attrs = node) {
    super(nodeOrNew('pattern', node), attrs);
  }

  // custom attr to handle transform
  attr(a, b, c) {
    if (a === 'transform') a = 'patternTransform';
    return super.attr(a, b, c);
  }
  bbox() {
    return new Box();
  }
  targets() {
    return baseFind('svg [fill*=' + this.id() + ']');
  }

  // Alias string conversion to fill
  toString() {
    return this.url();
  }

  // Update pattern by rebuilding
  update(block) {
    // remove content
    this.clear();

    // invoke passed block
    if (typeof block === 'function') {
      block.call(this, this);
    }
    return this;
  }

  // Return the fill id
  url() {
    return 'url(#' + this.id() + ')';
  }
}
registerMethods({
  Container: {
    // Create pattern element in defs
    pattern(...args) {
      return this.defs().pattern(...args);
    }
  },
  Defs: {
    pattern: wrapWithAttrCheck(function (width, height, block) {
      return this.put(new Pattern()).update(block).attr({
        x: 0,
        y: 0,
        width: width,
        height: height,
        patternUnits: 'userSpaceOnUse'
      });
    })
  }
});
register(Pattern, 'Pattern');

class Image extends Shape {
  constructor(node, attrs = node) {
    super(nodeOrNew('image', node), attrs);
  }

  // (re)load image
  load(url, callback) {
    if (!url) return this;
    const img = new globals.window.Image();
    on(img, 'load', function (e) {
      const p = this.parent(Pattern);

      // ensure image size
      if (this.width() === 0 && this.height() === 0) {
        this.size(img.width, img.height);
      }
      if (p instanceof Pattern) {
        // ensure pattern size if not set
        if (p.width() === 0 && p.height() === 0) {
          p.size(this.width(), this.height());
        }
      }
      if (typeof callback === 'function') {
        callback.call(this, e);
      }
    }, this);
    on(img, 'load error', function () {
      // dont forget to unbind memory leaking events
      off(img);
    });
    return this.attr('href', img.src = url, xlink);
  }
}
registerAttrHook(function (attr, val, _this) {
  // convert image fill and stroke to patterns
  if (attr === 'fill' || attr === 'stroke') {
    if (isImage.test(val)) {
      val = _this.root().defs().image(val);
    }
  }
  if (val instanceof Image) {
    val = _this.root().defs().pattern(0, 0, pattern => {
      pattern.add(val);
    });
  }
  return val;
});
registerMethods({
  Container: {
    // create image element, load image and set its size
    image: wrapWithAttrCheck(function (source, callback) {
      return this.put(new Image()).size(0, 0).load(source, callback);
    })
  }
});
register(Image, 'Image');

class PointArray extends SVGArray {
  // Get bounding box of points
  bbox() {
    let maxX = -Infinity;
    let maxY = -Infinity;
    let minX = Infinity;
    let minY = Infinity;
    this.forEach(function (el) {
      maxX = Math.max(el[0], maxX);
      maxY = Math.max(el[1], maxY);
      minX = Math.min(el[0], minX);
      minY = Math.min(el[1], minY);
    });
    return new Box(minX, minY, maxX - minX, maxY - minY);
  }

  // Move point string
  move(x, y) {
    const box = this.bbox();

    // get relative offset
    x -= box.x;
    y -= box.y;

    // move every point
    if (!isNaN(x) && !isNaN(y)) {
      for (let i = this.length - 1; i >= 0; i--) {
        this[i] = [this[i][0] + x, this[i][1] + y];
      }
    }
    return this;
  }

  // Parse point string and flat array
  parse(array = [0, 0]) {
    const points = [];

    // if it is an array, we flatten it and therefore clone it to 1 depths
    if (array instanceof Array) {
      array = Array.prototype.concat.apply([], array);
    } else {
      // Else, it is considered as a string
      // parse points
      array = array.trim().split(delimiter).map(parseFloat);
    }

    // validate points - https://svgwg.org/svg2-draft/shapes.html#DataTypePoints
    // Odd number of coordinates is an error. In such cases, drop the last odd coordinate.
    if (array.length % 2 !== 0) array.pop();

    // wrap points in two-tuples
    for (let i = 0, len = array.length; i < len; i = i + 2) {
      points.push([array[i], array[i + 1]]);
    }
    return points;
  }

  // Resize poly string
  size(width, height) {
    let i;
    const box = this.bbox();

    // recalculate position of all points according to new size
    for (i = this.length - 1; i >= 0; i--) {
      if (box.width) this[i][0] = (this[i][0] - box.x) * width / box.width + box.x;
      if (box.height) this[i][1] = (this[i][1] - box.y) * height / box.height + box.y;
    }
    return this;
  }

  // Convert array to line object
  toLine() {
    return {
      x1: this[0][0],
      y1: this[0][1],
      x2: this[1][0],
      y2: this[1][1]
    };
  }

  // Convert array to string
  toString() {
    const array = [];
    // convert to a poly point string
    for (let i = 0, il = this.length; i < il; i++) {
      array.push(this[i].join(','));
    }
    return array.join(' ');
  }
  transform(m) {
    return this.clone().transformO(m);
  }

  // transform points with matrix (similar to Point.transform)
  transformO(m) {
    if (!Matrix.isMatrixLike(m)) {
      m = new Matrix(m);
    }
    for (let i = this.length; i--;) {
      // Perform the matrix multiplication
      const [x, y] = this[i];
      this[i][0] = m.a * x + m.c * y + m.e;
      this[i][1] = m.b * x + m.d * y + m.f;
    }
    return this;
  }
}

const MorphArray = PointArray;

// Move by left top corner over x-axis
function x$2(x) {
  return x == null ? this.bbox().x : this.move(x, this.bbox().y);
}

// Move by left top corner over y-axis
function y$2(y) {
  return y == null ? this.bbox().y : this.move(this.bbox().x, y);
}

// Set width of element
function width$1(width) {
  const b = this.bbox();
  return width == null ? b.width : this.size(width, b.height);
}

// Set height of element
function height$1(height) {
  const b = this.bbox();
  return height == null ? b.height : this.size(b.width, height);
}

var pointed = {
  __proto__: null,
  MorphArray: MorphArray,
  height: height$1,
  width: width$1,
  x: x$2,
  y: y$2
};

class Line extends Shape {
  // Initialize node
  constructor(node, attrs = node) {
    super(nodeOrNew('line', node), attrs);
  }

  // Get array
  array() {
    return new PointArray([[this.attr('x1'), this.attr('y1')], [this.attr('x2'), this.attr('y2')]]);
  }

  // Move by left top corner
  move(x, y) {
    return this.attr(this.array().move(x, y).toLine());
  }

  // Overwrite native plot() method
  plot(x1, y1, x2, y2) {
    if (x1 == null) {
      return this.array();
    } else if (typeof y1 !== 'undefined') {
      x1 = {
        x1,
        y1,
        x2,
        y2
      };
    } else {
      x1 = new PointArray(x1).toLine();
    }
    return this.attr(x1);
  }

  // Set element size to given width and height
  size(width, height) {
    const p = proportionalSize(this, width, height);
    return this.attr(this.array().size(p.width, p.height).toLine());
  }
}
extend(Line, pointed);
registerMethods({
  Container: {
    // Create a line element
    line: wrapWithAttrCheck(function (...args) {
      // make sure plot is called as a setter
      // x1 is not necessarily a number, it can also be an array, a string and a PointArray
      return Line.prototype.plot.apply(this.put(new Line()), args[0] != null ? args : [0, 0, 0, 0]);
    })
  }
});
register(Line, 'Line');

class Marker extends Container {
  // Initialize node
  constructor(node, attrs = node) {
    super(nodeOrNew('marker', node), attrs);
  }

  // Set height of element
  height(height) {
    return this.attr('markerHeight', height);
  }
  orient(orient) {
    return this.attr('orient', orient);
  }

  // Set marker refX and refY
  ref(x, y) {
    return this.attr('refX', x).attr('refY', y);
  }

  // Return the fill id
  toString() {
    return 'url(#' + this.id() + ')';
  }

  // Update marker
  update(block) {
    // remove all content
    this.clear();

    // invoke passed block
    if (typeof block === 'function') {
      block.call(this, this);
    }
    return this;
  }

  // Set width of element
  width(width) {
    return this.attr('markerWidth', width);
  }
}
registerMethods({
  Container: {
    marker(...args) {
      // Create marker element in defs
      return this.defs().marker(...args);
    }
  },
  Defs: {
    // Create marker
    marker: wrapWithAttrCheck(function (width, height, block) {
      // Set default viewbox to match the width and height, set ref to cx and cy and set orient to auto
      return this.put(new Marker()).size(width, height).ref(width / 2, height / 2).viewbox(0, 0, width, height).attr('orient', 'auto').update(block);
    })
  },
  marker: {
    // Create and attach markers
    marker(marker, width, height, block) {
      let attr = ['marker'];

      // Build attribute name
      if (marker !== 'all') attr.push(marker);
      attr = attr.join('-');

      // Set marker attribute
      marker = arguments[1] instanceof Marker ? arguments[1] : this.defs().marker(width, height, block);
      return this.attr(attr, marker);
    }
  }
});
register(Marker, 'Marker');

/***
Base Class
==========
The base stepper class that will be
***/

function makeSetterGetter(k, f) {
  return function (v) {
    if (v == null) return this[k];
    this[k] = v;
    if (f) f.call(this);
    return this;
  };
}
const easing = {
  '-': function (pos) {
    return pos;
  },
  '<>': function (pos) {
    return -Math.cos(pos * Math.PI) / 2 + 0.5;
  },
  '>': function (pos) {
    return Math.sin(pos * Math.PI / 2);
  },
  '<': function (pos) {
    return -Math.cos(pos * Math.PI / 2) + 1;
  },
  bezier: function (x1, y1, x2, y2) {
    // see https://www.w3.org/TR/css-easing-1/#cubic-bezier-algo
    return function (t) {
      if (t < 0) {
        if (x1 > 0) {
          return y1 / x1 * t;
        } else if (x2 > 0) {
          return y2 / x2 * t;
        } else {
          return 0;
        }
      } else if (t > 1) {
        if (x2 < 1) {
          return (1 - y2) / (1 - x2) * t + (y2 - x2) / (1 - x2);
        } else if (x1 < 1) {
          return (1 - y1) / (1 - x1) * t + (y1 - x1) / (1 - x1);
        } else {
          return 1;
        }
      } else {
        return 3 * t * (1 - t) ** 2 * y1 + 3 * t ** 2 * (1 - t) * y2 + t ** 3;
      }
    };
  },
  // see https://www.w3.org/TR/css-easing-1/#step-timing-function-algo
  steps: function (steps, stepPosition = 'end') {
    // deal with "jump-" prefix
    stepPosition = stepPosition.split('-').reverse()[0];
    let jumps = steps;
    if (stepPosition === 'none') {
      --jumps;
    } else if (stepPosition === 'both') {
      ++jumps;
    }

    // The beforeFlag is essentially useless
    return (t, beforeFlag = false) => {
      // Step is called currentStep in referenced url
      let step = Math.floor(t * steps);
      const jumping = t * step % 1 === 0;
      if (stepPosition === 'start' || stepPosition === 'both') {
        ++step;
      }
      if (beforeFlag && jumping) {
        --step;
      }
      if (t >= 0 && step < 0) {
        step = 0;
      }
      if (t <= 1 && step > jumps) {
        step = jumps;
      }
      return step / jumps;
    };
  }
};
class Stepper {
  done() {
    return false;
  }
}

/***
Easing Functions
================
***/

class Ease extends Stepper {
  constructor(fn = timeline.ease) {
    super();
    this.ease = easing[fn] || fn;
  }
  step(from, to, pos) {
    if (typeof from !== 'number') {
      return pos < 1 ? from : to;
    }
    return from + (to - from) * this.ease(pos);
  }
}

/***
Controller Types
================
***/

class Controller extends Stepper {
  constructor(fn) {
    super();
    this.stepper = fn;
  }
  done(c) {
    return c.done;
  }
  step(current, target, dt, c) {
    return this.stepper(current, target, dt, c);
  }
}
function recalculate() {
  // Apply the default parameters
  const duration = (this._duration || 500) / 1000;
  const overshoot = this._overshoot || 0;

  // Calculate the PID natural response
  const eps = 1e-10;
  const pi = Math.PI;
  const os = Math.log(overshoot / 100 + eps);
  const zeta = -os / Math.sqrt(pi * pi + os * os);
  const wn = 3.9 / (zeta * duration);

  // Calculate the Spring values
  this.d = 2 * zeta * wn;
  this.k = wn * wn;
}
class Spring extends Controller {
  constructor(duration = 500, overshoot = 0) {
    super();
    this.duration(duration).overshoot(overshoot);
  }
  step(current, target, dt, c) {
    if (typeof current === 'string') return current;
    c.done = dt === Infinity;
    if (dt === Infinity) return target;
    if (dt === 0) return current;
    if (dt > 100) dt = 16;
    dt /= 1000;

    // Get the previous velocity
    const velocity = c.velocity || 0;

    // Apply the control to get the new position and store it
    const acceleration = -this.d * velocity - this.k * (current - target);
    const newPosition = current + velocity * dt + acceleration * dt * dt / 2;

    // Store the velocity
    c.velocity = velocity + acceleration * dt;

    // Figure out if we have converged, and if so, pass the value
    c.done = Math.abs(target - newPosition) + Math.abs(velocity) < 0.002;
    return c.done ? target : newPosition;
  }
}
extend(Spring, {
  duration: makeSetterGetter('_duration', recalculate),
  overshoot: makeSetterGetter('_overshoot', recalculate)
});
class PID extends Controller {
  constructor(p = 0.1, i = 0.01, d = 0, windup = 1000) {
    super();
    this.p(p).i(i).d(d).windup(windup);
  }
  step(current, target, dt, c) {
    if (typeof current === 'string') return current;
    c.done = dt === Infinity;
    if (dt === Infinity) return target;
    if (dt === 0) return current;
    const p = target - current;
    let i = (c.integral || 0) + p * dt;
    const d = (p - (c.error || 0)) / dt;
    const windup = this._windup;

    // antiwindup
    if (windup !== false) {
      i = Math.max(-windup, Math.min(i, windup));
    }
    c.error = p;
    c.integral = i;
    c.done = Math.abs(p) < 0.001;
    return c.done ? target : current + (this.P * p + this.I * i + this.D * d);
  }
}
extend(PID, {
  windup: makeSetterGetter('_windup'),
  p: makeSetterGetter('P'),
  i: makeSetterGetter('I'),
  d: makeSetterGetter('D')
});

const segmentParameters = {
  M: 2,
  L: 2,
  H: 1,
  V: 1,
  C: 6,
  S: 4,
  Q: 4,
  T: 2,
  A: 7,
  Z: 0
};
const pathHandlers = {
  M: function (c, p, p0) {
    p.x = p0.x = c[0];
    p.y = p0.y = c[1];
    return ['M', p.x, p.y];
  },
  L: function (c, p) {
    p.x = c[0];
    p.y = c[1];
    return ['L', c[0], c[1]];
  },
  H: function (c, p) {
    p.x = c[0];
    return ['H', c[0]];
  },
  V: function (c, p) {
    p.y = c[0];
    return ['V', c[0]];
  },
  C: function (c, p) {
    p.x = c[4];
    p.y = c[5];
    return ['C', c[0], c[1], c[2], c[3], c[4], c[5]];
  },
  S: function (c, p) {
    p.x = c[2];
    p.y = c[3];
    return ['S', c[0], c[1], c[2], c[3]];
  },
  Q: function (c, p) {
    p.x = c[2];
    p.y = c[3];
    return ['Q', c[0], c[1], c[2], c[3]];
  },
  T: function (c, p) {
    p.x = c[0];
    p.y = c[1];
    return ['T', c[0], c[1]];
  },
  Z: function (c, p, p0) {
    p.x = p0.x;
    p.y = p0.y;
    return ['Z'];
  },
  A: function (c, p) {
    p.x = c[5];
    p.y = c[6];
    return ['A', c[0], c[1], c[2], c[3], c[4], c[5], c[6]];
  }
};
const mlhvqtcsaz = 'mlhvqtcsaz'.split('');
for (let i = 0, il = mlhvqtcsaz.length; i < il; ++i) {
  pathHandlers[mlhvqtcsaz[i]] = function (i) {
    return function (c, p, p0) {
      if (i === 'H') c[0] = c[0] + p.x;else if (i === 'V') c[0] = c[0] + p.y;else if (i === 'A') {
        c[5] = c[5] + p.x;
        c[6] = c[6] + p.y;
      } else {
        for (let j = 0, jl = c.length; j < jl; ++j) {
          c[j] = c[j] + (j % 2 ? p.y : p.x);
        }
      }
      return pathHandlers[i](c, p, p0);
    };
  }(mlhvqtcsaz[i].toUpperCase());
}
function makeAbsolut(parser) {
  const command = parser.segment[0];
  return pathHandlers[command](parser.segment.slice(1), parser.p, parser.p0);
}
function segmentComplete(parser) {
  return parser.segment.length && parser.segment.length - 1 === segmentParameters[parser.segment[0].toUpperCase()];
}
function startNewSegment(parser, token) {
  parser.inNumber && finalizeNumber(parser, false);
  const pathLetter = isPathLetter.test(token);
  if (pathLetter) {
    parser.segment = [token];
  } else {
    const lastCommand = parser.lastCommand;
    const small = lastCommand.toLowerCase();
    const isSmall = lastCommand === small;
    parser.segment = [small === 'm' ? isSmall ? 'l' : 'L' : lastCommand];
  }
  parser.inSegment = true;
  parser.lastCommand = parser.segment[0];
  return pathLetter;
}
function finalizeNumber(parser, inNumber) {
  if (!parser.inNumber) throw new Error('Parser Error');
  parser.number && parser.segment.push(parseFloat(parser.number));
  parser.inNumber = inNumber;
  parser.number = '';
  parser.pointSeen = false;
  parser.hasExponent = false;
  if (segmentComplete(parser)) {
    finalizeSegment(parser);
  }
}
function finalizeSegment(parser) {
  parser.inSegment = false;
  if (parser.absolute) {
    parser.segment = makeAbsolut(parser);
  }
  parser.segments.push(parser.segment);
}
function isArcFlag(parser) {
  if (!parser.segment.length) return false;
  const isArc = parser.segment[0].toUpperCase() === 'A';
  const length = parser.segment.length;
  return isArc && (length === 4 || length === 5);
}
function isExponential(parser) {
  return parser.lastToken.toUpperCase() === 'E';
}
const pathDelimiters = new Set([' ', ',', '\t', '\n', '\r', '\f']);
function pathParser(d, toAbsolute = true) {
  let index = 0;
  let token = '';
  const parser = {
    segment: [],
    inNumber: false,
    number: '',
    lastToken: '',
    inSegment: false,
    segments: [],
    pointSeen: false,
    hasExponent: false,
    absolute: toAbsolute,
    p0: new Point(),
    p: new Point()
  };
  while (parser.lastToken = token, token = d.charAt(index++)) {
    if (!parser.inSegment) {
      if (startNewSegment(parser, token)) {
        continue;
      }
    }
    if (token === '.') {
      if (parser.pointSeen || parser.hasExponent) {
        finalizeNumber(parser, false);
        --index;
        continue;
      }
      parser.inNumber = true;
      parser.pointSeen = true;
      parser.number += token;
      continue;
    }
    if (!isNaN(parseInt(token))) {
      if (parser.number === '0' || isArcFlag(parser)) {
        parser.inNumber = true;
        parser.number = token;
        finalizeNumber(parser, true);
        continue;
      }
      parser.inNumber = true;
      parser.number += token;
      continue;
    }
    if (pathDelimiters.has(token)) {
      if (parser.inNumber) {
        finalizeNumber(parser, false);
      }
      continue;
    }
    if (token === '-' || token === '+') {
      if (parser.inNumber && !isExponential(parser)) {
        finalizeNumber(parser, false);
        --index;
        continue;
      }
      parser.number += token;
      parser.inNumber = true;
      continue;
    }
    if (token.toUpperCase() === 'E') {
      parser.number += token;
      parser.hasExponent = true;
      continue;
    }
    if (isPathLetter.test(token)) {
      if (parser.inNumber) {
        finalizeNumber(parser, false);
      } else if (!segmentComplete(parser)) {
        throw new Error('parser Error');
      } else {
        finalizeSegment(parser);
      }
      --index;
    }
  }
  if (parser.inNumber) {
    finalizeNumber(parser, false);
  }
  if (parser.inSegment && segmentComplete(parser)) {
    finalizeSegment(parser);
  }
  return parser.segments;
}

function arrayToString(a) {
  let s = '';
  for (let i = 0, il = a.length; i < il; i++) {
    s += a[i][0];
    if (a[i][1] != null) {
      s += a[i][1];
      if (a[i][2] != null) {
        s += ' ';
        s += a[i][2];
        if (a[i][3] != null) {
          s += ' ';
          s += a[i][3];
          s += ' ';
          s += a[i][4];
          if (a[i][5] != null) {
            s += ' ';
            s += a[i][5];
            s += ' ';
            s += a[i][6];
            if (a[i][7] != null) {
              s += ' ';
              s += a[i][7];
            }
          }
        }
      }
    }
  }
  return s + ' ';
}
class PathArray extends SVGArray {
  // Get bounding box of path
  bbox() {
    parser().path.setAttribute('d', this.toString());
    return new Box(parser.nodes.path.getBBox());
  }

  // Move path string
  move(x, y) {
    // get bounding box of current situation
    const box = this.bbox();

    // get relative offset
    x -= box.x;
    y -= box.y;
    if (!isNaN(x) && !isNaN(y)) {
      // move every point
      for (let l, i = this.length - 1; i >= 0; i--) {
        l = this[i][0];
        if (l === 'M' || l === 'L' || l === 'T') {
          this[i][1] += x;
          this[i][2] += y;
        } else if (l === 'H') {
          this[i][1] += x;
        } else if (l === 'V') {
          this[i][1] += y;
        } else if (l === 'C' || l === 'S' || l === 'Q') {
          this[i][1] += x;
          this[i][2] += y;
          this[i][3] += x;
          this[i][4] += y;
          if (l === 'C') {
            this[i][5] += x;
            this[i][6] += y;
          }
        } else if (l === 'A') {
          this[i][6] += x;
          this[i][7] += y;
        }
      }
    }
    return this;
  }

  // Absolutize and parse path to array
  parse(d = 'M0 0') {
    if (Array.isArray(d)) {
      d = Array.prototype.concat.apply([], d).toString();
    }
    return pathParser(d);
  }

  // Resize path string
  size(width, height) {
    // get bounding box of current situation
    const box = this.bbox();
    let i, l;

    // If the box width or height is 0 then we ignore
    // transformations on the respective axis
    box.width = box.width === 0 ? 1 : box.width;
    box.height = box.height === 0 ? 1 : box.height;

    // recalculate position of all points according to new size
    for (i = this.length - 1; i >= 0; i--) {
      l = this[i][0];
      if (l === 'M' || l === 'L' || l === 'T') {
        this[i][1] = (this[i][1] - box.x) * width / box.width + box.x;
        this[i][2] = (this[i][2] - box.y) * height / box.height + box.y;
      } else if (l === 'H') {
        this[i][1] = (this[i][1] - box.x) * width / box.width + box.x;
      } else if (l === 'V') {
        this[i][1] = (this[i][1] - box.y) * height / box.height + box.y;
      } else if (l === 'C' || l === 'S' || l === 'Q') {
        this[i][1] = (this[i][1] - box.x) * width / box.width + box.x;
        this[i][2] = (this[i][2] - box.y) * height / box.height + box.y;
        this[i][3] = (this[i][3] - box.x) * width / box.width + box.x;
        this[i][4] = (this[i][4] - box.y) * height / box.height + box.y;
        if (l === 'C') {
          this[i][5] = (this[i][5] - box.x) * width / box.width + box.x;
          this[i][6] = (this[i][6] - box.y) * height / box.height + box.y;
        }
      } else if (l === 'A') {
        // resize radii
        this[i][1] = this[i][1] * width / box.width;
        this[i][2] = this[i][2] * height / box.height;

        // move position values
        this[i][6] = (this[i][6] - box.x) * width / box.width + box.x;
        this[i][7] = (this[i][7] - box.y) * height / box.height + box.y;
      }
    }
    return this;
  }

  // Convert array to string
  toString() {
    return arrayToString(this);
  }
}

const getClassForType = value => {
  const type = typeof value;
  if (type === 'number') {
    return SVGNumber;
  } else if (type === 'string') {
    if (Color.isColor(value)) {
      return Color;
    } else if (delimiter.test(value)) {
      return isPathLetter.test(value) ? PathArray : SVGArray;
    } else if (numberAndUnit.test(value)) {
      return SVGNumber;
    } else {
      return NonMorphable;
    }
  } else if (morphableTypes.indexOf(value.constructor) > -1) {
    return value.constructor;
  } else if (Array.isArray(value)) {
    return SVGArray;
  } else if (type === 'object') {
    return ObjectBag;
  } else {
    return NonMorphable;
  }
};
class Morphable {
  constructor(stepper) {
    this._stepper = stepper || new Ease('-');
    this._from = null;
    this._to = null;
    this._type = null;
    this._context = null;
    this._morphObj = null;
  }
  at(pos) {
    return this._morphObj.morph(this._from, this._to, pos, this._stepper, this._context);
  }
  done() {
    const complete = this._context.map(this._stepper.done).reduce(function (last, curr) {
      return last && curr;
    }, true);
    return complete;
  }
  from(val) {
    if (val == null) {
      return this._from;
    }
    this._from = this._set(val);
    return this;
  }
  stepper(stepper) {
    if (stepper == null) return this._stepper;
    this._stepper = stepper;
    return this;
  }
  to(val) {
    if (val == null) {
      return this._to;
    }
    this._to = this._set(val);
    return this;
  }
  type(type) {
    // getter
    if (type == null) {
      return this._type;
    }

    // setter
    this._type = type;
    return this;
  }
  _set(value) {
    if (!this._type) {
      this.type(getClassForType(value));
    }
    let result = new this._type(value);
    if (this._type === Color) {
      result = this._to ? result[this._to[4]]() : this._from ? result[this._from[4]]() : result;
    }
    if (this._type === ObjectBag) {
      result = this._to ? result.align(this._to) : this._from ? result.align(this._from) : result;
    }
    result = result.toConsumable();
    this._morphObj = this._morphObj || new this._type();
    this._context = this._context || Array.apply(null, Array(result.length)).map(Object).map(function (o) {
      o.done = true;
      return o;
    });
    return result;
  }
}
class NonMorphable {
  constructor(...args) {
    this.init(...args);
  }
  init(val) {
    val = Array.isArray(val) ? val[0] : val;
    this.value = val;
    return this;
  }
  toArray() {
    return [this.value];
  }
  valueOf() {
    return this.value;
  }
}
class TransformBag {
  constructor(...args) {
    this.init(...args);
  }
  init(obj) {
    if (Array.isArray(obj)) {
      obj = {
        scaleX: obj[0],
        scaleY: obj[1],
        shear: obj[2],
        rotate: obj[3],
        translateX: obj[4],
        translateY: obj[5],
        originX: obj[6],
        originY: obj[7]
      };
    }
    Object.assign(this, TransformBag.defaults, obj);
    return this;
  }
  toArray() {
    const v = this;
    return [v.scaleX, v.scaleY, v.shear, v.rotate, v.translateX, v.translateY, v.originX, v.originY];
  }
}
TransformBag.defaults = {
  scaleX: 1,
  scaleY: 1,
  shear: 0,
  rotate: 0,
  translateX: 0,
  translateY: 0,
  originX: 0,
  originY: 0
};
const sortByKey = (a, b) => {
  return a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0;
};
class ObjectBag {
  constructor(...args) {
    this.init(...args);
  }
  align(other) {
    const values = this.values;
    for (let i = 0, il = values.length; i < il; ++i) {
      // If the type is the same we only need to check if the color is in the correct format
      if (values[i + 1] === other[i + 1]) {
        if (values[i + 1] === Color && other[i + 7] !== values[i + 7]) {
          const space = other[i + 7];
          const color = new Color(this.values.splice(i + 3, 5))[space]().toArray();
          this.values.splice(i + 3, 0, ...color);
        }
        i += values[i + 2] + 2;
        continue;
      }
      if (!other[i + 1]) {
        return this;
      }

      // The types differ, so we overwrite the new type with the old one
      // And initialize it with the types default (e.g. black for color or 0 for number)
      const defaultObject = new other[i + 1]().toArray();

      // Than we fix the values array
      const toDelete = values[i + 2] + 3;
      values.splice(i, toDelete, other[i], other[i + 1], other[i + 2], ...defaultObject);
      i += values[i + 2] + 2;
    }
    return this;
  }
  init(objOrArr) {
    this.values = [];
    if (Array.isArray(objOrArr)) {
      this.values = objOrArr.slice();
      return;
    }
    objOrArr = objOrArr || {};
    const entries = [];
    for (const i in objOrArr) {
      const Type = getClassForType(objOrArr[i]);
      const val = new Type(objOrArr[i]).toArray();
      entries.push([i, Type, val.length, ...val]);
    }
    entries.sort(sortByKey);
    this.values = entries.reduce((last, curr) => last.concat(curr), []);
    return this;
  }
  toArray() {
    return this.values;
  }
  valueOf() {
    const obj = {};
    const arr = this.values;

    // for (var i = 0, len = arr.length; i < len; i += 2) {
    while (arr.length) {
      const key = arr.shift();
      const Type = arr.shift();
      const num = arr.shift();
      const values = arr.splice(0, num);
      obj[key] = new Type(values); // .valueOf()
    }
    return obj;
  }
}
const morphableTypes = [NonMorphable, TransformBag, ObjectBag];
function registerMorphableType(type = []) {
  morphableTypes.push(...[].concat(type));
}
function makeMorphable() {
  extend(morphableTypes, {
    to(val) {
      return new Morphable().type(this.constructor).from(this.toArray()) // this.valueOf())
      .to(val);
    },
    fromArray(arr) {
      this.init(arr);
      return this;
    },
    toConsumable() {
      return this.toArray();
    },
    morph(from, to, pos, stepper, context) {
      const mapper = function (i, index) {
        return stepper.step(i, to[index], pos, context[index], context);
      };
      return this.fromArray(from.map(mapper));
    }
  });
}

class Path extends Shape {
  // Initialize node
  constructor(node, attrs = node) {
    super(nodeOrNew('path', node), attrs);
  }

  // Get array
  array() {
    return this._array || (this._array = new PathArray(this.attr('d')));
  }

  // Clear array cache
  clear() {
    delete this._array;
    return this;
  }

  // Set height of element
  height(height) {
    return height == null ? this.bbox().height : this.size(this.bbox().width, height);
  }

  // Move by left top corner
  move(x, y) {
    return this.attr('d', this.array().move(x, y));
  }

  // Plot new path
  plot(d) {
    return d == null ? this.array() : this.clear().attr('d', typeof d === 'string' ? d : this._array = new PathArray(d));
  }

  // Set element size to given width and height
  size(width, height) {
    const p = proportionalSize(this, width, height);
    return this.attr('d', this.array().size(p.width, p.height));
  }

  // Set width of element
  width(width) {
    return width == null ? this.bbox().width : this.size(width, this.bbox().height);
  }

  // Move by left top corner over x-axis
  x(x) {
    return x == null ? this.bbox().x : this.move(x, this.bbox().y);
  }

  // Move by left top corner over y-axis
  y(y) {
    return y == null ? this.bbox().y : this.move(this.bbox().x, y);
  }
}

// Define morphable array
Path.prototype.MorphArray = PathArray;

// Add parent method
registerMethods({
  Container: {
    // Create a wrapped path element
    path: wrapWithAttrCheck(function (d) {
      // make sure plot is called as a setter
      return this.put(new Path()).plot(d || new PathArray());
    })
  }
});
register(Path, 'Path');

// Get array
function array() {
  return this._array || (this._array = new PointArray(this.attr('points')));
}

// Clear array cache
function clear() {
  delete this._array;
  return this;
}

// Move by left top corner
function move$2(x, y) {
  return this.attr('points', this.array().move(x, y));
}

// Plot new path
function plot(p) {
  return p == null ? this.array() : this.clear().attr('points', typeof p === 'string' ? p : this._array = new PointArray(p));
}

// Set element size to given width and height
function size$1(width, height) {
  const p = proportionalSize(this, width, height);
  return this.attr('points', this.array().size(p.width, p.height));
}

var poly = {
  __proto__: null,
  array: array,
  clear: clear,
  move: move$2,
  plot: plot,
  size: size$1
};

class Polygon extends Shape {
  // Initialize node
  constructor(node, attrs = node) {
    super(nodeOrNew('polygon', node), attrs);
  }
}
registerMethods({
  Container: {
    // Create a wrapped polygon element
    polygon: wrapWithAttrCheck(function (p) {
      // make sure plot is called as a setter
      return this.put(new Polygon()).plot(p || new PointArray());
    })
  }
});
extend(Polygon, pointed);
extend(Polygon, poly);
register(Polygon, 'Polygon');

class Polyline extends Shape {
  // Initialize node
  constructor(node, attrs = node) {
    super(nodeOrNew('polyline', node), attrs);
  }
}
registerMethods({
  Container: {
    // Create a wrapped polygon element
    polyline: wrapWithAttrCheck(function (p) {
      // make sure plot is called as a setter
      return this.put(new Polyline()).plot(p || new PointArray());
    })
  }
});
extend(Polyline, pointed);
extend(Polyline, poly);
register(Polyline, 'Polyline');

class Rect extends Shape {
  // Initialize node
  constructor(node, attrs = node) {
    super(nodeOrNew('rect', node), attrs);
  }
}
extend(Rect, {
  rx,
  ry
});
registerMethods({
  Container: {
    // Create a rect element
    rect: wrapWithAttrCheck(function (width, height) {
      return this.put(new Rect()).size(width, height);
    })
  }
});
register(Rect, 'Rect');

class Queue {
  constructor() {
    this._first = null;
    this._last = null;
  }

  // Shows us the first item in the list
  first() {
    return this._first && this._first.value;
  }

  // Shows us the last item in the list
  last() {
    return this._last && this._last.value;
  }
  push(value) {
    // An item stores an id and the provided value
    const item = typeof value.next !== 'undefined' ? value : {
      value: value,
      next: null,
      prev: null
    };

    // Deal with the queue being empty or populated
    if (this._last) {
      item.prev = this._last;
      this._last.next = item;
      this._last = item;
    } else {
      this._last = item;
      this._first = item;
    }

    // Return the current item
    return item;
  }

  // Removes the item that was returned from the push
  remove(item) {
    // Relink the previous item
    if (item.prev) item.prev.next = item.next;
    if (item.next) item.next.prev = item.prev;
    if (item === this._last) this._last = item.prev;
    if (item === this._first) this._first = item.next;

    // Invalidate item
    item.prev = null;
    item.next = null;
  }
  shift() {
    // Check if we have a value
    const remove = this._first;
    if (!remove) return null;

    // If we do, remove it and relink things
    this._first = remove.next;
    if (this._first) this._first.prev = null;
    this._last = this._first ? this._last : null;
    return remove.value;
  }
}

const Animator = {
  nextDraw: null,
  frames: new Queue(),
  timeouts: new Queue(),
  immediates: new Queue(),
  timer: () => globals.window.performance || globals.window.Date,
  transforms: [],
  frame(fn) {
    // Store the node
    const node = Animator.frames.push({
      run: fn
    });

    // Request an animation frame if we don't have one
    if (Animator.nextDraw === null) {
      Animator.nextDraw = globals.window.requestAnimationFrame(Animator._draw);
    }

    // Return the node so we can remove it easily
    return node;
  },
  timeout(fn, delay) {
    delay = delay || 0;

    // Work out when the event should fire
    const time = Animator.timer().now() + delay;

    // Add the timeout to the end of the queue
    const node = Animator.timeouts.push({
      run: fn,
      time: time
    });

    // Request another animation frame if we need one
    if (Animator.nextDraw === null) {
      Animator.nextDraw = globals.window.requestAnimationFrame(Animator._draw);
    }
    return node;
  },
  immediate(fn) {
    // Add the immediate fn to the end of the queue
    const node = Animator.immediates.push(fn);
    // Request another animation frame if we need one
    if (Animator.nextDraw === null) {
      Animator.nextDraw = globals.window.requestAnimationFrame(Animator._draw);
    }
    return node;
  },
  cancelFrame(node) {
    node != null && Animator.frames.remove(node);
  },
  clearTimeout(node) {
    node != null && Animator.timeouts.remove(node);
  },
  cancelImmediate(node) {
    node != null && Animator.immediates.remove(node);
  },
  _draw(now) {
    // Run all the timeouts we can run, if they are not ready yet, add them
    // to the end of the queue immediately! (bad timeouts!!! [sarcasm])
    let nextTimeout = null;
    const lastTimeout = Animator.timeouts.last();
    while (nextTimeout = Animator.timeouts.shift()) {
      // Run the timeout if its time, or push it to the end
      if (now >= nextTimeout.time) {
        nextTimeout.run();
      } else {
        Animator.timeouts.push(nextTimeout);
      }

      // If we hit the last item, we should stop shifting out more items
      if (nextTimeout === lastTimeout) break;
    }

    // Run all of the animation frames
    let nextFrame = null;
    const lastFrame = Animator.frames.last();
    while (nextFrame !== lastFrame && (nextFrame = Animator.frames.shift())) {
      nextFrame.run(now);
    }
    let nextImmediate = null;
    while (nextImmediate = Animator.immediates.shift()) {
      nextImmediate();
    }

    // If we have remaining timeouts or frames, draw until we don't anymore
    Animator.nextDraw = Animator.timeouts.first() || Animator.frames.first() ? globals.window.requestAnimationFrame(Animator._draw) : null;
  }
};

const makeSchedule = function (runnerInfo) {
  const start = runnerInfo.start;
  const duration = runnerInfo.runner.duration();
  const end = start + duration;
  return {
    start: start,
    duration: duration,
    end: end,
    runner: runnerInfo.runner
  };
};
const defaultSource = function () {
  const w = globals.window;
  return (w.performance || w.Date).now();
};
class Timeline extends EventTarget {
  // Construct a new timeline on the given element
  constructor(timeSource = defaultSource) {
    super();
    this._timeSource = timeSource;

    // terminate resets all variables to their initial state
    this.terminate();
  }
  active() {
    return !!this._nextFrame;
  }
  finish() {
    // Go to end and pause
    this.time(this.getEndTimeOfTimeline() + 1);
    return this.pause();
  }

  // Calculates the end of the timeline
  getEndTime() {
    const lastRunnerInfo = this.getLastRunnerInfo();
    const lastDuration = lastRunnerInfo ? lastRunnerInfo.runner.duration() : 0;
    const lastStartTime = lastRunnerInfo ? lastRunnerInfo.start : this._time;
    return lastStartTime + lastDuration;
  }
  getEndTimeOfTimeline() {
    const endTimes = this._runners.map(i => i.start + i.runner.duration());
    return Math.max(0, ...endTimes);
  }
  getLastRunnerInfo() {
    return this.getRunnerInfoById(this._lastRunnerId);
  }
  getRunnerInfoById(id) {
    return this._runners[this._runnerIds.indexOf(id)] || null;
  }
  pause() {
    this._paused = true;
    return this._continue();
  }
  persist(dtOrForever) {
    if (dtOrForever == null) return this._persist;
    this._persist = dtOrForever;
    return this;
  }
  play() {
    // Now make sure we are not paused and continue the animation
    this._paused = false;
    return this.updateTime()._continue();
  }
  reverse(yes) {
    const currentSpeed = this.speed();
    if (yes == null) return this.speed(-currentSpeed);
    const positive = Math.abs(currentSpeed);
    return this.speed(yes ? -positive : positive);
  }

  // schedules a runner on the timeline
  schedule(runner, delay, when) {
    if (runner == null) {
      return this._runners.map(makeSchedule);
    }

    // The start time for the next animation can either be given explicitly,
    // derived from the current timeline time or it can be relative to the
    // last start time to chain animations directly

    let absoluteStartTime = 0;
    const endTime = this.getEndTime();
    delay = delay || 0;

    // Work out when to start the animation
    if (when == null || when === 'last' || when === 'after') {
      // Take the last time and increment
      absoluteStartTime = endTime;
    } else if (when === 'absolute' || when === 'start') {
      absoluteStartTime = delay;
      delay = 0;
    } else if (when === 'now') {
      absoluteStartTime = this._time;
    } else if (when === 'relative') {
      const runnerInfo = this.getRunnerInfoById(runner.id);
      if (runnerInfo) {
        absoluteStartTime = runnerInfo.start + delay;
        delay = 0;
      }
    } else if (when === 'with-last') {
      const lastRunnerInfo = this.getLastRunnerInfo();
      const lastStartTime = lastRunnerInfo ? lastRunnerInfo.start : this._time;
      absoluteStartTime = lastStartTime;
    } else {
      throw new Error('Invalid value for the "when" parameter');
    }

    // Manage runner
    runner.unschedule();
    runner.timeline(this);
    const persist = runner.persist();
    const runnerInfo = {
      persist: persist === null ? this._persist : persist,
      start: absoluteStartTime + delay,
      runner
    };
    this._lastRunnerId = runner.id;
    this._runners.push(runnerInfo);
    this._runners.sort((a, b) => a.start - b.start);
    this._runnerIds = this._runners.map(info => info.runner.id);
    this.updateTime()._continue();
    return this;
  }
  seek(dt) {
    return this.time(this._time + dt);
  }
  source(fn) {
    if (fn == null) return this._timeSource;
    this._timeSource = fn;
    return this;
  }
  speed(speed) {
    if (speed == null) return this._speed;
    this._speed = speed;
    return this;
  }
  stop() {
    // Go to start and pause
    this.time(0);
    return this.pause();
  }
  time(time) {
    if (time == null) return this._time;
    this._time = time;
    return this._continue(true);
  }

  // Remove the runner from this timeline
  unschedule(runner) {
    const index = this._runnerIds.indexOf(runner.id);
    if (index < 0) return this;
    this._runners.splice(index, 1);
    this._runnerIds.splice(index, 1);
    runner.timeline(null);
    return this;
  }

  // Makes sure, that after pausing the time doesn't jump
  updateTime() {
    if (!this.active()) {
      this._lastSourceTime = this._timeSource();
    }
    return this;
  }

  // Checks if we are running and continues the animation
  _continue(immediateStep = false) {
    Animator.cancelFrame(this._nextFrame);
    this._nextFrame = null;
    if (immediateStep) return this._stepImmediate();
    if (this._paused) return this;
    this._nextFrame = Animator.frame(this._step);
    return this;
  }
  _stepFn(immediateStep = false) {
    // Get the time delta from the last time and update the time
    const time = this._timeSource();
    let dtSource = time - this._lastSourceTime;
    if (immediateStep) dtSource = 0;
    const dtTime = this._speed * dtSource + (this._time - this._lastStepTime);
    this._lastSourceTime = time;

    // Only update the time if we use the timeSource.
    // Otherwise use the current time
    if (!immediateStep) {
      // Update the time
      this._time += dtTime;
      this._time = this._time < 0 ? 0 : this._time;
    }
    this._lastStepTime = this._time;
    this.fire('time', this._time);

    // This is for the case that the timeline was seeked so that the time
    // is now before the startTime of the runner. That is why we need to set
    // the runner to position 0

    // FIXME:
    // However, resetting in insertion order leads to bugs. Considering the case,
    // where 2 runners change the same attribute but in different times,
    // resetting both of them will lead to the case where the later defined
    // runner always wins the reset even if the other runner started earlier
    // and therefore should win the attribute battle
    // this can be solved by resetting them backwards
    for (let k = this._runners.length; k--;) {
      // Get and run the current runner and ignore it if its inactive
      const runnerInfo = this._runners[k];
      const runner = runnerInfo.runner;

      // Make sure that we give the actual difference
      // between runner start time and now
      const dtToStart = this._time - runnerInfo.start;

      // Dont run runner if not started yet
      // and try to reset it
      if (dtToStart <= 0) {
        runner.reset();
      }
    }

    // Run all of the runners directly
    let runnersLeft = false;
    for (let i = 0, len = this._runners.length; i < len; i++) {
      // Get and run the current runner and ignore it if its inactive
      const runnerInfo = this._runners[i];
      const runner = runnerInfo.runner;
      let dt = dtTime;

      // Make sure that we give the actual difference
      // between runner start time and now
      const dtToStart = this._time - runnerInfo.start;

      // Dont run runner if not started yet
      if (dtToStart <= 0) {
        runnersLeft = true;
        continue;
      } else if (dtToStart < dt) {
        // Adjust dt to make sure that animation is on point
        dt = dtToStart;
      }
      if (!runner.active()) continue;

      // If this runner is still going, signal that we need another animation
      // frame, otherwise, remove the completed runner
      const finished = runner.step(dt).done;
      if (!finished) {
        runnersLeft = true;
        // continue
      } else if (runnerInfo.persist !== true) {
        // runner is finished. And runner might get removed
        const endTime = runner.duration() - runner.time() + this._time;
        if (endTime + runnerInfo.persist < this._time) {
          // Delete runner and correct index
          runner.unschedule();
          --i;
          --len;
        }
      }
    }

    // Basically: we continue when there are runners right from us in time
    // when -->, and when runners are left from us when <--
    if (runnersLeft && !(this._speed < 0 && this._time === 0) || this._runnerIds.length && this._speed < 0 && this._time > 0) {
      this._continue();
    } else {
      this.pause();
      this.fire('finished');
    }
    return this;
  }
  terminate() {
    // cleanup memory

    // Store the timing variables
    this._startTime = 0;
    this._speed = 1.0;

    // Determines how long a runner is hold in memory. Can be a dt or true/false
    this._persist = 0;

    // Keep track of the running animations and their starting parameters
    this._nextFrame = null;
    this._paused = true;
    this._runners = [];
    this._runnerIds = [];
    this._lastRunnerId = -1;
    this._time = 0;
    this._lastSourceTime = 0;
    this._lastStepTime = 0;

    // Make sure that step is always called in class context
    this._step = this._stepFn.bind(this, false);
    this._stepImmediate = this._stepFn.bind(this, true);
  }
}
registerMethods({
  Element: {
    timeline: function (timeline) {
      if (timeline == null) {
        this._timeline = this._timeline || new Timeline();
        return this._timeline;
      } else {
        this._timeline = timeline;
        return this;
      }
    }
  }
});

class Runner extends EventTarget {
  constructor(options) {
    super();

    // Store a unique id on the runner, so that we can identify it later
    this.id = Runner.id++;

    // Ensure a default value
    options = options == null ? timeline.duration : options;

    // Ensure that we get a controller
    options = typeof options === 'function' ? new Controller(options) : options;

    // Declare all of the variables
    this._element = null;
    this._timeline = null;
    this.done = false;
    this._queue = [];

    // Work out the stepper and the duration
    this._duration = typeof options === 'number' && options;
    this._isDeclarative = options instanceof Controller;
    this._stepper = this._isDeclarative ? options : new Ease();

    // We copy the current values from the timeline because they can change
    this._history = {};

    // Store the state of the runner
    this.enabled = true;
    this._time = 0;
    this._lastTime = 0;

    // At creation, the runner is in reset state
    this._reseted = true;

    // Save transforms applied to this runner
    this.transforms = new Matrix();
    this.transformId = 1;

    // Looping variables
    this._haveReversed = false;
    this._reverse = false;
    this._loopsDone = 0;
    this._swing = false;
    this._wait = 0;
    this._times = 1;
    this._frameId = null;

    // Stores how long a runner is stored after being done
    this._persist = this._isDeclarative ? true : null;
  }
  static sanitise(duration, delay, when) {
    // Initialise the default parameters
    let times = 1;
    let swing = false;
    let wait = 0;
    duration = duration ?? timeline.duration;
    delay = delay ?? timeline.delay;
    when = when || 'last';

    // If we have an object, unpack the values
    if (typeof duration === 'object' && !(duration instanceof Stepper)) {
      delay = duration.delay ?? delay;
      when = duration.when ?? when;
      swing = duration.swing || swing;
      times = duration.times ?? times;
      wait = duration.wait ?? wait;
      duration = duration.duration ?? timeline.duration;
    }
    return {
      duration: duration,
      delay: delay,
      swing: swing,
      times: times,
      wait: wait,
      when: when
    };
  }
  active(enabled) {
    if (enabled == null) return this.enabled;
    this.enabled = enabled;
    return this;
  }

  /*
  Private Methods
  ===============
  Methods that shouldn't be used externally
  */
  addTransform(transform) {
    this.transforms.lmultiplyO(transform);
    return this;
  }
  after(fn) {
    return this.on('finished', fn);
  }
  animate(duration, delay, when) {
    const o = Runner.sanitise(duration, delay, when);
    const runner = new Runner(o.duration);
    if (this._timeline) runner.timeline(this._timeline);
    if (this._element) runner.element(this._element);
    return runner.loop(o).schedule(o.delay, o.when);
  }
  clearTransform() {
    this.transforms = new Matrix();
    return this;
  }

  // TODO: Keep track of all transformations so that deletion is faster
  clearTransformsFromQueue() {
    if (!this.done || !this._timeline || !this._timeline._runnerIds.includes(this.id)) {
      this._queue = this._queue.filter(item => {
        return !item.isTransform;
      });
    }
  }
  delay(delay) {
    return this.animate(0, delay);
  }
  duration() {
    return this._times * (this._wait + this._duration) - this._wait;
  }
  during(fn) {
    return this.queue(null, fn);
  }
  ease(fn) {
    this._stepper = new Ease(fn);
    return this;
  }
  /*
  Runner Definitions
  ==================
  These methods help us define the runtime behaviour of the Runner or they
  help us make new runners from the current runner
  */

  element(element) {
    if (element == null) return this._element;
    this._element = element;
    element._prepareRunner();
    return this;
  }
  finish() {
    return this.step(Infinity);
  }
  loop(times, swing, wait) {
    // Deal with the user passing in an object
    if (typeof times === 'object') {
      swing = times.swing;
      wait = times.wait;
      times = times.times;
    }

    // Sanitise the values and store them
    this._times = times || Infinity;
    this._swing = swing || false;
    this._wait = wait || 0;

    // Allow true to be passed
    if (this._times === true) {
      this._times = Infinity;
    }
    return this;
  }
  loops(p) {
    const loopDuration = this._duration + this._wait;
    if (p == null) {
      const loopsDone = Math.floor(this._time / loopDuration);
      const relativeTime = this._time - loopsDone * loopDuration;
      const position = relativeTime / this._duration;
      return Math.min(loopsDone + position, this._times);
    }
    const whole = Math.floor(p);
    const partial = p % 1;
    const time = loopDuration * whole + this._duration * partial;
    return this.time(time);
  }
  persist(dtOrForever) {
    if (dtOrForever == null) return this._persist;
    this._persist = dtOrForever;
    return this;
  }
  position(p) {
    // Get all of the variables we need
    const x = this._time;
    const d = this._duration;
    const w = this._wait;
    const t = this._times;
    const s = this._swing;
    const r = this._reverse;
    let position;
    if (p == null) {
      /*
      This function converts a time to a position in the range [0, 1]
      The full explanation can be found in this desmos demonstration
        https://www.desmos.com/calculator/u4fbavgche
      The logic is slightly simplified here because we can use booleans
      */

      // Figure out the value without thinking about the start or end time
      const f = function (x) {
        const swinging = s * Math.floor(x % (2 * (w + d)) / (w + d));
        const backwards = swinging && !r || !swinging && r;
        const uncliped = Math.pow(-1, backwards) * (x % (w + d)) / d + backwards;
        const clipped = Math.max(Math.min(uncliped, 1), 0);
        return clipped;
      };

      // Figure out the value by incorporating the start time
      const endTime = t * (w + d) - w;
      position = x <= 0 ? Math.round(f(1e-5)) : x < endTime ? f(x) : Math.round(f(endTime - 1e-5));
      return position;
    }

    // Work out the loops done and add the position to the loops done
    const loopsDone = Math.floor(this.loops());
    const swingForward = s && loopsDone % 2 === 0;
    const forwards = swingForward && !r || r && swingForward;
    position = loopsDone + (forwards ? p : 1 - p);
    return this.loops(position);
  }
  progress(p) {
    if (p == null) {
      return Math.min(1, this._time / this.duration());
    }
    return this.time(p * this.duration());
  }

  /*
  Basic Functionality
  ===================
  These methods allow us to attach basic functions to the runner directly
  */
  queue(initFn, runFn, retargetFn, isTransform) {
    this._queue.push({
      initialiser: initFn || noop,
      runner: runFn || noop,
      retarget: retargetFn,
      isTransform: isTransform,
      initialised: false,
      finished: false
    });
    const timeline = this.timeline();
    timeline && this.timeline()._continue();
    return this;
  }
  reset() {
    if (this._reseted) return this;
    this.time(0);
    this._reseted = true;
    return this;
  }
  reverse(reverse) {
    this._reverse = reverse == null ? !this._reverse : reverse;
    return this;
  }
  schedule(timeline, delay, when) {
    // The user doesn't need to pass a timeline if we already have one
    if (!(timeline instanceof Timeline)) {
      when = delay;
      delay = timeline;
      timeline = this.timeline();
    }

    // If there is no timeline, yell at the user...
    if (!timeline) {
      throw Error('Runner cannot be scheduled without timeline');
    }

    // Schedule the runner on the timeline provided
    timeline.schedule(this, delay, when);
    return this;
  }
  step(dt) {
    // If we are inactive, this stepper just gets skipped
    if (!this.enabled) return this;

    // Update the time and get the new position
    dt = dt == null ? 16 : dt;
    this._time += dt;
    const position = this.position();

    // Figure out if we need to run the stepper in this frame
    const running = this._lastPosition !== position && this._time >= 0;
    this._lastPosition = position;

    // Figure out if we just started
    const duration = this.duration();
    const justStarted = this._lastTime <= 0 && this._time > 0;
    const justFinished = this._lastTime < duration && this._time >= duration;
    this._lastTime = this._time;
    if (justStarted) {
      this.fire('start', this);
    }

    // Work out if the runner is finished set the done flag here so animations
    // know, that they are running in the last step (this is good for
    // transformations which can be merged)
    const declarative = this._isDeclarative;
    this.done = !declarative && !justFinished && this._time >= duration;

    // Runner is running. So its not in reset state anymore
    this._reseted = false;
    let converged = false;
    // Call initialise and the run function
    if (running || declarative) {
      this._initialise(running);

      // clear the transforms on this runner so they dont get added again and again
      this.transforms = new Matrix();
      converged = this._run(declarative ? dt : position);
      this.fire('step', this);
    }
    // correct the done flag here
    // declarative animations itself know when they converged
    this.done = this.done || converged && declarative;
    if (justFinished) {
      this.fire('finished', this);
    }
    return this;
  }

  /*
  Runner animation methods
  ========================
  Control how the animation plays
  */
  time(time) {
    if (time == null) {
      return this._time;
    }
    const dt = time - this._time;
    this.step(dt);
    return this;
  }
  timeline(timeline) {
    // check explicitly for undefined so we can set the timeline to null
    if (typeof timeline === 'undefined') return this._timeline;
    this._timeline = timeline;
    return this;
  }
  unschedule() {
    const timeline = this.timeline();
    timeline && timeline.unschedule(this);
    return this;
  }

  // Run each initialise function in the runner if required
  _initialise(running) {
    // If we aren't running, we shouldn't initialise when not declarative
    if (!running && !this._isDeclarative) return;

    // Loop through all of the initialisers
    for (let i = 0, len = this._queue.length; i < len; ++i) {
      // Get the current initialiser
      const current = this._queue[i];

      // Determine whether we need to initialise
      const needsIt = this._isDeclarative || !current.initialised && running;
      running = !current.finished;

      // Call the initialiser if we need to
      if (needsIt && running) {
        current.initialiser.call(this);
        current.initialised = true;
      }
    }
  }

  // Save a morpher to the morpher list so that we can retarget it later
  _rememberMorpher(method, morpher) {
    this._history[method] = {
      morpher: morpher,
      caller: this._queue[this._queue.length - 1]
    };

    // We have to resume the timeline in case a controller
    // is already done without being ever run
    // This can happen when e.g. this is done:
    //    anim = el.animate(new SVG.Spring)
    // and later
    //    anim.move(...)
    if (this._isDeclarative) {
      const timeline = this.timeline();
      timeline && timeline.play();
    }
  }

  // Try to set the target for a morpher if the morpher exists, otherwise
  // Run each run function for the position or dt given
  _run(positionOrDt) {
    // Run all of the _queue directly
    let allfinished = true;
    for (let i = 0, len = this._queue.length; i < len; ++i) {
      // Get the current function to run
      const current = this._queue[i];

      // Run the function if its not finished, we keep track of the finished
      // flag for the sake of declarative _queue
      const converged = current.runner.call(this, positionOrDt);
      current.finished = current.finished || converged === true;
      allfinished = allfinished && current.finished;
    }

    // We report when all of the constructors are finished
    return allfinished;
  }

  // do nothing and return false
  _tryRetarget(method, target, extra) {
    if (this._history[method]) {
      // if the last method wasn't even initialised, throw it away
      if (!this._history[method].caller.initialised) {
        const index = this._queue.indexOf(this._history[method].caller);
        this._queue.splice(index, 1);
        return false;
      }

      // for the case of transformations, we use the special retarget function
      // which has access to the outer scope
      if (this._history[method].caller.retarget) {
        this._history[method].caller.retarget.call(this, target, extra);
        // for everything else a simple morpher change is sufficient
      } else {
        this._history[method].morpher.to(target);
      }
      this._history[method].caller.finished = false;
      const timeline = this.timeline();
      timeline && timeline.play();
      return true;
    }
    return false;
  }
}
Runner.id = 0;
class FakeRunner {
  constructor(transforms = new Matrix(), id = -1, done = true) {
    this.transforms = transforms;
    this.id = id;
    this.done = done;
  }
  clearTransformsFromQueue() {}
}
extend([Runner, FakeRunner], {
  mergeWith(runner) {
    return new FakeRunner(runner.transforms.lmultiply(this.transforms), runner.id);
  }
});

// FakeRunner.emptyRunner = new FakeRunner()

const lmultiply = (last, curr) => last.lmultiplyO(curr);
const getRunnerTransform = runner => runner.transforms;
function mergeTransforms() {
  // Find the matrix to apply to the element and apply it
  const runners = this._transformationRunners.runners;
  const netTransform = runners.map(getRunnerTransform).reduce(lmultiply, new Matrix());
  this.transform(netTransform);
  this._transformationRunners.merge();
  if (this._transformationRunners.length() === 1) {
    this._frameId = null;
  }
}
class RunnerArray {
  constructor() {
    this.runners = [];
    this.ids = [];
  }
  add(runner) {
    if (this.runners.includes(runner)) return;
    const id = runner.id + 1;
    this.runners.push(runner);
    this.ids.push(id);
    return this;
  }
  clearBefore(id) {
    const deleteCnt = this.ids.indexOf(id + 1) || 1;
    this.ids.splice(0, deleteCnt, 0);
    this.runners.splice(0, deleteCnt, new FakeRunner()).forEach(r => r.clearTransformsFromQueue());
    return this;
  }
  edit(id, newRunner) {
    const index = this.ids.indexOf(id + 1);
    this.ids.splice(index, 1, id + 1);
    this.runners.splice(index, 1, newRunner);
    return this;
  }
  getByID(id) {
    return this.runners[this.ids.indexOf(id + 1)];
  }
  length() {
    return this.ids.length;
  }
  merge() {
    let lastRunner = null;
    for (let i = 0; i < this.runners.length; ++i) {
      const runner = this.runners[i];
      const condition = lastRunner && runner.done && lastRunner.done && (
      // don't merge runner when persisted on timeline
      !runner._timeline || !runner._timeline._runnerIds.includes(runner.id)) && (!lastRunner._timeline || !lastRunner._timeline._runnerIds.includes(lastRunner.id));
      if (condition) {
        // the +1 happens in the function
        this.remove(runner.id);
        const newRunner = runner.mergeWith(lastRunner);
        this.edit(lastRunner.id, newRunner);
        lastRunner = newRunner;
        --i;
      } else {
        lastRunner = runner;
      }
    }
    return this;
  }
  remove(id) {
    const index = this.ids.indexOf(id + 1);
    this.ids.splice(index, 1);
    this.runners.splice(index, 1);
    return this;
  }
}
registerMethods({
  Element: {
    animate(duration, delay, when) {
      const o = Runner.sanitise(duration, delay, when);
      const timeline = this.timeline();
      return new Runner(o.duration).loop(o).element(this).timeline(timeline.play()).schedule(o.delay, o.when);
    },
    delay(by, when) {
      return this.animate(0, by, when);
    },
    // this function searches for all runners on the element and deletes the ones
    // which run before the current one. This is because absolute transformations
    // overwrite anything anyway so there is no need to waste time computing
    // other runners
    _clearTransformRunnersBefore(currentRunner) {
      this._transformationRunners.clearBefore(currentRunner.id);
    },
    _currentTransform(current) {
      return this._transformationRunners.runners
      // we need the equal sign here to make sure, that also transformations
      // on the same runner which execute before the current transformation are
      // taken into account
      .filter(runner => runner.id <= current.id).map(getRunnerTransform).reduce(lmultiply, new Matrix());
    },
    _addRunner(runner) {
      this._transformationRunners.add(runner);

      // Make sure that the runner merge is executed at the very end of
      // all Animator functions. That is why we use immediate here to execute
      // the merge right after all frames are run
      Animator.cancelImmediate(this._frameId);
      this._frameId = Animator.immediate(mergeTransforms.bind(this));
    },
    _prepareRunner() {
      if (this._frameId == null) {
        this._transformationRunners = new RunnerArray().add(new FakeRunner(new Matrix(this)));
      }
    }
  }
});

// Will output the elements from array A that are not in the array B
const difference = (a, b) => a.filter(x => !b.includes(x));
extend(Runner, {
  attr(a, v) {
    return this.styleAttr('attr', a, v);
  },
  // Add animatable styles
  css(s, v) {
    return this.styleAttr('css', s, v);
  },
  styleAttr(type, nameOrAttrs, val) {
    if (typeof nameOrAttrs === 'string') {
      return this.styleAttr(type, {
        [nameOrAttrs]: val
      });
    }
    let attrs = nameOrAttrs;
    if (this._tryRetarget(type, attrs)) return this;
    let morpher = new Morphable(this._stepper).to(attrs);
    let keys = Object.keys(attrs);
    this.queue(function () {
      morpher = morpher.from(this.element()[type](keys));
    }, function (pos) {
      this.element()[type](morpher.at(pos).valueOf());
      return morpher.done();
    }, function (newToAttrs) {
      // Check if any new keys were added
      const newKeys = Object.keys(newToAttrs);
      const differences = difference(newKeys, keys);

      // If their are new keys, initialize them and add them to morpher
      if (differences.length) {
        // Get the values
        const addedFromAttrs = this.element()[type](differences);

        // Get the already initialized values
        const oldFromAttrs = new ObjectBag(morpher.from()).valueOf();

        // Merge old and new
        Object.assign(oldFromAttrs, addedFromAttrs);
        morpher.from(oldFromAttrs);
      }

      // Get the object from the morpher
      const oldToAttrs = new ObjectBag(morpher.to()).valueOf();

      // Merge in new attributes
      Object.assign(oldToAttrs, newToAttrs);

      // Change morpher target
      morpher.to(oldToAttrs);

      // Make sure that we save the work we did so we don't need it to do again
      keys = newKeys;
      attrs = newToAttrs;
    });
    this._rememberMorpher(type, morpher);
    return this;
  },
  zoom(level, point) {
    if (this._tryRetarget('zoom', level, point)) return this;
    let morpher = new Morphable(this._stepper).to(new SVGNumber(level));
    this.queue(function () {
      morpher = morpher.from(this.element().zoom());
    }, function (pos) {
      this.element().zoom(morpher.at(pos), point);
      return morpher.done();
    }, function (newLevel, newPoint) {
      point = newPoint;
      morpher.to(newLevel);
    });
    this._rememberMorpher('zoom', morpher);
    return this;
  },
  /**
   ** absolute transformations
   **/

  //
  // M v -----|-----(D M v = F v)------|----->  T v
  //
  // 1. define the final state (T) and decompose it (once)
  //    t = [tx, ty, the, lam, sy, sx]
  // 2. on every frame: pull the current state of all previous transforms
  //    (M - m can change)
  //   and then write this as m = [tx0, ty0, the0, lam0, sy0, sx0]
  // 3. Find the interpolated matrix F(pos) = m + pos * (t - m)
  //   - Note F(0) = M
  //   - Note F(1) = T
  // 4. Now you get the delta matrix as a result: D = F * inv(M)

  transform(transforms, relative, affine) {
    // If we have a declarative function, we should retarget it if possible
    relative = transforms.relative || relative;
    if (this._isDeclarative && !relative && this._tryRetarget('transform', transforms)) {
      return this;
    }

    // Parse the parameters
    const isMatrix = Matrix.isMatrixLike(transforms);
    affine = transforms.affine != null ? transforms.affine : affine != null ? affine : !isMatrix;

    // Create a morpher and set its type
    const morpher = new Morphable(this._stepper).type(affine ? TransformBag : Matrix);
    let origin;
    let element;
    let current;
    let currentAngle;
    let startTransform;
    function setup() {
      // make sure element and origin is defined
      element = element || this.element();
      origin = origin || getOrigin(transforms, element);
      startTransform = new Matrix(relative ? undefined : element);

      // add the runner to the element so it can merge transformations
      element._addRunner(this);

      // Deactivate all transforms that have run so far if we are absolute
      if (!relative) {
        element._clearTransformRunnersBefore(this);
      }
    }
    function run(pos) {
      // clear all other transforms before this in case something is saved
      // on this runner. We are absolute. We dont need these!
      if (!relative) this.clearTransform();
      const {
        x,
        y
      } = new Point(origin).transform(element._currentTransform(this));
      let target = new Matrix({
        ...transforms,
        origin: [x, y]
      });
      let start = this._isDeclarative && current ? current : startTransform;
      if (affine) {
        target = target.decompose(x, y);
        start = start.decompose(x, y);

        // Get the current and target angle as it was set
        const rTarget = target.rotate;
        const rCurrent = start.rotate;

        // Figure out the shortest path to rotate directly
        const possibilities = [rTarget - 360, rTarget, rTarget + 360];
        const distances = possibilities.map(a => Math.abs(a - rCurrent));
        const shortest = Math.min(...distances);
        const index = distances.indexOf(shortest);
        target.rotate = possibilities[index];
      }
      if (relative) {
        // we have to be careful here not to overwrite the rotation
        // with the rotate method of Matrix
        if (!isMatrix) {
          target.rotate = transforms.rotate || 0;
        }
        if (this._isDeclarative && currentAngle) {
          start.rotate = currentAngle;
        }
      }
      morpher.from(start);
      morpher.to(target);
      const affineParameters = morpher.at(pos);
      currentAngle = affineParameters.rotate;
      current = new Matrix(affineParameters);
      this.addTransform(current);
      element._addRunner(this);
      return morpher.done();
    }
    function retarget(newTransforms) {
      // only get a new origin if it changed since the last call
      if ((newTransforms.origin || 'center').toString() !== (transforms.origin || 'center').toString()) {
        origin = getOrigin(newTransforms, element);
      }

      // overwrite the old transformations with the new ones
      transforms = {
        ...newTransforms,
        origin
      };
    }
    this.queue(setup, run, retarget, true);
    this._isDeclarative && this._rememberMorpher('transform', morpher);
    return this;
  },
  // Animatable x-axis
  x(x) {
    return this._queueNumber('x', x);
  },
  // Animatable y-axis
  y(y) {
    return this._queueNumber('y', y);
  },
  ax(x) {
    return this._queueNumber('ax', x);
  },
  ay(y) {
    return this._queueNumber('ay', y);
  },
  dx(x = 0) {
    return this._queueNumberDelta('x', x);
  },
  dy(y = 0) {
    return this._queueNumberDelta('y', y);
  },
  dmove(x, y) {
    return this.dx(x).dy(y);
  },
  _queueNumberDelta(method, to) {
    to = new SVGNumber(to);

    // Try to change the target if we have this method already registered
    if (this._tryRetarget(method, to)) return this;

    // Make a morpher and queue the animation
    const morpher = new Morphable(this._stepper).to(to);
    let from = null;
    this.queue(function () {
      from = this.element()[method]();
      morpher.from(from);
      morpher.to(from + to);
    }, function (pos) {
      this.element()[method](morpher.at(pos));
      return morpher.done();
    }, function (newTo) {
      morpher.to(from + new SVGNumber(newTo));
    });

    // Register the morpher so that if it is changed again, we can retarget it
    this._rememberMorpher(method, morpher);
    return this;
  },
  _queueObject(method, to) {
    // Try to change the target if we have this method already registered
    if (this._tryRetarget(method, to)) return this;

    // Make a morpher and queue the animation
    const morpher = new Morphable(this._stepper).to(to);
    this.queue(function () {
      morpher.from(this.element()[method]());
    }, function (pos) {
      this.element()[method](morpher.at(pos));
      return morpher.done();
    });

    // Register the morpher so that if it is changed again, we can retarget it
    this._rememberMorpher(method, morpher);
    return this;
  },
  _queueNumber(method, value) {
    return this._queueObject(method, new SVGNumber(value));
  },
  // Animatable center x-axis
  cx(x) {
    return this._queueNumber('cx', x);
  },
  // Animatable center y-axis
  cy(y) {
    return this._queueNumber('cy', y);
  },
  // Add animatable move
  move(x, y) {
    return this.x(x).y(y);
  },
  amove(x, y) {
    return this.ax(x).ay(y);
  },
  // Add animatable center
  center(x, y) {
    return this.cx(x).cy(y);
  },
  // Add animatable size
  size(width, height) {
    // animate bbox based size for all other elements
    let box;
    if (!width || !height) {
      box = this._element.bbox();
    }
    if (!width) {
      width = box.width / box.height * height;
    }
    if (!height) {
      height = box.height / box.width * width;
    }
    return this.width(width).height(height);
  },
  // Add animatable width
  width(width) {
    return this._queueNumber('width', width);
  },
  // Add animatable height
  height(height) {
    return this._queueNumber('height', height);
  },
  // Add animatable plot
  plot(a, b, c, d) {
    // Lines can be plotted with 4 arguments
    if (arguments.length === 4) {
      return this.plot([a, b, c, d]);
    }
    if (this._tryRetarget('plot', a)) return this;
    const morpher = new Morphable(this._stepper).type(this._element.MorphArray).to(a);
    this.queue(function () {
      morpher.from(this._element.array());
    }, function (pos) {
      this._element.plot(morpher.at(pos));
      return morpher.done();
    });
    this._rememberMorpher('plot', morpher);
    return this;
  },
  // Add leading method
  leading(value) {
    return this._queueNumber('leading', value);
  },
  // Add animatable viewbox
  viewbox(x, y, width, height) {
    return this._queueObject('viewbox', new Box(x, y, width, height));
  },
  update(o) {
    if (typeof o !== 'object') {
      return this.update({
        offset: arguments[0],
        color: arguments[1],
        opacity: arguments[2]
      });
    }
    if (o.opacity != null) this.attr('stop-opacity', o.opacity);
    if (o.color != null) this.attr('stop-color', o.color);
    if (o.offset != null) this.attr('offset', o.offset);
    return this;
  }
});
extend(Runner, {
  rx,
  ry,
  from,
  to
});
register(Runner, 'Runner');

class Svg extends Container {
  constructor(node, attrs = node) {
    super(nodeOrNew('svg', node), attrs);
    this.namespace();
  }

  // Creates and returns defs element
  defs() {
    if (!this.isRoot()) return this.root().defs();
    return adopt(this.node.querySelector('defs')) || this.put(new Defs());
  }
  isRoot() {
    return !this.node.parentNode || !(this.node.parentNode instanceof globals.window.SVGElement) && this.node.parentNode.nodeName !== '#document-fragment';
  }

  // Add namespaces
  namespace() {
    if (!this.isRoot()) return this.root().namespace();
    return this.attr({
      xmlns: svg,
      version: '1.1'
    }).attr('xmlns:xlink', xlink, xmlns);
  }
  removeNamespace() {
    return this.attr({
      xmlns: null,
      version: null
    }).attr('xmlns:xlink', null, xmlns).attr('xmlns:svgjs', null, xmlns);
  }

  // Check if this is a root svg
  // If not, call root() from this element
  root() {
    if (this.isRoot()) return this;
    return super.root();
  }
}
registerMethods({
  Container: {
    // Create nested svg document
    nested: wrapWithAttrCheck(function () {
      return this.put(new Svg());
    })
  }
});
register(Svg, 'Svg', true);

class Symbol extends Container {
  // Initialize node
  constructor(node, attrs = node) {
    super(nodeOrNew('symbol', node), attrs);
  }
}
registerMethods({
  Container: {
    symbol: wrapWithAttrCheck(function () {
      return this.put(new Symbol());
    })
  }
});
register(Symbol, 'Symbol');

// Create plain text node
function plain(text) {
  // clear if build mode is disabled
  if (this._build === false) {
    this.clear();
  }

  // create text node
  this.node.appendChild(globals.document.createTextNode(text));
  return this;
}

// Get length of text element
function length() {
  return this.node.getComputedTextLength();
}

// Move over x-axis
// Text is moved by its bounding box
// text-anchor does NOT matter
function x$1(x, box = this.bbox()) {
  if (x == null) {
    return box.x;
  }
  return this.attr('x', this.attr('x') + x - box.x);
}

// Move over y-axis
function y$1(y, box = this.bbox()) {
  if (y == null) {
    return box.y;
  }
  return this.attr('y', this.attr('y') + y - box.y);
}
function move$1(x, y, box = this.bbox()) {
  return this.x(x, box).y(y, box);
}

// Move center over x-axis
function cx(x, box = this.bbox()) {
  if (x == null) {
    return box.cx;
  }
  return this.attr('x', this.attr('x') + x - box.cx);
}

// Move center over y-axis
function cy(y, box = this.bbox()) {
  if (y == null) {
    return box.cy;
  }
  return this.attr('y', this.attr('y') + y - box.cy);
}
function center(x, y, box = this.bbox()) {
  return this.cx(x, box).cy(y, box);
}
function ax(x) {
  return this.attr('x', x);
}
function ay(y) {
  return this.attr('y', y);
}
function amove(x, y) {
  return this.ax(x).ay(y);
}

// Enable / disable build mode
function build(build) {
  this._build = !!build;
  return this;
}

var textable = {
  __proto__: null,
  amove: amove,
  ax: ax,
  ay: ay,
  build: build,
  center: center,
  cx: cx,
  cy: cy,
  length: length,
  move: move$1,
  plain: plain,
  x: x$1,
  y: y$1
};

class Text extends Shape {
  // Initialize node
  constructor(node, attrs = node) {
    super(nodeOrNew('text', node), attrs);
    this.dom.leading = this.dom.leading ?? new SVGNumber(1.3); // store leading value for rebuilding
    this._rebuild = true; // enable automatic updating of dy values
    this._build = false; // disable build mode for adding multiple lines
  }

  // Set / get leading
  leading(value) {
    // act as getter
    if (value == null) {
      return this.dom.leading;
    }

    // act as setter
    this.dom.leading = new SVGNumber(value);
    return this.rebuild();
  }

  // Rebuild appearance type
  rebuild(rebuild) {
    // store new rebuild flag if given
    if (typeof rebuild === 'boolean') {
      this._rebuild = rebuild;
    }

    // define position of all lines
    if (this._rebuild) {
      const self = this;
      let blankLineOffset = 0;
      const leading = this.dom.leading;
      this.each(function (i) {
        if (isDescriptive(this.node)) return;
        const fontSize = globals.window.getComputedStyle(this.node).getPropertyValue('font-size');
        const dy = leading * new SVGNumber(fontSize);
        if (this.dom.newLined) {
          this.attr('x', self.attr('x'));
          if (this.text() === '\n') {
            blankLineOffset += dy;
          } else {
            this.attr('dy', i ? dy + blankLineOffset : 0);
            blankLineOffset = 0;
          }
        }
      });
      this.fire('rebuild');
    }
    return this;
  }

  // overwrite method from parent to set data properly
  setData(o) {
    this.dom = o;
    this.dom.leading = new SVGNumber(o.leading || 1.3);
    return this;
  }
  writeDataToDom() {
    writeDataToDom(this, this.dom, {
      leading: 1.3
    });
    return this;
  }

  // Set the text content
  text(text) {
    // act as getter
    if (text === undefined) {
      const children = this.node.childNodes;
      let firstLine = 0;
      text = '';
      for (let i = 0, len = children.length; i < len; ++i) {
        // skip textPaths - they are no lines
        if (children[i].nodeName === 'textPath' || isDescriptive(children[i])) {
          if (i === 0) firstLine = i + 1;
          continue;
        }

        // add newline if its not the first child and newLined is set to true
        if (i !== firstLine && children[i].nodeType !== 3 && adopt(children[i]).dom.newLined === true) {
          text += '\n';
        }

        // add content of this node
        text += children[i].textContent;
      }
      return text;
    }

    // remove existing content
    this.clear().build(true);
    if (typeof text === 'function') {
      // call block
      text.call(this, this);
    } else {
      // store text and make sure text is not blank
      text = (text + '').split('\n');

      // build new lines
      for (let j = 0, jl = text.length; j < jl; j++) {
        this.newLine(text[j]);
      }
    }

    // disable build mode and rebuild lines
    return this.build(false).rebuild();
  }
}
extend(Text, textable);
registerMethods({
  Container: {
    // Create text element
    text: wrapWithAttrCheck(function (text = '') {
      return this.put(new Text()).text(text);
    }),
    // Create plain text element
    plain: wrapWithAttrCheck(function (text = '') {
      return this.put(new Text()).plain(text);
    })
  }
});
register(Text, 'Text');

class Tspan extends Shape {
  // Initialize node
  constructor(node, attrs = node) {
    super(nodeOrNew('tspan', node), attrs);
    this._build = false; // disable build mode for adding multiple lines
  }

  // Shortcut dx
  dx(dx) {
    return this.attr('dx', dx);
  }

  // Shortcut dy
  dy(dy) {
    return this.attr('dy', dy);
  }

  // Create new line
  newLine() {
    // mark new line
    this.dom.newLined = true;

    // fetch parent
    const text = this.parent();

    // early return in case we are not in a text element
    if (!(text instanceof Text)) {
      return this;
    }
    const i = text.index(this);
    const fontSize = globals.window.getComputedStyle(this.node).getPropertyValue('font-size');
    const dy = text.dom.leading * new SVGNumber(fontSize);

    // apply new position
    return this.dy(i ? dy : 0).attr('x', text.x());
  }

  // Set text content
  text(text) {
    if (text == null) return this.node.textContent + (this.dom.newLined ? '\n' : '');
    if (typeof text === 'function') {
      this.clear().build(true);
      text.call(this, this);
      this.build(false);
    } else {
      this.plain(text);
    }
    return this;
  }
}
extend(Tspan, textable);
registerMethods({
  Tspan: {
    tspan: wrapWithAttrCheck(function (text = '') {
      const tspan = new Tspan();

      // clear if build mode is disabled
      if (!this._build) {
        this.clear();
      }

      // add new tspan
      return this.put(tspan).text(text);
    })
  },
  Text: {
    newLine: function (text = '') {
      return this.tspan(text).newLine();
    }
  }
});
register(Tspan, 'Tspan');

class Circle extends Shape {
  constructor(node, attrs = node) {
    super(nodeOrNew('circle', node), attrs);
  }
  radius(r) {
    return this.attr('r', r);
  }

  // Radius x value
  rx(rx) {
    return this.attr('r', rx);
  }

  // Alias radius x value
  ry(ry) {
    return this.rx(ry);
  }
  size(size) {
    return this.radius(new SVGNumber(size).divide(2));
  }
}
extend(Circle, {
  x: x$3,
  y: y$3,
  cx: cx$1,
  cy: cy$1,
  width: width$2,
  height: height$2
});
registerMethods({
  Container: {
    // Create circle element
    circle: wrapWithAttrCheck(function (size = 0) {
      return this.put(new Circle()).size(size).move(0, 0);
    })
  }
});
register(Circle, 'Circle');

class ClipPath extends Container {
  constructor(node, attrs = node) {
    super(nodeOrNew('clipPath', node), attrs);
  }

  // Unclip all clipped elements and remove itself
  remove() {
    // unclip all targets
    this.targets().forEach(function (el) {
      el.unclip();
    });

    // remove clipPath from parent
    return super.remove();
  }
  targets() {
    return baseFind('svg [clip-path*=' + this.id() + ']');
  }
}
registerMethods({
  Container: {
    // Create clipping element
    clip: wrapWithAttrCheck(function () {
      return this.defs().put(new ClipPath());
    })
  },
  Element: {
    // Distribute clipPath to svg element
    clipper() {
      return this.reference('clip-path');
    },
    clipWith(element) {
      // use given clip or create a new one
      const clipper = element instanceof ClipPath ? element : this.parent().clip().add(element);

      // apply mask
      return this.attr('clip-path', 'url(#' + clipper.id() + ')');
    },
    // Unclip element
    unclip() {
      return this.attr('clip-path', null);
    }
  }
});
register(ClipPath, 'ClipPath');

class ForeignObject extends Element {
  constructor(node, attrs = node) {
    super(nodeOrNew('foreignObject', node), attrs);
  }
}
registerMethods({
  Container: {
    foreignObject: wrapWithAttrCheck(function (width, height) {
      return this.put(new ForeignObject()).size(width, height);
    })
  }
});
register(ForeignObject, 'ForeignObject');

function dmove(dx, dy) {
  this.children().forEach(child => {
    let bbox;

    // We have to wrap this for elements that dont have a bbox
    // e.g. title and other descriptive elements
    try {
      // Get the childs bbox
      // Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=1905039
      // Because bbox for nested svgs returns the contents bbox in the coordinate space of the svg itself (weird!), we cant use bbox for svgs
      // Therefore we have to use getBoundingClientRect. But THAT is broken (as explained in the bug).
      // Funnily enough the broken behavior would work for us but that breaks it in chrome
      // So we have to replicate the broken behavior of FF by just reading the attributes of the svg itself
      bbox = child.node instanceof getWindow().SVGSVGElement ? new Box(child.attr(['x', 'y', 'width', 'height'])) : child.bbox();
    } catch (e) {
      return;
    }

    // Get childs matrix
    const m = new Matrix(child);
    // Translate childs matrix by amount and
    // transform it back into parents space
    const matrix = m.translate(dx, dy).transform(m.inverse());
    // Calculate new x and y from old box
    const p = new Point(bbox.x, bbox.y).transform(matrix);
    // Move element
    child.move(p.x, p.y);
  });
  return this;
}
function dx(dx) {
  return this.dmove(dx, 0);
}
function dy(dy) {
  return this.dmove(0, dy);
}
function height(height, box = this.bbox()) {
  if (height == null) return box.height;
  return this.size(box.width, height, box);
}
function move(x = 0, y = 0, box = this.bbox()) {
  const dx = x - box.x;
  const dy = y - box.y;
  return this.dmove(dx, dy);
}
function size(width, height, box = this.bbox()) {
  const p = proportionalSize(this, width, height, box);
  const scaleX = p.width / box.width;
  const scaleY = p.height / box.height;
  this.children().forEach(child => {
    const o = new Point(box).transform(new Matrix(child).inverse());
    child.scale(scaleX, scaleY, o.x, o.y);
  });
  return this;
}
function width(width, box = this.bbox()) {
  if (width == null) return box.width;
  return this.size(width, box.height, box);
}
function x(x, box = this.bbox()) {
  if (x == null) return box.x;
  return this.move(x, box.y, box);
}
function y(y, box = this.bbox()) {
  if (y == null) return box.y;
  return this.move(box.x, y, box);
}

var containerGeometry = {
  __proto__: null,
  dmove: dmove,
  dx: dx,
  dy: dy,
  height: height,
  move: move,
  size: size,
  width: width,
  x: x,
  y: y
};

class G extends Container {
  constructor(node, attrs = node) {
    super(nodeOrNew('g', node), attrs);
  }
}
extend(G, containerGeometry);
registerMethods({
  Container: {
    // Create a group element
    group: wrapWithAttrCheck(function () {
      return this.put(new G());
    })
  }
});
register(G, 'G');

class A extends Container {
  constructor(node, attrs = node) {
    super(nodeOrNew('a', node), attrs);
  }

  // Link target attribute
  target(target) {
    return this.attr('target', target);
  }

  // Link url
  to(url) {
    return this.attr('href', url, xlink);
  }
}
extend(A, containerGeometry);
registerMethods({
  Container: {
    // Create a hyperlink element
    link: wrapWithAttrCheck(function (url) {
      return this.put(new A()).to(url);
    })
  },
  Element: {
    unlink() {
      const link = this.linker();
      if (!link) return this;
      const parent = link.parent();
      if (!parent) {
        return this.remove();
      }
      const index = parent.index(link);
      parent.add(this, index);
      link.remove();
      return this;
    },
    linkTo(url) {
      // reuse old link if possible
      let link = this.linker();
      if (!link) {
        link = new A();
        this.wrap(link);
      }
      if (typeof url === 'function') {
        url.call(link, link);
      } else {
        link.to(url);
      }
      return this;
    },
    linker() {
      const link = this.parent();
      if (link && link.node.nodeName.toLowerCase() === 'a') {
        return link;
      }
      return null;
    }
  }
});
register(A, 'A');

class Mask extends Container {
  // Initialize node
  constructor(node, attrs = node) {
    super(nodeOrNew('mask', node), attrs);
  }

  // Unmask all masked elements and remove itself
  remove() {
    // unmask all targets
    this.targets().forEach(function (el) {
      el.unmask();
    });

    // remove mask from parent
    return super.remove();
  }
  targets() {
    return baseFind('svg [mask*=' + this.id() + ']');
  }
}
registerMethods({
  Container: {
    mask: wrapWithAttrCheck(function () {
      return this.defs().put(new Mask());
    })
  },
  Element: {
    // Distribute mask to svg element
    masker() {
      return this.reference('mask');
    },
    maskWith(element) {
      // use given mask or create a new one
      const masker = element instanceof Mask ? element : this.parent().mask().add(element);

      // apply mask
      return this.attr('mask', 'url(#' + masker.id() + ')');
    },
    // Unmask element
    unmask() {
      return this.attr('mask', null);
    }
  }
});
register(Mask, 'Mask');

class Stop extends Element {
  constructor(node, attrs = node) {
    super(nodeOrNew('stop', node), attrs);
  }

  // add color stops
  update(o) {
    if (typeof o === 'number' || o instanceof SVGNumber) {
      o = {
        offset: arguments[0],
        color: arguments[1],
        opacity: arguments[2]
      };
    }

    // set attributes
    if (o.opacity != null) this.attr('stop-opacity', o.opacity);
    if (o.color != null) this.attr('stop-color', o.color);
    if (o.offset != null) this.attr('offset', new SVGNumber(o.offset));
    return this;
  }
}
registerMethods({
  Gradient: {
    // Add a color stop
    stop: function (offset, color, opacity) {
      return this.put(new Stop()).update(offset, color, opacity);
    }
  }
});
register(Stop, 'Stop');

function cssRule(selector, rule) {
  if (!selector) return '';
  if (!rule) return selector;
  let ret = selector + '{';
  for (const i in rule) {
    ret += unCamelCase(i) + ':' + rule[i] + ';';
  }
  ret += '}';
  return ret;
}
class Style extends Element {
  constructor(node, attrs = node) {
    super(nodeOrNew('style', node), attrs);
  }
  addText(w = '') {
    this.node.textContent += w;
    return this;
  }
  font(name, src, params = {}) {
    return this.rule('@font-face', {
      fontFamily: name,
      src: src,
      ...params
    });
  }
  rule(selector, obj) {
    return this.addText(cssRule(selector, obj));
  }
}
registerMethods('Dom', {
  style(selector, obj) {
    return this.put(new Style()).rule(selector, obj);
  },
  fontface(name, src, params) {
    return this.put(new Style()).font(name, src, params);
  }
});
register(Style, 'Style');

class TextPath extends Text {
  // Initialize node
  constructor(node, attrs = node) {
    super(nodeOrNew('textPath', node), attrs);
  }

  // return the array of the path track element
  array() {
    const track = this.track();
    return track ? track.array() : null;
  }

  // Plot path if any
  plot(d) {
    const track = this.track();
    let pathArray = null;
    if (track) {
      pathArray = track.plot(d);
    }
    return d == null ? pathArray : this;
  }

  // Get the path element
  track() {
    return this.reference('href');
  }
}
registerMethods({
  Container: {
    textPath: wrapWithAttrCheck(function (text, path) {
      // Convert text to instance if needed
      if (!(text instanceof Text)) {
        text = this.text(text);
      }
      return text.path(path);
    })
  },
  Text: {
    // Create path for text to run on
    path: wrapWithAttrCheck(function (track, importNodes = true) {
      const textPath = new TextPath();

      // if track is a path, reuse it
      if (!(track instanceof Path)) {
        // create path element
        track = this.defs().path(track);
      }

      // link textPath to path and add content
      textPath.attr('href', '#' + track, xlink);

      // Transplant all nodes from text to textPath
      let node;
      if (importNodes) {
        while (node = this.node.firstChild) {
          textPath.node.appendChild(node);
        }
      }

      // add textPath element as child node and return textPath
      return this.put(textPath);
    }),
    // Get the textPath children
    textPath() {
      return this.findOne('textPath');
    }
  },
  Path: {
    // creates a textPath from this path
    text: wrapWithAttrCheck(function (text) {
      // Convert text to instance if needed
      if (!(text instanceof Text)) {
        text = new Text().addTo(this.parent()).text(text);
      }

      // Create textPath from text and path and return
      return text.path(this);
    }),
    targets() {
      return baseFind('svg textPath').filter(node => {
        return (node.attr('href') || '').includes(this.id());
      });

      // Does not work in IE11. Use when IE support is dropped
      // return baseFind('svg textPath[*|href*=' + this.id() + ']')
    }
  }
});
TextPath.prototype.MorphArray = PathArray;
register(TextPath, 'TextPath');

class Use extends Shape {
  constructor(node, attrs = node) {
    super(nodeOrNew('use', node), attrs);
  }

  // Use element as a reference
  use(element, file) {
    // Set lined element
    return this.attr('href', (file || '') + '#' + element, xlink);
  }
}
registerMethods({
  Container: {
    // Create a use element
    use: wrapWithAttrCheck(function (element, file) {
      return this.put(new Use()).use(element, file);
    })
  }
});
register(Use, 'Use');

/* Optional Modules */
const SVG = makeInstance;
extend([Svg, Symbol, Image, Pattern, Marker], getMethodsFor('viewbox'));
extend([Line, Polyline, Polygon, Path], getMethodsFor('marker'));
extend(Text, getMethodsFor('Text'));
extend(Path, getMethodsFor('Path'));
extend(Defs, getMethodsFor('Defs'));
extend([Text, Tspan], getMethodsFor('Tspan'));
extend([Rect, Ellipse, Gradient, Runner], getMethodsFor('radius'));
extend(EventTarget, getMethodsFor('EventTarget'));
extend(Dom, getMethodsFor('Dom'));
extend(Element, getMethodsFor('Element'));
extend(Shape, getMethodsFor('Shape'));
extend([Container, Fragment], getMethodsFor('Container'));
extend(Gradient, getMethodsFor('Gradient'));
extend(Runner, getMethodsFor('Runner'));
List.extend(getMethodNames());
registerMorphableType([SVGNumber, Color, Box, Matrix, SVGArray, PointArray, PathArray, Point]);
makeMorphable();

exports.A = A;
exports.Animator = Animator;
exports.Array = SVGArray;
exports.Box = Box;
exports.Circle = Circle;
exports.ClipPath = ClipPath;
exports.Color = Color;
exports.Container = Container;
exports.Controller = Controller;
exports.Defs = Defs;
exports.Dom = Dom;
exports.Ease = Ease;
exports.Element = Element;
exports.Ellipse = Ellipse;
exports.EventTarget = EventTarget;
exports.ForeignObject = ForeignObject;
exports.Fragment = Fragment;
exports.G = G;
exports.Gradient = Gradient;
exports.Image = Image;
exports.Line = Line;
exports.List = List;
exports.Marker = Marker;
exports.Mask = Mask;
exports.Matrix = Matrix;
exports.Morphable = Morphable;
exports.NonMorphable = NonMorphable;
exports.Number = SVGNumber;
exports.ObjectBag = ObjectBag;
exports.PID = PID;
exports.Path = Path;
exports.PathArray = PathArray;
exports.Pattern = Pattern;
exports.Point = Point;
exports.PointArray = PointArray;
exports.Polygon = Polygon;
exports.Polyline = Polyline;
exports.Queue = Queue;
exports.Rect = Rect;
exports.Runner = Runner;
exports.SVG = SVG;
exports.Shape = Shape;
exports.Spring = Spring;
exports.Stop = Stop;
exports.Style = Style;
exports.Svg = Svg;
exports.Symbol = Symbol;
exports.Text = Text;
exports.TextPath = TextPath;
exports.Timeline = Timeline;
exports.TransformBag = TransformBag;
exports.Tspan = Tspan;
exports.Use = Use;
exports.adopt = adopt;
exports.assignNewId = assignNewId;
exports.clearEvents = clearEvents;
exports.create = create;
exports.defaults = defaults;
exports.dispatch = dispatch;
exports.easing = easing;
exports.eid = eid;
exports.extend = extend;
exports.find = baseFind;
exports.getClass = getClass;
exports.getEventTarget = getEventTarget;
exports.getEvents = getEvents;
exports.getWindow = getWindow;
exports.makeInstance = makeInstance;
exports.makeMorphable = makeMorphable;
exports.mockAdopt = mockAdopt;
exports.namespaces = namespaces;
exports.nodeOrNew = nodeOrNew;
exports.off = off;
exports.on = on;
exports.parser = parser;
exports.regex = regex;
exports.register = register;
exports.registerMorphableType = registerMorphableType;
exports.registerWindow = registerWindow;
exports.restoreWindow = restoreWindow;
exports.root = root;
exports.saveWindow = saveWindow;
exports.utils = utils;
exports.windowEvents = windowEvents;
exports.withWindow = withWindow;
exports.wrapWithAttrCheck = wrapWithAttrCheck;
//# sourceMappingURL=svg.node.cjs.map


/***/ }),

/***/ "./node_modules/svgpath/index.js":
/*!***************************************!*\
  !*** ./node_modules/svgpath/index.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = __webpack_require__(/*! ./lib/svgpath */ "./node_modules/svgpath/lib/svgpath.js");


/***/ }),

/***/ "./node_modules/svgpath/lib/a2c.js":
/*!*****************************************!*\
  !*** ./node_modules/svgpath/lib/a2c.js ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
// Convert an arc to a sequence of cubic bézier curves
//



var TAU = Math.PI * 2;


/* eslint-disable space-infix-ops */

// Calculate an angle between two unit vectors
//
// Since we measure angle between radii of circular arcs,
// we can use simplified math (without length normalization)
//
function unit_vector_angle(ux, uy, vx, vy) {
  var sign = (ux * vy - uy * vx < 0) ? -1 : 1;
  var dot  = ux * vx + uy * vy;

  // Add this to work with arbitrary vectors:
  // dot /= Math.sqrt(ux * ux + uy * uy) * Math.sqrt(vx * vx + vy * vy);

  // rounding errors, e.g. -1.0000000000000002 can screw up this
  if (dot >  1.0) { dot =  1.0; }
  if (dot < -1.0) { dot = -1.0; }

  return sign * Math.acos(dot);
}


// Convert from endpoint to center parameterization,
// see http://www.w3.org/TR/SVG11/implnote.html#ArcImplementationNotes
//
// Return [cx, cy, theta1, delta_theta]
//
function get_arc_center(x1, y1, x2, y2, fa, fs, rx, ry, sin_phi, cos_phi) {
  // Step 1.
  //
  // Moving an ellipse so origin will be the middlepoint between our two
  // points. After that, rotate it to line up ellipse axes with coordinate
  // axes.
  //
  var x1p =  cos_phi*(x1-x2)/2 + sin_phi*(y1-y2)/2;
  var y1p = -sin_phi*(x1-x2)/2 + cos_phi*(y1-y2)/2;

  var rx_sq  =  rx * rx;
  var ry_sq  =  ry * ry;
  var x1p_sq = x1p * x1p;
  var y1p_sq = y1p * y1p;

  // Step 2.
  //
  // Compute coordinates of the centre of this ellipse (cx', cy')
  // in the new coordinate system.
  //
  var radicant = (rx_sq * ry_sq) - (rx_sq * y1p_sq) - (ry_sq * x1p_sq);

  if (radicant < 0) {
    // due to rounding errors it might be e.g. -1.3877787807814457e-17
    radicant = 0;
  }

  radicant /=   (rx_sq * y1p_sq) + (ry_sq * x1p_sq);
  radicant = Math.sqrt(radicant) * (fa === fs ? -1 : 1);

  var cxp = radicant *  rx/ry * y1p;
  var cyp = radicant * -ry/rx * x1p;

  // Step 3.
  //
  // Transform back to get centre coordinates (cx, cy) in the original
  // coordinate system.
  //
  var cx = cos_phi*cxp - sin_phi*cyp + (x1+x2)/2;
  var cy = sin_phi*cxp + cos_phi*cyp + (y1+y2)/2;

  // Step 4.
  //
  // Compute angles (theta1, delta_theta).
  //
  var v1x =  (x1p - cxp) / rx;
  var v1y =  (y1p - cyp) / ry;
  var v2x = (-x1p - cxp) / rx;
  var v2y = (-y1p - cyp) / ry;

  var theta1 = unit_vector_angle(1, 0, v1x, v1y);
  var delta_theta = unit_vector_angle(v1x, v1y, v2x, v2y);

  if (fs === 0 && delta_theta > 0) {
    delta_theta -= TAU;
  }
  if (fs === 1 && delta_theta < 0) {
    delta_theta += TAU;
  }

  return [ cx, cy, theta1, delta_theta ];
}

//
// Approximate one unit arc segment with bézier curves,
// see http://math.stackexchange.com/questions/873224
//
function approximate_unit_arc(theta1, delta_theta) {
  var alpha = 4/3 * Math.tan(delta_theta/4);

  var x1 = Math.cos(theta1);
  var y1 = Math.sin(theta1);
  var x2 = Math.cos(theta1 + delta_theta);
  var y2 = Math.sin(theta1 + delta_theta);

  return [ x1, y1, x1 - y1*alpha, y1 + x1*alpha, x2 + y2*alpha, y2 - x2*alpha, x2, y2 ];
}

module.exports = function a2c(x1, y1, x2, y2, fa, fs, rx, ry, phi) {
  var sin_phi = Math.sin(phi * TAU / 360);
  var cos_phi = Math.cos(phi * TAU / 360);

  // Make sure radii are valid
  //
  var x1p =  cos_phi*(x1-x2)/2 + sin_phi*(y1-y2)/2;
  var y1p = -sin_phi*(x1-x2)/2 + cos_phi*(y1-y2)/2;

  if (x1p === 0 && y1p === 0) {
    // we're asked to draw line to itself
    return [];
  }

  if (rx === 0 || ry === 0) {
    // one of the radii is zero
    return [];
  }


  // Compensate out-of-range radii
  //
  rx = Math.abs(rx);
  ry = Math.abs(ry);

  var lambda = (x1p * x1p) / (rx * rx) + (y1p * y1p) / (ry * ry);
  if (lambda > 1) {
    rx *= Math.sqrt(lambda);
    ry *= Math.sqrt(lambda);
  }


  // Get center parameters (cx, cy, theta1, delta_theta)
  //
  var cc = get_arc_center(x1, y1, x2, y2, fa, fs, rx, ry, sin_phi, cos_phi);

  var result = [];
  var theta1 = cc[2];
  var delta_theta = cc[3];

  // Split an arc to multiple segments, so each segment
  // will be less than τ/4 (= 90°)
  //
  var segments = Math.max(Math.ceil(Math.abs(delta_theta) / (TAU / 4)), 1);
  delta_theta /= segments;

  for (var i = 0; i < segments; i++) {
    result.push(approximate_unit_arc(theta1, delta_theta));
    theta1 += delta_theta;
  }

  // We have a bezier approximation of a unit circle,
  // now need to transform back to the original ellipse
  //
  return result.map(function (curve) {
    for (var i = 0; i < curve.length; i += 2) {
      var x = curve[i + 0];
      var y = curve[i + 1];

      // scale
      x *= rx;
      y *= ry;

      // rotate
      var xp = cos_phi*x - sin_phi*y;
      var yp = sin_phi*x + cos_phi*y;

      // translate
      curve[i + 0] = xp + cc[0];
      curve[i + 1] = yp + cc[1];
    }

    return curve;
  });
};


/***/ }),

/***/ "./node_modules/svgpath/lib/ellipse.js":
/*!*********************************************!*\
  !*** ./node_modules/svgpath/lib/ellipse.js ***!
  \*********************************************/
/***/ ((module) => {

"use strict";


/* eslint-disable space-infix-ops */

// The precision used to consider an ellipse as a circle
//
var epsilon = 0.0000000001;

// To convert degree in radians
//
var torad = Math.PI / 180;

// Class constructor :
//  an ellipse centred at 0 with radii rx,ry and x - axis - angle ax.
//
function Ellipse(rx, ry, ax) {
  if (!(this instanceof Ellipse)) { return new Ellipse(rx, ry, ax); }
  this.rx = rx;
  this.ry = ry;
  this.ax = ax;
}

// Apply a linear transform m to the ellipse
// m is an array representing a matrix :
//    -         -
//   | m[0] m[2] |
//   | m[1] m[3] |
//    -         -
//
Ellipse.prototype.transform = function (m) {
  // We consider the current ellipse as image of the unit circle
  // by first scale(rx,ry) and then rotate(ax) ...
  // So we apply ma =  m x rotate(ax) x scale(rx,ry) to the unit circle.
  var c = Math.cos(this.ax * torad), s = Math.sin(this.ax * torad);
  var ma = [
    this.rx * (m[0]*c + m[2]*s),
    this.rx * (m[1]*c + m[3]*s),
    this.ry * (-m[0]*s + m[2]*c),
    this.ry * (-m[1]*s + m[3]*c)
  ];

  // ma * transpose(ma) = [ J L ]
  //                      [ L K ]
  // L is calculated later (if the image is not a circle)
  var J = ma[0]*ma[0] + ma[2]*ma[2],
      K = ma[1]*ma[1] + ma[3]*ma[3];

  // the discriminant of the characteristic polynomial of ma * transpose(ma)
  var D = ((ma[0]-ma[3])*(ma[0]-ma[3]) + (ma[2]+ma[1])*(ma[2]+ma[1])) *
          ((ma[0]+ma[3])*(ma[0]+ma[3]) + (ma[2]-ma[1])*(ma[2]-ma[1]));

  // the "mean eigenvalue"
  var JK = (J + K) / 2;

  // check if the image is (almost) a circle
  if (D < epsilon * JK) {
    // if it is
    this.rx = this.ry = Math.sqrt(JK);
    this.ax = 0;
    return this;
  }

  // if it is not a circle
  var L = ma[0]*ma[1] + ma[2]*ma[3];

  D = Math.sqrt(D);

  // {l1,l2} = the two eigen values of ma * transpose(ma)
  var l1 = JK + D/2,
      l2 = JK - D/2;
  // the x - axis - rotation angle is the argument of the l1 - eigenvector
  /*eslint-disable indent*/
  this.ax = (Math.abs(L) < epsilon && Math.abs(l1 - K) < epsilon) ?
    90
  :
    Math.atan(Math.abs(L) > Math.abs(l1 - K) ?
      (l1 - J) / L
    :
      L / (l1 - K)
    ) * 180 / Math.PI;
  /*eslint-enable indent*/

  // if ax > 0 => rx = sqrt(l1), ry = sqrt(l2), else exchange axes and ax += 90
  if (this.ax >= 0) {
    // if ax in [0,90]
    this.rx = Math.sqrt(l1);
    this.ry = Math.sqrt(l2);
  } else {
    // if ax in ]-90,0[ => exchange axes
    this.ax += 90;
    this.rx = Math.sqrt(l2);
    this.ry = Math.sqrt(l1);
  }

  return this;
};

// Check if the ellipse is (almost) degenerate, i.e. rx = 0 or ry = 0
//
Ellipse.prototype.isDegenerate = function () {
  return (this.rx < epsilon * this.ry || this.ry < epsilon * this.rx);
};

module.exports = Ellipse;


/***/ }),

/***/ "./node_modules/svgpath/lib/matrix.js":
/*!********************************************!*\
  !*** ./node_modules/svgpath/lib/matrix.js ***!
  \********************************************/
/***/ ((module) => {

"use strict";


// combine 2 matrixes
// m1, m2 - [a, b, c, d, e, g]
//
function combine(m1, m2) {
  return [
    m1[0] * m2[0] + m1[2] * m2[1],
    m1[1] * m2[0] + m1[3] * m2[1],
    m1[0] * m2[2] + m1[2] * m2[3],
    m1[1] * m2[2] + m1[3] * m2[3],
    m1[0] * m2[4] + m1[2] * m2[5] + m1[4],
    m1[1] * m2[4] + m1[3] * m2[5] + m1[5]
  ];
}


function Matrix() {
  if (!(this instanceof Matrix)) { return new Matrix(); }
  this.queue = [];   // list of matrixes to apply
  this.cache = null; // combined matrix cache
}


Matrix.prototype.matrix = function (m) {
  if (m[0] === 1 && m[1] === 0 && m[2] === 0 && m[3] === 1 && m[4] === 0 && m[5] === 0) {
    return this;
  }
  this.cache = null;
  this.queue.push(m);
  return this;
};


Matrix.prototype.translate = function (tx, ty) {
  if (tx !== 0 || ty !== 0) {
    this.cache = null;
    this.queue.push([ 1, 0, 0, 1, tx, ty ]);
  }
  return this;
};


Matrix.prototype.scale = function (sx, sy) {
  if (sx !== 1 || sy !== 1) {
    this.cache = null;
    this.queue.push([ sx, 0, 0, sy, 0, 0 ]);
  }
  return this;
};


Matrix.prototype.rotate = function (angle, rx, ry) {
  var rad, cos, sin;

  if (angle !== 0) {
    this.translate(rx, ry);

    rad = angle * Math.PI / 180;
    cos = Math.cos(rad);
    sin = Math.sin(rad);

    this.queue.push([ cos, sin, -sin, cos, 0, 0 ]);
    this.cache = null;

    this.translate(-rx, -ry);
  }
  return this;
};


Matrix.prototype.skewX = function (angle) {
  if (angle !== 0) {
    this.cache = null;
    this.queue.push([ 1, 0, Math.tan(angle * Math.PI / 180), 1, 0, 0 ]);
  }
  return this;
};


Matrix.prototype.skewY = function (angle) {
  if (angle !== 0) {
    this.cache = null;
    this.queue.push([ 1, Math.tan(angle * Math.PI / 180), 0, 1, 0, 0 ]);
  }
  return this;
};


// Flatten queue
//
Matrix.prototype.toArray = function () {
  if (this.cache) {
    return this.cache;
  }

  if (!this.queue.length) {
    this.cache = [ 1, 0, 0, 1, 0, 0 ];
    return this.cache;
  }

  this.cache = this.queue[0];

  if (this.queue.length === 1) {
    return this.cache;
  }

  for (var i = 1; i < this.queue.length; i++) {
    this.cache = combine(this.cache, this.queue[i]);
  }

  return this.cache;
};


// Apply list of matrixes to (x,y) point.
// If `isRelative` set, `translate` component of matrix will be skipped
//
Matrix.prototype.calc = function (x, y, isRelative) {
  var m;

  // Don't change point on empty transforms queue
  if (!this.queue.length) { return [ x, y ]; }

  // Calculate final matrix, if not exists
  //
  // NB. if you deside to apply transforms to point one-by-one,
  // they should be taken in reverse order

  if (!this.cache) {
    this.cache = this.toArray();
  }

  m = this.cache;

  // Apply matrix to point
  return [
    x * m[0] + y * m[2] + (isRelative ? 0 : m[4]),
    x * m[1] + y * m[3] + (isRelative ? 0 : m[5])
  ];
};


module.exports = Matrix;


/***/ }),

/***/ "./node_modules/svgpath/lib/path_parse.js":
/*!************************************************!*\
  !*** ./node_modules/svgpath/lib/path_parse.js ***!
  \************************************************/
/***/ ((module) => {

"use strict";



var paramCounts = { a: 7, c: 6, h: 1, l: 2, m: 2, r: 4, q: 4, s: 4, t: 2, v: 1, z: 0 };

var SPECIAL_SPACES = [
  0x1680, 0x180E, 0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006,
  0x2007, 0x2008, 0x2009, 0x200A, 0x202F, 0x205F, 0x3000, 0xFEFF
];

function isSpace(ch) {
  return (ch === 0x0A) || (ch === 0x0D) || (ch === 0x2028) || (ch === 0x2029) || // Line terminators
    // White spaces
    (ch === 0x20) || (ch === 0x09) || (ch === 0x0B) || (ch === 0x0C) || (ch === 0xA0) ||
    (ch >= 0x1680 && SPECIAL_SPACES.indexOf(ch) >= 0);
}

function isCommand(code) {
  /*eslint-disable no-bitwise*/
  switch (code | 0x20) {
    case 0x6D/* m */:
    case 0x7A/* z */:
    case 0x6C/* l */:
    case 0x68/* h */:
    case 0x76/* v */:
    case 0x63/* c */:
    case 0x73/* s */:
    case 0x71/* q */:
    case 0x74/* t */:
    case 0x61/* a */:
    case 0x72/* r */:
      return true;
  }
  return false;
}

function isArc(code) {
  return (code | 0x20) === 0x61;
}

function isDigit(code) {
  return (code >= 48 && code <= 57);   // 0..9
}

function isDigitStart(code) {
  return (code >= 48 && code <= 57) || /* 0..9 */
          code === 0x2B || /* + */
          code === 0x2D || /* - */
          code === 0x2E;   /* . */
}


function State(path) {
  this.index  = 0;
  this.path   = path;
  this.max    = path.length;
  this.result = [];
  this.param  = 0.0;
  this.err    = '';
  this.segmentStart = 0;
  this.data   = [];
}

function skipSpaces(state) {
  while (state.index < state.max && isSpace(state.path.charCodeAt(state.index))) {
    state.index++;
  }
}


function scanFlag(state) {
  var ch = state.path.charCodeAt(state.index);

  if (ch === 0x30/* 0 */) {
    state.param = 0;
    state.index++;
    return;
  }

  if (ch === 0x31/* 1 */) {
    state.param = 1;
    state.index++;
    return;
  }

  state.err = 'SvgPath: arc flag can be 0 or 1 only (at pos ' + state.index + ')';
}


function scanParam(state) {
  var start = state.index,
      index = start,
      max = state.max,
      zeroFirst = false,
      hasCeiling = false,
      hasDecimal = false,
      hasDot = false,
      ch;

  if (index >= max) {
    state.err = 'SvgPath: missed param (at pos ' + index + ')';
    return;
  }
  ch = state.path.charCodeAt(index);

  if (ch === 0x2B/* + */ || ch === 0x2D/* - */) {
    index++;
    ch = (index < max) ? state.path.charCodeAt(index) : 0;
  }

  // This logic is shamelessly borrowed from Esprima
  // https://github.com/ariya/esprimas
  //
  if (!isDigit(ch) && ch !== 0x2E/* . */) {
    state.err = 'SvgPath: param should start with 0..9 or `.` (at pos ' + index + ')';
    return;
  }

  if (ch !== 0x2E/* . */) {
    zeroFirst = (ch === 0x30/* 0 */);
    index++;

    ch = (index < max) ? state.path.charCodeAt(index) : 0;

    if (zeroFirst && index < max) {
      // decimal number starts with '0' such as '09' is illegal.
      if (ch && isDigit(ch)) {
        state.err = 'SvgPath: numbers started with `0` such as `09` are illegal (at pos ' + start + ')';
        return;
      }
    }

    while (index < max && isDigit(state.path.charCodeAt(index))) {
      index++;
      hasCeiling = true;
    }
    ch = (index < max) ? state.path.charCodeAt(index) : 0;
  }

  if (ch === 0x2E/* . */) {
    hasDot = true;
    index++;
    while (isDigit(state.path.charCodeAt(index))) {
      index++;
      hasDecimal = true;
    }
    ch = (index < max) ? state.path.charCodeAt(index) : 0;
  }

  if (ch === 0x65/* e */ || ch === 0x45/* E */) {
    if (hasDot && !hasCeiling && !hasDecimal) {
      state.err = 'SvgPath: invalid float exponent (at pos ' + index + ')';
      return;
    }

    index++;

    ch = (index < max) ? state.path.charCodeAt(index) : 0;
    if (ch === 0x2B/* + */ || ch === 0x2D/* - */) {
      index++;
    }
    if (index < max && isDigit(state.path.charCodeAt(index))) {
      while (index < max && isDigit(state.path.charCodeAt(index))) {
        index++;
      }
    } else {
      state.err = 'SvgPath: invalid float exponent (at pos ' + index + ')';
      return;
    }
  }

  state.index = index;
  state.param = parseFloat(state.path.slice(start, index)) + 0.0;
}


function finalizeSegment(state) {
  var cmd, cmdLC;

  // Process duplicated commands (without comand name)

  // This logic is shamelessly borrowed from Raphael
  // https://github.com/DmitryBaranovskiy/raphael/
  //
  cmd   = state.path[state.segmentStart];
  cmdLC = cmd.toLowerCase();

  var params = state.data;

  if (cmdLC === 'm' && params.length > 2) {
    state.result.push([ cmd, params[0], params[1] ]);
    params = params.slice(2);
    cmdLC = 'l';
    cmd = (cmd === 'm') ? 'l' : 'L';
  }

  if (cmdLC === 'r') {
    state.result.push([ cmd ].concat(params));
  } else {

    while (params.length >= paramCounts[cmdLC]) {
      state.result.push([ cmd ].concat(params.splice(0, paramCounts[cmdLC])));
      if (!paramCounts[cmdLC]) {
        break;
      }
    }
  }
}


function scanSegment(state) {
  var max = state.max,
      cmdCode, is_arc, comma_found, need_params, i;

  state.segmentStart = state.index;
  cmdCode = state.path.charCodeAt(state.index);
  is_arc = isArc(cmdCode);

  if (!isCommand(cmdCode)) {
    state.err = 'SvgPath: bad command ' + state.path[state.index] + ' (at pos ' + state.index + ')';
    return;
  }

  need_params = paramCounts[state.path[state.index].toLowerCase()];

  state.index++;
  skipSpaces(state);

  state.data = [];

  if (!need_params) {
    // Z
    finalizeSegment(state);
    return;
  }

  comma_found = false;

  for (;;) {
    for (i = need_params; i > 0; i--) {
      if (is_arc && (i === 3 || i === 4)) scanFlag(state);
      else scanParam(state);

      if (state.err.length) {
        finalizeSegment(state);
        return;
      }
      state.data.push(state.param);

      skipSpaces(state);
      comma_found = false;

      if (state.index < max && state.path.charCodeAt(state.index) === 0x2C/* , */) {
        state.index++;
        skipSpaces(state);
        comma_found = true;
      }
    }

    // after ',' param is mandatory
    if (comma_found) {
      continue;
    }

    if (state.index >= state.max) {
      break;
    }

    // Stop on next segment
    if (!isDigitStart(state.path.charCodeAt(state.index))) {
      break;
    }
  }

  finalizeSegment(state);
}


/* Returns array of segments:
 *
 * [
 *   [ command, coord1, coord2, ... ]
 * ]
 */
module.exports = function pathParse(svgPath) {
  var state = new State(svgPath);
  var max = state.max;

  skipSpaces(state);

  while (state.index < max && !state.err.length) {
    scanSegment(state);
  }

  if (state.result.length) {
    if ('mM'.indexOf(state.result[0][0]) < 0) {
      state.err = 'SvgPath: string should start with `M` or `m`';
      state.result = [];
    } else {
      state.result[0][0] = 'M';
    }
  }

  return {
    err: state.err,
    segments: state.result
  };
};


/***/ }),

/***/ "./node_modules/svgpath/lib/svgpath.js":
/*!*********************************************!*\
  !*** ./node_modules/svgpath/lib/svgpath.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// SVG Path transformations library
//
// Usage:
//
//    SvgPath('...')
//      .translate(-150, -100)
//      .scale(0.5)
//      .translate(-150, -100)
//      .toFixed(1)
//      .toString()
//




var pathParse      = __webpack_require__(/*! ./path_parse */ "./node_modules/svgpath/lib/path_parse.js");
var transformParse = __webpack_require__(/*! ./transform_parse */ "./node_modules/svgpath/lib/transform_parse.js");
var matrix         = __webpack_require__(/*! ./matrix */ "./node_modules/svgpath/lib/matrix.js");
var a2c            = __webpack_require__(/*! ./a2c */ "./node_modules/svgpath/lib/a2c.js");
var ellipse        = __webpack_require__(/*! ./ellipse */ "./node_modules/svgpath/lib/ellipse.js");


// Class constructor
//
function SvgPath(path) {
  if (!(this instanceof SvgPath)) { return new SvgPath(path); }

  var pstate = pathParse(path);

  // Array of path segments.
  // Each segment is array [command, param1, param2, ...]
  this.segments = pstate.segments;

  // Error message on parse error.
  this.err      = pstate.err;

  // Transforms stack for lazy evaluation
  this.__stack    = [];
}

SvgPath.from = function (src) {
  if (typeof src === 'string') return new SvgPath(src);

  if (src instanceof SvgPath) {
    // Create empty object
    var s = new SvgPath('');

    // Clone properies
    s.err = src.err;
    s.segments = src.segments.map(function (sgm) { return sgm.slice(); });
    s.__stack = src.__stack.map(function (m) {
      return matrix().matrix(m.toArray());
    });

    return s;
  }

  throw new Error('SvgPath.from: invalid param type ' + src);
};


SvgPath.prototype.__matrix = function (m) {
  var self = this, i;

  // Quick leave for empty matrix
  if (!m.queue.length) { return; }

  this.iterate(function (s, index, x, y) {
    var p, result, name, isRelative;

    switch (s[0]) {

      // Process 'assymetric' commands separately
      case 'v':
        p      = m.calc(0, s[1], true);
        result = (p[0] === 0) ? [ 'v', p[1] ] : [ 'l', p[0], p[1] ];
        break;

      case 'V':
        p      = m.calc(x, s[1], false);
        result = (p[0] === m.calc(x, y, false)[0]) ? [ 'V', p[1] ] : [ 'L', p[0], p[1] ];
        break;

      case 'h':
        p      = m.calc(s[1], 0, true);
        result = (p[1] === 0) ? [ 'h', p[0] ] : [ 'l', p[0], p[1] ];
        break;

      case 'H':
        p      = m.calc(s[1], y, false);
        result = (p[1] === m.calc(x, y, false)[1]) ? [ 'H', p[0] ] : [ 'L', p[0], p[1] ];
        break;

      case 'a':
      case 'A':
        // ARC is: ['A', rx, ry, x-axis-rotation, large-arc-flag, sweep-flag, x, y]

        // Drop segment if arc is empty (end point === start point)
        /*if ((s[0] === 'A' && s[6] === x && s[7] === y) ||
            (s[0] === 'a' && s[6] === 0 && s[7] === 0)) {
          return [];
        }*/

        // Transform rx, ry and the x-axis-rotation
        var ma = m.toArray();
        var e = ellipse(s[1], s[2], s[3]).transform(ma);

        // flip sweep-flag if matrix is not orientation-preserving
        if (ma[0] * ma[3] - ma[1] * ma[2] < 0) {
          s[5] = s[5] ? '0' : '1';
        }

        // Transform end point as usual (without translation for relative notation)
        p = m.calc(s[6], s[7], s[0] === 'a');

        // Empty arcs can be ignored by renderer, but should not be dropped
        // to avoid collisions with `S A S` and so on. Replace with empty line.
        if ((s[0] === 'A' && s[6] === x && s[7] === y) ||
            (s[0] === 'a' && s[6] === 0 && s[7] === 0)) {
          result = [ s[0] === 'a' ? 'l' : 'L', p[0], p[1] ];
          break;
        }

        // if the resulting ellipse is (almost) a segment ...
        if (e.isDegenerate()) {
          // replace the arc by a line
          result = [ s[0] === 'a' ? 'l' : 'L', p[0], p[1] ];
        } else {
          // if it is a real ellipse
          // s[0], s[4] and s[5] are not modified
          result = [ s[0], e.rx, e.ry, e.ax, s[4], s[5], p[0], p[1] ];
        }

        break;

      case 'm':
        // Edge case. The very first `m` should be processed as absolute, if happens.
        // Make sense for coord shift transforms.
        isRelative = index > 0;

        p = m.calc(s[1], s[2], isRelative);
        result = [ 'm', p[0], p[1] ];
        break;

      default:
        name       = s[0];
        result     = [ name ];
        isRelative = (name.toLowerCase() === name);

        // Apply transformations to the segment
        for (i = 1; i < s.length; i += 2) {
          p = m.calc(s[i], s[i + 1], isRelative);
          result.push(p[0], p[1]);
        }
    }

    self.segments[index] = result;
  }, true);
};


// Apply stacked commands
//
SvgPath.prototype.__evaluateStack = function () {
  var m, i;

  if (!this.__stack.length) { return; }

  if (this.__stack.length === 1) {
    this.__matrix(this.__stack[0]);
    this.__stack = [];
    return;
  }

  m = matrix();
  i = this.__stack.length;

  while (--i >= 0) {
    m.matrix(this.__stack[i].toArray());
  }

  this.__matrix(m);
  this.__stack = [];
};


// Convert processed SVG Path back to string
//
SvgPath.prototype.toString = function () {
  var result = '', prevCmd = '', cmdSkipped = false;

  this.__evaluateStack();

  for (var i = 0, len = this.segments.length; i < len; i++) {
    var segment = this.segments[i];
    var cmd = segment[0];

    // Command not repeating => store
    if (cmd !== prevCmd || cmd === 'm' || cmd === 'M') {
      // workaround for FontForge SVG importing bug, keep space between "z m".
      if (cmd === 'm' && prevCmd === 'z') result += ' ';
      result += cmd;

      cmdSkipped = false;
    } else {
      cmdSkipped = true;
    }

    // Store segment params
    for (var pos = 1; pos < segment.length; pos++) {
      var val = segment[pos];
      // Space can be skipped
      // 1. After command (always)
      // 2. For negative value (with '-' at start)
      if (pos === 1) {
        if (cmdSkipped && val >= 0) result += ' ';
      } else if (val >= 0) result += ' ';

      result += val;
    }

    prevCmd = cmd;
  }

  return result;
};


// Translate path to (x [, y])
//
SvgPath.prototype.translate = function (x, y) {
  this.__stack.push(matrix().translate(x, y || 0));
  return this;
};


// Scale path to (sx [, sy])
// sy = sx if not defined
//
SvgPath.prototype.scale = function (sx, sy) {
  this.__stack.push(matrix().scale(sx, (!sy && (sy !== 0)) ? sx : sy));
  return this;
};


// Rotate path around point (sx [, sy])
// sy = sx if not defined
//
SvgPath.prototype.rotate = function (angle, rx, ry) {
  this.__stack.push(matrix().rotate(angle, rx || 0, ry || 0));
  return this;
};


// Skew path along the X axis by `degrees` angle
//
SvgPath.prototype.skewX = function (degrees) {
  this.__stack.push(matrix().skewX(degrees));
  return this;
};


// Skew path along the Y axis by `degrees` angle
//
SvgPath.prototype.skewY = function (degrees) {
  this.__stack.push(matrix().skewY(degrees));
  return this;
};


// Apply matrix transform (array of 6 elements)
//
SvgPath.prototype.matrix = function (m) {
  this.__stack.push(matrix().matrix(m));
  return this;
};


// Transform path according to "transform" attr of SVG spec
//
SvgPath.prototype.transform = function (transformString) {
  if (!transformString.trim()) {
    return this;
  }
  this.__stack.push(transformParse(transformString));
  return this;
};


// Round coords with given decimal precition.
// 0 by default (to integers)
//
SvgPath.prototype.round = function (d) {
  var contourStartDeltaX = 0, contourStartDeltaY = 0, deltaX = 0, deltaY = 0, l;

  d = d || 0;

  this.__evaluateStack();

  this.segments.forEach(function (s) {
    var isRelative = (s[0].toLowerCase() === s[0]);

    switch (s[0]) {
      case 'H':
      case 'h':
        if (isRelative) { s[1] += deltaX; }
        deltaX = s[1] - s[1].toFixed(d);
        s[1] = +s[1].toFixed(d);
        return;

      case 'V':
      case 'v':
        if (isRelative) { s[1] += deltaY; }
        deltaY = s[1] - s[1].toFixed(d);
        s[1] = +s[1].toFixed(d);
        return;

      case 'Z':
      case 'z':
        deltaX = contourStartDeltaX;
        deltaY = contourStartDeltaY;
        return;

      case 'M':
      case 'm':
        if (isRelative) {
          s[1] += deltaX;
          s[2] += deltaY;
        }

        deltaX = s[1] - s[1].toFixed(d);
        deltaY = s[2] - s[2].toFixed(d);

        contourStartDeltaX = deltaX;
        contourStartDeltaY = deltaY;

        s[1] = +s[1].toFixed(d);
        s[2] = +s[2].toFixed(d);
        return;

      case 'A':
      case 'a':
        // [cmd, rx, ry, x-axis-rotation, large-arc-flag, sweep-flag, x, y]
        if (isRelative) {
          s[6] += deltaX;
          s[7] += deltaY;
        }

        deltaX = s[6] - s[6].toFixed(d);
        deltaY = s[7] - s[7].toFixed(d);

        s[1] = +s[1].toFixed(d);
        s[2] = +s[2].toFixed(d);
        s[3] = +s[3].toFixed(d + 2); // better precision for rotation
        s[6] = +s[6].toFixed(d);
        s[7] = +s[7].toFixed(d);
        return;

      default:
        // a c l q s t
        l = s.length;

        if (isRelative) {
          s[l - 2] += deltaX;
          s[l - 1] += deltaY;
        }

        deltaX = s[l - 2] - s[l - 2].toFixed(d);
        deltaY = s[l - 1] - s[l - 1].toFixed(d);

        s.forEach(function (val, i) {
          if (!i) { return; }
          s[i] = +s[i].toFixed(d);
        });
        return;
    }
  });

  return this;
};


// Apply iterator function to all segments. If function returns result,
// current segment will be replaced to array of returned segments.
// If empty array is returned, current regment will be deleted.
//
SvgPath.prototype.iterate = function (iterator, keepLazyStack) {
  var segments = this.segments,
      replacements = {},
      needReplace = false,
      lastX = 0,
      lastY = 0,
      countourStartX = 0,
      countourStartY = 0;
  var i, j, newSegments;

  if (!keepLazyStack) {
    this.__evaluateStack();
  }

  segments.forEach(function (s, index) {

    var res = iterator(s, index, lastX, lastY);

    if (Array.isArray(res)) {
      replacements[index] = res;
      needReplace = true;
    }

    var isRelative = (s[0] === s[0].toLowerCase());

    // calculate absolute X and Y
    switch (s[0]) {
      case 'm':
      case 'M':
        lastX = s[1] + (isRelative ? lastX : 0);
        lastY = s[2] + (isRelative ? lastY : 0);
        countourStartX = lastX;
        countourStartY = lastY;
        return;

      case 'h':
      case 'H':
        lastX = s[1] + (isRelative ? lastX : 0);
        return;

      case 'v':
      case 'V':
        lastY = s[1] + (isRelative ? lastY : 0);
        return;

      case 'z':
      case 'Z':
        // That make sence for multiple contours
        lastX = countourStartX;
        lastY = countourStartY;
        return;

      default:
        lastX = s[s.length - 2] + (isRelative ? lastX : 0);
        lastY = s[s.length - 1] + (isRelative ? lastY : 0);
    }
  });

  // Replace segments if iterator return results

  if (!needReplace) { return this; }

  newSegments = [];

  for (i = 0; i < segments.length; i++) {
    if (typeof replacements[i] !== 'undefined') {
      for (j = 0; j < replacements[i].length; j++) {
        newSegments.push(replacements[i][j]);
      }
    } else {
      newSegments.push(segments[i]);
    }
  }

  this.segments = newSegments;

  return this;
};


// Converts segments from relative to absolute
//
SvgPath.prototype.abs = function () {

  this.iterate(function (s, index, x, y) {
    var name = s[0],
        nameUC = name.toUpperCase(),
        i;

    // Skip absolute commands
    if (name === nameUC) { return; }

    s[0] = nameUC;

    switch (name) {
      case 'v':
        // v has shifted coords parity
        s[1] += y;
        return;

      case 'a':
        // ARC is: ['A', rx, ry, x-axis-rotation, large-arc-flag, sweep-flag, x, y]
        // touch x, y only
        s[6] += x;
        s[7] += y;
        return;

      default:
        for (i = 1; i < s.length; i++) {
          s[i] += i % 2 ? x : y; // odd values are X, even - Y
        }
    }
  }, true);

  return this;
};


// Converts segments from absolute to relative
//
SvgPath.prototype.rel = function () {

  this.iterate(function (s, index, x, y) {
    var name = s[0],
        nameLC = name.toLowerCase(),
        i;

    // Skip relative commands
    if (name === nameLC) { return; }

    // Don't touch the first M to avoid potential confusions.
    if (index === 0 && name === 'M') { return; }

    s[0] = nameLC;

    switch (name) {
      case 'V':
        // V has shifted coords parity
        s[1] -= y;
        return;

      case 'A':
        // ARC is: ['A', rx, ry, x-axis-rotation, large-arc-flag, sweep-flag, x, y]
        // touch x, y only
        s[6] -= x;
        s[7] -= y;
        return;

      default:
        for (i = 1; i < s.length; i++) {
          s[i] -= i % 2 ? x : y; // odd values are X, even - Y
        }
    }
  }, true);

  return this;
};


// Converts arcs to cubic bézier curves
//
SvgPath.prototype.unarc = function () {
  this.iterate(function (s, index, x, y) {
    var new_segments, nextX, nextY, result = [], name = s[0];

    // Skip anything except arcs
    if (name !== 'A' && name !== 'a') { return null; }

    if (name === 'a') {
      // convert relative arc coordinates to absolute
      nextX = x + s[6];
      nextY = y + s[7];
    } else {
      nextX = s[6];
      nextY = s[7];
    }

    new_segments = a2c(x, y, nextX, nextY, s[4], s[5], s[1], s[2], s[3]);

    // Degenerated arcs can be ignored by renderer, but should not be dropped
    // to avoid collisions with `S A S` and so on. Replace with empty line.
    if (new_segments.length === 0) {
      return [ [ s[0] === 'a' ? 'l' : 'L', s[6], s[7] ] ];
    }

    new_segments.forEach(function (s) {
      result.push([ 'C', s[2], s[3], s[4], s[5], s[6], s[7] ]);
    });

    return result;
  });

  return this;
};


// Converts smooth curves (with missed control point) to generic curves
//
SvgPath.prototype.unshort = function () {
  var segments = this.segments;
  var prevControlX, prevControlY, prevSegment;
  var curControlX, curControlY;

  // TODO: add lazy evaluation flag when relative commands supported

  this.iterate(function (s, idx, x, y) {
    var name = s[0], nameUC = name.toUpperCase(), isRelative;

    // First command MUST be M|m, it's safe to skip.
    // Protect from access to [-1] for sure.
    if (!idx) { return; }

    if (nameUC === 'T') { // quadratic curve
      isRelative = (name === 't');

      prevSegment = segments[idx - 1];

      if (prevSegment[0] === 'Q') {
        prevControlX = prevSegment[1] - x;
        prevControlY = prevSegment[2] - y;
      } else if (prevSegment[0] === 'q') {
        prevControlX = prevSegment[1] - prevSegment[3];
        prevControlY = prevSegment[2] - prevSegment[4];
      } else {
        prevControlX = 0;
        prevControlY = 0;
      }

      curControlX = -prevControlX;
      curControlY = -prevControlY;

      if (!isRelative) {
        curControlX += x;
        curControlY += y;
      }

      segments[idx] = [
        isRelative ? 'q' : 'Q',
        curControlX, curControlY,
        s[1], s[2]
      ];

    } else if (nameUC === 'S') { // cubic curve
      isRelative = (name === 's');

      prevSegment = segments[idx - 1];

      if (prevSegment[0] === 'C') {
        prevControlX = prevSegment[3] - x;
        prevControlY = prevSegment[4] - y;
      } else if (prevSegment[0] === 'c') {
        prevControlX = prevSegment[3] - prevSegment[5];
        prevControlY = prevSegment[4] - prevSegment[6];
      } else {
        prevControlX = 0;
        prevControlY = 0;
      }

      curControlX = -prevControlX;
      curControlY = -prevControlY;

      if (!isRelative) {
        curControlX += x;
        curControlY += y;
      }

      segments[idx] = [
        isRelative ? 'c' : 'C',
        curControlX, curControlY,
        s[1], s[2], s[3], s[4]
      ];
    }
  });

  return this;
};


module.exports = SvgPath;


/***/ }),

/***/ "./node_modules/svgpath/lib/transform_parse.js":
/*!*****************************************************!*\
  !*** ./node_modules/svgpath/lib/transform_parse.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";



var Matrix = __webpack_require__(/*! ./matrix */ "./node_modules/svgpath/lib/matrix.js");

var operations = {
  matrix: true,
  scale: true,
  rotate: true,
  translate: true,
  skewX: true,
  skewY: true
};

var CMD_SPLIT_RE    = /\s*(matrix|translate|scale|rotate|skewX|skewY)\s*\(\s*(.+?)\s*\)[\s,]*/;
var PARAMS_SPLIT_RE = /[\s,]+/;


module.exports = function transformParse(transformString) {
  var matrix = new Matrix();
  var cmd, params;

  // Split value into ['', 'translate', '10 50', '', 'scale', '2', '', 'rotate',  '-45', '']
  transformString.split(CMD_SPLIT_RE).forEach(function (item) {

    // Skip empty elements
    if (!item.length) { return; }

    // remember operation
    if (typeof operations[item] !== 'undefined') {
      cmd = item;
      return;
    }

    // extract params & att operation to matrix
    params = item.split(PARAMS_SPLIT_RE).map(function (i) {
      return +i || 0;
    });

    // If params count is not correct - ignore command
    switch (cmd) {
      case 'matrix':
        if (params.length === 6) {
          matrix.matrix(params);
        }
        return;

      case 'scale':
        if (params.length === 1) {
          matrix.scale(params[0], params[0]);
        } else if (params.length === 2) {
          matrix.scale(params[0], params[1]);
        }
        return;

      case 'rotate':
        if (params.length === 1) {
          matrix.rotate(params[0], 0, 0);
        } else if (params.length === 3) {
          matrix.rotate(params[0], params[1], params[2]);
        }
        return;

      case 'translate':
        if (params.length === 1) {
          matrix.translate(params[0], 0);
        } else if (params.length === 2) {
          matrix.translate(params[0], params[1]);
        }
        return;

      case 'skewX':
        if (params.length === 1) {
          matrix.skewX(params[0]);
        }
        return;

      case 'skewY':
        if (params.length === 1) {
          matrix.skewY(params[0]);
        }
        return;
    }
  });

  return matrix;
};


/***/ }),

/***/ "./renderers/constants.ts":
/*!********************************!*\
  !*** ./renderers/constants.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
class RendererConstants {
    CORNER_RADIUS;
    NODE_BASE_WIDTH;
    NODE_BASE_HEIGHT;
    TOPBAR_HEIGHT;
    FOOTER_HEIGHT;
    PADDING_BIG;
    PADDING_MEDIUM;
    PADDING_SMALL;
    FIELD_SPACEY;
    FIELD_RAW_BASE_WIDTH;
    FIELD_RAW_BASE_HEIGHT;
    INPUT_BOX_PADDING;
    INPUT_BOX_TEXT_ANCHOR;
    LABEL_SPACING;
    FIELD_RAW_COLOR = '#2b2d36ff';
    FIELD_RAW_TEXT_COLOR = '#e0e2e8ff';
    FIELD_RAW_OUTLINE_COLOR = '#1f2027ff';
    FIELD_RAW_OUTLINE_STROKE;
    NODE_BG_COLOR = '#2c2d3aff';
    NODE_OUTLINE_COLOR = '#1d1e25ff';
    CONNECTOR_TRIANGLE;
    CONNECTION_STROKE_WIDTH;
    CONNECTION_STROKE_COLOR_CHOICE;
    CONNECTOR_TRI_SIZE;
    CONNECTOR_RADIUS;
    FONT_FAMILY = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
    FONT_SIZE;
    FONT_COLOR = '#e0e2e8ff';
    FIELD_MARGIN_X;
    FIELD_MARGIN_Y;
    TOPBAR_LABEL_MARGIN_X;
    TOPBAR_LABEL_MARGIN_Y;
    TOPBAR_LABEL_BOLDED;
    CONNECTOR_LINE_WIDTH = 2;
    CONNECTOR_LINE_CURVED = true;
    constructor(overrides = {}) {
        this.CONNECTOR_TRI_SIZE = 8;
        this.CONNECTOR_RADIUS = 10;
        this.CORNER_RADIUS = 6;
        this.NODE_BASE_WIDTH = 200;
        this.NODE_BASE_HEIGHT = 240;
        this.TOPBAR_HEIGHT = 50;
        this.FOOTER_HEIGHT = 25;
        this.PADDING_BIG = 16;
        this.PADDING_MEDIUM = 8;
        this.PADDING_SMALL = 4;
        this.FIELD_RAW_BASE_WIDTH = 80;
        this.FIELD_RAW_BASE_HEIGHT = 42;
        this.INPUT_BOX_PADDING = 6;
        this.LABEL_SPACING = 5;
        this.INPUT_BOX_TEXT_ANCHOR = 'middle';
        this.CONNECTOR_TRIANGLE = false;
        this.CONNECTION_STROKE_WIDTH = 2;
        this.CONNECTION_STROKE_COLOR_CHOICE = 1;
        this.FIELD_RAW_OUTLINE_STROKE = 2;
        this.FIELD_SPACEY = 20;
        this.FONT_SIZE = 20;
        this.TOPBAR_LABEL_BOLDED = true;
        this.FIELD_MARGIN_X = 16;
        this.FIELD_MARGIN_Y = 4;
        this.TOPBAR_LABEL_MARGIN_X = 12;
        this.TOPBAR_LABEL_MARGIN_Y = 0;
        Object.assign(this, overrides);
    }
}
exports["default"] = RendererConstants;


/***/ }),

/***/ "./renderers/renderer.ts":
/*!*******************************!*\
  !*** ./renderers/renderer.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const constants_1 = __importDefault(__webpack_require__(/*! ./constants */ "./renderers/constants.ts"));
const nodesvg_1 = __importDefault(__webpack_require__(/*! ../src/nodesvg */ "./src/nodesvg.ts"));
const Path = __importStar(__webpack_require__(/*! ../util/path */ "./util/path.ts"));
const parse_color_1 = __webpack_require__(/*! ../util/parse-color */ "./util/parse-color.ts");
const field_1 = __importDefault(__webpack_require__(/*! ../src/field */ "./src/field.ts"));
const eventer_1 = __importDefault(__webpack_require__(/*! ../util/eventer */ "./util/eventer.ts"));
const escape_html_1 = __importDefault(__webpack_require__(/*! ../util/escape-html */ "./util/escape-html.ts"));
const unescape_html_1 = __importDefault(__webpack_require__(/*! ../util/unescape-html */ "./util/unescape-html.ts"));
function drawState(nodeGroup, id) {
    return {
        id,
        group: nodeGroup,
        fieldPosY: 0,
        connectorsAwaitingConnection: []
    };
}
class Renderer {
    _constants;
    _currentNode;
    _nodeGroup;
    _nodeDraw;
    _ws;
    _svgElements;
    _drawStates;
    static get NODE_G_TAG() {
        return 'AtlasNodeSVG';
    }
    static get ELEMENT_TAG() {
        return 'AtlasElement';
    }
    static get CONN_LINE_TAG() {
        return 'AtlasConnectionLine';
    }
    static get CONNECTOR_TAG() {
        return 'AtlasConnectionBubble';
    }
    static get NAME() {
        return 'atlas'; // default is called atlas.
    }
    constructor(workspace, overrides = {}) {
        this._ws = workspace;
        this._currentNode = null;
        this._constants = new constants_1.default(overrides);
        this._nodeGroup = null;
        this._nodeDraw = null;
        this._svgElements = [];
        this._drawStates = [];
    }
    setConstants(c = {}) {
        return Object.assign(this._constants, c);
    }
    get constants() {
        if (!this.node)
            return this._constants;
        const { primary, secondary, tertiary, ...restColors } = this.node.colors;
        return {
            ...this._constants,
            ...restColors
        };
    }
    set constants(c) {
        this.setConstants(c);
    }
    get node() {
        return this._currentNode;
    }
    get svg() {
        return this.getWs().svg; // Svg.js instance
    }
    get state() {
        return this._nodeDraw;
    }
    getWs() {
        return this._ws;
    }
    getNodeBaseMeasurements() {
        const c = this.constants;
        return {
            width: c.NODE_BASE_WIDTH,
            height: c.NODE_BASE_HEIGHT
        };
    }
    measureTextWidth(text, fontSize, fontFamily) {
        const c = this.constants;
        // fallback in case SVG is not ready
        if (!this.svg)
            return text.length * (fontSize ?? c.FONT_SIZE) * 0.6;
        const txt = this.svg.text(text)
            .font({
            family: fontFamily ?? c.FONT_FAMILY,
            size: fontSize ?? c.FONT_SIZE,
            anchor: 'start'
        })
            .opacity(0); // hide it
        const width = txt.bbox().width;
        txt.remove(); // clean up
        return width;
    }
    measureRawField(text = "") {
        const c = this.constants;
        const textW = this.measureTextWidth(text);
        const width = Math.max(c.FIELD_RAW_BASE_WIDTH, textW + c.INPUT_BOX_PADDING * 2);
        const height = c.FIELD_RAW_BASE_HEIGHT;
        return { width, height };
    }
    measureField(field) {
        let width = 0, height = 0;
        const c = this.constants;
        if (field.getLabel()) {
            width += field.getLabel().length * c.FONT_SIZE * 0.6;
            height = Math.max(height, c.FONT_SIZE + 4);
            // Calculate label stuff.
        }
        if (field.hasRaw()) {
            const labelWidth = field.getLabel()
                ? this.measureTextWidth(field.getLabel())
                : 0;
            const raw = this.measureRawField(field.getValue?.() ?? "");
            width = labelWidth + c.LABEL_SPACING + raw.width;
            height = Math.max(height, raw.height, c.FONT_SIZE + 4);
        }
        if (field.isCustomEditor()) {
            // Fields with a custom look handle their own measurings.
            const measurements = field.measureMyself();
            if (measurements) {
                width = Math.max(width, measurements.width);
                height = Math.max(height, measurements.height);
                if (field.getLabel()) {
                    width += field.getLabel().length * c.FONT_SIZE * 0.6;
                    width += c.LABEL_SPACING;
                    height = Math.max(height, c.FONT_SIZE + 4);
                    // Calculate label stuff.
                }
            }
        }
        return { width, height };
    }
    measureNodeDimensions() {
        if (!this.node)
            return;
        const c = this.constants;
        const node = this.node;
        const fieldMeasurements = [];
        const BASE = this.getNodeBaseMeasurements();
        let totalWidth = BASE.width;
        let totalHeight = BASE.height; // start at base
        if (node.labelText) {
            const labelW = this.measureTextWidth(node.labelText, c.FONT_SIZE, c.FONT_FAMILY);
            totalWidth = Math.max(totalWidth, labelW + c.TOPBAR_LABEL_MARGIN_X * 2 // add left/right margin
            );
        }
        let y = c.TOPBAR_HEIGHT + c.FIELD_SPACEY; // current y position for fields
        for (let field of node.allFields()) {
            let width = 0, height = 0;
            const fldM = this.measureField(field);
            width = fldM.width;
            height = fldM.height;
            // This adds to a list of all the like widths and heights for a field
            fieldMeasurements.push(fldM);
            totalWidth = Math.max(totalWidth, width + c.FIELD_MARGIN_X * 2);
            // Check if this field goes beyond current totalHeight
            const bottomOfField = y + height;
            if (bottomOfField + c.FIELD_MARGIN_Y > totalHeight) {
                totalHeight = bottomOfField + c.FIELD_MARGIN_Y; // grow node only if needed
            }
            y += height + c.FIELD_MARGIN_Y;
        }
        totalHeight += c.FOOTER_HEIGHT;
        return {
            width: totalWidth,
            height: totalHeight,
            fields: fieldMeasurements
        };
    }
    renderNode(nodeIdOrNode) {
        this.startNode(nodeIdOrNode);
        this.drawNode();
        this.storeState();
    }
    startNode(nodeIdOrNode) {
        const ws = this.getWs();
        if (nodeIdOrNode instanceof nodesvg_1.default) {
            this._currentNode = nodeIdOrNode;
        }
        else {
            const node = ws.getNode(nodeIdOrNode);
            if (node instanceof nodesvg_1.default) {
                this._currentNode = node;
            }
            else {
                this._currentNode = null;
            }
        }
    }
    storeState() {
        this._drawStates.push(this.state);
    }
    drawFieldRaw(fieldGroup, field, startX = 0) {
        const c = this.constants;
        const value = field.getValue?.() ?? "";
        const { width, height } = this.measureRawField(value);
        const rect = fieldGroup.rect(width, height)
            .fill((0, parse_color_1.parseColor)(c.FIELD_RAW_COLOR))
            .stroke({ color: (0, parse_color_1.parseColor)(c.FIELD_RAW_OUTLINE_COLOR), width: c.FIELD_RAW_OUTLINE_STROKE })
            .radius(3);
        const txt = fieldGroup.text(value)
            .font({
            family: c.FONT_FAMILY,
            size: c.FONT_SIZE,
            anchor: c.INPUT_BOX_TEXT_ANCHOR
        })
            .fill((0, parse_color_1.parseColor)(c.FIELD_RAW_TEXT_COLOR));
        txt.node.style.userSelect = 'none';
        const textBBox = txt.bbox();
        const offsetY = (height - textBBox.height) / 2;
        // move relative to startX (after label)
        rect.move(startX, 0);
        txt.move(startX + c.INPUT_BOX_PADDING, offsetY);
        eventer_1.default.addElement(rect, "k_inputbox", {
            field, // the field object that has .getValue() and .setValue(v)
            text: txt, // the svg.js Text element you drew
            renderer: this, // the renderer instance, must have .measureRawField and .constants
            startX // x-offset where the box should start (after label)
        }).tagElement(rect, [this.constructor.ELEMENT_TAG]);
        return { rect, txt };
    }
    drawFieldLabel(fieldGroup, field, startX = 0) {
        const c = this.constants;
        const label = field.getLabel?.();
        if (!label)
            return 0;
        const txt = fieldGroup.text(label)
            .font({
            family: c.FONT_FAMILY,
            size: c.FONT_SIZE,
            anchor: 'start'
        })
            .fill((0, parse_color_1.parseColor)(c.FONT_COLOR));
        txt.node.style.userSelect = 'none';
        const bbox = txt.bbox();
        const offsetY = (Math.max(c.FIELD_RAW_BASE_HEIGHT, bbox.height) - bbox.height) / 2;
        // move label relative to startX
        txt.move(startX, offsetY);
        // return width used for next element
        return bbox.width + c.LABEL_SPACING;
    }
    drawNodeXButton() {
        const node = this.node;
        const state = this._nodeDraw;
        if (!node || !state || !state.topbar || !state.group)
            return;
        const c = this.constants;
        const measurements = this.measureNodeDimensions();
        const width = measurements?.width ?? c.NODE_BASE_WIDTH;
        const btnSize = c.TOPBAR_HEIGHT * 0.6;
        const padding = (c.TOPBAR_HEIGHT - btnSize) / 2;
        // Button group
        const xGroup = state.group.group().attr({ class: 'node-x-clse' });
        eventer_1.default.addElement(xGroup, 'k_closenode', {
            workspace: this.getWs(),
            node
        });
        // Background
        xGroup.rect(btnSize, btnSize)
            .fill('#ffffff00')
            .radius(2)
            .move(width - btnSize - padding, padding);
        // X mark
        const txt = xGroup.text('×')
            .font({
            family: c.FONT_FAMILY,
            size: btnSize * 0.8,
            weight: 'bold',
            anchor: 'middle'
        })
            .fill('#fff')
            .attr({
            'text-anchor': 'middle', // horizontal centering
            'dominant-baseline': 'middle' // vertical centering
        });
        txt.node.style.userSelect = 'none';
        // Apply transform to center it inside the button
        txt.transform({
            translateX: width - btnSize / 2 - padding,
            translateY: padding + btnSize / 2
        });
        state.xButton = xGroup;
    }
    drawConnector(nodeGroup, nodeBg, y, side, color) {
        const c = this.constants;
        if (!nodeGroup || !nodeBg)
            return null;
        const bbox = nodeBg.bbox(); // get dimensions of the background
        const group = nodeGroup; // attach connector to top-level node group
        const x = side === 'left' ? 0 : bbox.width;
        if (c.CONNECTOR_TRIANGLE) {
            // small triangle connector
            const triSize = c.CONNECTOR_TRI_SIZE;
            let path = Path.roundedTri(triSize, triSize, 1);
            // flip triangle horizontally for left side
            if (side === 'left')
                path = Path.rotatePath(path, 180, triSize / 2, triSize / 2);
            const tri = group.path(path)
                .fill((0, parse_color_1.parseColor)(color))
                .stroke({ color: (0, parse_color_1.parseColor)('#00000000'), width: 0 });
            tri.attr({
                class: this.constructor.CONNECTOR_TAG
            });
            const offsetX = side === 'left' ? -triSize : 0;
            tri.transform({ translateX: x + offsetX, translateY: y - triSize / 2 });
            return tri;
        }
        else {
            // circle connector
            const radius = c.CONNECTOR_RADIUS;
            const circlePath = Path.circle(radius);
            const circ = group.path(circlePath)
                .fill((0, parse_color_1.parseColor)(color))
                .stroke({ color: (0, parse_color_1.parseColor)('#00000000'), width: 0 })
                .move(x - radius, y - radius); // center circle at (x, y)
            circ.attr({
                class: this.constructor.CONNECTOR_TAG
            });
            return circ;
        }
    }
    drawNodeLabel(nodeGroup) {
        const node = this.node;
        const c = this.constants;
        if (!node)
            return;
        if (node.labelText) {
            const txt = nodeGroup.text(node.labelText)
                .font({
                family: c.FONT_FAMILY,
                size: c.FONT_SIZE,
                anchor: 'start',
                weight: c.TOPBAR_LABEL_BOLDED ? '600' : 'normal'
            })
                .fill((0, parse_color_1.parseColor)(c.FONT_COLOR));
            txt.node.style.userSelect = 'none';
            const bbox = txt.bbox();
            const offsetY = (c.TOPBAR_HEIGHT - bbox.height) / 2;
            txt.move(c.TOPBAR_LABEL_MARGIN_X, offsetY + c.TOPBAR_LABEL_MARGIN_Y);
        }
    }
    resolveConnectable(connectable, fromConn) {
        if (!connectable || !fromConn)
            return undefined;
        // If the connection is an input (previous), return the connectable's output (next) connection
        if (fromConn.isPrevious) {
            if (connectable instanceof nodesvg_1.default)
                return connectable.nextConnection;
            // @ts-ignore
            if (connectable instanceof field_1.default)
                return connectable.connection;
        }
        // If the connection is an output (next), return the connectable's input (previous) connection
        if (!fromConn.isPrevious) {
            if (connectable instanceof nodesvg_1.default)
                return connectable.previousConnection;
            // @ts-ignore
            if (connectable instanceof field_1.default)
                return connectable.connection;
        }
    }
    _fillOtherNodeConnectorCircle(conn, circle, isPrevious) {
        for (const state of this._drawStates) {
            for (const connPair of state.connectorsAwaitingConnection) {
                // Check if this connector is referenced in another node's connector
                if (isPrevious && connPair.to === conn && !connPair.toCircle) {
                    connPair.toCircle = circle;
                }
                if (!isPrevious && connPair.from === conn && !connPair.fromCircle) {
                    connPair.fromCircle = circle;
                }
            }
        }
    }
    refreshNodeTransforms() {
        const nodeGroups = this.svg.find(`.${this.constructor.NODE_G_TAG}`);
        for (let nodeG of nodeGroups) {
            const node = this.getWs().getNode((0, unescape_html_1.default)(nodeG.attr('data-node-id')));
            console.log(node);
            if (!node)
                continue;
            const screenPos = this._ws.workspaceToScreen(node.relativeCoords.x, node.relativeCoords.y);
            nodeG.attr({ transform: `translate(${screenPos.x}, ${screenPos.y})` });
        }
        this.refreshConnectionLines();
    }
    refreshConnectionLines() {
        this.clearLines();
        this.drawLinesForAllNodes();
    }
    drawNode() {
        if (!this.node)
            return;
        const node = this.node;
        const c = this.constants;
        const colors = node.colors ?? {
            primary: '#000',
            secondary: '#000',
            tertirary: '#000',
            category: ''
        };
        // Main node group
        const nodeGroup = this.svg.group().attr({ 'data-node-id': (0, escape_html_1.default)(node.id), 'class': this.constructor.NODE_G_TAG });
        // compute screen position from workspace-space relativeCoords
        const screenPos = this._ws.workspaceToScreen(node.relativeCoords.x, node.relativeCoords.y);
        // apply it to the top-level node group
        nodeGroup.attr({ transform: `translate(${screenPos.x}, ${screenPos.y})` });
        const state = drawState(nodeGroup, node.id);
        this._nodeDraw = state;
        // Measure node
        const measurements = this.measureNodeDimensions();
        const width = measurements?.width ?? c.NODE_BASE_WIDTH;
        const height = measurements?.height ?? c.NODE_BASE_HEIGHT;
        // Base rectangle
        const radius = c.CORNER_RADIUS;
        state.bg = nodeGroup.path(Path.roundedRect(width, height, radius))
            .fill((0, parse_color_1.parseColor)(c.NODE_BG_COLOR))
            .stroke({ color: (0, parse_color_1.parseColor)(c.NODE_OUTLINE_COLOR), width: 2 });
        // Topbar
        state.topbar = nodeGroup.path(Path.roundedRect(width, c.TOPBAR_HEIGHT, radius))
            .fill((0, parse_color_1.parseColor)(colors.primary))
            .stroke({ color: (0, parse_color_1.parseColor)(colors.tertiary), width: 2 });
        // add the X button
        this.drawNodeXButton();
        this.drawNodeLabel(nodeGroup);
        eventer_1.default.addElement(nodeGroup, 'k_draggable', {
            dragel: state.topbar, // the handle
            node: node, // NodeSvg instance
            type: 2
        }).tagElement(nodeGroup, [this.constructor.ELEMENT_TAG]);
        // Outer fields group positioned under topbar using transform
        const fieldsGroup = nodeGroup.group();
        fieldsGroup.attr({ transform: `translate(0, ${c.TOPBAR_HEIGHT + c.FIELD_SPACEY})` });
        state.fieldCol = fieldsGroup;
        let y = 0;
        node.allFields().forEach((field, idx) => {
            const fm = measurements?.fields[idx];
            if (!fm)
                return;
            // default left alignment
            let alignX = c.FIELD_MARGIN_X;
            const fieldGroup = fieldsGroup.group();
            fieldGroup.attr({ transform: `translate(${alignX}, ${y})` });
            state.fieldPosY = y;
            // draw label first, get its used width
            const xUsed = this.drawFieldLabel(fieldGroup, field);
            // if raw, draw right after label
            if (field.hasRaw()) {
                this.drawFieldRaw(fieldGroup, field, xUsed);
            }
            y += fm.height + c.FIELD_MARGIN_Y;
        });
        state.fieldPosY = y;
        /**
         * Draw connectors.
         */
        const bbox = state.bg?.bbox();
        const cY = (bbox?.height ?? height) - c.FOOTER_HEIGHT;
        // Previous connection (left)
        if (node.previousConnection) {
            const c1 = this.drawConnector(nodeGroup, state.bg, cY, 'left', colors.primary);
            if (c1) {
                state.connectorsAwaitingConnection.push({
                    from: node.previousConnection,
                    to: this.resolveConnectable(node.previousConnection.getFrom(), node.previousConnection),
                    fromCircle: c1
                });
                // fill any waiting connectors from other nodes
                this._fillOtherNodeConnectorCircle(node.previousConnection, c1, true);
            }
        }
        // Next connection (right)
        if (node.nextConnection) {
            const c2 = this.drawConnector(nodeGroup, state.bg, cY, 'right', colors.primary);
            if (c2) {
                state.connectorsAwaitingConnection.push({
                    from: node.nextConnection,
                    to: this.resolveConnectable(node.nextConnection.getTo(), node.nextConnection),
                    fromCircle: c2
                });
                // fill any waiting connectors from other nodes
                this._fillOtherNodeConnectorCircle(node.nextConnection, c2, false);
            }
        }
    }
    drawLinesForAllNodes() {
        const c = this.constants;
        const wsSvg = this._ws.svg;
        for (const state of this._drawStates) {
            if (!state.connectorsAwaitingConnection)
                continue;
            for (const { fromCircle, toCircle } of state.connectorsAwaitingConnection) {
                if (!fromCircle || !toCircle)
                    continue;
                const a = fromCircle.rbox();
                const b = toCircle.rbox();
                const startX = a.cx, startY = a.cy;
                const endX = b.cx, endY = b.cy;
                if (c.CONNECTOR_LINE_CURVED) {
                    // cubic bezier: control points spread horizontally
                    const dx = Math.abs(endX - startX);
                    const cp1x = startX + Math.sign(endX - startX) * Math.max(30, dx * 0.3);
                    const cp2x = endX - Math.sign(endX - startX) * Math.max(30, dx * 0.3);
                    const pathStr = `M ${startX} ${startY} C ${cp1x} ${startY}, ${cp2x} ${endY}, ${endX} ${endY}`;
                    const line = wsSvg.path(pathStr)
                        .stroke({ color: (0, parse_color_1.parseColor)(fromCircle.fill()), width: c.CONNECTOR_LINE_WIDTH })
                        .fill('none')
                        .attr({ class: this.constructor.CONN_LINE_TAG });
                    this._svgElements.push(line);
                }
                else {
                    // fallback straight line
                    const pathStr = `M ${startX} ${startY} L ${endX} ${endY}`;
                    const line = wsSvg.path(pathStr)
                        .stroke({ color: (0, parse_color_1.parseColor)(fromCircle.fill()), width: c.CONNECTOR_LINE_WIDTH })
                        .fill('none')
                        .attr({ class: this.constructor.CONN_LINE_TAG });
                    this._svgElements.push(line);
                }
            }
        }
    }
    clearLines() {
        for (let line of this.getWs().svg.find(`.${this.constructor.CONN_LINE_TAG}`)) {
            line.remove();
        }
    }
    clearScreen() {
        eventer_1.default.destroyByTag(this.constructor.ELEMENT_TAG);
        this._ws.svg.clear();
        this._drawStates = [];
    }
}
exports["default"] = Renderer;


/***/ }),

/***/ "./src/colors.ts":
/*!***********************!*\
  !*** ./src/colors.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const CategoryColors = {};
exports["default"] = CategoryColors;


/***/ }),

/***/ "./src/connection.ts":
/*!***************************!*\
  !*** ./src/connection.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const nodesvg_1 = __importDefault(__webpack_require__(/*! ./nodesvg */ "./src/nodesvg.ts"));
class Connection {
    from;
    to;
    isPrevious;
    constructor(from, to, isPrevious = false) {
        this.from = from;
        this.to = to;
        this.isPrevious = isPrevious;
    }
    getTo() {
        return this.to;
    }
    getFrom() {
        return this.from;
    }
    disconnectTo() {
        if (this.to instanceof nodesvg_1.default) {
            this.to.previousConnection?.disconnectFrom();
        }
        this.to = null;
    }
    disconnectFrom() {
        this.from = null;
    }
    isolate() {
        this.from = null;
        this.to = null;
    }
}
exports["default"] = Connection;


/***/ }),

/***/ "./src/context-menu.ts":
/*!*****************************!*\
  !*** ./src/context-menu.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const unescape_html_1 = __importDefault(__webpack_require__(/*! ../util/unescape-html */ "./util/unescape-html.ts"));
const coordinates_1 = __importDefault(__webpack_require__(/*! ./coordinates */ "./src/coordinates.ts"));
const ctx_menu_registry_1 = __importDefault(__webpack_require__(/*! ./ctx-menu-registry */ "./src/ctx-menu-registry.ts"));
const nodesvg_1 = __importDefault(__webpack_require__(/*! ./nodesvg */ "./src/nodesvg.ts"));
const widget_1 = __importDefault(__webpack_require__(/*! ./widget */ "./src/widget.ts"));
const workspace_svg_1 = __importDefault(__webpack_require__(/*! ./workspace-svg */ "./src/workspace-svg.ts"));
class ContextMenuHTML {
    workspace;
    controller;
    widget;
    options;
    constructor(workspace) {
        this.workspace = workspace;
        this.controller = this.workspace.controller;
        this.widget = new widget_1.default(this.workspace, {
            coords: new coordinates_1.default(0, 0),
            name: 'k_contextmenu',
            className: 'KabelContextMenu'
        });
        this.widget.show = () => {
            this.widget.container.classList.add('show');
            this.widget.container.style.display = 'flex';
            this.widget.visible = true;
        };
        this.widget.hide = () => {
            this.widget.container.classList.remove('show');
            this.widget.container.style.display = 'none';
            this.widget.visible = false;
        };
        this.widget.container.style.removeProperty('height');
        this.widget.container.style.removeProperty('width');
        this.widget.hide();
        this.options = ctx_menu_registry_1.default;
        this.initListeners();
    }
    renderOptions(target) {
        // Clear any previous options
        this.widget.container.innerHTML = '';
        // Filter options based on showFor
        const filteredOptions = this.options.filter(opt => {
            if (!target)
                return false;
            const showFor = Array.isArray(opt.showFor) ? opt.showFor : [opt.showFor];
            if (target instanceof nodesvg_1.default && showFor.includes('node'))
                return true;
            if (target instanceof workspace_svg_1.default && showFor.includes('ws'))
                return true;
            if (target instanceof HTMLElement && !(target instanceof SVGSVGElement) && showFor.includes('html'))
                return true;
            return false;
        });
        filteredOptions.forEach((opt, i) => {
            const el = document.createElement('div');
            el.className = 'KabelContextOption';
            el.textContent = opt.label || 'Option ' + i;
            el.addEventListener('click', () => {
                if (target)
                    opt.click(target);
                this.hide();
            });
            if (opt.onHoverStart)
                el.addEventListener('mouseenter', () => opt.onHoverStart?.());
            if (opt.onHoverEnd)
                el.addEventListener('mouseleave', () => opt.onHoverEnd?.());
            this.widget.container.appendChild(el);
        });
    }
    initListeners() {
        // Show the menu on right-click
        this.workspace.svg.node.addEventListener('contextmenu', e => {
            e.preventDefault();
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            this.widget.setCoords(new coordinates_1.default(mouseX, mouseY));
            this.renderOptions(this.target);
            this.widget.show();
        });
        // Hide menu on click elsewhere
        document.addEventListener('mousedown', e => {
            if (!this.widget.container.contains(e.target)) {
                this.hide();
            }
        });
    }
    hide() {
        this.widget.hide();
    }
    get mousePos() {
        return this.controller.mousePos;
    }
    get target() {
        let el = document.elementFromPoint(this.mousePos.x, this.mousePos.y);
        if (el === this.workspace.svg.node)
            return this.workspace;
        while (el && el !== document.body) {
            // Node check
            if (el.tagName.toLowerCase() === 'g' && el.hasAttribute('data-node-id')) {
                const nodeId = (0, unescape_html_1.default)(el.getAttribute('data-node-id'));
                const node = this.workspace.getNode(nodeId);
                if (node)
                    return node;
            }
            el = el.parentElement;
        }
        // fallback
        return document.elementFromPoint(this.mousePos.x, this.mousePos.y);
    }
}
exports["default"] = ContextMenuHTML;


/***/ }),

/***/ "./src/coordinates.ts":
/*!****************************!*\
  !*** ./src/coordinates.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
class Coordinates {
    x;
    y;
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    /** Set coordinates */
    set(x, y) {
        this.x = x;
        this.y = y;
    }
    /** Returns a copy of this coordinate */
    clone() {
        return new Coordinates(this.x, this.y);
    }
    /** Calculate distance to another coordinate */
    distanceTo(other) {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    /** Convert to string */
    toString() {
        return `(${this.x}, ${this.y})`;
    }
    /** Convert to array [x, y] */
    toArray() {
        return [this.x, this.y];
    }
    /** Convert to object { x, y } */
    toObject() {
        return { x: this.x, y: this.y };
    }
}
exports["default"] = Coordinates;


/***/ }),

/***/ "./src/core.ts":
/*!*********************!*\
  !*** ./src/core.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const constants_1 = __importDefault(__webpack_require__(/*! ../renderers/constants */ "./renderers/constants.ts"));
const renderer_1 = __importDefault(__webpack_require__(/*! ../renderers/renderer */ "./renderers/renderer.ts"));
const colors_1 = __importDefault(__webpack_require__(/*! ./colors */ "./src/colors.ts"));
const connection_1 = __importDefault(__webpack_require__(/*! ./connection */ "./src/connection.ts"));
const coordinates_1 = __importDefault(__webpack_require__(/*! ./coordinates */ "./src/coordinates.ts"));
const field_1 = __importStar(__webpack_require__(/*! ./field */ "./src/field.ts"));
const inject_1 = __importStar(__webpack_require__(/*! ./inject */ "./src/inject.ts"));
const main_workspace_1 = __webpack_require__(/*! ./main-workspace */ "./src/main-workspace.ts");
const nodesvg_1 = __importDefault(__webpack_require__(/*! ./nodesvg */ "./src/nodesvg.ts"));
const prototypes_1 = __importDefault(__webpack_require__(/*! ./prototypes */ "./src/prototypes.ts"));
const workspace_svg_1 = __importDefault(__webpack_require__(/*! ./workspace-svg */ "./src/workspace-svg.ts"));
const parse_color_1 = __webpack_require__(/*! ../util/parse-color */ "./util/parse-color.ts");
const eventer_1 = __importDefault(__webpack_require__(/*! ../util/eventer */ "./util/eventer.ts"));
const Path = __importStar(__webpack_require__(/*! ../util/path */ "./util/path.ts"));
const SVG = __importStar(__webpack_require__(/*! @svgdotjs/svg.js */ "./node_modules/@svgdotjs/svg.js/dist/svg.node.cjs"));
const UID = __importStar(__webpack_require__(/*! ../util/uid */ "./util/uid.ts"));
const has_prop_1 = __importDefault(__webpack_require__(/*! ../util/has-prop */ "./util/has-prop.ts"));
const emitter_1 = __importDefault(__webpack_require__(/*! ../util/emitter */ "./util/emitter.ts"));
const user_state_1 = __importDefault(__webpack_require__(/*! ../util/user-state */ "./util/user-state.ts"));
__webpack_require__(/*! ../events/events */ "./events/events.ts");
const base_1 = __importDefault(__webpack_require__(/*! ../controllers/base */ "./controllers/base.ts"));
const wasd_1 = __importDefault(__webpack_require__(/*! ../controllers/wasd */ "./controllers/wasd.ts"));
const renderer_map_1 = __webpack_require__(/*! ./renderer-map */ "./src/renderer-map.ts");
const styler_1 = __importStar(__webpack_require__(/*! ../util/styler */ "./util/styler.ts"));
const widget_prototypes_1 = __importDefault(__webpack_require__(/*! ./widget-prototypes */ "./src/widget-prototypes.ts"));
const widget_1 = __importDefault(__webpack_require__(/*! ./widget */ "./src/widget.ts"));
const ctx_menu_registry_1 = __webpack_require__(/*! ./ctx-menu-registry */ "./src/ctx-menu-registry.ts");
field_1.default.register = function (name, cls) {
    field_1.FieldMap[name] = cls;
};
field_1.default.unregister = function (name) {
    delete field_1.FieldMap[name];
};
const Kabel = {
    UIX: {
        events: eventer_1.default,
        /**
         * State Manager, Makes things possible: E.G (the 'typing' state when you type in a input box..)
         * Used in controllers so you dont move when typing characters like a w s or d etc.
         */
        userState: user_state_1.default
    },
    ContextMenu: ctx_menu_registry_1.ContextMenu,
    Utils: {
        Path,
        SVG,
        parseColor: parse_color_1.parseColor,
        UID,
        EventEmitter: emitter_1.default,
        hasProp: has_prop_1.default,
        styler: styler_1.default,
        Styler: styler_1.Styler
    },
    Widget: widget_1.default,
    CategoryColors: colors_1.default,
    Connection: connection_1.default,
    Coordinates: coordinates_1.default,
    Field: field_1.default,
    DummyField: field_1.DummyField,
    FieldMap: field_1.FieldMap,
    NumberField: field_1.NumberField,
    OptConnectField: field_1.OptConnectField,
    TextField: field_1.TextField,
    inject: inject_1.default,
    InjectMsg: inject_1.InjectMsg,
    clearMainWorkspace: main_workspace_1.clearMainWorkspace,
    getMainWorkspace: main_workspace_1.getMainWorkspace,
    setMainWorkspace: main_workspace_1.setMainWorkspace,
    NodeSvg: nodesvg_1.default,
    Nodes: prototypes_1.default,
    Widgets: widget_prototypes_1.default,
    WorkspaceSvg: workspace_svg_1.default,
    WorkspaceController: base_1.default,
    WASDController: wasd_1.default,
    nodeRendering: {
        rendererMap: renderer_map_1.RMap,
        Renderer: renderer_1.default,
        RendererConstants: constants_1.default
    }
};
// Export a getter/setter incase someone needs more internal access to main workspace and doesnt like the method interface.
Object.defineProperty(Kabel, '_mainWorkspace', {
    get() {
        return (0, main_workspace_1.getMainWorkspace)();
    },
    set(v) {
        if (v === undefined || v === null || v === false || v === 0 || typeof v === 'string') {
            return (0, main_workspace_1.clearMainWorkspace)();
        }
        return (0, main_workspace_1.setMainWorkspace)(v);
    }
});
exports["default"] = Kabel;


/***/ }),

/***/ "./src/ctx-menu-registry.ts":
/*!**********************************!*\
  !*** ./src/ctx-menu-registry.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ContextMenu = void 0;
const ContextOptsRegistry = [];
const ContextMenu = {
    registerOption(id, option) {
        const opt = {
            id,
            click: option.click,
            label: option.label,
            onHoverStart: option.onHoverStart || (() => { }),
            onHoverEnd: option.onHoverEnd || (() => { }),
            showFor: option.showFor || undefined
        };
        ContextOptsRegistry.push(opt);
    },
    unregisterOption(id) {
        const index = ContextOptsRegistry.findIndex(opt => opt.id === id);
        if (index >= 0)
            ContextOptsRegistry.splice(index, 1);
    }
};
exports.ContextMenu = ContextMenu;
ContextMenu.registerOption('k_delete', {
    showFor: ['node'],
    label: 'Delete', // required
    click: (t) => {
        const target = t;
        if (!target.workspace)
            return;
        target.workspace.removeNode(target);
    }
});
ContextMenu.registerOption('k_deleteall', {
    showFor: 'ws',
    label: 'Delete all', // required
    click: (t) => {
        const target = t;
        const isSure = window.confirm(`Are you sure you want to delete ${Array.from(target._nodeDB.keys()).length} nodes?`);
        if (!isSure)
            return;
        for (let [id, _] of target._nodeDB) {
            target.removeNodeById(id);
        }
    }
});
ContextMenu.registerOption('k_duplicate', {
    showFor: 'node',
    label: 'Duplicate',
    click: t => {
        const node = t;
        if (!node.workspace)
            return;
        node.workspace.cloneNode(node);
    }
});
exports["default"] = ContextOptsRegistry;


/***/ }),

/***/ "./src/field.ts":
/*!**********************!*\
  !*** ./src/field.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FieldMap = exports.OptConnectField = exports.TextField = exports.NumberField = exports.ConnectableField = exports.DummyField = void 0;
const connection_1 = __importDefault(__webpack_require__(/*! ./connection */ "./src/connection.ts"));
;
/**
 * Base class for all fields.
 * @template T The type of the value stored in the field
 */
class Field {
    label;
    name;
    type;
    value;
    static register(name, cls) { }
    ;
    static unregister(name) { }
    ;
    constructor() {
        this.label = '';
        this.name = '';
        this.type = '';
        this.value = null;
    }
    /**
     * Set field name to something else.
     * @param name string
     * @returns the new name.
     */
    setName(name) {
        return this.name = name;
    }
    /**
     * Initialize the field from JSON options.
     * @param json FieldOptions object
     */
    fromJson(json) {
        if (json.name !== undefined)
            this.name = json.name;
        if (json.label !== undefined)
            this.label = json.label;
        if (json.type !== undefined)
            this.type = json.type;
        if (json.value !== undefined)
            this.value = json.value;
    }
    /** @returns The field's name/key */
    getName() {
        return this.name;
    }
    /** @returns The human-readable label */
    getLabel() {
        return this.label;
    }
    /**
     * Set the human-readable label
     * @param label New label
     * @returns The updated label
     */
    setLabel(label) {
        return this.label = label;
    }
    /** @returns Whether this field is a raw value field (text/number) */
    hasRaw() {
        return true;
    }
    /** @returns Whether this field supports connections */
    hasConnectable() {
        return false;
    }
    /** @returns Whether we have a custom editor/input look */
    isCustomEditor() {
        return false;
    }
    /**
     * Make the input's custom look.
     * @param fieldVisualInfo - The visual info of the field, mutate this if needed.
     */
    makeInputMain(fieldVisualInfo) {
        return;
    }
    /** Return width & height of your field's custom editor */
    measureMyself() {
        return { width: null, height: null }; // if either is null then the renderer measures for us (meaning we have a connection or other type of raw field.)
    }
    /** @returns The stored value */
    getValue() {
        return this.value;
    }
    /**
     * Set the stored value
     * @param val New value
     */
    setValue(val) {
        this.value = val;
    }
    /** @returns The value as it should be displayed (can differ from internal value) */
    getDisplayValue() {
        return this.getValue();
    }
}
/**
 * Used when you want just a label with no actual value. Any value related methods are no-op.
 */
class DummyField {
    label;
    name;
    type;
    constructor() {
        this.label = '';
        this.name = '';
        this.type = '';
    }
    /**
     * Set field name to something else.
     * @param name string
     * @returns the new name.
     */
    setName(name) {
        return this.name = name;
    }
    /**
     * Initialize the field from JSON options.
     * @param json FieldOptions object
     */
    fromJson(json) {
        if (json.name !== undefined)
            this.name = json.name;
        if (json.label !== undefined)
            this.label = json.label;
        if (json.type !== undefined)
            this.type = json.type;
    }
    /** @returns Whether this field is a raw value field (text/number) */
    hasRaw() {
        return false;
    }
    /** @returns Whether this field supports connections */
    hasConnectable() {
        return false;
    }
    /** @returns The field's name/key */
    getName() {
        return this.name;
    }
    /** @returns The human-readable label */
    getLabel() {
        return this.label;
    }
    /**
     * Set the human-readable label
     * @param label New label
     * @returns The updated label
     */
    setLabel(label) {
        return this.label = label;
    }
    /** @returns Whether we have a custom editor/input look */
    isCustomEditor() {
        return false;
    }
    /**
     * Make the input.
     * @param fieldVisualInfo - The visual info of the field, mutate this if needed.
     */
    makeInputMain(fieldVisualInfo) {
        return;
    }
    /** Return width & height of your field's custom editor */
    measureMyself() {
        return { width: 0, height: 0 }; // if either is null then the renderer measures for us (meaning we have a connection or other type of raw field.)
    }
    /**
     * Dummy fields have no value.
     * @returns {null}
     */
    getValue() {
        return null;
    }
    /**
     * No-op for dummy fields
     */
    setValue(_) { }
    /** @returns The value as it should be displayed (can differ from internal value) */
    getDisplayValue() {
        return this.getValue();
    }
}
exports.DummyField = DummyField;
/**
 * Base class for fields that can be connected to other fields.
 * @template T The type of the value stored in the field
 */
class ConnectableField extends Field {
    connection;
    constructor() {
        super();
        this.connection = new connection_1.default(this, null);
    }
    hasConnectable() {
        return true;
    }
    hasRaw() {
        return false;
    }
    /** Disconnect this field from any connected field */
    disconnect() {
        this.connection.disconnectTo();
    }
}
exports.ConnectableField = ConnectableField;
/** Field storing a numeric value */
class NumberField extends Field {
    constructor() {
        super();
    }
    setValue(val) {
        this.value = Number(val);
    }
}
exports.NumberField = NumberField;
/** Field storing a string value */
class TextField extends Field {
    constructor() {
        super();
    }
    setValue(val) {
        this.value = String(val);
    }
}
exports.TextField = TextField;
/**
 * Optional connectable field.
 * Can store either a number or string depending on fld_type.
 */
class OptConnectField extends ConnectableField {
    fldType;
    constructor() {
        super();
        this.fldType = "string";
    }
    /**
     * Set field type.
     * @param type "number"|"string"
     */
    setFieldType(type) {
        this.fldType = type;
    }
    /**
     * Initialize from JSON, respecting fld_type
     * @param json FieldOptions
     */
    fromJson(json) {
        super.fromJson(json);
        this.fldType = json.fld_type || "string";
        if (this.value != null) {
            this.setValue(this.value);
        }
    }
    /**
     * Set the value, converting to number or string depending on fld_type
     * @param val The new value
     */
    setValue(val) {
        if (this.fldType === "number")
            this.value = Number(val);
        else
            this.value = String(val);
    }
    /**
     * @returns Display value for UI purposes (never null)
     */
    getDisplayValue() {
        if (this.value == null)
            return this.fldType === "number" ? "0" : "";
        return String(this.value);
    }
}
exports.OptConnectField = OptConnectField;
exports.FieldMap = {
    'field_both': OptConnectField,
    'field_string': TextField,
    'field_num': NumberField,
    'field_dummy': DummyField,
    'field_str': TextField,
    'connection': ConnectableField
};
exports["default"] = Field;


/***/ }),

/***/ "./src/flyout.ts":
/*!***********************!*\
  !*** ./src/flyout.ts ***!
  \***********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const headless_node_1 = __importDefault(__webpack_require__(/*! ./headless-node */ "./src/headless-node.ts"));
const parse_color_1 = __webpack_require__(/*! ../util/parse-color */ "./util/parse-color.ts");
class Flyout {
    container;
    visible;
    toolbox;
    constructor(toolbox) {
        this.toolbox = toolbox;
        this.container = document.createElement('div');
        this.container.className = 'KabelFlyout';
        this.visible = false;
        if (toolbox) {
            toolbox.workspace._wsTop.appendChild(this.container);
        }
        else {
            document.body.appendChild(this.container);
        }
    }
    fill(nodes) {
        this.container.innerHTML = '';
        nodes.forEach(node => {
            let _headlessNode = (0, headless_node_1.default)(node.type);
            if (!_headlessNode)
                return;
            const nodeEl = document.createElement('div');
            nodeEl.className = 'KabelFlyoutNode';
            nodeEl.textContent = _headlessNode.labelText;
            nodeEl.style.backgroundColor = (0, parse_color_1.parseColor)(_headlessNode.colors.primary);
            nodeEl.style.padding = '4px 8px';
            nodeEl.style.cursor = 'pointer';
            nodeEl.style.fontFamily = this.toolbox.workspace.renderer.constants.FONT_FAMILY;
            nodeEl.style.fontSize = `${this.toolbox.workspace.renderer.constants.FONT_SIZE}px`;
            nodeEl.style.color = (0, parse_color_1.parseColor)(this.toolbox.workspace.renderer.constants.FONT_COLOR);
            nodeEl.addEventListener('mousedown', (e) => {
                if (!this.toolbox)
                    return;
                // create ghost node element
                const ghostEl = document.createElement('div');
                ghostEl.className = 'KabelGhostNode';
                ghostEl.textContent = _headlessNode.labelText;
                ghostEl.style.position = 'absolute';
                ghostEl.style.pointerEvents = 'none';
                ghostEl.style.backgroundColor = (0, parse_color_1.parseColor)(_headlessNode.colors.primary);
                ghostEl.style.padding = '4px 8px';
                ghostEl.style.fontFamily = this.toolbox.workspace.renderer.constants.FONT_FAMILY;
                ghostEl.style.fontSize = `${this.toolbox.workspace.renderer.constants.FONT_SIZE}px`;
                ghostEl.style.color = (0, parse_color_1.parseColor)(this.toolbox.workspace.renderer.constants.FONT_COLOR);
                document.body.appendChild(ghostEl);
                const moveGhost = (ev) => {
                    ghostEl.style.left = ev.clientX + 4 + 'px';
                    ghostEl.style.top = ev.clientY + 4 + 'px';
                };
                const releaseGhost = (ev) => {
                    document.removeEventListener('mousemove', moveGhost);
                    document.removeEventListener('mouseup', releaseGhost);
                    // check if over workspace svg
                    const svg = this.toolbox.workspace.svg.node;
                    const rect = svg.getBoundingClientRect();
                    if (ev.clientX >= rect.left &&
                        ev.clientX <= rect.right &&
                        ev.clientY >= rect.top &&
                        ev.clientY <= rect.bottom) {
                        // convert to svg coordinates
                        const svgX = ev.clientX - rect.left;
                        const svgY = ev.clientY - rect.top;
                        // convert to workspace coordinates
                        const { x: wsX, y: wsY } = this.toolbox.workspace.screenToWorkspace(svgX, svgY);
                        // spawn node
                        this.toolbox.workspace.spawnAt(node.type, wsX, wsY);
                    }
                    // remove ghost element
                    ghostEl.remove();
                };
                document.addEventListener('mousemove', moveGhost);
                document.addEventListener('mouseup', releaseGhost);
                e.preventDefault();
            });
            this.container.appendChild(nodeEl);
        });
        this.show();
    }
    show() {
        this.container.style.display = 'block';
        this.visible = true;
    }
    hide() {
        this.container.style.display = 'none';
        this.visible = false;
    }
    clear() {
        this.container.innerHTML = '';
    }
}
exports["default"] = Flyout;


/***/ }),

/***/ "./src/headless-node.ts":
/*!******************************!*\
  !*** ./src/headless-node.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const nodesvg_1 = __importDefault(__webpack_require__(/*! ./nodesvg */ "./src/nodesvg.ts"));
const prototypes_1 = __importDefault(__webpack_require__(/*! ./prototypes */ "./src/prototypes.ts"));
function newHeadlessNode(type) {
    const proto = prototypes_1.default[type];
    if (!proto)
        return;
    const node = new nodesvg_1.default(proto);
    node.init();
    return node;
}
exports["default"] = newHeadlessNode;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __importDefault(__webpack_require__(/*! ./core */ "./src/core.ts"));
exports["default"] = core_1.default;


/***/ }),

/***/ "./src/inject.ts":
/*!***********************!*\
  !*** ./src/inject.ts ***!
  \***********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InjectMsg = void 0;
exports["default"] = inject;
const main_workspace_1 = __webpack_require__(/*! ./main-workspace */ "./src/main-workspace.ts");
const workspace_svg_1 = __importDefault(__webpack_require__(/*! ./workspace-svg */ "./src/workspace-svg.ts"));
const styler_1 = __importDefault(__webpack_require__(/*! ../util/styler */ "./util/styler.ts"));
// @ts-ignore
const styles_css_1 = __importDefault(__webpack_require__(/*! ./styles.css */ "./src/styles.css"));
const kabelStyles = styles_css_1.default;
class InjectMsg {
    msg;
    constructor(msg) {
        this.msg = msg;
    }
    err() {
        console.error(`Failed to inject workspace: ${this.msg}`);
    }
    wrn() {
        console.warn(`Inject warning: ${this.msg}`);
    }
    info() {
        console.info(`Inject info: ${this.msg}`);
    }
}
exports.InjectMsg = InjectMsg;
function inject(element, options = {}) {
    styler_1.default.appendStyles('KabelStyles', kabelStyles);
    const root = typeof element == 'string' ? document.querySelector(`#${element}`) : element;
    if ((!root) && typeof element == 'string') {
        (new InjectMsg(`Document does not contain root element (Check element ID).`)).err();
        return;
    }
    if (!document.contains(root)) {
        (new InjectMsg(`Document does not contain root element.`)).err();
        return;
    }
    const wsTop = document.createElement('div');
    wsTop.className = `KabelWorkspaceWrapper`;
    root.appendChild(wsTop);
    const ws = new workspace_svg_1.default(root, wsTop, options);
    (0, main_workspace_1.setMainWorkspace)(ws); // Set the main workspace to the newest created.
    return ws;
}


/***/ }),

/***/ "./src/main-workspace.ts":
/*!*******************************!*\
  !*** ./src/main-workspace.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getMainWorkspace = getMainWorkspace;
exports.setMainWorkspace = setMainWorkspace;
exports.clearMainWorkspace = clearMainWorkspace;
let mainws = null;
function getMainWorkspace() {
    return mainws;
}
function setMainWorkspace(ws) {
    return mainws = ws;
}
function clearMainWorkspace() {
    return mainws = null;
}


/***/ }),

/***/ "./src/nodesvg.ts":
/*!************************!*\
  !*** ./src/nodesvg.ts ***!
  \************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const connection_1 = __importDefault(__webpack_require__(/*! ./connection */ "./src/connection.ts"));
const has_prop_1 = __importDefault(__webpack_require__(/*! ../util/has-prop */ "./util/has-prop.ts"));
const field_1 = __webpack_require__(/*! ./field */ "./src/field.ts");
const colors_1 = __importDefault(__webpack_require__(/*! ./colors */ "./src/colors.ts"));
const coordinates_1 = __importDefault(__webpack_require__(/*! ./coordinates */ "./src/coordinates.ts"));
const uid_1 = __webpack_require__(/*! ../util/uid */ "./util/uid.ts");
const emitter_1 = __importDefault(__webpack_require__(/*! ../util/emitter */ "./util/emitter.ts"));
class NodeSvg extends emitter_1.default {
    previousConnection;
    nextConnection;
    type;
    prototype;
    colors; // Node's color scheme
    labelText; // Displayed node label
    _fieldColumn; // Stores attached fields
    relativeCoords;
    id;
    svgGroup = null;
    workspace = null;
    static REMOVING = "REMOVING";
    static INITING = "INITING";
    constructor(prototype, workspace, svgGroup) {
        super();
        this.type = null;
        this.prototype = prototype;
        this.colors = {
            primary: '#000000', // Topbar & connection color
            secondary: '#000000', // Field & dropdown backgrounds
            tertiary: '#000000', // Outline color
            category: '' // Node category name (optional)
        };
        this.previousConnection = new connection_1.default(null, this, true); //1st arg is from, 2nd is to, third is if this conn is prev
        this.nextConnection = new connection_1.default(this, null, false); //1st arg is from, 2nd is to, third is if this conn is prev
        this.labelText = '';
        this._fieldColumn = new Set();
        this.relativeCoords = new coordinates_1.default(0, 0);
        this.id = (0, uid_1.generateUID)('nanoid', { alphabet: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0129384756!)@(#*$&%^' });
        if (workspace) {
            this.workspace = workspace;
            this.workspace.addNode(this);
        }
        if (svgGroup) {
            this.svgGroup = svgGroup;
        }
    }
    allFields() {
        return Array.from(this._fieldColumn);
    }
    /** Get field by name */
    getFieldByName(name) {
        let field = this.allFields().find(fld => fld.getName() === name);
        return field;
    }
    getField(name) {
        return this.getFieldByName(name);
    }
    getFieldValue(name) {
        const fld = this.getFieldByName(name);
        if (fld) {
            return fld.getValue();
        }
        return undefined;
    }
    getFieldDisplayValue(name) {
        const fld = this.getFieldByName(name);
        if (fld) {
            return fld.getDisplayValue();
        }
        return undefined;
    }
    /**
     * Initiates the node, calling prototype methods.
     */
    init() {
        this.emit(NodeSvg.INITING, null);
        if (this.prototype) {
            if (this.prototype.init)
                this.prototype.init.call(this, this.prototype, this);
            if (this.prototype.removed) {
                this.on(NodeSvg.REMOVING, () => {
                    this.prototype?.removed.call(this, this.prototype, this);
                });
            }
        }
        else {
            console.warn(`Node with id ${this.id} is missing a prototype.`);
        }
    }
    /** Returns whether this node has a category style applied */
    hasCategoryStyle() {
        return !!this.colors?.category && this.colors?.category?.length > 0;
    }
    /** Returns the category name or null if none */
    getCategoryName() {
        return this.colors?.category || null;
    }
    /** Returns the node's current ColorStyle */
    getStyle() {
        return this.colors;
    }
    /** Internal helper: attach a field to this node */
    _appendFieldItem(field) {
        if (!field)
            console.warn("Falsey field passed to _appendFieldItem.");
        this._fieldColumn.add(field);
    }
    /** Initialize node from a NodeJson object */
    jsonInit(json) {
        if (json.primaryColor)
            this.colors.primary = json.primaryColor;
        if (json.secondaryColor)
            this.colors.secondary = json.secondaryColor;
        if (json.tertiaryColor)
            this.colors.tertiary = json.tertiaryColor;
        // Apply category colors if defined
        if (json.category && colors_1.default[json.category]) {
            const style = colors_1.default[json.category];
            Object.assign(this.colors, { category: json.category }, style);
        }
        this.previousConnection = (0, has_prop_1.default)(json, 'previousConnection') ? new connection_1.default(null, this) : null;
        this.nextConnection = (0, has_prop_1.default)(json, 'nextConnection') ? new connection_1.default(this, null) : null;
        if (json.labelText)
            this.labelText = json.labelText;
        if (json.arguments)
            this.applyJsonArguments(json.arguments);
        if (json.type) {
            this.type = json.type;
        }
    }
    /* JAVASCRIPT API */
    /** Apply field definitions from a JSON-like array without full NodeJson */
    applyJsonArguments(args) {
        for (let field of args) {
            if (!field.type || !field.name) {
                console.warn(`Invalid argument definition at: ${args.indexOf(field)}.`);
                continue;
            }
            const FieldConstructor = field_1.FieldMap[field.type];
            if (!FieldConstructor) {
                console.warn(`Missing field constructor for ${field.type}!`);
                continue;
            }
            const fld = new FieldConstructor();
            fld.fromJson(field); // initialize field
            console.log(fld);
            this._appendFieldItem(fld);
        }
    }
    appendConnection(name) {
        const fld = new (field_1.FieldMap['connection'])();
        this._appendFieldItem(fld);
        fld.setName(name);
        return fld;
    }
    appendNumber(name) {
        const fld = new (field_1.FieldMap['field_num'])();
        this._appendFieldItem(fld);
        fld.setName(name);
        return fld;
    }
    appendText(name) {
        const fld = new (field_1.FieldMap['field_str'])();
        this._appendFieldItem(fld);
        fld.setName(name);
        return fld;
    }
    /** Field that can hold a connection or raw value */
    appendOptLink(name) {
        const fld = new (field_1.FieldMap['field_both'])();
        this._appendFieldItem(fld);
        fld.setName(name);
        return fld;
    }
    setCategoryName(name) {
        this.colors.category = name;
    }
    setStyle(style) {
        Object.assign(this.colors, {}, style);
    }
    setColor(primary, secondary, tertiary) {
        this.setStyle({ primary, secondary, tertiary });
    }
    setLabelText(text) {
        return this.labelText = text;
    }
    /** Add or replace a previous/next connection based on argument */
    setConnection(prevOrNext) {
        const stringed = String(prevOrNext).toLowerCase();
        const cast = stringed == '0' ? 0 : (stringed == '1' ? 1 : (stringed == 'true' ? 1 : (stringed == 'false' ? 0 : 3)));
        if (cast === 0)
            return this.previousConnection = new connection_1.default(null, this);
        if (cast === 1)
            return this.nextConnection = new connection_1.default(this, null);
        console.warn('Invalid prevOrNext argument for NodeSvg.setConnection');
        return null;
    }
    /** Copies another NodeSvg into this node */
    fromNode(other) {
        if (!other)
            return;
        // Copy primitive props
        this.type = other.type;
        this.labelText = other.labelText;
        this.relativeCoords = new coordinates_1.default(other.relativeCoords.x, other.relativeCoords.y);
        // Copy colors
        this.colors = { ...other.colors };
        // Copy connections
        this.previousConnection = other.previousConnection
            ? new connection_1.default(null, this, true)
            : null;
        this.nextConnection = other.nextConnection
            ? new connection_1.default(this, null, false)
            : null;
        // Copy fields
        this._fieldColumn.clear();
        for (let field of other._fieldColumn) {
            const FieldCls = field.constructor;
            const newField = new FieldCls();
            // Copy basic properties
            newField.setName(field.getName());
            if ('getValue' in field && 'setValue' in newField) {
                newField.setValue(field.getValue());
            }
            if ('getLabel' in field && 'setLabel' in newField) {
                newField.setLabel(field.getLabel());
            }
            this._appendFieldItem(newField);
        }
        // Copy workspace reference
        this.workspace = other.workspace;
        // Copy prototype reference
        this.prototype = other.prototype;
        return this;
    }
}
exports["default"] = NodeSvg;


/***/ }),

/***/ "./src/prototypes.ts":
/*!***************************!*\
  !*** ./src/prototypes.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const NodePrototypes = {};
exports["default"] = NodePrototypes;


/***/ }),

/***/ "./src/renderer-map.ts":
/*!*****************************!*\
  !*** ./src/renderer-map.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RendererMap = exports.RMap = void 0;
const renderer_1 = __importDefault(__webpack_require__(/*! ../renderers/renderer */ "./renderers/renderer.ts"));
const RendererMap = {
    [renderer_1.default.NAME]: renderer_1.default,
    'default': renderer_1.default
};
exports.RendererMap = RendererMap;
class RMap {
    static register(RendererCls, optName) {
        const name = optName ?? RendererCls.NAME;
        RendererMap[name] = RendererCls;
    }
    static delete(name) {
        if (name === 'default')
            return false;
        if (RendererMap[name]) {
            delete RendererMap[name];
            return true;
        }
        return false;
    }
    static get(name) {
        return RendererMap[name] ?? RendererMap['default'];
    }
    static list() {
        return Object.keys(RendererMap);
    }
    /**
     * Helper to normalize any renderer input into a valid Renderer class
     * @param input - Either a string (renderer name), a class, or undefined
     * @returns A Renderer constructor
     */
    static resolve(input) {
        if (!input)
            return RendererMap['default'];
        if (typeof input === 'string') {
            if (!RMap.get(input)) {
                return RendererMap['default'];
            }
            return RMap.get(input);
        }
        return (typeof input == 'function') ? input : RendererMap['default'];
    }
}
exports.RMap = RMap;


/***/ }),

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/* Workspace wrapper: horizontal layout */\r\n.KabelWorkspaceWrapper {\r\n    display: flex;\r\n    flex-direction: row;\r\n    width: 100%;\r\n    height: 100%;\r\n    background: #f0f0f0;\r\n    /* light gray background */\r\n    overflow: hidden;\r\n    position: relative;\r\n}\r\n\r\n/* Toolbox panel (left) */\r\n.KabelToolbox {\r\n    width: 12%;\r\n    min-width: 150px;\r\n    height: 100%;\r\n    background: rgba(240, 240, 240, 0.95);\r\n    border-right: 1px solid #ccc;\r\n    box-sizing: border-box;\r\n    display: flex;\r\n    flex-direction: column;\r\n    padding: 8px;\r\n    overflow-y: auto;\r\n}\r\n\r\n/* Context menu container */\r\n.KabelContextMenu {\r\n    position: absolute;\r\n    background: #1e1e2f;\r\n    color: #000000;\r\n    border-radius: 6px;\r\n    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);\r\n    padding: 4px 0;\r\n    font-family: 'Segoe UI', sans-serif;\r\n    font-size: 14px;\r\n    min-width: 160px;\r\n    z-index: 9999;\r\n    user-select: none;\r\n    overflow: visible;\r\n    height: auto;\r\n    transition: opacity 0.15s ease, transform 0.15s ease;\r\n    opacity: 0;\r\n    transform: scale(0.95);\r\n    display: flex;\r\n    flex-direction: column;\r\n}\r\n\r\n/* Show state */\r\n.KabelContextMenu.show {\r\n    opacity: 1;\r\n    transform: scale(1);\r\n}\r\n\r\n/* Individual option */\r\n.KabelContextOption {\r\n    padding: 8px 16px;\r\n    cursor: pointer;\r\n    transition: background 0.15s ease, color 0.15s ease;\r\n}\r\n\r\n.KabelContextOption:hover {\r\n    background: #b0adb0;\r\n    color: #fff;\r\n}\r\n\r\n/* Optional: active click effect */\r\n.KabelContextOption:active {\r\n    background: #fff;\r\n    color: #000;\r\n}\r\n\r\n/* Scrollbar if too many options */\r\n.KabelContextMenu::-webkit-scrollbar {\r\n    width: 6px;\r\n}\r\n\r\n.KabelContextMenu::-webkit-scrollbar-thumb {\r\n    background: rgba(255, 255, 255, 0.2);\r\n    border-radius: 3px;\r\n}\r\n\r\n/* Category buttons */\r\n.KabelToolbox button {\r\n    background: #fff;\r\n    border: 1px solid #ccc;\r\n    border-radius: 4px;\r\n    margin-bottom: 4px;\r\n    padding: 6px;\r\n    cursor: pointer;\r\n    text-align: left;\r\n    transition: background 0.2s, color 0.2s;\r\n}\r\n\r\n.KabelToolbox button:hover {\r\n    background: #e6e6e6;\r\n    color: #333;\r\n}\r\n\r\n/* Flyout panel (right) */\r\n.KabelFlyout {\r\n    width: 20%;\r\n    height: 100%;\r\n    background: rgba(255, 255, 255, 0.95);\r\n    border-left: 1px solid #ccc;\r\n    box-sizing: border-box;\r\n    overflow-y: auto;\r\n    position: relative;\r\n    /* for absolute positioning of nodes inside */\r\n    display: none;\r\n    /* hidden by default */\r\n    padding: 8px;\r\n}\r\n\r\n/* Flyout nodes */\r\n.KabelFlyoutNode {\r\n    padding: 6px 10px;\r\n    margin-bottom: 4px;\r\n    border-radius: 4px;\r\n    cursor: pointer;\r\n    user-select: none;\r\n    transition: background 0.2s;\r\n}\r\n\r\n.KabelFlyoutNode:hover {\r\n    background: #e0e0e0;\r\n}\r\n\r\n/* SVG workspace area */\r\n.KabelWorkspaceWrapper svg {\r\n    flex: 1;\r\n    width: 100%;\r\n    height: 100%;\r\n    background: #fff;\r\n    /* white canvas background */\r\n    display: block;\r\n}");

/***/ }),

/***/ "./src/toolbox.ts":
/*!************************!*\
  !*** ./src/toolbox.ts ***!
  \************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const flyout_1 = __importDefault(__webpack_require__(/*! ./flyout */ "./src/flyout.ts"));
class Toolbox {
    type;
    workspace;
    wsOptions;
    _flyout;
    _contents;
    container;
    constructor(workspace) {
        this.workspace = workspace;
        this.wsOptions = this.getOptions();
        this.type = this.wsOptions.toolbox?.type == 'flyout' ? 2 : 1;
        this._contents = this.wsOptions.toolbox?.contents ?? [];
        // pass toolbox reference to flyout
        this._flyout = new flyout_1.default(this);
        this.container = document.createElement('div');
        this.container.className = 'KabelToolbox';
        this.container.style.position = 'absolute';
        this.container.style.left = '0';
        this.container.style.top = '0';
        this.container.style.width = '20%';
        this.container.style.height = '100%';
        this.container.style.background = 'rgba(240,240,240,0.9)';
        this.container.style.overflowY = 'auto';
        workspace._wsTop.appendChild(this.container);
        if (this.type === 1)
            this.initCategoryToolbox();
        if (this.type === 2)
            this.initFlyoutToolbox();
    }
    getOptions() {
        return this.workspace.options;
    }
    initCategoryToolbox() {
        const categories = this._contents;
        categories.forEach(category => {
            const btn = document.createElement('button');
            btn.textContent = category.name;
            btn.style.display = 'block';
            btn.style.width = '100%';
            btn.style.padding = '6px';
            btn.style.marginBottom = '2px';
            btn.addEventListener('click', e => {
                e.stopPropagation();
                this._flyout.clear();
                this._flyout.fill(category.contents);
                this._flyout.show();
            });
            this.container.appendChild(btn);
        });
        // clicking workspace hides flyout
        this.workspace.svg.on('click', () => this._flyout.hide());
    }
    initFlyoutToolbox() {
        this.container.style.display = 'none';
        const nodes = this._contents;
        this._flyout.fill(nodes);
    }
}
exports["default"] = Toolbox;


/***/ }),

/***/ "./src/widget-prototypes.ts":
/*!**********************************!*\
  !*** ./src/widget-prototypes.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const WidgetPrototypes = {};
exports["default"] = WidgetPrototypes;


/***/ }),

/***/ "./src/widget.ts":
/*!***********************!*\
  !*** ./src/widget.ts ***!
  \***********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const coordinates_1 = __importDefault(__webpack_require__(/*! ./coordinates */ "./src/coordinates.ts"));
const uid_1 = __webpack_require__(/*! ../util/uid */ "./util/uid.ts");
class Widget {
    workspace;
    container;
    coords;
    width;
    height;
    visible;
    name;
    id;
    options;
    static WIDGET_GLOBAL_ID = 0;
    constructor(workspace, options = { name: `Untitled(${Widget.WIDGET_GLOBAL_ID++})` }) {
        this.workspace = workspace;
        this.coords = options.coords ?? new coordinates_1.default(0, 0);
        this.width = options.width ?? 200;
        this.height = options.height ?? 100;
        this.visible = false;
        this.name = options.name;
        this.id = (0, uid_1.generateUID)('nanoid', { alphabet: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0129384756!)@(#*$&%^' });
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
        if (options.html)
            this.container.innerHTML = options.html;
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
    setCoords(coords) {
        this.coords = coords;
        this.container.style.left = `${coords.x}px`;
        this.container.style.top = `${coords.y}px`;
    }
    // Update the HTML content
    setHTML(html) {
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
        if (this.options.html)
            this.container.innerHTML = this.options.html;
        this.workspace._wsTop.appendChild(this.container);
        this.workspace._addWidgetToDB(this);
    }
    // Destroy widget & cleanup.
    destroy() {
        this.container.remove();
        this.workspace._delWidgetFromDB(this);
    }
}
exports["default"] = Widget;


/***/ }),

/***/ "./src/workspace-coords.ts":
/*!*********************************!*\
  !*** ./src/workspace-coords.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const coordinates_1 = __importDefault(__webpack_require__(/*! ./coordinates */ "./src/coordinates.ts"));
class WorkspaceCoords extends coordinates_1.default {
    constructor(x = 0, y = 0) {
        super(x, y);
    }
}
exports["default"] = WorkspaceCoords;


/***/ }),

/***/ "./src/workspace-svg.ts":
/*!******************************!*\
  !*** ./src/workspace-svg.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const coordinates_1 = __importDefault(__webpack_require__(/*! ./coordinates */ "./src/coordinates.ts"));
const nodesvg_1 = __importDefault(__webpack_require__(/*! ./nodesvg */ "./src/nodesvg.ts"));
const svg_js_1 = __webpack_require__(/*! @svgdotjs/svg.js */ "./node_modules/@svgdotjs/svg.js/dist/svg.node.cjs");
const workspace_coords_1 = __importDefault(__webpack_require__(/*! ./workspace-coords */ "./src/workspace-coords.ts"));
const base_1 = __importDefault(__webpack_require__(/*! ../controllers/base */ "./controllers/base.ts"));
const wasd_1 = __importDefault(__webpack_require__(/*! ../controllers/wasd */ "./controllers/wasd.ts"));
const renderer_map_1 = __webpack_require__(/*! ./renderer-map */ "./src/renderer-map.ts");
const toolbox_1 = __importDefault(__webpack_require__(/*! ./toolbox */ "./src/toolbox.ts"));
const prototypes_1 = __importDefault(__webpack_require__(/*! ./prototypes */ "./src/prototypes.ts"));
const headless_node_1 = __importDefault(__webpack_require__(/*! ./headless-node */ "./src/headless-node.ts"));
const widget_1 = __importDefault(__webpack_require__(/*! ./widget */ "./src/widget.ts"));
const widget_prototypes_1 = __importDefault(__webpack_require__(/*! ./widget-prototypes */ "./src/widget-prototypes.ts"));
const context_menu_1 = __importDefault(__webpack_require__(/*! ./context-menu */ "./src/context-menu.ts"));
function resolveController(options) {
    if (options?.controls) {
        if (options?.controls.wasd) {
            return wasd_1.default;
        }
    }
    return base_1.default;
}
/**
 * Represents the visual workspace containing nodes and connections.
 * Handles rendering, panning, and coordinate transformations.
 */
class WorkspaceSvg {
    /** Top-left offset of the workspace viewport */
    _camera;
    /** Node storage by unique ID */
    _nodeDB;
    /** Root HTML container for the workspace */
    _root;
    /** Top-level wrapper for the SVG */
    _wsTop;
    /** SVG.js instance for rendering */
    svg;
    /** Renderer instance for drawing nodes and connections */
    renderer;
    /** Options for workspace behavior and rendering overrides */
    options;
    /** Flag to temporarily prevent redraws */
    noRedraw;
    /**
     * A class instance that moves the camera based on user interactions.
     */
    controller;
    /**
     * Toolbox for the workspace.
     */
    toolbox;
    /**
     * A list of widgets active in this workspace
     */
    _widgetDB;
    /**
     * A manager for the context menu widget
     */
    _ctxMenu;
    /**
     * Creates a new WorkspaceSvg instance.
     * @param root - The root HTML element containing the workspace.
     * @param wsTop - The top-level wrapper element for the SVG.
     * @param options - Configuration and renderer override options.
     */
    constructor(root, wsTop, options) {
        wsTop.style.width = '100%';
        wsTop.style.height = '100%';
        this._root = root;
        this._wsTop = wsTop;
        this.svg = (0, svg_js_1.SVG)().addTo(this._wsTop).size('100%', '100%');
        this.options = options;
        let RClass = renderer_map_1.RMap.resolve(options.renderer);
        this.renderer = new RClass(this, this.options.rendererOverrides || {});
        if (this.options.toolbox) {
            this.toolbox = new toolbox_1.default(this);
        }
        this._camera = new workspace_coords_1.default(0, 0);
        this._nodeDB = new Map();
        this.noRedraw = false;
        this.controller = new (options.Controller ?? resolveController(options))(this);
        this._widgetDB = new Map();
        this._ctxMenu = new context_menu_1.default(this);
    }
    cloneNode(nodeSvg) {
        const n = new nodesvg_1.default(nodeSvg.prototype, this);
        n.init();
        n.fromNode(nodeSvg);
        this.redraw();
    }
    _addWidgetToDB(wdgt) {
        this._widgetDB.set(wdgt.id, wdgt);
    }
    _delWidgetFromDB(wdgt) {
        this._widgetDB.delete(wdgt.id);
    }
    newWidget(type) {
        const opts = widget_prototypes_1.default[type];
        if (!opts)
            return;
        if (opts.cls) {
            const wdgt = new (opts.cls)(this, opts);
            this._addWidgetToDB(wdgt);
            return wdgt;
        }
        const wdgt = new widget_1.default(this, opts);
        this._addWidgetToDB(wdgt);
        return wdgt;
    }
    getWidget(id) {
        if (this._widgetDB.has(id))
            return this._widgetDB.get(id);
        return undefined;
    }
    /**
     * Returns the current width and height of the workspace's svg content size in pixels.
     * Useful for camera positioning.
     */
    getContentSize() {
        const bbox = this.svg.bbox();
        return { width: bbox.width, height: bbox.height };
    }
    /**
     * Returns the current width and height of the workspace in pixels.
     * Useful for camera centering, zoom calculations, and viewport sizing.
     */
    getSize() {
        const rect = this._wsTop.getBoundingClientRect();
        return { width: rect.width, height: rect.height };
    }
    /**
     * Updates all connection lines & node screen positions without a full redraw.
     * Used when nodes are dragged or the camera moves.
     */
    refresh() {
        this.renderer.refreshNodeTransforms();
    }
    /** Draws all nodes in the workspace. */
    drawAllNodes() {
        for (let [nodeId, _] of this._nodeDB) {
            this.drawNode(nodeId);
        }
    }
    /** Redraws the entire workspace unless noRedraw is set. */
    redraw() {
        if (this.noRedraw)
            return;
        this.renderer.clearScreen();
        this.drawAllNodes();
        this.refresh();
    }
    /**
     * Converts workspace coordinates to screen (SVG) coordinates.
     * @param x - X position in workspace coordinates.
     * @param y - Y position in workspace coordinates.
     * @returns Screen coordinates as a Coordinates instance.
     */
    workspaceToScreen(x, y) {
        const { x: rx, y: ry } = this.controller.workspaceToScreen(x, y);
        return new coordinates_1.default(rx, ry);
    }
    /**
     * Converts screen (SVG) coordinates to workspace coordinates.
     * @param x - X position in screen coordinates.
     * @param y - Y position in screen coordinates.
     * @returns Workspace coordinates as a Coordinates instance.
     */
    screenToWorkspace(x, y) {
        const { x: rx, y: ry } = this.controller.screenToWorkspace(x, y);
        return new coordinates_1.default(rx, ry);
    }
    /**
     * Draws a node by its ID.
     * @param id - The ID of the node to render.
     * @returns The rendered node.
     */
    drawNode(id) {
        return this.renderer.renderNode(id);
    }
    /**
     * Adds a node to the workspace.
     * @param node - The node instance to add.
     * @param nodeId - Optional custom ID to use instead of node.id.
     */
    addNode(node, nodeId) {
        let id = nodeId || node.id;
        if (this._nodeDB.has(id)) {
            console.warn(`Node with id ${id} already exists, overwriting.`);
        }
        if (node.workspace !== this) {
            node.workspace = this;
        }
        this._nodeDB.set(id, node);
        this.redraw();
    }
    /**
     * Create a new node of *type*.
     * @param type - The node's prototype name.
     */
    newNode(type) {
        if (!prototypes_1.default[type])
            return;
        const node = (0, headless_node_1.default)(type);
        if (!node)
            return;
        this.addNode(node);
        return node;
    }
    spawnAt(type, x, y) {
        const node = this.newNode(type);
        if (!node)
            return;
        node.relativeCoords.set(x, y);
        this.redraw();
        return node;
    }
    /**
     * Removes a node by its ID.
     * @param id - The ID of the node to remove.
     */
    removeNodeById(id) {
        const node = this._nodeDB.get(id);
        if (!node)
            return;
        this._nodeDB.delete(id);
        this.redraw();
    }
    /**
     * Removes a node by its instance.
     * @param node - The node instance to remove.
     */
    removeNode(node) {
        if (!node)
            return;
        this.removeNodeById(node.id);
    }
    /**
     * Retrieves a node by its ID.
     * @param id - The ID of the node.
     * @returns The NodeSvg instance or undefined if not found.
     */
    getNode(id) {
        return this._nodeDB.get(id);
    }
    /**
     * Pans the camera by the given delta values.
     * @param dx - Change in X direction.
     * @param dy - Change in Y direction.
     */
    pan(dx, dy) {
        this._camera.x += dx;
        this._camera.y += dy;
    }
}
exports["default"] = WorkspaceSvg;


/***/ }),

/***/ "./util/emitter.ts":
/*!*************************!*\
  !*** ./util/emitter.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
class EventEmitter {
    listeners = {};
    on(event, handler) {
        if (!this.listeners[event])
            this.listeners[event] = [];
        this.listeners[event].push(handler);
        return this;
    }
    off(event, handler) {
        if (!this.listeners[event])
            return this;
        this.listeners[event] = this.listeners[event].filter(h => h !== handler);
        return this;
    }
    emit(event, payload) {
        if (!this.listeners[event])
            return false;
        this.listeners[event].forEach(handler => handler(payload));
        return true;
    }
    once(event, handler) {
        const wrapper = (payload) => {
            handler(payload);
            this.off(event, wrapper);
        };
        this.on(event, wrapper);
        return this;
    }
}
exports["default"] = EventEmitter;


/***/ }),

/***/ "./util/escape-html.ts":
/*!*****************************!*\
  !*** ./util/escape-html.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
function escapeAttr(s) {
    return s.replace(/&/g, "&amp;")
        .replace(/'/g, "&apos;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}
exports["default"] = escapeAttr;


/***/ }),

/***/ "./util/eventer.ts":
/*!*************************!*\
  !*** ./util/eventer.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Eventer = void 0;
/**
 * Used by the Kabel renderer to tag svg.js elements as interactable with the kabel system.
 */
class Eventer {
    elements = [];
    eventRegistry = new Map();
    // Register an event type with a setup function
    registerEvent(type, setupFn) {
        this.eventRegistry.set(type, setupFn);
        return this; // allow chaining
    }
    tagElement(el, tags) {
        if (!tags)
            return this;
        const tagList = Array.isArray(tags) ? tags : [tags];
        // Find the registered elements for this el
        for (const reg of this.elements) {
            if (reg.el === el) {
                for (const t of tagList) {
                    if (!reg.tags.includes(t))
                        reg.tags.push(t);
                }
            }
        }
        return this;
    }
    destroyByTag(tag) {
        let destroyed = false;
        this.elements = this.elements.filter(reg => {
            if (reg.tags.includes(tag)) {
                if (reg.destroyFn) {
                    reg.destroyFn();
                    destroyed = true;
                }
                return false; // remove this element
            }
            return true; // keep element
        });
        return destroyed ? 1 : 0;
    }
    // addElement
    addElement(el, types, args) {
        const typeList = Array.isArray(types) ? types : [types];
        for (const type of typeList) {
            const destroyFn = this.setupElement(el, type, args);
            this.elements.push({
                tags: [],
                el,
                type,
                args,
                destroyFn
            });
        }
        return this;
    }
    // refresh
    refresh() {
        for (const reg of this.elements) {
            if (reg.destroyFn)
                reg.destroyFn();
            reg.destroyFn = this.setupElement(reg.el, reg.type, reg.args);
        }
    }
    // Destroy event(s) for an element
    destroyElement(el, type) {
        let destroyed = false;
        for (const reg of this.elements) {
            if (reg.el === el && (!type || reg.type === type)) {
                if (reg.destroyFn) {
                    reg.destroyFn();
                    destroyed = true;
                }
                // Remove from elements array
                this.elements = this.elements.filter(r => r !== reg);
            }
        }
        return destroyed ? 1 : 0;
    }
    setupElement(el, type, args) {
        const setupFn = this.eventRegistry.get(type);
        if (!setupFn)
            return;
        const destroyFn = setupFn(el, args);
        return destroyFn instanceof Function ? destroyFn : undefined;
    }
}
exports.Eventer = Eventer;
const eventer = new Eventer();
exports["default"] = eventer;


/***/ }),

/***/ "./util/has-prop.ts":
/*!**************************!*\
  !*** ./util/has-prop.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = hasProp;
function hasProp(obj, name) {
    return Object.prototype.hasOwnProperty.call(obj, name);
}


/***/ }),

/***/ "./util/parse-color.ts":
/*!*****************************!*\
  !*** ./util/parse-color.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parseColor = parseColor;
/**
 * Parse any Color type into a hex string "#RRGGBB"
 */
function parseColor(color) {
    if (typeof color === 'string') {
        if (color.startsWith('#')) {
            // Already a hex string, normalize to full #RRGGBB
            let hex = color.slice(1);
            if (hex.length === 3)
                hex = hex.split('').map(c => c + c).join('');
            return `#${hex}`;
        }
        else {
            // RGB string "r, g, b"
            const parts = color.split(',').map(s => parseInt(s.trim(), 10));
            if (parts.length !== 3)
                throw new Error(`Invalid RGB string: ${color}`);
            const [r, g, b] = parts;
            if (!r || !g || !b) {
                console.warn("Invalid RGB tuple");
                return "#000";
            }
            return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b
                .toString(16)
                .padStart(2, '0')}`;
        }
    }
    else if (Array.isArray(color)) {
        // RGBTuple [r,g,b]
        const [r, g, b] = color;
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b
            .toString(16)
            .padStart(2, '0')}`;
    }
    else {
        // RGBObject {r,g,b}
        const { r, g, b } = color;
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b
            .toString(16)
            .padStart(2, '0')}`;
    }
}


/***/ }),

/***/ "./util/path.ts":
/*!**********************!*\
  !*** ./util/path.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

// path.ts
/**
 * Utility functions to generate SVG path strings or translate them.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.roundedRect = roundedRect;
exports.roundedTri = roundedTri;
exports.circle = circle;
exports.ellipse = ellipse;
exports.star = star;
exports.polygon = polygon;
exports.rotatePath = rotatePath;
/** Rounded rectangle */
function roundedRect(width, height, radius) {
    radius = Math.min(radius, width / 2, height / 2);
    return `
		M${radius},0
		H${width - radius}
		A${radius},${radius} 0 0 1 ${width},${radius}
		V${height - radius}
		A${radius},${radius} 0 0 1 ${width - radius},${height}
		H${radius}
		A${radius},${radius} 0 0 1 0,${height - radius}
		V${radius}
		A${radius},${radius} 0 0 1 ${radius},0
		Z
	`.replace(/\s+/g, ' ').trim();
}
/** Rounded triangle pointing up */
function roundedTri(width, height, radius) {
    const halfW = width / 2;
    radius = Math.min(radius, halfW, height / 2);
    return `
		M${halfW},0
		L${width - radius},${height - radius}
		A${radius},${radius} 0 0 1 ${width - radius * 2},${height}
		L${radius * 2},${height}
		A${radius},${radius} 0 0 1 ${radius},${height - radius}
		Z
	`.replace(/\s+/g, ' ').trim();
}
/** Circle */
function circle(radius) {
    return `
		M${radius},0
		A${radius},${radius} 0 1,0 ${-radius},0
		A${radius},${radius} 0 1,0 ${radius},0
		Z
	`.replace(/\s+/g, ' ').trim();
}
/** Ellipse */
function ellipse(rx, ry) {
    return `
		M${rx},0
		A${rx},${ry} 0 1,0 ${-rx},0
		A${rx},${ry} 0 1,0 ${rx},0
		Z
	`.replace(/\s+/g, ' ').trim();
}
/** Star with n points */
function star(radius, points = 5) {
    if (points < 2)
        throw new Error('Star must have at least 2 points');
    let path = '';
    const step = (Math.PI * 2) / (points * 2);
    for (let i = 0; i < points * 2; i++) {
        const r = i % 2 === 0 ? radius : radius / 2;
        const x = r * Math.sin(i * step);
        const y = -r * Math.cos(i * step);
        path += i === 0 ? `M${x},${y}` : ` L${x},${y}`;
    }
    path += ' Z';
    return path;
}
/** Regular polygon (triangle, pentagon, hexagon, etc) */
function polygon(radius, sides = 3) {
    if (sides < 3)
        throw new Error('Polygon must have at least 3 sides');
    let path = '';
    const step = (Math.PI * 2) / sides;
    for (let i = 0; i < sides; i++) {
        const x = radius * Math.cos(i * step - Math.PI / 2);
        const y = radius * Math.sin(i * step - Math.PI / 2);
        path += i === 0 ? `M${x},${y}` : ` L${x},${y}`;
    }
    path += ' Z';
    return path;
}
const svgpath_1 = __importDefault(__webpack_require__(/*! svgpath */ "./node_modules/svgpath/index.js"));
/**
 * Rotate an SVG path string around a given point
 * @param path - SVG path string
 * @param angle - rotation angle in degrees
 * @param cx - x-coordinate of rotation center (default 0)
 * @param cy - y-coordinate of rotation center (default 0)
 * @returns new rotated SVG path string
 */
function rotatePath(path, angle, cx = 0, cy = 0) {
    return new svgpath_1.default(path)
        .rotate(angle, cx, cy)
        .toString();
}


/***/ }),

/***/ "./util/styler.ts":
/*!************************!*\
  !*** ./util/styler.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Styler = void 0;
class Styler {
    styles;
    constructor() {
        this.styles = new Map();
    }
    appendStyles(id, css) {
        if (this.styles.has(id))
            return; // Do not append if id exists
        const styleEl = document.createElement('style');
        styleEl.id = id;
        styleEl.textContent = css;
        document.head.appendChild(styleEl);
        this.styles.set(id, styleEl);
    }
    removeStyles(id) {
        const styleEl = this.styles.get(id);
        if (!styleEl)
            return;
        styleEl.remove();
        this.styles.delete(id);
    }
    updateStyles(id, css) {
        const styleEl = this.styles.get(id);
        if (!styleEl)
            return;
        styleEl.textContent = css;
    }
    hasStyles(id) {
        return this.styles.has(id);
    }
}
exports.Styler = Styler;
const styler = new Styler();
exports["default"] = styler;


/***/ }),

/***/ "./util/uid.ts":
/*!*********************!*\
  !*** ./util/uid.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// uid.ts
// Tiny UID toolkit – no deps. Tabs > spaces, obviously.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.uuidv4 = uuidv4;
exports.ulid = ulid;
exports.nanoid = nanoid;
exports.shortId = shortId;
exports.generateUID = generateUID;
/** Web Crypto shim (browser + Node 16+) */
const cryptoAPI = (typeof globalThis !== "undefined" && globalThis.crypto) || null;
/** Random bytes helper */
function randBytes(len) {
    if (cryptoAPI?.getRandomValues) {
        const buf = new Uint8Array(len);
        cryptoAPI.getRandomValues(buf);
        return buf;
    }
    // Last resort (very old envs). Not cryptographically strong.
    const buf = new Uint8Array(len);
    for (let i = 0; i < len; i++)
        buf[i] = Math.floor(Math.random() * 256);
    return buf;
}
/** RFC4122 UUID v4 (uses crypto.randomUUID if available) */
function uuidv4() {
    const g = globalThis;
    if (g?.crypto?.randomUUID)
        return g.crypto.randomUUID();
    const b = randBytes(16);
    // Per RFC: set version + variant bits
    // @ts-ignore
    b[6] = (b[6] & 0x0f) | 0x40;
    // @ts-ignore
    b[8] = (b[8] & 0x3f) | 0x80;
    const hex = [];
    for (let i = 0; i < 256; i++)
        hex.push(i.toString(16).padStart(2, "0"));
    return (
    // @ts-ignore
    hex[b[0]] + hex[b[1]] + hex[b[2]] + hex[b[3]] + "-" +
        // @ts-ignore
        hex[b[4]] + hex[b[5]] + "-" +
        // @ts-ignore
        hex[b[6]] + hex[b[7]] + "-" +
        // @ts-ignore
        hex[b[8]] + hex[b[9]] + "-" +
        // @ts-ignore
        hex[b[10]] + hex[b[11]] + hex[b[12]] + hex[b[13]] + hex[b[14]] + hex[b[15]]);
}
/** Crockford Base32 alphabet for ULID */
const CROCK32 = "0123456789ABCDEFGHJKMNPQRSTVWXYZ"; // no I L O U
/** ULID: time-sortable, 26 chars */
function ulid(date) {
    const time = (typeof date === "number" ? date : Date.now()) >>> 0; // low 32 bits
    const timeHi = Math.floor((typeof date === "number" ? date : Date.now()) / 0x100000000) >>> 0; // high 32
    // ULID uses 48-bit time; do base32 encode 48 bits
    const time48 = new Uint8Array(6);
    // write 48-bit big-endian
    let t = BigInt(typeof date === "number" ? date : Date.now());
    for (let i = 5; i >= 0; i--) {
        time48[i] = Number(t & 0xffn);
        t >>= 8n;
    }
    // first 10 chars = time
    let out = "";
    let acc = 0;
    let bits = 0;
    for (let i = 0; i < 6; i++) {
        // @ts-ignore
        acc = (acc << 8) | time48[i];
        bits += 8;
        while (bits >= 5) {
            bits -= 5;
            out += CROCK32[(acc >>> bits) & 31];
        }
    }
    if (bits > 0)
        out += CROCK32[(acc << (5 - bits)) & 31];
    out = out.slice(0, 10);
    // last 16 chars = randomness (80 bits)
    const rnd = randBytes(10);
    acc = 0;
    bits = 0;
    for (let i = 0; i < rnd.length; i++) {
        // @ts-ignore
        acc = (acc << 8) | rnd[i];
        bits += 8;
        while (bits >= 5) {
            bits -= 5;
            out += CROCK32[(acc >>> bits) & 31];
        }
    }
    if (bits > 0)
        out += CROCK32[(acc << (5 - bits)) & 31];
    return out.slice(0, 26);
}
/** NanoID-style: URL-safe alphabet by default, configurable length/alphabet */
const DEFAULT_ALPHABET = "_-0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
function nanoid(size = 21, alphabet = DEFAULT_ALPHABET) {
    if (size <= 0)
        throw new Error("size must be > 0");
    const mask = (1 << Math.ceil(Math.log2(alphabet.length))) - 1;
    let id = "";
    while (id.length < size) {
        const bytes = randBytes(1);
        // @ts-ignore
        const idx = bytes[0] & mask;
        if (idx < alphabet.length)
            id += alphabet[idx];
    }
    return id;
}
/** Short, mostly-unique (not crypto-strong): timestamp base36 + counter + random */
let _ctr = 0;
function shortId() {
    const ts = Date.now().toString(36);
    _ctr = (_ctr + 1) & 0xfff; // 0..4095
    const c = _ctr.toString(36).padStart(3, "0");
    const r = Array.from(randBytes(3))
        .map(b => (b & 0x3f).toString(36).padStart(2, "0"))
        .join("")
        .slice(0, 4);
    return `${ts}${c}${r}`;
}
/** One-call wrapper */
function generateUID(strategy = "uuidv4", opts = {}) {
    switch (strategy) {
        case "uuidv4": return uuidv4();
        case "ulid": return ulid();
        case "nanoid": return nanoid(opts.size ?? 21, opts.alphabet ?? DEFAULT_ALPHABET);
        case "short": return shortId();
        default: {
            const _exhaustive = strategy;
            return uuidv4();
        }
    }
}


/***/ }),

/***/ "./util/unescape-html.ts":
/*!*******************************!*\
  !*** ./util/unescape-html.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
function unescapeAttr(s) {
    return s.replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'")
        .replace(/&amp;/g, "&");
}
exports["default"] = unescapeAttr;


/***/ }),

/***/ "./util/user-state.ts":
/*!****************************!*\
  !*** ./util/user-state.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserState = void 0;
class UserState {
    state;
    callbacks;
    constructor() {
        this.state = new Set();
        this.callbacks = new Map();
    }
    /** Adds a state */
    setState(name) {
        const wasPresent = this.state.has(name);
        if (!wasPresent) {
            this.state.add(name);
            this.triggerCallbacks(name, 1);
        }
    }
    /** Removes a state */
    removeState(name) {
        const wasPresent = this.state.has(name);
        if (wasPresent) {
            this.state.delete(name);
            this.triggerCallbacks(name, 0);
        }
    }
    /** Checks if state is active */
    hasState(name) {
        return this.state.has(name);
    }
    /** Registers a callback for state changes */
    onStateChange(name, cb) {
        if (!this.callbacks.has(name))
            this.callbacks.set(name, []);
        this.callbacks.get(name).push(cb);
    }
    /** Internal: triggers callbacks for a state */
    triggerCallbacks(name, addedOrRemoved) {
        const cbs = this.callbacks.get(name);
        if (!cbs)
            return;
        for (const cb of cbs)
            cb(addedOrRemoved);
    }
}
exports.UserState = UserState;
const userState = new UserState();
exports["default"] = userState;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	__webpack_exports__ = __webpack_exports__["default"];
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=kabel.js.map