import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import VueLazyload from 'vue-lazyload'
import FastClick from 'fastclick'

// 1.引入插件
import toast from 'components/common/toast'
// amfe-flexible.js 已放弃 使用vw/vh方案
// import 'amfe-flexible'

Vue.config.productionTip = false

// 添加事件总线对象
Vue.prototype.$bus = new Vue()

// or with options
const loadimage = require('assets/img/common/loading.svg')
const errorimage = require('assets/img/common/time_out.svg')

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: errorimage,
  loading: loadimage,
  attempt: 1,
})
// 2.安装插件,就相当于调用了toast的install函数方法
Vue.use(toast)

// 解决移动端300ms延迟
FastClick.attach(document.body)

// eslint-disable-next-line no-unused-vars
const app = new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount('#app')
// const app = new Vue({
//   el: '#app',
//   store,
//   router,
//   render: (h) => h(App),
//   // render: (createElement) => {
//   //     // 1.使用方式一
//   //     // 语法 createElement('标签', '相关数据对象(可以不传)', ['内容数组'])
//   //     // 1.1 render 函数基本使用
//   //     // return createElement('div', { class: 'box' }, ['唐三藏']);
//   //     // 1.2 嵌套 render 函数
//   //     // return createElement('div', { class: 'box' }, ['唐三藏', createElement('div', ['猪八戒'])]);
//   //     // 2.使用方式二 传入一个组件对象
//   //     return createElement(App);
//   // }
// })
