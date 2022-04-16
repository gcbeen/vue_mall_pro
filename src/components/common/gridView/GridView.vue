<template>
  <div ref="gridView" class="grid-view">
    <slot></slot>
  </div>
</template>

<script>
// js 计算样式太复杂 弃用
export default {
  props: {
    cols: {
      type: Number,
      default: 2,
    },
    hMargin: {
      type: Number,
      default: 8,
    },
    vMargin: {
      type: Number,
      default: 8,
    },
    itemSpace: {
      type: Number,
      default: 8,
    },
    lineSpace: {
      type: Number,
      default: 8,
    },
  },
  mounted() {
    setTimeout(this._autoLayout, 20)
  },
  methods: {
    _autoLayout() {
      // 1.获取gridEl和children
      // 注: 这里为什么不用document.querySelector呢?
      // 答: 因为如果在项目中, 多处都用到了grid-view, 那么这里就不确定获取的是哪一个了.
      const gridEl = this.$refs.gridView
      const children = gridEl.children
      // 2.设置gridEl的内边距
      gridEl.style.padding = `${this.vMargin}px ${this.hMargin}px`
      // 3.计算item的宽度
      const itemWidth = (gridEl.clientWidth - 2 * this.hMargin - this.cols * this.itemSpace) / this.cols
      for (let i = 0; i < children.length; i++) {
        const item = children[i]
        item.style.width = itemWidth + 'px'
        if ((i + 1) % this.cols !== 0) {
          item.style.marginRight = this.itemSpace + 'px'
        }
        if (i >= this.cols) {
          item.style.marginTop = this.lineSpace + 'px'
        }
      }
    },
  },
}
</script>

<style>
.grid-view {
  display: flex;
  flex-wrap: wrap;
}
</style>
