const webpack = require('webpack')
    , merge = require('webpack-merge')
    , path = require('path')
    , BrowserSyncPlugin = require('browser-sync-webpack-plugin')
    , ExtractTextPlugin = require('extract-text-webpack-plugin')
    , HtmlWebpackPlugin = require('html-webpack-plugin')
;

function selfGetName(path) {
    return path.slice(path.lastIndexOf('/') + 1, path.lastIndexOf('.'));
}

function selfAdd2Entry(path) {
    this.config.entry[selfGetName(path)] = this.basePath + path
}

function selfFoundLoader(name) {
    return this.config.module.rules.filter(item => item.test.test(name))[0]
}

class Mix {
    constructor(basePath) {
        this.basePath = basePath || './';
        if (this.basePath.slice(-1) !== '/') this.basePath += '/';
        this.devMode = true;
        this.isReact = false;
        this.isVue = false;
        this.config = {
            entry: {},
            output: {
                path: path.resolve(__dirname, `.${this.basePath}dist`),
                filename: '[name].[hash:5].js',
            },
            module: {
                rules: [
                    {test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/},
                    {test: /\.css$/, loader: ['style-loader', 'css-loader', 'postcss-loader']},
                    {test: /\.less$/, loader: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']},
                    {test: /\.(jpg|png|gif|svg)$/, loader: 'url-loader', options: {limit: 4096, name: '[name].[ext]'}},
                ]
            },
            plugins: [
                new HtmlWebpackPlugin({
                    template: this.basePath + 'index.template.html',
                    filename: 'index.html'
                })
            ]
        };
    }

    js() {
        selfAdd2Entry.apply(this, arguments);
        return this;
    }

    vue() {
        if (!this.isVue) {
            this.config.module.rules.push({test: /\.vue?$/, loader: 'vue-loader'});
            this.isVue = true;
        }
        selfAdd2Entry.apply(this, arguments);
        return this;
    }

    react() {
        if (!this.isReact) {
            /**
             * some adapter
             */
            this.isReact = true;
        }
        selfAdd2Entry.apply(this, arguments);
        return this;
    }

    html(path, outname, opt) {
        const options = opt || {};
        options.template = this.basePath + (path || 'index.template.html');
        outname ? options.filename = outname : void 0;
        this.config.plugins.push(new HtmlWebpackPlugin(options));
        return this;
    }

    webpackConfig(config) {
        this.config = merge(this.config, config);
        return this;
    }

    output(outpath) {
        this.cleanPath = outpath;
        this.config.output.path = path.resolve(__dirname) + outpath;
        return this;
    }

    dev() {
        this.devMode = true;
        this.config.devtool = 'cheap-module-eval-source-map';
        this.config.plugins.push(new BrowserSyncPlugin({
            host: 'localhost',
            port: 4000,
            open: false,
            proxy: 'http://localhost:8080'
        }, {reload: false}));
        return this.config;
    }

    prod(publicPath) {
        this.devMode = false;
        const cssLoader = selfFoundLoader.call(this, 'a.css');
        cssLoader.loader = ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'postcss-loader']
        });
        const lessLoader = selfFoundLoader.call(this, 'a.less');
        lessLoader.loader = ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'postcss-loader', 'less-loader']
        });
        this.config.plugins.push(new ExtractTextPlugin('style.[hash:5].css'));
        if (!!publicPath) this.config.output.publicPath = publicPath;
        return this.config;
    }
}

module.exports = Mix;
