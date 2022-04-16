<template>
  <div v-if="Object.keys(commentInfo).length !== 0" class="comment">
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more">更多<i class="arrow-right"></i></div>
    </div>
    <div class="info-user">
      <img :src="commentInfo.user.avatar" alt="" />
      <span>{{ commentInfo.user.uname }}</span>
    </div>
    <div class="info-detail">
      <p>{{ commentInfo.content }}</p>
      <div class="info-other">
        <span class="data">{{ commentInfo.created | showDate }}</span>
        <span>{{ commentInfo.style }}</span>
      </div>
      <div class="info-imgs">
        <img v-for="(item, index) in commentInfo.images" :key="item + index" :src="item" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from 'common/utils'
export default {
  filters: {
    showDate(value) {
      const date = new Date(value * 1000)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    },
  },
  props: {
    commentInfo: {
      type: Object,
      default: function () {
        return {}
      },
    },
  },
  computed: {},
  methods: {},
}
</script>

<style scoped>
.comment {
  padding: 5px 12px;
  border-bottom: 5px solid #f2f5f8;
  color: #333;
}

.info-header {
  display: flex;
  justify-content: space-between;
  height: 50px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  line-height: 50px;
}

.header-title {
  margin-left: 10px;
}

.header-more {
  margin-right: 10px;
  font-size: 12px;
}
.info-user {
  padding: 10px 0 8px;
}

.info-user img {
  width: 42px;
  vertical-align: middle;
  border-radius: 50%;
}

.info-user span {
  margin-left: 10px;
  font-size: 15px;
}

.info-detail {
  padding: 0 5px 15px;
  line-height: 1.5;
  color: #777;
  font-size: 14px;
}

.info-detail .info-other {
  margin-top: 10px;
  color: #999;
  font-size: 12px;
}

.info-detail .data {
  margin-right: 8px;
}

.info-imgs img {
  width: 70px;
  height: 70px;
  margin-right: 5px;
}
</style>
