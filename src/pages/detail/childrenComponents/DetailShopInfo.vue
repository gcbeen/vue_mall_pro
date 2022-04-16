<template>
  <div class="shop-info">
    <div class="shop-top">
      <img :src="shop.logo" alt="" />
      <span class="title">{{ shop.name }}</span>
    </div>
    <div class="shop-middle">
      <div class="shop-middle-item shop-middle-left">
        <div class="info-sells">
          <div class="sells-count">{{ shop.sells | sellCountFilter }}</div>
          <div class="sells-text">总销量</div>
        </div>
        <div class="info-goods">
          <div class="goods-count">{{ shop.goodsCount }}</div>
          <div class="goods-text">全部宝贝</div>
        </div>
      </div>
      <div class="shop-middle-item shop-middle-right">
        <ul>
          <li v-for="(item, index) in shop.score" :key="index">
            <span>{{ item.name }}</span>
            <span :class="{ 'score-better': item.isBetter }" class="score">{{ item.score }}</span>
            <span class="better" :class="{ 'better-more': item.isBetter }">
              <span>{{ item.isBetter ? '高' : '低' }}</span>
            </span>
          </li>
        </ul>
      </div>
    </div>
    <div class="shop-bottom">
      <div class="enter-shop">进店逛逛</div>
    </div>
  </div>
</template>

<script>
export default {
  filters: {
    sellCountFilter(val) {
      if (val < 10000) {
        return val
      } else {
        return (val / 10000).toFixed(1) + '万'
      }
    },
  },
  props: {
    shop: {
      type: Object,
      default() {
        return {}
      },
    },
  },
}
</script>

<style scoped>
ul,
li {
  list-style: none;
}

.shop-info {
  padding: 25px 8px;
  border-bottom: 5px solid #f2f5f8;
}

.shop-top {
  display: flex;
  align-items: center;
  line-height: 45px;
}

.shop-top img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.shop-top .title {
  margin-left: 10px;
  vertical-align: middle;
}

.shop-middle {
  display: flex;
  align-items: center;
  margin-top: 15px;
}

.shop-middle-item {
  flex: 1;
}

.shop-middle-left {
  display: flex;
  /*  元素间距相等 */
  justify-content: space-evenly;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  color: #333;
  text-align: center;
}

.sells-count,
.goods-count {
  font-style: 18px;
}

.sells-text,
.goods-text {
  margin-top: 10px;
  font-size: 12px;
}

.shop-middle-right {
  font-size: 13px;
  color: #333;
}

.shop-middle-right ul {
  width: 120px;
  margin-left: 30px;
}

.shop-middle-right ul li {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
}

.shop-middle-right ul li > .score {
  width: 30px;
}

.shop-middle-right .score {
  width: 30px;
  color: #5ea732;
}

.shop-middle-right .score-better {
  color: #f13e3a;
}

.shop-middle-right .better span {
  background-color: #5ea732;
  color: #fff;
  text-align: center;
}

.shop-middle-right .better-more span {
  background-color: #f13e3a;
}

.shop-bottom {
  margin-top: 10px;
  text-align: center;
}

.enter-shop {
  display: inline-block;
  width: 150px;
  height: 30px;
  background-color: #f2f5f8;
  line-height: 30px;
  text-align: center;
  font-size: 14px;
  border-radius: 10px;
}
</style>
