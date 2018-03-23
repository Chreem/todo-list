const path = require('path');
const webpack = require('webpack');
let config = undefined;
let url = undefined;
const Mix = require('./config/webpack.mix');

// const project = new Mix('./project-name/');
// project.js('index.js');
// config = project;

// const vueProject = new Mix('./project-vue');
// vueProject.vue('index.js');
// config = vueProject;

// const yk = new Mix('./project/yk');
// yk.react('index.jsx')
// config = yk;
// url = 'http://n.sinaimg.cn/hb/yk/';

// const fxdhs = new Mix('./project/20180314-fxdhs');
// fxdhs.vue('index.js');
// config = fxdhs;

const fxdhs = new Mix('./project/20180314-fxdhs');
fxdhs.react('index.js');
config = fxdhs;
url = 'http://n.sinaimg.cn/hb/fxdhs/';

// TODO 新项目往这加


// TODO vendor在css加载上有bug待解决
// .vendor(['react', 'jquery'], 'common')
// .vendor();

module.exports = process.env.NODE_ENV === 'production' ? config.prod(url) : config.dev();
