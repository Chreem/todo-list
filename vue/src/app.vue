<template>
    <div id="app">
        <Share v-show="share" @click="share=false"></Share>
        <Carousel :imgs="imgs"></Carousel>
        <Navbar :items="headerItems"></Navbar>
        <div class="test" style="height:30%"></div>
        <form id="报告解读">
            <input type="password" data-sina-debug data-sina-debug-msg="仅供测试" required>
            <input type="email">
            <button type="submit" @click="handleFormSubmit">test</button>
        </form>
        <a href="javascript:;" @click="share=true">test</a>
        <div class="test" style="height:30%"></div>
        <abbr id="短视频矩阵" title="烧死异性恋">FFF团</abbr>
        <section cite="http://hb.sina.com.cn/zt_d/hbtdh/">test</section>
        <Picture style="width:40vw" :src="test" debug></Picture>
        <Picture style="width:40vw" :src="test"></Picture>
        <List id="直播十九大" :items="listItems" @onLoad="handleListLoad" infinite></List>
    </div>
</template>

<script>
import Carousel from './components/carousel'
import Picture from './components/picture'
import List from './components/list'
import Share from './components/share'
import Navbar from './components/navbar'
let imgs = [
    { src: 'http://f.hiphotos.baidu.com/image/h%3D300/sign=4a0a3dd10155b31983f9847573ab8286/503d269759ee3d6db032f61b48166d224e4ade6e.jpg', alt: 'test' },
    { src: 'http://f.hiphotos.baidu.com/image/h%3D300/sign=4a0a3dd10155b31983f9847573ab8286/503d269759ee3d6db032f61b48166d224e4ade6e.jpg', alt: 'test2' },
    { src: 'http://f.hiphotos.baidu.com/image/h%3D300/sign=4a0a3dd10155b31983f9847573ab8286/503d269759ee3d6db032f61b48166d224e4ade6e.jpg', alt: 'test3' },
    { src: 'https://www.baidu.com/img/pcdongtai_b60a4b2d8e0d0d6392de47d4cec6fdc3.gif', alt: 'test4' },
];

import FromCheck from './js/formCheck'

let listItems = [
    { img: 'http://n.sinaimg.cn/hb/hbtdh/1.jpg', abstract: '简介', date: '2017-1-1', view: 213 },
    { img: 'http://n.sinaimg.cn/hb/hbtdh/1.jpg', abstract: '简介', date: '2017-1-1', view: 213 },
    { img: 'http://n.sinaimg.cn/hb/hbtdh/1.jpg', abstract: '简介', date: '2017-1-1', view: 213 },
    { img: 'http://n.sinaimg.cn/hb/hbtdh/1.jpg', abstract: '简介', date: '2017-1-1', view: 213 },
    { img: 'http://n.sinaimg.cn/hb/hbtdh/1.jpg', abstract: '简介', date: '2017-1-1', view: 213 },
    { img: 'http://n.sinaimg.cn/hb/hbtdh/1.jpg', abstract: '简介', date: '2017-1-1', view: 213 },
]

let headerItems = ['最新要闻', '新领导人', '报告解读', '人事观察', '短视频矩阵', '直播十九大', '对话党代表', '大国图策', '反腐纪要', '秒懂十九大', '外媒看会', '这五年']
// headerItems = headerItems.map(item => {
//     return { content: item, link: '#' + item }
// })

const sleep = t => new Promise(r => setTimeout(r, t))

export default {
    name: 'App',
    components: { Carousel, Picture, List, Share, Navbar },
    data() {
        return {
            test: 'http://n.sinaimg.cn/hb/hbtdh/1.jpg',
            imgs,
            share: false,
            listItems,
            headerItems
        };
    },

    async mounted() {
        // FromCheck(check, {
        //     prefix: 'sina',
        //     suffix: 'msg',
        //     selfRules: {
        //         debug() { return false }
        //     }
        // });
        // let headerItems = document.querySelectorAll('#app>*[id]')
        // headerItems = Array.prototype.slice.call(headerItems)
        // headerItems = headerItems.map(el => el.id)
        // this.headerItems = headerItems;
    },

    methods: {
        handleFormSubmit(e) {

            // 阻止原生事件则验证提示也不会显示
            // e.preventDefault();
        },

        async handleListLoad() {
            await sleep(2000)
            this.listItems.push({ img: 'http://n.sinaimg.cn/hb/hbtdh/1.jpg', abstract: '简介简介简介简介简介简介', date: '2017-1-1', view: 123123 })
            this.listItems.push({ img: 'http://n.sinaimg.cn/hb/hbtdh/1.jpg', abstract: '内容阿斯顿发的说法', date: '2017-1-1', view: 456678 })
        }
    }
}
</script>

<style>
#app {
  flex-flow: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
}
</style>
