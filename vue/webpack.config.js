const config = require(`./config/webpack.config${process.env.NODE_ENV === 'production' ? '' : '.dev'}.js`);
module.exports = config;
