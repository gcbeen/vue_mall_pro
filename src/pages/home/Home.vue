<template>
  <div class="home">
    <nav-bar class="home-nav"><div slot="center">购物</div></nav-bar>
    <tab-control
      v-show="isTabFixed"
      ref="tabControlFixed"
      :titles="['流行', '新款', '精选']"
      class="tab-control-fixed"
      @tabClick="tabClick"
    ></tab-control>
    <scroll
      ref="scroll"
      class="scroll-content"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <home-swiper ref="homeSwiper" :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        v-show="!isTabFixed"
        ref="tabControl"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
      <div v-show="isTabFixed" class="tab-h"></div>
    </scroll>
    <back-top v-show="isShowBackTop" @click.native="backClick"></back-top>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'

import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
// mixin 方式混入
// import BackTop from 'components/content/backTop/BackTop'

import HomeSwiper from './childrenComponents/HomeSwiper'
import RecommendView from './childrenComponents/RecommendView'
import FeatureView from './childrenComponents/FeatureView'

import { getHomeMultidata, getHomeGoods } from 'network/home'
// import {debounce} from 'common/utils.js' 混入后就不需要再重复引入了
import { backTopMixin, itemImgListenerMixin } from 'common/mixin.js'
export default {
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    // BackTop,
  },
  mixins: [backTopMixin, itemImgListenerMixin],
  data() {
    return {
      multidata: null,
      Goodsdata: null,
      banners: [],
      recommends: [],
      currentType: 'pop',
      // isShowBackTop: false,
      isTabFixed: false,
      tabOffsetTop: 0,
      swiperOffsetTop: 0,
      tabFixedMove: 0,
      saveY: 0,
      goodsMove: {
        pop: 0,
        new: 0,
        sell: 0,
      },
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      // itemImgListener: null,
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    },
  },

  created() {
    this.getHomeMultidata()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {
    // 利用混入，减少重复代码
    // 混入到了itemListenerMixin
    // 防抖动
    // const refresh = debounce(this.$refs.scroll.refresh, 50)
    // 直接写回调
    // // 1.图片加载完成的事件监听
    // this.$bus.$on('itemImageLoad', () => {
    //   refresh()
    // })
    // 命名回调
    // this.itemImgListener = () => {
    //   refresh()
    // }
    // this.$bus.$on('itemImageLoad', this.itemImgListener)
  },
  activated() {
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY()
    // console.log(this.saveY)
    // 2.取消全局事件监听（主页图片加载的监听）
    // 因为此时设置了keep-alive，所以离开时调用的是deactivated()
    this.$bus.$off('itemImageLoad', this.itemImgListener)
  },
  destroyed() {
    console.log('home destroyed')
  },
  methods: {
    // 事件处理
    tabClick(index) {
      this.saveGoodsMove(this.currentType)
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl.currentIndex = index
      this.$refs.tabControlFixed.currentIndex = index
      this.setGoodsMove(this.currentType)
    },
    setGoodsMove(type) {
      this.$refs.scroll.scrollTo(0, this.goodsMove[type], 0)
      this.$refs.scroll.refresh()
    },
    saveGoodsMove(type) {
      const currentY = this.$refs.scroll.getScrollY()
      const initY = -currentY > this.tabFixedMove ? -this.tabFixedMove : currentY

      if (-currentY > this.tabFixedMove) {
        // 吸顶
        // 不吸顶变成吸顶
        for (const key in this.goodsMove) {
          if (-this.goodsMove[key] < this.tabFixedMove) {
            this.goodsMove[key] = initY
          }
        }
      }
      // currentY
      this.goodsMove[type] = currentY
    },
    contentScroll(position) {
      // 1.判断BackTop是否显示
      this.isShowBackTop = -position.y > 1000
      // 2.决定tabControl是否吸顶(position: fixed)
      this.isTabFixed = -position.y > this.tabFixedMove
    },
    loadMore() {
      // console.log('loadMore')
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
      this.swiperOffsetTop = this.$refs.homeSwiper.$el.offsetTop
      this.tabFixedMove = this.tabOffsetTop - this.swiperOffsetTop
    },
    // mixin方式混入
    // backClick() {
    //   // this.$refs.scroll 可拿到scroll组件中的所有数据
    //   // this.$refs.scroll.scroll.scrollTo(0,0,1000)
    //   this.$refs.scroll.scrollTo(0, 0) /* 封装之后 */
    // },
    // 网络请求相关方法
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        if (res && res.data) {
          this.multidata = res.data
          this.recommends = res.data.recommend.list
          this.banners = res.data.banner.list
        }
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      // console.log(type, page)
      getHomeGoods(type, page).then((res) => {
        if (res && res.data) {
          this.Goodsdata = res.data
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          this.$refs.scroll.finishPullUp()
        }
      })
    },
  },
}

// console.log('---home---');
</script>

<style scoped>
.home {
  height: 100vh;
  /* 设定滚动高度 屏幕高度 + 设定 padding */
  padding-top: 44px;
  padding-bottom: 45px;
  /* 设定滚动高度 屏幕高度 + 定位 */
  /* position: relative; */
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  z-index: 9;
  /* position: relative; 下面加了overflow，这里就不用设置了
    z-index: 9; */
}

.scroll-content {
  /* position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0; */
  height: 100%;
  overflow: hidden;
}

.tab-control-fixed {
  z-index: 9;
}

.tab-h {
  width: 100%;
  height: 40px;
}
</style>
