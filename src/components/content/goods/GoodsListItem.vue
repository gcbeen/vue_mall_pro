<template>
  <div class="goods-item" @click="itemClick">
    <!-- <img :src="goodsItem.show.img" alt="" @load="imageLoad" /> -->

    <img v-lazy="showImage" alt="" @load="imageLoad" />
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  computed: {
    showImage() {
      return this.goodsItem.image || this.goodsItem.img || this.goodsItem.show.img
    },
  },
  methods: {
    imageLoad() {
      // on/off 绑定/取消绑定
      this.$bus.$emit('itemImageLoad')
      // 1. 利用路由的路径判断发送哪个事件
      // if(this.$route.indexOf('/home')){
      //   this.$bus.$emit('homeImageLoad')
      // }else if(this.$route.indexOf('/detail')){
      //   this.$bus.$emit('detailImageLoad')
      // }
    },
    itemClick() {
      this.$router.push('/detail/' + (this.goodsItem.iid || this.goodsItem.item_id))
    },
  },
}
</script>

<style scoped>
.goods-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 48%;

  /* flex-direction: column;
    display: flex;
    justify-content: space-between; */
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  height: 40px;
  padding: 5px 0;
  font-size: 12px;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  margin-bottom: 3px;
  /* 
  隐藏超出部分
  显示省略符号来代表被修剪的文本。
  不换行
   */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: '';
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;

  background: url('~assets/img/common/collect.svg') 0 0/14px 14px;

  /* 
  等价于
  */
  /* background: url('~assets/img/common/collect.svg') no-repeat;
  background-position: 0 0;
  background-size: 14px 14px; */
}
</style>
