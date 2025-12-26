const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    mode: 'production', // <- production enables lots of optimizations automatically
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
            },
            {
                test: /\.(css|svg)$/,
                use: 'raw-loader'
            },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        //drop_console: true,       // kill console.logs
                        drop_debugger: true,      // kill debugger;
                        pure_funcs: ['console.info', 'console.debug'],
                        // aggressive compress flags
                        booleans_as_integers: true,
                        hoist_funs: true,
                        passes: 3,
                        collapse_vars: true,        // inline single-use vars
                        reduce_vars: true,          // further optimizes var usage
                        join_vars: true,            // join consecutive var statements
                        keep_fargs: false,          // remove unused function args
                        if_return: true,            // optimize if/return statements
                        conditionals: true,         // convert if-else to conditional expressions
                        sequences: true,            // join consecutive statements with comma
                        unused: true,               // remove unused vars/functions
                        loops: true,                // optimize loops
                        side_effects: true,         // remove expressions without side-effects
                    },
                    mangle: {
                        //toplevel: false, // <- don’t scramble top-level/public names
                    },
                    format: {
                        comments: false,
                    },
                },
                extractComments: false,
                parallel: true,
            }),
            new CssMinimizerPlugin(),
        ],
    },
    devtool: 'source-map',
};
