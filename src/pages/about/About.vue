<template>
  <div>
    <h2>关于页面标题</h2>
    <p>关于页面内容</p>
  </div>
</template>

<script>
export default {
  name: "about",
    created() {
      console.log('About created');
    },
    destroyed() {
      console.log('About destroyed');
    }
}
</script>

<style scoped>

</style>