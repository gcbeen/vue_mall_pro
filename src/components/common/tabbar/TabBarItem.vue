<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="isActive" class="item-active-icon">
      <slot name="item-active-icon"></slot>
    </div>
    <div v-else class="item-icon">
      <slot name="item-icon"></slot>
    </div>

    <div class="item-text" :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props: {
    path: {
      type: String,
      required: true,
    },
    activeColor: {
      type: String,
      default: '#ff5777',
    },
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {}
    },
  },
  methods: {
    itemClick() {
      if (this.path !== this.$route.path) {
        this.$router.replace(this.path)
      }
    },
  },
}
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}

.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}
</style>
