const path = require('path')
    , merge = require('webpack-merge')
    , HtmlWebpackPlugin = require('html-webpack-plugin')
    ;

const baseConfig = require('../webpack.config.js')

module.exports = merge(baseConfig, {
    output: {
        path: path.resolve(__dirname, './')
    },
    module: {
        rules: [
            { test: /\.vue$/, loader: 'vue-loader', options: {/* vue-loader options go here*/ } },
            { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
        ]
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Vue-Todos',
            content: '<Todo></Todo>',
            template: '../index.template.ejs',
            filename: './index.html'
        })
    ]
});