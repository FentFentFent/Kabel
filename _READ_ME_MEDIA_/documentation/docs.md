
# Kabel Documentation

**Kabel** is a node-based visual programming editor for building interactive, logic-driven UIs in the browser. It’s built around JavaScript and uses SVG for rendering. Kabel supports node creation, custom fields, widgets, toolboxes, and smooth workspace controls.

---

## Table of Contents

1. Getting Started
2. Setting Up Your First Workspace
3. Creating Your First Node Prototype
4. Creating a Toolbox
5. Manipulating Nodes
6. Serializing & Deserializing Nodes
7. Finishing Up

## In-depth Docs
[Kabel API Documentation](../../docs/globals.md)

---

## 1. Getting Started

You can include Kabel either via a script tag or import it as a module:

```html
<script src="./kabel.js"></script>
```

Once loaded:

```js
if (typeof Kabel !== 'undefined') {
	console.log('Kabel is ready!');
}
```

That’s all you need to confirm it’s available before initializing a workspace.

---

## 2. Setting Up Your First Workspace

The **workspace** is where nodes live and interact. Start by creating an HTML container:

```js
const el = document.createElement('div');
Object.assign(el.style, {
	width: '100vw',
	height: '100vh',
	background: '#f0f0f0'
});
document.body.appendChild(el);
```

Then inject Kabel into that container:

```js
const ws = Kabel.inject(el, {
    theme: 'Dark',
    renderer: 'atlas', // Or `Apollo`
	moveSpeed: 6,
	controls: {
		wasd: true,
		wasdSmooth: true,
		wasdAccelerate: 1,
		wasdFriction: 0.9
	},
	toolbox: { /* defined later */ }
});
```

This gives you a fullscreen workspace with smooth WASD movement controls.

---

## 3. Creating Your First Node Prototype

Nodes are defined once as **prototypes** under `Kabel.Nodes`. Here’s an example:

```js
Kabel.Nodes['my_node'] = {
	init() {
		this.jsonInit({
			previousConnection: true,
			nextConnection: true,
			labelText: 'TopbarText',
			type: 'my_node',
			primaryColor: '#cc0c00',
			tertiaryColor: '#660500',
			arguments: [
				{ name: 'FLD', type: 'field_str', label: 'LabelText: ', value: 'ValueText' },
				{ name: 'Dummy', type: 'field_dummy', label: 'Label with no input!' },
				{ name: 'Conn', type: 'connection', label: 'Label!' },
				{ name: 'Conn2', type: 'field_both', label: 'lowk: ', value: 'lowk' },
				{
					name: 'Dropdown',
					type: 'dropdown',
					label: 'lowk dropdown?: ',
					options: ['Oooo option', { text: 'Opt', value: 'opt' }]
				}
			]
		});
	}
};
```

**Key options:**

* `previousConnection` / `nextConnection` → Whether the node can chain with others.
* `arguments` → Defines fields, inputs, and connection points.
* `jsonInit()` → Initializes node configuration.

---

## 4. Creating a Toolbox

Toolboxes organize your available nodes:

```js
toolbox: {
	type: 'category',
	contents: [{
		name: 'Cat',
		color: '#cc0c00',
		contents: [{
			type: 'my_node',
			arguments: {
                //FIELD_NAME: FIELD_VALUE
            }
		}]
	}]
}
```

**Toolbox types:**

* `'category'` → Groups nodes visually into collapsible sections.
* `'flyout'` → Displays all nodes in one scrollable list.

**Category JSON fields:**

* `name`: The category name.
* `color`: The display color.
* `contents`: Array of node definitions.

> Currently, categories and flyouts can only contain nodes. Support for buttons or UI elements may be added later.

---

## 5. Manipulating Node Properties

Once a node is created, you can move, modify, or connect it programmatically:

```js
const node = new Kabel.NodeSvg(Kabel.Nodes['my_node'], ws);
node.init();

const node2 = new Kabel.NodeSvg(Kabel.Nodes['my_node'], ws);
node2.init();
node2.relativeCoords.set(20, 0);
```

Connect them:

```js
node.nextConnection.to = node2;
node2.previousConnection.from = node;
ws.redraw();
```

You can also manipulate the SVG directly (temporary, not saved across rerenders):

```js
node.svg.highlight('#ff0');
node.svg.setScale(1);
node.svg.moveTo(0, 1);
node.svg.applyTransform('translate(0, 1)');
node.svg.getRaw(); // Returns the svg.js G element
```

---

### Optional: Widgets

**Widgets** are custom UI overlays within the workspace:

```js
Kabel.Widgets['testWidget'] = {
	name: 'Test Widget',
	width: 150,
	height: 100,
	coords: new Kabel.Coordinates(50, 50),
	html: '<button id="counterBtn">Count: 0</button>',
	init(widget, container) {
		let count = 0;
		const btn = container.querySelector('#counterBtn');
		if (btn) {
			btn.addEventListener('click', () => {
				count++;
				btn.textContent = 'Count: ' + count;
			});
		}
	}
};

const myWidget = ws.newWidget('testWidget');
if (myWidget) myWidget.show();
```

Widgets let you add custom interactivity or information panels.

---

## 6. Serializing Nodes

Kabel supports both **circular** and **non-circular** JSON serialization.

### Circular Serialization

Contains live object references (not exportable as plain JSON, but usable within JS).

```js
const circular = node.serialize();
```

Example (simplified):

```json
{
	"id": "sisDG24Gp6lc7*S#m#I9c",
	"type": "my_node",
	"nextConnection": {
		"node": "[CircularNodeRef]"
	},
	"fields": [...]
}
```

---

### Non-Circular Serialization

Safe for exporting or saving to files:

```js
const nonCircular = node.toJson();
```

Example:

```json
{
	"7f7#2Rrt16uFuH^2f2^ad": {
		"id": "7f7#2Rrt16uFuH^2f2^ad",
		"type": "my_node",
		"colors": { "primary": "#cc0c00", "tertiary": "#660500" },
		"label": "TopbarText",
		"nextConnection": { "node": "jX^$kh)yHW5p^bx98vD#s" },
		"fields": [...]
	}
}
```

---

### Workspace Serialization

```js
// Serialize
const data = workspace.toJson(false); // false = non-circular

// Deserialize
workspace.fromJson(data);
```

The serialization format automatically includes the circular/non-circular flag internally.

---

## 7. Finishing Up

You can expose internals for quick debugging:

```js
window.ws = ws;
window.nodes = [node, node2];
```

That’s it — you now have a working Kabel workspace with nodes, a toolbox, and serialization support.

---