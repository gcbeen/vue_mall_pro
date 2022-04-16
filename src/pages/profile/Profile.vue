<template>
  <div>
    <nav-bar class="profile-nav">
      <div slot="center">我的档案</div>
    </nav-bar>
    <user-info />
    <list-view />
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import ListView from './childrenComponents/ListView'

import UserInfo from './childrenComponents/UserInfo'

export default {
  components: {
    NavBar,
    ListView,
    UserInfo,
  },
  created() {
    // console.log('Profile created')
  },

  destroyed() {
    // console.log('Profile destroyed')
  },
}
</script>

<style scoped>
.profile-nav {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
}
</style>
