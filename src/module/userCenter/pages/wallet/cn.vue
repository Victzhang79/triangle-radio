<template>
	<div class="app">
		<navigation-bar :backBtn="false"></navigation-bar>
		<head-banner></head-banner>
		<coin-list></coin-list>
		<footer-bar></footer-bar>
	</div>
</template>
<script>
import navigationBar from '@/components/navigationBar';
import footerBar from '../../components/footerBar';
import headBanner from '../../components/headBanner';
import coinList from '../../components/coinList';
export default {
	components: {
		headBanner,
		coinList,
		navigationBar,
		footerBar
	}
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
