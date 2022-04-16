<template>
  <div v-if="Object.keys(itemInfo).length !== 0" class="shop-item">
    <div class="item-selector">
      <check-button :is-check="itemInfo.checked" @click.native="checkClick" />
    </div>
    <div class="item-img">
      <img :src="itemInfo.image" alt="商品图片" />
    </div>
    <div class="item-info">
      <div class="item-title">{{ itemInfo.title }}</div>
      <div class="item-desc">{{ itemInfo.desc }}</div>
      <div class="info-bottom">
        <div class="item-price-left">¥{{ itemInfo.price }}</div>
        <div class="item-count-right">x{{ itemInfo.count }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
export default {
  components: {
    CheckButton,
  },
  props: {
    itemInfo: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  methods: {
    checkClick() {
      // eslint-disable-next-line vue/no-mutating-props
      this.itemInfo.checked = !this.itemInfo.checked
    },
  },
}
</script>

<style scoped>
.shop-item {
  display: flex;
  width: 100%;
  padding: 5px;
  border-bottom: 1px solid #ccc;
  font-size: 0;
}

.item-selector {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 14%;
}

.item-title,
.item-desc {
  /* 超出隐藏 */
  overflow: hidden;
  /* 一行显示 */
  white-space: nowrap;
  /* 超出部分省略号显示 */
  text-overflow: ellipsis;
}

.item-img {
  padding: 5px;
}

.item-img img {
  width: 80px;
  height: 100px;
  border-radius: 5px;
}

.item-info {
  position: relative;
  padding: 5px 10px;
  color: #333;
  font-size: 17px;
  overflow: hidden;
}

.item-info .item-desc {
  margin-top: 15px;
  color: #666;
  font-size: 14px;
}

.info-bottom {
  position: absolute;
  left: 10px;
  right: 10px;
  bottom: 10px;
  margin-top: 10px;
}

.info-bottom .item-price {
  color: orangered;
}
</style>
