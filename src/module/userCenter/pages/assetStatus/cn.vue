<template>
	<div class="app">
		<left-nav :currentIndex="0">
		</left-nav>
		<asset></asset>
	</div>
</template>
<script>
import leftNav from '../../components/leftNav/index.cn';
import asset from '../../components/asset';
export default {
	components: {
		leftNav,
		asset
	}
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
