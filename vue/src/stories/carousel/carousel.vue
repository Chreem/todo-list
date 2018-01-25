<template>
    <div class="carousel" ref="test">
        <div :style="test" class="img-container">
            <img src="https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1079883047,3881998655&fm=173&s=FC2E01D6C3F391D25AD3CF8D0300F08E&w=218&h=146&img.JPEG" alt="1">
            <img src="https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=791357156,3915537235&fm=173&s=EF88BC444C53BBC05404CC880300E09B&w=218&h=146&img.JPEG" alt="2">
            <img src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1102964407,72490066&fm=173&s=F2A395414413ABDA1675C8A70300F002&w=218&h=146&img.JPEG" alt="3">
            <div style="clear:both"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Carousel',
    data() {
        return {};
    },
    computed: {
        test() {
            return { width: '300vw' }
        }
    }
}
</script>

<style>
.carousel {
  position: relative;
  width: 100%;
  /* overflow: hidden; */
}

.img-container {
  position: absolute;
  left: -100px;
}

.img-container img {
  float: left;
  width: calc(100vw - 17px);
}
</style>
