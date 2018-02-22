<template>
    <div class="share" @click="handleClick">
        <div class="fxpng"></div>
    </div>
</template>

<script>
export default {
    name: 'Share',
    data() {
        return { show: false };
    },
    methods: {
        handleClick() {
            this.$emit('click')
        }
    }
}
</script>

<style lang="less">
.share {
  position: fixed;
  z-index: 2018;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);

  .fxpng {
    position: absolute;
    right: -15px;
    width: 320px;
    height: 162px;
    background-image: url("./fxtip.png");
    background-repeat: no-repeat;
    background-size: contain;
  }
}
</style>
