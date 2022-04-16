<template>
  <div class="menu">
    <scroll class="content">
      <div
        v-for="(item, index) in categories"
        :key="item.title + index"
        :class="isActive(index)"
        class="title"
        @click="titleClick(index)"
      >
        {{ item.title }}
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
export default {
  components: {
    Scroll,
  },
  props: {
    categories: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return { currentIndex: 0 }
  },

  methods: {
    titleClick(index) {
      this.currentIndex = index
      this.$emit('selectItem', index)
    },
    isActive(index) {
      return { active: index === this.currentIndex }
    },
  },
}
</script>

<style scoped>
.menu {
  width: 100px;
  /* height: calc(100%-49px-44px); */
  text-align: center;
}

.menu .content {
  height: 100%;
  overflow: hidden;
  background-color: #f6f6f6;
  padding-bottom: 14px;
}

.title {
  /* background-color: #f6f6f6; */
  line-height: 45px;
  font-size: 14px;
}

.active {
  background-color: #fff;
  color: var(--color-high-text);
  border-left: 3px solid var(--color-high-text);
  font-weight: 700;
}
</style>
