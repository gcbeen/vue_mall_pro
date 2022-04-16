<template>
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <div class="info-title">{{ goods.title }}</div>
    <div class="info-price">
      <span class="n-price">{{ goods.newPrice }}</span>
      <span class="o-price">{{ goods.oldPrice }}</span>
      <span v-if="goods.discount" class="discount">{{ goods.discount }}</span>
    </div>

    <div class="info-other">
      <span>{{ goods.columns[0] }}</span>
      <span>{{ goods.columns[1] }}</span>
      <span>{{ goods.services[goods.services.length - 1].name }}</span>
    </div>

    <div class="info-service">
      <span v-for="index in goods.services.length - 1" :key="index" class="info-service-item">
        <img :src="goods.services[index - 1].icon" alt="" />
        <span>{{ goods.services[index - 1].name }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goods: {
      type: Object,
      default() {
        return {}
      },
    },
  },
}
</script>

<style scoped>
.base-info {
  margin-top: 15px;
  padding: 0 8px;
  border-bottom: 5px solid #f2f5f8;
  color: #999;
}

.info-title {
  color: #222;
}

.info-price {
  margin-top: 10px;
}

.info-price .n-price {
  color: var(--color-high-text);
  font-size: 24px;
}

.info-price .o-price {
  margin-left: 5px;
  font-size: 13px;
  text-decoration: line-through;
}

.info-price .discount {
  /*让元素上浮一些: 使用相对定位即可*/
  position: relative;
  top: -8px;
  margin-left: 5px;
  padding: 2px 5px;
  background-color: var(--color-high-text);
  color: #fff;
  font-size: 12px;
  border-radius: 8px;
}

.info-other {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
  line-height: 30px;
  font-size: 13px;
}

.info-service {
  display: flex;
  justify-content: space-between;
  line-height: 60px;
}

.info-service-item img {
  /* position: relative;
  top: 2px; */
  /* 垂直居中对齐 */
  vertical-align: middle;
  width: 14px;
  height: 14px;
}

.info-service-item span {
  color: #333;
  font-size: 13px;
}
</style>
