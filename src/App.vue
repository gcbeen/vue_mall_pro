<template>
  <div id="app">
    <!--<h1>网站的标题</h1>
    <router-link to="/about" tag="li" :replace="true" active-class="active">测试</router-link>

     <router-link to="/home">首页</router-link>
    <router-link to="/about">关于</router-link>

    <button @click="homeClick">首页</button>
    <button @click="aboutClick">关于</button>

    <router-link to="/user/123">用户</router-link>
    <router-link
      :to="{
        path: '/profile/' + 123,
        query: { name: '孙悟空', age: 500 },
      }"
      >档案</router-link
    >
    <button @click="toProfile">档案</button> -->

    <keep-alive exclude="Profile,User,Detail">
      <router-view />
    </keep-alive>

    <!-- <h2>视频播放APP版权由 孙悟空 所有</h2>
    <h2>视频播放APP版权由 孙悟空 所有</h2>
    <h2>视频播放APP版权由 孙悟空 所有</h2>
    <h2>视频播放APP版权由 孙悟空 所有</h2>
    <h2>视频播放APP版权由 孙悟空 所有</h2>
    <h2>视频播放APP版权由 孙悟空 所有</h2> -->
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabBar/MainTabBar'

export default {
  name: 'App',
  components: {
    MainTabBar,
  },

  methods: {
    homeClick() {
      this.$router.push('/home')
    },
    aboutClick() {
      this.$router.push('/about')
    },
    toProfile() {
      this.$router.push({
        path: '/profile/' + 124,

        query: { name: '猪八戒', age: 400 },
      })
    },

    test() {
      const a = '20'
      const b = 10
      console.log('print', a, b)
    },
  },
}
</script>

<style>
@import 'assets/css/base.css';
</style>
