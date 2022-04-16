<template>
  <div v-if="subCategoryList.length !== 0" class="menu-detail">
    <div v-for="(item, index) in subCategoryList" :key="item.title + index" class="menu-detail-item">
      <a :href="item.link"></a>
      <img v-lazy="item.image" class="image" alt="" @load="imageLoad" />
      <!-- <img :src="item.image" class="image" alt="" @load="imageLoad" /> -->
      <div class="text">{{ item.title }}</div>
    </div>
    <div class="menu-detail-item"></div>
    <div class="menu-detail-item"></div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    subCategoryList: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      counter: 0,
    }
  },
  methods: {
    imageLoad() {
      this.counter++
      console.log('counter::' + this.counter)
      console.log('length::' + this.subCategoryList.length)
      if (this.counter === this.subCategoryList.length) {
        console.log('imageLoad')
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
.menu-detail {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-top: 5px;
}

.menu-detail-item {
  width: 30%;
  padding: 8px;
  text-align: center;
  font-size: 12px;
}

.image {
  /* width: 80%; */
  width: 100%;
  border-radius: 5px;
}

.text {
  margin-top: 5px;
}
</style>
