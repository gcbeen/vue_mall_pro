<template>
  <div class="goods">
    <goods-list-item v-for="(item, index) in goods" :key="itemKey(item, index)" :goods-item="item"></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'
export default {
  components: {
    GoodsListItem,
  },
  props: {
    goods: {
      type: Array,
      default() {
        return []
      },
    },
  },
  computed: {},
  methods: {
    itemKey(item, index) {
      return '' + (item.iid || item.item_id) + index
    },
  },
}
</script>

<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 2px;
}
</style>
