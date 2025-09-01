const path = require('path');

module.exports = {
    mode: 'development', // change to 'production' for final builds
    entry: './src/index.ts',
    output: {
        filename: 'kabel.js',
        path: path.resolve(__dirname, 'dist'),
        library: {
            name: 'Kabel',
            type: 'umd',
        },
        globalObject: 'this',
        libraryExport: 'default',
        clean: {
            keep: /index\.html/,
        }
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
            }
        ],
    },
    devtool: 'source-map'
};
