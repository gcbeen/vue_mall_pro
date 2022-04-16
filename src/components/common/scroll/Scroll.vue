<template>
  <div ref="wrapper" class="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },

    // observeImage: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  data() {
    return {
      scroll: null,
    }
  },
  mounted() {
    // click div类元素也可以点击
    // probeType 侦测滑动位置
    // pullUpLoad 启动上拉事件
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      // BScroll 2 新增特性 等页面图片加载完之后，刷新content高度
      // observeImage: this.observeImage,
    })
    // 监听滚动位置
    this.scroll.on('scroll', (position) => {
      this.$emit('scroll', position)
    })

    // 监听上拉事件
    this.scroll.on('pullingUp', () => {
      this.$emit('pullingUp')
    })
  },
  methods: {
    scrollTo(x, y, time = 1000) {
      // console.log('y::: ' + y)
      this.scroll.scrollTo(x, y, time)
    },
    finishPullUp() {
      this.scroll.finishPullUp()
    },
    refresh() {
      // console.log('refresh')
      this.scroll && this.scroll.refresh()
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    },
  },
}
</script>
