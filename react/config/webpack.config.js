const webpack = require('webpack')
    , merge = require('webpack-merge')
    , baseConfig = require('./webpack.config.base')
    , extractTextPlugin = require('extract-text-webpack-plugin')
    ;

// 提取css至单个文件
const cssLoader = baseConfig.module.rules.filter(item => item.test.test('a.css'))[0];
cssLoader.loader = extractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader', 'postcss-loader']
})
const lessLoader = baseConfig.module.rules.filter(item => item.test.test('a.less'))[0];
lessLoader.loader = extractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader', 'postcss-loader', 'less-loader']
})

module.exports = merge(baseConfig, {
    output: {
        // publicPath = 'http://n.sinaimg.cn/hb/2017hbly/'
    },
    plugins: [
        new extractTextPlugin('style.[hash:5].css'),
        new webpack.DefinePlugin({ 'process.env': { NODE_ENV: '"production"' } }),
        new webpack.optimize.UglifyJsPlugin({
            comments: false,
            compress: { warnings: false }
        }),
    ]
})
