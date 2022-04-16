<template>
  <div v-show="isShow" class="toast">
    <div>{{ message }}</div>
  </div>
</template>

<script>
export default {
  props: {
    // message:String,
    // isShow: {
    //   type: Boolean,
    //   default () {
    //     return false
    //   }
    // }
  },
  data() {
    return {
      message: '',
      isShow: false,
    }
  },
  methods: {
    show(message = '添加到购物车', duration = 1000) {
      this.message = message
      this.isShow = true
      console.log(message)
      setTimeout(() => {
        this.message = ''
        this.isShow = false
      }, duration)
    },
  },
}
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 5px 8px;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  z-index: 999;
}
</style>
