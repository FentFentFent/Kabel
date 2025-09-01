
# Kabel
[![npm version](https://img.shields.io/npm/v/@kabel-project/kabel)](https://www.npmjs.com/package/@kabel-project/kabel)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Node-based visual editor framework with an API inspired by Google’s Blockly project.  
Fully extensible with custom nodes, fields, and renderers.  
Written in TypeScript and ready to use out of the box.

![Kabel workspace screenshot](./_READ_ME_MEDIA_/workspace.png)

---

## Installation

You can install Kabel in two main ways:

**Using npm (recommended):**
```bash
cd path/to/your/project
npm install kabel
```

**Cloning from GitHub (Experimental builds):**

```bash
git clone https://github.com/FentFentFent/Kabel.git --depth 1
cd Kabel
npm install
npm run build
```

Then import Kabel from the build:

```js
import Kabel from './Kabel/dist/kabel.js';
```

##### Quick Starter HTML

```html
<div id="workspace-container" style="width:800px;height:600px;"></div>
<script type="module">
  import Kabel from 'kabel';
  Kabel.inject('workspace-container', {
    /* Your options here... */
  });
</script>
```

---

## Features

* ⚡ Extensible: create custom nodes, fields, and renderers.
* 🛠️ TypeScript support out of the box.
* 🎨 Renderer override system for custom visuals.
* ⌨️ Built-in workspace controls (WASD movement, drag, etc.).

---

## Example

```js
import Kabel from 'kabel';

const ws = Kabel.inject('workspace-container', {
  controls: { wasd: true, wasdSmooth: true }
});

// Register a simple node
Kabel.Nodes['example'] = {
  init() {
    this.jsonInit({
      labelText: 'Hello Kabel',
      type: 'example_node',
      primaryColor: '#cc0c00'
    });
  }
};
```

For another example refer to [Kabel Test](./dist/index.html)


---

## Documentation

Please refer to [Kabel Guide](./_READ_ME_MEDIA_/documentation/docs.md)

---

## License

MIT
