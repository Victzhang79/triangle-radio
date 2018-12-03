<template>
  <div>
    <navigation-bar :backBtn="false" :title="'个人中心'"></navigation-bar>
    <security-list></security-list>
    <footer-bar></footer-bar>
  </div>
</template>
<script>
import navigationBar from "@/components/navigationBar";
import footerBar from "../../components/footerBar";
import securityList from "../../components/securityList";
export default {
  components: {
    securityList,
    navigationBar,
    footerBar
  },
  created() {
    // 获取页面数据
    this.$store.dispatch("getSecurityInfo");
    // 获取用户认证状态
    this.$store.dispatch("initIdentiStatus");
  },
  methods: {}
};
</script>
<style lang="scss">
</style>
