import { ADD_COUNTER, ADD_TO_CART } from './mutationTypes'

export default {
  addCart(context, payload) {
    // dispatch可以返回一个promise，可用来监听事件成功与否，据此做弹窗toast效果
    return new Promise((resolve, reject) => {
      const oldProduct = context.state.cartList.find((item) => item.iid === payload.iid)
      if (oldProduct) {
        // oldProduct.count += 1 这样写也可以，但是无法在devtools中监视到状态变化
        // 将数量加1的情况分发到一个特定的方法中
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前商品数量+1')
        // reject('错误')
      } else {
        payload.count = 1
        // context.state.cartList.push(payload)
        // 将添加商品的情况分发到另一个特定的方法中，使得mutations中的方法只对应一种改变
        context.commit(ADD_TO_CART, payload)
        resolve('添加新的商品')
        // reject('错误')
      }
    })
  },
}
