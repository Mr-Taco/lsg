'use strict';

let webpack = require('webpack');
let shared = require('./webpack.config.shared');

let sassLoader = shared.sassLoader;
let devEntry = () => {
    let entry = Object.assign({},shared.entry);
    entry.app.unshift('webpack-hot-middleware/client');
    return entry;
};


module.exports = {
    devtool: 'eval-cheap-module-source-map',
    debug: true,
    entry: devEntry(),
    output: shared.output,
    externals: shared.external,
    module: {
        postLoaders: shared.postLoaders,
        loaders: shared.loaders
    },
    postcss: shared.postCSS,
    plugins: [
        new webpack.optimize.CommonsChunkPlugin(/* chunkName= */'vendor', /* filename= */'app.vendor.js'),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
    ],
    sassLoader,
    target: 'web',
    watch: true,
    node: shared.node
};



