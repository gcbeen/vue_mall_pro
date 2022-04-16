<template>
  <tab-bar>
    <tab-bar-item path="/home" active-color="green">
      <img slot="item-active-icon" src="~assets/img/tabbar/home_active.svg" alt="" />

      <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt="" />

      <div slot="item-text">首页</div>
    </tab-bar-item>

    <tab-bar-item path="/category" active-color="deepGreen">
      <img slot="item-active-icon" src="~assets/img/tabbar/category_active.svg" alt="" />

      <img slot="item-icon" src="~assets/img/tabbar/category.svg" alt="" />

      <div slot="item-text">分类</div>
    </tab-bar-item>

    <tab-bar-item path="/cart" active-color="blue">
      <img slot="item-active-icon" src="~assets/img/tabbar/shopcart_active.svg" alt="" />

      <img slot="item-icon" src="~assets/img/tabbar/shopcart.svg" alt="" />

      <div slot="item-text">购物车</div>
    </tab-bar-item>

    <tab-bar-item path="/profile" active-color="lightBlue">
      <img slot="item-active-icon" src="~assets/img/tabbar/profile_active.svg" alt="" />

      <img slot="item-icon" src="~assets/img/tabbar/profile.svg" alt="" />

      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
// 组件中不要使用别名
import TabBar from 'components/common/tabbar/TabBar'
import TabBarItem from 'components/common/tabbar/TabBarItem'
export default {
  name: 'MainTabBar',
  components: {
    TabBar,
    TabBarItem,
  },
}
</script>
