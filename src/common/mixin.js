import { debounce } from 'common/utils'
import BackTop from 'components/content/backTop/BackTop'
// mixin 混入，此mounted函数将与组件内的mounted函数合并，不冲突
// 混入时写的哪个函数，导入后就能实现相应函数的功能
// 监听图片完成加载
export const itemImgListenerMixin = {
  data() {
    return {
      itemImgListener: null,
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 100)
    this.itemImgListener = () => {
      refresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener)
  },
}

// 封装回到顶部按钮
export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false,
    }
  },
  components: {
    BackTop,
  },
  methods: {
    backTop() {
      this.$refs.scroll.scrollTo(0, 0)
    },
  },
}

// VUE环境下监听物理返回键/浏览器返回按钮
// 先回退到前一页，在跳转到当前页
//
// 【弃用】在第一层页面路由 用户点击浏览器的返回键就退出应用 需要多加一个当前页面路由
// 1. web端，首页想要物理回退键只关闭sku弹窗，就要另想办法了，而且几乎没办法，至少我是没办法。
// 【放弃使用】弹窗
// 2. 如果是在APP的webview中，办法还是有的，就是APP监听物理返回键，监听到之后，调用js环境的window对象上的一个方法，这个方法的作用是读取vuex中的skuShow的值，如果是true，则APP拦截物理键，方法也把skuShow改为false，如果skuShow本身就是false，则正常操作即可。

export const tabBarBackMixin = {
  mounted() {
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL)
      // false阻止默认事件
      window.addEventListener('popstate', this.quitMessage, false)
    }
  },
  deactivated() {},
  destroyed() {
    console.log('app destroyed')
    // false阻止默认事件
    window.removeEventListener('popstate', this.quitMessage, false)
  },
  methods: {
    quitMessage() {
      this.$toast.show('双击退出')
      setTimeout(() => {
        history.pushState(null, null, document.URL)
      }, 100)
    },
  },
}
