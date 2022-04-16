import { ADD_COUNTER, ADD_TO_CART } from './mutationTypes'
export default {
  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    // 购物车中商品是否选中的属性
    payload.checked = true
    state.cartList.push(payload)
  },
}
