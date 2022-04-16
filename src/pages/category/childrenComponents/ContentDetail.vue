<template>
  <div class="content-detail">
    <goods-list-item v-for="(content, index) in contentDetail" :key="index" :goods-item="content" />
  </div>
</template>

<script>
import GoodsListItem from 'components/content/goods/GoodsListItem'
export default {
  components: {
    GoodsListItem,
  },
  props: {
    contentDetail: {
      type: Array,
      default() {
        return []
      },
    },
    isTabFixed: {
      type: Boolean,
      default() {
        return false
      },
    },
  },
}
</script>

<style scoped>
.content-detail {
  display: flex;
  flex-wrap: wrap;
}

.content-detail .goods-item {
  flex: 45%;
  width: 45%;
  margin: 10px 5px;
}
</style>
