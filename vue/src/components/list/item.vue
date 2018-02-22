<template>
  <a :href="link" class="listitem">
    <Picture v-if="img!==''" :lazy="false" :src="img"></Picture>
    <div class="content">
      <div class="abstract">{{abstract}}</div>
      <div class="date">{{date}}</div>
      <div class="view">{{formatView}} <img src="./eye.png" alt="点击量"> </div>
    </div>
  </a>
</template>

<script>
import Picture from '../picture'

export default {
  name: 'ListItem',
  components: { Picture },
  props: {
    img: { type: String, default: '' },
    link: { type: String, default: 'javascript:;' },
    abstract: { type: String, default: '简介' },
    date: { type: String, default: '1970-1-1' },
    view: { type: Number, default: 123 }
  },
  computed: {
    formatView() {
      let v = this.view * 1;
      if (v < 10000) return v;
      if (v < 1000000) return parseInt(v / 1000) / 10 + '万';
      if (v >= 10000 && v <= 100000000) return parseInt(v / 10000) + '万';
      return v;
    }
  }
}
</script>

<style lang="less">
.listitem {
  margin: 1.3rem;
  padding-bottom: 1.3rem;
  display: flex;
  text-decoration: none;
  border-bottom: 1px solid #e8e8e8;
  min-height: 8rem;

  .picture {
    flex: 4;
    width: 100%;
    height: 8rem;
  }

  .content {
    margin-left: 1rem;
    position: relative;
    font-size: 1rem;
    flex: 5;

    .abstract {
      font-size: 1.4rem;
      color: #5a5a5a;
      word-break: break-all;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .date,
    .view {
      position: absolute;
      bottom: 0;
      color: #b5b5b5;
    }

    .date {
      left: 0;
    }
    .view {
      right: 0;
    }

    img {
      width: 1.5rem;
    }
  }
}
</style>
