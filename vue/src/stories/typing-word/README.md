# Typing effect

基于vue组件  
抄袭npm和element.io效果撸的一个打字效果组件出来  
事后百度发现有个基于jQuery的库[typed.js](http://www.mattboldt.com/demos/typed-js/)  
~~就喜欢捏轮子~~  然后抄袭他的传参方式，即除了字符串外数组也OK

## Usage

```js
import type from './typing-word';

let words='hehe\ndou';
// OR: let words=['hehe','dou'];

export default {
    components:{ type },
    data(){
        return {
            words,
            ...
        }
    },
    ...
};
```

```html
<type :words="words"></type>
```

## params

* words: 需要显示的文字，字符串对象均可  
    ```js
    if(words为字符串){ 按照keyword分割后提供给ary }
    if(words为对象){
        if(words为数组){ 直接将值提供给ary }
        else{ 啥都不做 }
    }
    ```
* keyword: words为字符串时的分割关键字，默认为换行`\n`
* typeSpeed: 每个字符的输入速度
* everyLineWait: 每行打完后的等待时间
* loop: 是否循环显示

## problem

目前遇到的一个困惑是无论是饿了么,NPM还是Typed在按住鼠标选择变化文字时都不会有丢失选中部分的情况,然而我...