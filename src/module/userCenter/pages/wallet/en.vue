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
		<footer-bar>
		</footer-bar>
	</div>
</template>
<script>
import topBar from '../../../../components/header/en';
import footerBar from '../../../../components/footer';
import leftNav from '../../components/leftNav';
import asset from '../../components/asset';
export default {
	components: {
		leftNav,
		asset,
		topBar,
		footerBar
	}
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
