const path = require('path')
    , merge = require('webpack-merge')
    , HtmlWebpackPlugin = require('html-webpack-plugin')
    ;

const baseConfig = require('../webpack.config.js')

module.exports = merge(baseConfig, {
    entry: './index.jsx',
    output: {
        path: path.resolve(__dirname, './')
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'React-Todos',
            template: '../index.template.ejs',
            filename: './index.html'
        })
    ]
});