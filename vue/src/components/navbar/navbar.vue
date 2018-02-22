<template>
    <div class="header-nav-container" ref="navContainer">
        <nav :style="navStyle">
            <template v-for="(item,i) in items">
                <a :class="active===item?'active':''" :href="'#'+item" :key="i" @click="handleLinkClick(item)">{{item}}</a>
            </template>
        </nav>
    </div>
</template>

<script>
import $ from 'jquery'

function debounce(fn, time) {
    let timer = null;
    return function (immediate = false) {
        let ctx = this;
        let args = arguments;
        if (immediate) {
            clearTimeout(timer);
            return fn.apply(ctx, args);
        }
        let later = function () {
            timer = null;
            fn.apply(ctx, args);
        }
        clearTimeout(timer);
        timer = setTimeout(later, time);
    }
}

let scrollX = debounce(function () {
    let activePosition = document.querySelector(`a[href="#${this.active}"]`)
    if (activePosition === null) return;
    activePosition = activePosition.offsetLeft;
    $('.header-nav-container nav').animate({ scrollLeft: activePosition }, 300)
}, 300)

export default {
    name: 'NavContainer',
    props: {
        items: { type: Array, default: () => [] }
    },
    data() {
        return {
            fixed: false,
            scrollActive: true,
            active: ''
        };
    },
    watch: {
        active(nv) {
            /**
             * 导航横向移动到激活位置
             */
            scrollX.call(this, true)
        }
    },
    computed: {
        navStyle() {
            let styleObj = {}
            styleObj['top'] = 0;
            this.fixed ? styleObj['position'] = 'fixed' : void 0;
            return styleObj
        }
    },
    methods: {
        handleScrollEvent() {
            /**
             * 导航悬浮滚动
             */
            let nav = this.$refs.navContainer;
            if (!nav) return;
            let navPosition = nav.offsetTop;
            let currentPosition = window.scrollY;
            this.fixed = currentPosition > navPosition;

            /**
             * 滚动到相应位置时激活导航
             */
            if (!this.scrollActive) return;
            this.items.map(item => {
                let el = document.getElementById(item)
                if (el === null) return;
                if (el.offsetTop - nav.clientHeight - 10 < currentPosition) {
                    this.active = item;
                }
            })
        },

        handleLinkClick(item) {
            const activeElement = document.getElementById(item)
            this.active = item;
            if (activeElement === null) return;
            const navElement = this.$refs.navContainer;
            this.scrollActive = false;
            $('html,body').animate({ scrollTop: activeElement.offsetTop - navElement.clientHeight }, 300, () => {
                this.scrollActive = true;
            })
        }
    },
    mounted() {
        window.addEventListener('scroll', this.handleScrollEvent)
    },
    destory() {
        window.removeEventListener('scroll', this.handleScrollEvent)
    }
}
</script>

<style>
.header-nav-container {
  min-height: 3.5rem;
  background-color: gray;
}
.header-nav-container nav {
  z-index: 2000;
  display: flex;
  flex-flow: nowrap;
  white-space: nowrap;
  width: 100%;
  overflow-x: auto;
  background-color: gray;
}

.header-nav-container nav > a {
  flex: 1;
  display: block;
  margin: 0 0.5rem;
  padding: 0.7rem 1.5rem;
  font-size: 1.2rem;

  text-decoration: none;
  color: black;
  background-color: #fff;
  border-bottom: 0.25rem solid #fff;
}

.header-nav-container nav > a.active {
  color: red;
  border-bottom: 0.25rem solid #f00;
}
</style>
