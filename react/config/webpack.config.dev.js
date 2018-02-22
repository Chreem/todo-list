const webpack = require('webpack')
    , merge = require('webpack-merge')
    , BrowserSyncPlugin = require('browser-sync-webpack-plugin')
    , baseConfig = require('./webpack.config.base')
    ;

// js解析加入react-hot-loader  且不转义node_modules
const jsLoader = baseConfig.module.rules.filter(item => item.test.test('a.js'))[0];
jsLoader.loader.unshift('react-hot-loader/webpack');
jsLoader.exclude = /node_modules/;

// 入口第一项加入hot-loader
baseConfig.entry.index.unshift('react-hot-loader/patch')

module.exports = merge(baseConfig, {
    devtool: 'cheap-module-eval-source-map',
    plugins: [
        new webpack.NamedModulesPlugin(),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: '4000',
            open: false,
            proxy: 'http://localhost:8080'
        }, { reload: false })
    ]
})