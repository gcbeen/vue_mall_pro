<template>
  <div :class="{ check: isCheck }" class="check-button">
    <img src="~assets/img/cart/tick.svg" alt="" />
  </div>
</template>

<script>
export default {
  props: {
    isCheck: {
      type: Boolean,
      default() {
        return false
      },
    },
  },
}
</script>

<style scoped>
.check-button {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #aaa;
}

.check {
  background-color: pink;
  border-color: pink;
}
</style>
