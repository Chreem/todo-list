const webpack = require('webpack')
    , path = require('path')
    , htmlWebpackPlugin = require('html-webpack-plugin')
    ;

module.exports = {
    entry: {
        vendor: ['babel-polyfill', 'jquery', 'react', 'react-dom', 'swiper'],
        index: ['./src/index.jsx'],
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].[chunkhash:5].js',
    },
    module: {
        rules: [
            { test: /\.jsx?$/, loader: ['babel-loader'], },
            { test: /\.css$/, loader: ['style-loader', 'css-loader', 'postcss-loader'] },
            { test: /\.less$/, loader: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'] },
            { test: /\.(jpg|png|gif)$/, loader: 'url-loader', options: { limit: 8192, name: '[name].[ext]' } },
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './src/index.template.html',
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.js',
            minChunks: Infinity
        })
    ]
}