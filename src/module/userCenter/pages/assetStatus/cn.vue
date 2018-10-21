<template>
	<div class="app">
		<!-- <top-bar>
    </top-bar> -->
		<el-container>
			<el-aside>
				<left-nav :currentIndex="0">
				</left-nav>
			</el-aside>
			<el-main>
				<asset></asset>
			</el-main>
		</el-container>
		<!-- <footer-bar>
		</footer-bar> -->
	</div>
</template>
<script>
// import topBar from '../../../../components/header/cn';
import footerBar from '../../../../components/footer';
import leftNav from '../../components/leftNav/index.cn';
import asset from '../../components/asset';
export default {
	components: {
		// topBar,
		footerBar,
		leftNav,
		asset
	}
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
