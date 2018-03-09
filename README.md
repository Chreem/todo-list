# todo-list

~~放置如项目模板等工程初始化结构，使用时CV即可~~

参考laravel-mix

今后可能加入npm-cli来自动生成  
此外也有hello world

## 项目结构

接口设计灵感来源为laravel-mix，内部自己实现，如何使用见顶层[webpack.config.js](https://github.com/Chreem/todo-list/tree/master/webpack-mix/webpack.config.js)（反正只有自己用）

## hello world

1. [message-queue](https://github.com/Chreem/todo-list/tree/master/message-queue)

    amqp协议消息队列的生产-消费者hello world

2. [web-component](https://github.com/Chreem/todo-list/tree/master/web-component)

    WebComponent的hello world，分为html与js版，均使用es6 class写法

3. [dns](https://github.com/Chreem/todo-list/tree/master/dns)

    node自带dns模块初试

## old

```md
## 项目结构

主要为react与vue的目录结构, 大头为公共部分, 框架本身使用自己相应loader即可

### 涵盖范围

1. 每次打包生成的文件均放在 `./dist` 下, 且**每次生成前会删除该文件夹**
2. `webpack` 分为调试/生产环境两份配置
3. 使用 `postcss-loader` 及其插件 `autoprefix` 添加浏览器前缀
4. 生成的 `css`, `js` 文件会加上*5位*hash作为版本控制依据, 而图片等其他资源则按原文件名生成
5. `package.json` 的部署依赖 `devDependencies` 几乎不需再改, 项目则根据需要调整

其中 `webpack` 部分:

1. 多设备浏览器同步滚动, 热重载, 重载模块名, `html` 模板加载, 提取css, 压缩丑化等插件
2. `process.env.NODE_ENV="production"` 以便业务代码也能视情况调整(主要为react热重载配置)
```
