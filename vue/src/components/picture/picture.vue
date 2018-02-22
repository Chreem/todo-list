<template>
    <div class="picture" ref="container">
        <div v-if="loading" class="overlay"></div>
        <img v-if="loading" :style="{width:'70%'}" :src="loadingSrc" alt="loading">
        <img v-show="!loading" @load="handleImgLoad" ref="picture" :src="lazy?'':src" :alt="alt">
    </div>
</template>

<script>
import loadingImg from './sina.png'

const sleep = t => new Promise(r => setTimeout(r, t));

export default {
    name: 'Picture',
    props: {
        lazy: { type: Boolean, default: true },
        src: { type: String, default: '' },
        alt: { type: String, default: '图片' },
        loadingSrc: { type: String, default: loadingImg },
        errorSrc: { type: String, default: '' },

        debug: { type: Boolean, default: false }
    },
    data() {
        return { loading: true };
    },
    methods: {
        handleImgLoad(e) {
            if (!this.lazy && e.target.src !== this.src) return;
            this.loading = false;
        },
        async scrollEvent() {
            const ctn = this.$refs.container;
            let imgPosition = ctn.offsetTop + ctn.clientHeight;
            let current = window.scrollY + window.innerHeight;
            if (current >= imgPosition) {
                let img = this.$refs.picture;
                if (this.debug) await sleep(5000);
                img.src = this.src
                window.removeEventListener('scroll', this.scrollEvent)
            }
        }
    },
    mounted() {
        // 刚挂载判断一次
        this.scrollEvent();

        if (this.lazy) { window.addEventListener('scroll', this.scrollEvent) }
    }
}
</script>

<style lang="less">
@keyframes overlay-highlight {
  0% {
    left: -50%;
  }
  100% {
    left: 150%;
  }
}

.picture {
  position: relative;
  display: inline-block;
  overflow: hidden;
  width: 100%;

  img {
    width: 100%;
    display: block;
    margin: 0 auto;
  }

  .overlay {
    width: 50%;
    height: 100%;
    position: absolute;
    background: linear-gradient(to right, transparent, white, transparent);
    animation: overlay-highlight 2s infinite linear;
  }
}
</style>
