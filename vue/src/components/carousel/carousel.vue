<template>
    <div class="carousel" :style="{width:width+unit}" ref="carouselContainer">
        <div class="imgs-container" :style="imgsContainerStyle" @touchstart="handleTouchStart" @touchend="handleTouchEnd" @transitionend="handleTransitionEnd">
            <template v-for="(item,index) in formatImgs">
                <a :key="index" :href="item.link">
                    <img ref="imgs" :style="{width:width+unit}" @load="handleImgLoad" :key="index" :src="item.src" :alt="item.alt" />
                </a>
            </template>
        </div>
        <div class="nav-container" v-if="navigation">
            <div class="title">{{formatImgs[active].alt}}</div>
            <div class="cycle">
                <template v-for="(img,i) in imgs">
                    <div :key="i" :class="`carousel-nav ${(active-1+originImgsCount)%originImgsCount===i?'active':''}`" @click="handleNavClick(i)"></div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Carousel',
    props: {
        defaultActive: { type: Number, default: 1 },
        width: { type: Number, default: 25 },
        unit: { type: String, default: 'rem' },
        imgs: { type: Array, required: true },
        imgResidenceTime: { type: Number, default: 3000 },
        moveTriggerDistance: { type: Number, default: 60 },
        moveSpeedTime: { type: Number, default: 300 },
        autoScroll: { type: Boolean, default: true },
        navigation: { type: Boolean, default: true }
    },
    data() {
        return {
            originImgsCount: 0,
            imgWidth: 320,
            maxHeight: 0,
            active: 0,
            animate: true
        }
    },
    computed: {
        /**
         * 前后各加一张以无缝滚动
         */
        formatImgs() {
            let arr = this.imgs.concat();
            let firstImg = this.imgs[0];
            let lastImg = this.imgs.slice(-1)[0];
            arr.push(firstImg);
            arr.unshift(lastImg);
            return arr;
        },

        /**
         * 控制偏移位置及动画开关
         */
        imgsContainerStyle() {
            let styleObj = {};
            this.animate ? styleObj['transition'] = `transform ${this.moveSpeedTime}ms linear` : void 0;
            styleObj['transform'] = `translateX(-${this.active * this.width}${this.unit})`;
            styleObj['width'] = this.width + this.unit;
            styleObj['height'] = this.maxHeight + 'px';
            return styleObj;
        }
    },
    methods: {
        /**
         * 与touchend一同决定点击方向, 仅判断了x轴, 按住时停止自动播放
         */
        handleTouchStart({ touches }) {
            this.startX = touches[0].clientX
            this.startY = touches[0].clientY
            if (this.autoScroll) clearInterval(this.changeImgInterval)
        },
        handleTouchEnd({ changedTouches }) {
            let moveX = changedTouches[0].clientX - this.startX;
            let moveY = changedTouches[0].clientY - this.startY;
            let moveTriggerDistance = this.moveTriggerDistance;

            // right arrow
            if (moveX > moveTriggerDistance) { this.moveToLeft(); }
            // left arrow
            else if (moveX < -moveTriggerDistance) { this.moveToRight(); }
            // click
            else {

            }

            if (this.autoScroll) this.changeImgInterval = setInterval(this.moveToRight, this.imgResidenceTime);
        },

        /**
         * 图片加载后判断高度, 取最小
         */
        handleImgLoad(e) {
            let h = e.target.height;
            if (this.maxHeight === 0 || this.maxHeight > h) this.maxHeight = h;
        },

        /**
         * 动画结束是判断是否是第一张或最后一张来重置position
         * 
         * 更新逻辑后是否可用
         */
        handleTransitionEnd() {
            let len = this.formatImgs.length;
            switch (this.active) {
                case 0:
                    this.animate = false;
                    this.active = len - 2;
                    break;
                case len - 1:
                    this.animate = false;
                    this.active = 1;
                    break;
                    console.log(this.active)
            }
        },

        /**
         * 导航圆点点击
         */
        handleNavClick(i) {
            this.animate = true;
            this.active = i + 1;
            if (this.autoScroll) {
                clearInterval(this.changeImgInterval);
                this.changeImgInterval = setInterval(this.moveToRight, this.imgResidenceTime)
            }
        },

        calcImgHeightEvent() {
            let imgs = this.$refs.imgs;
            if (typeof imgs === 'undefined') return;
            let min = 10000;
            imgs.map(img => { min > img.height ? min = img.height : void 0; })
            this.maxHeight = min;
        },

        moveToLeft() {
            let length = this.formatImgs.length;
            this.animate = true;
            this.active = (this.active - 1 + length) % length;
        },

        moveToRight() {
            let length = this.formatImgs.length;
            this.animate = true;
            this.active = (this.active + 1) % length;
        }
    },
    created() {
        this.active = this.defaultActive;
        this.originImgsCount = this.imgs.length;
        if (this.autoScroll) this.changeImgInterval = setInterval(this.moveToRight, this.imgResidenceTime);
    },
    mounted() {
        this.imgWidth = this.$refs.carouselContainer.clientWidth;
        window.addEventListener('resize', this.calcImgHeightEvent)
    },
    destroy() {
        window.removeEventListener('resize', this.calcImgHeightEvent)
    }
}
</script>

<style lang="less">
.carousel {
  position: relative;
  margin: auto;
  overflow: hidden;

  .imgs-container {
    display: flex;
    align-items: center;
    a {
      display: block;
    }
  }
}

.nav-container {
  position: absolute;
  height: 3rem;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  bottom: 0;
  z-index: 3;
  display: flex;

  .title {
    flex: 3;
    color: white;
    font-weight: bold;
    font-size: 1.5rem;
    padding-left: 1rem;
    align-self: center;
  }
  .cycle {
    margin-right: 1rem;
    flex: 2;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .carousel-nav {
    margin: 0.37rem;
    width: 0;
    height: 0;
    border: solid 0.3rem white;
    border-radius: 0.3rem;
    transition: all 0.1s linear;
  }

  .active {
    border: solid 0.3rem rgb(231, 32, 24);
    border-radius: 0.3rem;
  }
}
</style>
