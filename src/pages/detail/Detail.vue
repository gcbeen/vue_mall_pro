<template>
  <div id="detail">
    <detail-nav-bar ref="nav" class="detail-nav" @clickTitle="clickTitle" />
    <scroll ref="scroll" class="scroll-content" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="detailImageLoad" />
      <detail-param-info ref="params" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recommend" :goods="recommends" />
    </scroll>
    <detail-bottom-bar @addCart="addToCart" />
    <back-top v-show="isShowBackTop" @click.native="backTop" />
  </div>
</template>

<script>
import { getDetail, Goods, Shop, GoodsParam, getRecommend } from 'network/detail'

import Scroll from 'components/common/scroll/Scroll'

import GoodsList from 'components/content/goods/GoodsList'

import DetailNavBar from './childrenComponents/DetailNavBar'
import DetailSwiper from './childrenComponents/DetailSwiper'
import DetailBaseInfo from './childrenComponents/DetailBaseInfo'
import DetailShopInfo from './childrenComponents/DetailShopInfo'
import DetailGoodsInfo from './childrenComponents/DetailGoodsInfo'
import DetailParamInfo from './childrenComponents/DetailParamInfo'
import DetailCommentInfo from './childrenComponents/DetailCommentInfo'
import DetailBottomBar from './childrenComponents/DetailBottomBar'

import { backTopMixin, itemImgListenerMixin, phoneBackBtnMixin } from 'common/mixin'
import { debounce } from 'common/utils'

// import { ADD_TO_CART } from 'store/mutationTypes'
export default {
  components: {
    Scroll,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList,
  },
  // itemImgListenerMixin 监听推荐商品图片完成加载
  mixins: [backTopMixin, itemImgListenerMixin],
  data() {
    return {
      resultData: null,
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      saveY: 0,
      getThemeTopYs: null,
      currentIndex: 0,
    }
  },
  created() {
    // console.log(this.$route.params.iid)

    // this.$nextTick(() => { // 下一帧，此函数会等到组件dom渲染完后再调用，但组件中的图片并不一定加载完全
    // })
    this.getThemeTopYs = debounce(() => {
      this.themeTopYs = []
      this.themeTopYs.push(0)
      const scrollOffsetTop = this.$refs.scroll.$el.offsetTop
      this.themeTopYs.push(this.$refs.params.$el.offsetTop - scrollOffsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - scrollOffsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - scrollOffsetTop)
      // 在数组末尾增加一个无限大的值，为了之后对数组做遍历
      this.themeTopYs.push(Number.MAX_VALUE)
    }, 100)
    this.getDetailData()
  },
  activated() {
    if (this.iid !== this.$route.params.iid) {
      console.log('activated')
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0, 0, 0)
      this.getDetailData()
    } else {
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
    }
    // console.log('activated', this.$route.params.iid)
  },
  deactivated() {
    console.log('deactivated')
    this.saveY = this.$refs.scroll.getScrollY()
    // 重置Y值
    this.$bus.$off('itemImageLoad', this.itemImgListener)
  },
  methods: {
    addToCart() {
      // 1.获取购物车需要展示的信息，因为有多个信息，所以可以放在一个对象里
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid
      // 2.将商品添加到购物车里
      // commit是将product提交到store中mutations里的方法addCart
      // this.$store.commit(ADD_TO_CART, product)
      // dispatch是提交到actions里去，再由actions分发commit到mutations里不同的方法中去
      this.$store.dispatch('addCart', product).then((res) => {
        // console.log('success')
        console.log(this.$toast)
        this.$toast.show(res)
      })
    },
    contentScroll(position) {
      // console.log('contentScroll')
      const positionY = -position.y
      const length = this.themeTopYs.length
      for (let i = 0; i < length - 1; i++) {
        if (this.currentIndex !== i) {
          // 判断滑动位置的区间
          const flag = i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]
          if (flag) {
            this.currentIndex = i
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
      }

      // 是否显示回到底部按钮的判断
      this.isShowBackTop = positionY > 1000
    },
    detailImageLoad() {
      this.$refs.scroll.refresh()
      // console.log(this.getThemeTopYs)
      this.getThemeTopYs()
    },
    clickTitle(index) {
      // console.log(this.themeTopYs[index])
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 1000)
    },

    getDetailData() {
      // 1.保存传入的iid
      this.iid = this.$route.params.iid
      // 2.根据iid请求详情数据
      getDetail(this.iid).then((res) => {
        // 2.1获取顶部轮播图数据
        this.resultData = res
        const data = res.result
        this.topImages = data.itemInfo.topImages
        // 2.2获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        // 2.3创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)
        // 2.4.保存商品的详情数据
        this.detailInfo = data.detailInfo
        // 2.5.获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        // 6. 获取评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
      })

      // 3. 请求推荐数据
      getRecommend().then((res) => {
        // console.log(res);
        this.recommends = res.data.list
      })
    },
  },
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 999;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.scroll-content {
  height: calc(100% - 88px);
  overflow: hidden;
}
</style>
