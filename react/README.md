# 初始化环境配置

## 服务于

react全家桶

## 配置

1. `.babelrc`配置react全家桶
2. 打包生成的文件在`./dist`下, **每次生成前会删除该文件夹**
3. `webpack`按调试/生产环境写了两份配置, 详情见[webpack](#webpack)
4. `postcss-loader`以及`autoprefixer`自动添加浏览器前缀
5. 构建生成的`css`,`js`文件会加上*5位*hash作为版本控制依据, 而图片则按原文件名生成
6. `.babelrc`,`webpack.config.js`,`/src/index.jsx`中均已写好react测试环境下的热重载
7. 这些都是自动的

可能需要修改的位置

1. `./.babelrc`按需引入部分参照[antd](https://ant.design/docs/react/getting-started-cn#%E6%8C%89%E9%9C%80%E5%8A%A0%E8%BD%BD), 视情况修改
2. `./config/webpack.config.js`中的publicPath根据项目cdn目录调整

## webpack

根据测试/生产环境有两套配置

### 测试环境

```md
1. source-map
2. 一些react热重载的配置
3. 显示重载模块名称的插件
4. 多设备浏览器同步状态滚动插件
```

### 生产环境

```md
1. 提取js中import/require引入的css至单个文件
2. 配置`process.env.NODE_ENV="production"`以便业务代码(主要为react热重载)也能根据情况调整
3. 代码压缩丑化去注释
```
