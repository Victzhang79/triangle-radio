<template>
  <div class="find-page">
    <navigation-bar
      :backBtn="false"
      :title="'发现'"
    ></navigation-bar>
    <div class="userInfo-wrap">
      <img
        class="logo"
        src="~@/assets/imgs/logo.png"
        alt="波点钱包"
      >
    </div>
    <div class="top-banner">
      <img
        class="find-banner-img"
        src="../../assets/imgs/find_banner.png"
        alt="发现"
      >
    </div>
    <div class="find-list">
      <div class="find-list-tit">超级热门</div>
      <ul class="games">
        <li
          class="game"
          @click="goPlay"
        >
          <div class="game-icon">
            <img
              class="icon"
              src="../../assets/imgs/fomo3d.png"
              alt="fomo3d"
            >
          </div>
          <div class="game-content">
            <p class="game-tit">比特大富翁</p>
            <p class="game-txt">买key中大奖，百万大奖等你拿</p>
          </div>
        </li>
      </ul>
    </div>
    <p class="more">更多应用陆续接入中，敬请期待...</p>
    <footer-bar></footer-bar>
  </div>
</template>
<script>
import navigationBar from "@/components/navigationBar";
import footerBar from "../../components/footerBar";
export default {
  components: {
    navigationBar,
    footerBar
  },
  methods: {
    goPlay() {
      this.$toast("即将上线，敬请期待");
    }
  }
};
</script>
<style lang="scss">
@import "./index.scss";
</style>
