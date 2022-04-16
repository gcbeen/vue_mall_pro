import Vuex from 'vuex'
import Vue from 'vue'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'
// 模块拆分 使用方式不变
// import moduleA from './modules/moduleA'

Vue.use(Vuex)

const state = {
  cartList: [],
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  // modules: {
  //   moduleA,
  // },
})

export default store
