<template>
  <div class="notice">
    <div class="notice-content">
      <div class="notice-icon"></div>
      <transition-group
        tag="ul"
        name="slide"
      >
        <li
          class="notice-message"
          v-for="(item, index) in noticeList"
          v-show="index == showIndex"
          :key="index"
        >{{item}}</li>
      </transition-group>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      noticeList: [
        "即日起推荐他人定存开始享受三级提成奖励",
        "释放锁仓币的用户需要直推5名有效用户"
      ],
      showIndex: 0,
      length: 1,
      intervalId: null,
      totalDuration: 3000
    };
  },
  created() {
    this.length = this.noticeList.length;
    this.startMove();
  },
  methods: {
    startMove() {
      this.intervalId = setInterval(() => {
        if (this.showIndex === this.length - 1) {
          this.showIndex = 0;
          console.log(this.showIndex);
        } else {
          this.showIndex++;
        }
      }, this.totalDuration);
    }
  },
  destroyed() {
    clearInterval(this.intervalId); // 清除定时器
  }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
