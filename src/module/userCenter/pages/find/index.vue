<template>
  <div class="find-page">
    <navigation-bar
      :backBtn="false"
      :title="'发现'"
    ></navigation-bar>
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
        <li class="game">
          <div class="game-icon">
            <img
              class="icon"
              src="../../assets/imgs/fomo3d.png"
              alt="fomo3d"
            >
          </div>
          <div class="game-content">
            <p class="game-tit">Fomo3D</p>
            <p class="game-txt">一场获取亿万财富的斗争</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import navigationBar from "@/components/navigationBar";
export default {
  components: {
    navigationBar
  },
  methods: {}
};
</script>
<style lang="scss">
@import "./index.scss";
</style>
