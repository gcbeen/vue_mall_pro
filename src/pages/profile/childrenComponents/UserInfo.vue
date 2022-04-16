<template>
  <div class="user">
    <div class="user-img">
      <img src="~assets/img/profile/avatar.svg" alt="" />
      <div class="load-info">
        <div class="load">登陆/注册</div>
        <div class="phone">
          <img src="~assets/img/profile/phone.svg" alt="" />
          <span class="text">暂无绑定手机号</span>
        </div>
      </div>
    </div>

    <div class="more">
      <img src="~assets/img/profile/arrow-right.png" alt="" />
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.user {
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  height: 90px;
  padding: 0 10px;
  background: var(--color-tint);
  color: #fff;
}

.user-img {
  display: flex;
  align-items: center;
  width: 350px;
}

.user-img img {
  width: 60px;
}

.phone {
  display: flex;
  align-items: center;
  margin-top: 10px;
}
.phone img {
  width: 20px;
}
.more img {
  width: 20px;
}
</style>
