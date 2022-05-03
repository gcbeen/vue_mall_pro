import Vue from 'vue'
import VueRouter from 'vue-router'
// 普通方法加载路由
// import Home from '../pages/Home'
// import About from '../pages/About'
// import User from '../pages/User'

// 路由懒加载
// 使用别名
// js 中 别名/路径
// html 中 src="~别名/路径"
// pages 别名
const Home = () => import('pages/home/Home')
const Detail = () => import('pages/detail/Detail')
// const HomeNews = () => import('pages/home/HomeNews')

const About = () => import('pages/about/About')
const User = () => import('pages/profile/User')
const Profile = () => import('pages/profile/Profile')

const Cart = () => import('pages/cart/Cart')
const Category = () => import('pages/category/Category')

Vue.use(VueRouter)

const routes = [
  {
    path: '/', // 默认首页 App页面 重定向到 Home 页面
    redirect: '/home',
  },
  { path: '/home', component: Home, meta: { title: '首页' } },
  { path: '/detail/:iid', component: Detail, meta: { title: '详情' } },
  {
    path: '/about',
    component: About,
    meta: {
      title: '关于',
    },
  },
  {
    path: '/user/:id',
    component: User,
    meta: {
      title: '用户',
    },
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      title: '档案',
    },
  },
  {
    path: '/category',
    component: Category,
    meta: {
      title: '分类',
    },
  },
  {
    path: '/cart',
    component: Cart,
    meta: {
      title: '购物车',
    },
  },
]

const router = new VueRouter({
  routes,
  // mode: 'history',
})

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title
  next()
})

export default router
