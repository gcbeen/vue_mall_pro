<template>
  <div class="recommend">
    <div v-for="item in recommends" :key="item.title">
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      },
    },
  },
}
</script>

<style scoped>
.recommend {
  display: flex;
  padding: 10px 0 20px;
  border-bottom: 10px solid #eee;
  font-size: 12px;
}

.recommend div {
  flex: 1;
  padding: 0 5px;
}

.recommend a {
  display: block;
  text-align: center;
}

.recommend img {
  width: 70px;
  margin-bottom: 10px;
}
</style>
