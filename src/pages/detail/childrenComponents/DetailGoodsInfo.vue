<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{ detailInfo.desc }}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{ detailInfo.detailImage[0].key }}</div>
    <div class="info-list">
      <img v-for="(item, index) in detailInfo.detailImage[0].list" :key="index" :src="item" alt="" @load="imgLoad" />
      <!-- 图片懒加载 获取 offsetTop 数据不准确
      <img v-for="(item, index) in detailInfo.detailImage[0].list" :key="index" v-lazy="item" alt="" @load="imgLoad" /> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      counter: 0,
      imagesLength: 0,
    }
  },
  watch: {
    detailInfo() {
      // 获取图片的个数
      this.imagesLength = this.detailInfo.detailImage[0].list.length
    },
  },
  methods: {
    imgLoad() {
      // 所有图片加载完成，进行一次回调
      this.counter++
      // console.log('counter::' + this.counter)
      // console.log('length::' + this.imagesLength)
      if (this.counter === this.imagesLength) {
        // console.log('imageLoad')
        this.$emit('imageLoad')
        // 图片懒加载 获取 offsetTop 数据不准确
        // 要重新计数
        this.counter = 0
      }
    },
  },
}
</script>

<style scoped>
.goods-info {
  padding: 20px 0;
  border-bottom: 5px solid #f2f5f8;
}

.info-desc {
  padding: 0 15px;
}

.info-desc .start,
.info-desc .end {
  width: 90px;
  height: 1px;
  background-color: #a3a3a5;
  position: relative;
  float: left;
}
.info-desc .end {
  float: right;
}

.info-desc .start::before,
.info-desc .end::after {
  contain: '';
  position: absolute;
  width: 5px;
  height: 5px;
  bottom: 0;
  background-color: #333;
}

.info-desc .end::after {
  right: 0;
}

.info-desc .desc {
  padding: 15px 0;
  font-size: 14px;
}

.info-key {
  margin: 10px 0 10px 15px;
  color: #333;
  font-size: 15px;
}

.info-list img {
  width: 100%;
}
</style>
