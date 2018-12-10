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
        "即日起，一周无业绩，锁仓币扣50%，两周清空",
        "即日起，每天进行持仓快照，新增业绩每日释放！",
        "接各大交易所通知，每次充提币请勿少于50trx",
        "即日起，恢复一推五释放标准",
        "增加888锁仓币今日开始释放",
        "今日上线18%推荐奖励，t+1到账"
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

<style lang="scss">
@import "./index.scss";
</style>
