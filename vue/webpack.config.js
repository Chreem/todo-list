const path = require('path');
const merge = require('webpack-merge');

const baseConfig = require('../webpack.config.js')

module.exports = merge(baseConfig, {
    output: {
        path: path.resolve(__dirname, './')
    },
    module: {
        rules: [
            { test: /\.vue$/, loader: 'vue-loader', options: {/* vue-loader options go here*/ } },
        ]
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        }
    }
});