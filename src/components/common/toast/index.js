// Toast 插件
import Toast from './Toast'
const obj = {}
// 插件安装函数
obj.install = function (Vue) {
  // 直接添加 toast 组件中的元素不行
  // document.body.appendChild(Toast.$el)
  // 1.创建组件构造器
  const ToastConstructor = Vue.extend(Toast)
  // 2.用 new 的方式，根据组件构造器，可以创建一个组件对象
  const toast = new ToastConstructor()
  // 3.将组件对象手动地挂载到某一个元素上
  // 将 toast 组件对象挂载到div上
  toast.$mount(document.createElement('div'))
  // 4.挂载完之后， toast.$el 对应的就是div
  document.body.appendChild(toast.$el)
  Vue.prototype.$toast = toast
}
export default obj
