<template>
  <div>
    <h2>用户页面标题</h2>
    <p>用户页面内容</p>
    <h2>{{$route.params.id}}</h2>
  </div>
</template>

<script>
export default {
  name: "user",
    created() {
      console.log('User created');
    },
    destroyed() {
      console.log('User destroyed');
    }
}


</script>

<style scoped>

</style>