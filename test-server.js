const express = require('express');
const path = require('path');
const chokidar = require('chokidar');
const livereload = require('livereload');
const connectLivereload = require('connect-livereload');
const { exec } = require('child_process');

const app = express();
const PORT = 3000;

const DIST_DIR = path.resolve(__dirname, 'dist');

const liveReloadServer = livereload.createServer();
liveReloadServer.watch(DIST_DIR);

liveReloadServer.server.once('connection', () => {
    setTimeout(() => {
        liveReloadServer.refresh('/');
    }, 100);
});

app.use(connectLivereload());

app.use(express.static(DIST_DIR, { index: 'index.html' }));

const watcher = chokidar.watch([
    path.resolve(__dirname, 'src'),
    path.resolve(__dirname, 'themes'),
    path.resolve(__dirname, 'renderers'),
    path.resolve(__dirname, 'util'),
    path.resolve(__dirname, 'events'),
    path.resolve(__dirname, 'controllers'),
    path.resolve(__dirname, 'media'),
    path.resolve(__dirname, 'comment-renderer')
], {
    ignored: /(^|[\/\\])\../, 
    persistent: true
});


watcher.on('change', (filePath) => {
    console.log(`[watcher] File changed: ${filePath}`);
    console.log('[watcher] Running build...');
    exec('npm run build', (err, stdout, stderr) => {
        if (err) console.error(err);
        console.log(stdout);
        console.error(stderr);
        liveReloadServer.refresh('/');
    });
});

app.listen(PORT, () => {
    console.log(`Test server running: http://localhost:${PORT}`);
});
