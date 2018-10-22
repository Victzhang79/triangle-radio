<template>
	<div>
		<top-bar activePage="pawn"></top-bar>
		<head-banner></head-banner>
		<container></container>
		<footer-bar></footer-bar>
	</div>
</template>
<script>
import topBar from '../../../../components/header/cn';
import footerBar from '../../../../components/footer';
import headBanner from '../../components/headBanner';
import container from '../../components/container';
export default {
	components: {
		topBar,
		footerBar,
		headBanner,
		container
	}
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>

