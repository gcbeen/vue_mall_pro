<template>
  <swiper v-if="banners.length" :options="swiperOptions">
    <swiper-slide v-for="item in banners" :key="item.link">
      <a :href="item.link" class="item-link">
        <img :src="item.image" alt="" @load="imageLoad" />
      </a>
    </swiper-slide>
    <div slot="pagination" class="swiper-pagination"></div>
  </swiper>
</template>
<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

import 'swiper/css/swiper.css'

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    banners: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      swiperOptions: {
        slidesPerView: 1,
        autoplay: {
          delay: 1000, // 自动切换的时间间隔（单位ms）
          stopOnLastSlide: false,
          disableOnInteraction: false, // 用户操作swiper之后，是否禁止autoplay
        },
        loop: true, // 循环播放 不是顺序播放 不从头开始
        pagination: {
          el: '.swiper-pagination',
        },
        initialSlide: 0,
      },
    }
  },
  methods: {
    imageLoad() {
      if (!this.isLoad) {
        this.$emit('swiperImageLoad')
        this.isLoad = true // 只加载一张图片就可以了，提高性能
      }
    },
  },
}
</script>

<style scoped>
.item-link {
  width: 100%;
}

.item-link img {
  width: 100%;
}
</style>
