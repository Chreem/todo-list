const path = require('path');
let config = {};
const Mix = require('./config/webpack.mix');

// const project = new Mix('./project-name/');
// project.js('index.js');
// config = project;

// const vueProject = new Mix('./project-vue');
// vueProject.vue('index.js');
// config = vueProject;

const reactProject = new Mix('./project-react');
reactProject.react('index.jsx');
config = reactProject;

module.exports = process.env.NODE_ENV === 'production' ? config.prod() : config.dev();
