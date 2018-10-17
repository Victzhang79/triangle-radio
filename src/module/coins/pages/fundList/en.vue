<template>
  <div class="app">
    <top-bar>
    </top-bar>
    <el-container>
      <el-aside>
        <left-nav>
        </left-nav>
      </el-aside>
      <el-main>
        <asset></asset>
      </el-main>
    </el-container>
    <footer-bar>
    </footer-bar>
  </div>
</template>
<script>
import topBar from '../../../../components/header/en';
import footerBar from '../../../../components/footer';
export default {
	components: {
		topBar,
		footerBar
	}
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
