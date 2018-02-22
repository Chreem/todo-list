<template>
    <div class="listview">
        <div v-if="focus" class="focus">
            focus
        </div>
        <template v-for="(item,i) in items">
            <Item :key="i" :img="item.img" :abstract="item.abstract" :date="item.date" :view="item.view" />
        </template>
        <div v-if="!infinite && loadMore" class="loadmore">
            <button v-if="!loadingMark && loadTip===''" @click="handleLoadClick">加载更多</button>
            <img v-if="loadingMark" src="./loading.svg" alt="加载中">
            <div v-if="loadTip!==''" class="loadtip">{{loadTip}}</div>
        </div>
        <div v-if="infinite" class="loadmore" ref="scrollLoading">
            <img src="./loading.svg" alt="加载中">
        </div>
    </div>
</template>

<script>
import Item from './item.vue'

function debounce(fn, time, immediate = false) {
    let timer = null;
    return function () {
        let ctx = this;
        let args = arguments;
        let later = function () {
            timer = null;
            if (!immediate) fn.apply(ctx, args);
        }
        if (immediate && !timer) { fn.apply(ctx, args); }
        clearTimeout(timer);
        timer = setTimeout(later, time);
    }
}

export default {
    name: 'List',
    components: { Item },
    props: {
        focus: { type: Boolean, default: true },
        items: { type: Array, default: () => [] },
        loadMore: { type: Boolean, default: true },
        infinite: { type: Boolean, default: false },    // 无限列表生效时 加载更多按钮不可用
        tipTime: { type: Number, default: 3000 }
    },
    data() {
        return {
            loadingMark: false,
            scrollLoading: false,
            loadTip: ''
        }
    },
    watch: {
        items(nv) { this.loadingMark = false; },
        loadTip(n) {
            if (n === '') return;
            setTimeout(() => { this.loadTip = '' }, this.tipTime)
        }
    },
    methods: {
        /**
         * 普通列表加载更多
         */
        handleLoadClick() {
            this.loadingMark = true;
            this.$emit('onLoad')
        },

        /**
         * 无限列表部分
         */
        handleScrollMore: debounce(function () {
            if (!this.infinite) return;
            const scrollLoading = this.$refs.scrollLoading;
            let morePosition = scrollLoading.offsetTop + scrollLoading.clientHeight - 10;
            let scrolled = window.scrollY + window.innerHeight;
            if (scrolled > morePosition) { this.$emit('onLoad') }
        }, 300)
    },
    mounted() {
        window.addEventListener('scroll', this.handleScrollMore);
    },
    destroy() {
        window.removeEventListener('scroll', this.handleScrollMore)
    }
}
</script>

<style lang="less">
@keyframes loading {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

.listview {
  width: 100%;

  .loadmore {
    min-height: 3rem;
    text-align: center;

    img {
      width: 2.5rem;
      animation: loading 1s infinite linear;
    }
  }

  button,
  .loadtip {
    display: inline;
    margin: 0 auto;
    padding: 0.3rem 4rem;
    background-color: #e72018;
    border: none;
    border-radius: 5px;
    color: white;
    font-weight: 600;
    font-size: 1.5rem;
  }

  .loadtip {
    background-color: #dddddd;
    color: #999999;
  }
}
</style>
