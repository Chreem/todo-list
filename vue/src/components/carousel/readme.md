# How to use

基于Vue的单文件轮播组件, flex布局

## 占用的css

1. `.carousel`
2. `.imgs-container`
3. `.nav-container`
4. `.nav-container .carousel-nav`
5. `.nav-container .active`
6. `.nav-container .title`
7. `.nav-container .cycle`

## use

```html
<!-- app.vue -->
<template>
    <Carousel :imgs="imgs"></Carousel>
</template>

<script>
import Carousel from './carousel'
import img1 from './imgs/tg-img1.jpg'
import img2 from './imgs/tg-img2.jpg'
import img3 from './imgs/tg-img3.jpg'
import img4 from './imgs/tg-img4.jpg'

export default {
    components: { Carousel },
    data() {
        return {
            imgs: [
                { src: img1, alt: '首页' },
                { src: img2, alt: '找人' },
                { src: img3, alt: '事务' },
                { src: img4, alt: '消息' },
            ]
        };
    }
}
</script>
```

## 属性

|分类|属性|类型|默认值|说明|
|---|---|---|---|---|
|样式|width|Number|80|轮播组件的宽度|
||unit|String|`vw`|宽度的默认单位|
|数据|imgs|Object \|\| Array|---|必填项, 轮播的图片
|默认值|defaultActive|Number|1|轮播的第一张图片|
||imgResidenceTime|Number|3000|单位:`ms`, 每张图的停留时间(实际停留时间为该值-过渡效果时间)|
||moveTriggerDistance|Number|60|单位:`px`, 触发滑动的最小距离|
||moveSpeedTime|Number|300|单位:`ms`, 过渡动画时间|
|功能|autoScroll|Boolean|true|是否轮播, false则仅手动才切换图片|
||navigation|Boolean|true|圆点导航|