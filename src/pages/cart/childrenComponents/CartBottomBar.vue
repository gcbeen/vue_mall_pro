<template>
  <div class="bottom-bar">
    <div class="button">
      <check-button :is-check="isSelectAll" class="check-button" @click.native="checkAll" />
      <span>全选</span>
    </div>
    <div class="total-price">合计：{{ totalPrice }}</div>
    <div class="calculate" @click="calcClick">去结算{{ counted }}</div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
import { mapGetters } from 'vuex'

export default {
  components: {
    CheckButton,
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return (
        '¥' +
        this.cartList
          .filter((item) => item.checked)
          .reduce((preVal, item) => {
            return preVal + item.price * item.count
          }, 0)
          .toFixed(2)
      )
    },
    counted() {
      return this.cartList.filter((item) => item.checked).length
    },
    isSelectAll() {
      // 购物车中没有商品时，默认不选中
      if (this.cartList.length === 0) {
        return false
      }
      // find只找到一个没选中的就不找了，性能会高一点
      return !this.cartList.find((item) => !item.checked)
    },
  },
  methods: {
    checkAll() {
      if (this.isSelectAll) {
        // 全部选中时
        this.cartList.forEach((item) => (item.checked = false))
      } else {
        this.cartList.forEach((item) => (item.checked = true))
      }
    },
    calcClick() {
      if (!this.isSelectAll) {
        this.$toast.show('请选择购买的商品', 1000)
      }
    },
  },
}
</script>

<style scoped>
.bottom-bar {
  display: flex;
  position: relative;
  height: 40px;
  background-color: #eee;
  line-height: 40px;
  text-align: center;
  font-size: 14px;
  z-index: 999;
}

.button {
  display: flex;
  align-items: center;
  width: 60px;
  margin-left: 8px;
}

.check-button {
  width: 18px;
  height: 18px;
  margin-right: 5px;
  line-height: 20px;
}

.total-price {
  flex: 1;
  margin-left: 20px;
}

.calculate {
  width: 100px;
  background-color: pink;
}
</style>
