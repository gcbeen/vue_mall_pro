<template>
  <div class="category-wrapper">
    <nav-bar class="cate-nav">
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="content">
      <!-- 分类 -->
      <category-menu :categories="categories" @selectItem="selectItem" />
      <div class="scroll-wrap">
        <!-- 固定的商品 tab -->
        <tab-control
          v-show="isTabFixed"
          ref="tabControlFixed"
          class="tab-control-fixed"
          :titles="['综合', '新品', '销量']"
          @tabClick="tabClick"
        ></tab-control>
        <scroll ref="scroll" class="scroll" :probe-type="3" @scroll="scroll">
          <!-- 详细分类 -->
          <menu-detail ref="menu" :sub-category-list="showSubcategory" @imageLoad="menuImageLoad" />
          <!-- 商品 tab -->
          <tab-control
            v-show="!isTabFixed"
            ref="tabControl"
            :titles="['综合', '新品', '销量']"
            @tabClick="tabClick"
          ></tab-control>
          <!-- 商品 -->
          <content-detail :content-detail="showContentDetail" />
          <div v-show="isTabFixed" class="tab-h"></div>
        </scroll>
      </div>
    </div>
    <back-top v-show="isShowBackTop" @click.native="backTop" />
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'

import TabControl from 'components/content/tabControl/TabControl'

import CategoryMenu from './childrenComponents/CategoryMenu'
import MenuDetail from './childrenComponents/MenuDetail'
import ContentDetail from './childrenComponents/ContentDetail'

import { backTopMixin } from 'common/mixin'

import { getCategory, getSubCategory, getContentDetail } from 'network/category.js'

export default {
  components: {
    NavBar,
    Scroll,
    TabControl,
    CategoryMenu,
    MenuDetail,
    ContentDetail,
  },
  mixins: [backTopMixin],
  data() {
    return {
      // 分类
      currentIndex: 0,
      categories: [],
      // categoryData: [],

      maitKey: '',
      mk: 'mk',
      // menuDetailData 数据格式
      // {'mk`maitKey`':[],
      // 'mk`maitKey`':[],
      // ...}
      menuDetailData: {},

      miniWallkey: '',
      mwk: 'mwk',
      types: ['pop', 'new', 'sell'],
      currentType: 'pop',
      // contentDetailData 数据格式
      // {pop: {
      // 'mwk`miniWallkey`':[],
      // 'mwk`miniWallkey`':[]},
      // new: {'mwk`miniWallkey`':[],
      // 'mwk`miniWallkey`':[]},,
      // sell: {'mwk`miniWallkey`':[],
      // 'mwk`miniWallkey`':[]}, }
      contentDetailData: { pop: {}, new: {}, sell: [] },
      isTabFixed: false,
      tabOffsetTop: 0,
      menuOffsetTop: 0,
      tabMove: 0,
    }
  },
  computed: {
    showSubcategory() {
      if (this.maitKey === '') {
        return []
      }
      // console.log(this.menuDetailData[this.maitKey])
      return this.menuDetailData[this.mk + this.maitKey]
    },
    showContentDetail() {
      if (this.miniWallkey === '') {
        return []
      }
      return this.contentDetailData[this.currentType][this.mwk + this.miniWallkey]
    },
  },
  created() {
    this._getCategory()
  },
  mounted() {},
  methods: {
    _getCategory() {
      getCategory().then((res) => {
        // 1.获取分类数据
        this.categories = res.data.category.list

        // 主数据请求到之后才能接着请求后面的子数据
        if (this.categories.length !== 0) {
          const maitKey = this.categories[this.currentIndex].maitKey
          this._getsubcategory(maitKey)
        }
      })
    },

    _getsubcategory(maitKey) {
      // if this.menuDetailData[maitKey]
      if (this.mk + maitKey in this.menuDetailData) {
        this.maitKey = maitKey
        return
      }
      getSubCategory(maitKey).then((res) => {
        // console.log('getSubCategory')
        // this.categoryData[index].subcategories = res.data
        // console.log(res.data.list)
        // this.categoryData = { ...this.categoryData }
        // console.log(this.categoryData[index].subcategories.list)
        this.menuDetailData[this.mk + maitKey] = res.data.list
        this.menuDetailData = { ...this.menuDetailData }
        this.maitKey = maitKey
        this._getContentDetail('pop')
        this._getContentDetail('new')
        this._getContentDetail('sell')
      })
    },
    _getContentDetail(type) {
      const miniWallkey = this.categories[this.currentIndex].miniWallkey
      // console.log(miniWallkey)
      if (this.mwk + miniWallkey in this.contentDetailData[type]) {
        this.miniWallkey = miniWallkey
        return
      }
      getContentDetail(miniWallkey, type).then((res) => {
        this.contentDetailData[type][this.mwk + miniWallkey] = res
        this.contentDetailData = { ...this.contentDetailData }
        this.miniWallkey = miniWallkey
        // this.categoryData[this.currentIndex].categoryDetail[type] = res
        // this.categoryData = { ...this.categoryData }
      })
    },
    selectItem(index) {
      this.currentIndex = index
      const maitKey = this.categories[index].maitKey
      this._getsubcategory(maitKey)
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0, 0, 0)
    },
    scroll(position) {
      // 1.判断BackTop是否显示
      this.isShowBackTop = -position.y > 1000

      // 2.决定tabControl是否吸顶(position: fixed)
      this.isTabFixed = -position.y > this.tabMove
    },

    menuImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
      this.menuOffsetTop = this.$refs.menu.$el.offsetTop
      this.tabMove = this.tabOffsetTop - this.menuOffsetTop
      console.log(this.tabOffsetTop)
      console.log(this.menuOffsetTop)
      console.log(this.tabMove)
    },
    tabClick(index) {
      this.$refs.tabControl.currentIndex = index
      this.$refs.tabControlFixed.currentIndex = index
      this.currentType = this.types[index]
      this._getContentDetail(this.currentType)
    },
  },
}
</script>

<style scoped>
.category-wrapper {
  /* background: chartreuse; */
  /* 屏幕高 */
  height: 100vh;
}

.cate-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  font-weight: 700;
  z-index: 9;
  /* position: relative; 下面加了overflow，这里就不用设置了
    z-index: 9; */
}
.content {
  display: flex;
  height: 100%;
  padding-top: 44px;
  padding-bottom: 49px;
  overflow: hidden;
}

.scroll-wrap {
  width: 275px;
  height: 100%;
  overflow: hidden;
}

.scroll {
  width: 275px;
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

/* .tab-content {
  height: calc(100% - 40px);
  height: 100%;
  padding-bottom: 40px;
  box-sizing: border-box;
  flex: 1;
  overflow: hidden;
}

.content-detail-wrap {
  flex: 1;
  width: 275px;
}

.hidden {
  display: none;
} */
</style>
