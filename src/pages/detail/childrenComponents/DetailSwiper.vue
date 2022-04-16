<template>
  <swiper v-if="topImages.length" :options="swiperOptions" class="detail-swiper">
    <swiper-slide v-for="item in topImages" :key="item">
      <img :src="item" alt="" @load="imageLoad" />
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
    topImages: {
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
  mounted() {
    // console.log('detail swiper')
  },
  methods: {
    imageLoad() {
      // console.log('imageLoad')
    },
  },
}
</script>

<style scoped>
.detail-swiper {
  height: 300px;
  overflow: hidden;
}
.detail-swiper img {
  width: 100%;
}
</style>
