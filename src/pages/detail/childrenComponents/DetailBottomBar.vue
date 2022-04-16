<template>
  <div class="bottom-bar">
    <div class="bar bar-left">
      <div>
        <i class="img service"></i>
        <span>客服</span>
      </div>
      <div>
        <i class="img shop"></i>
        <span>店铺</span>
      </div>
      <div>
        <i class="img star"></i>
        <span>收藏</span>
      </div>
    </div>
    <div class="bar bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    addToCart() {
      this.$emit('addCart')
    },
  },
}
</script>

<style scoped>
.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  height: 49px;
  background-color: #fff;
  text-align: center;
}

.bar {
  flex: 1;
  display: flex;
}

.bar div {
  flex: 1;
}

.bar-left span {
  font-size: 12px;
}

.bar-left .img {
  display: block;
  width: 22px;
  height: 22px;
  margin: 8px auto 0;
  background: url('~assets/img/detail/detail_bottom.png') no-repeat 0 0 /100%;
}

.bar-left .service {
  background-position-y: -54px;
}

.bar-left .shop {
  background-position-y: -98px;
}

.bar-right {
  line-height: 49px;
  color: #fff;
  font-size: 14px;
}

.cart {
  height: 49px;
  background-color: #ffe817;
  color: #333;
}

.buy {
  height: 49px;
  background-color: #f69;
}
</style>
