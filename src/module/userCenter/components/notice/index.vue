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
        "即日起一周，直推一名有效用户即可释放锁仓币",
        "即日起，一周无业绩，锁仓币扣50%，两周清空",
        "即日起，每天进行持仓快照，新增业绩每日释放！",
        "波场主网升级完成，充提已恢复"
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
