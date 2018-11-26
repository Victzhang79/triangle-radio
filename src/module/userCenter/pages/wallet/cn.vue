<template>
	<div class="app">
		<navigation-bar :backBtn="false"></navigation-bar>
		<head-banner></head-banner>
		<notice></notice>
		<coin-list></coin-list>
		<footer-bar></footer-bar>
	</div>
</template>
<script>
import navigationBar from '@/components/navigationBar';
import footerBar from '../../components/footerBar';
import headBanner from '../../components/headBanner';
import notice from '../../components/notice';
import coinList from '../../components/coinList';
export default {
	components: {
		headBanner,
		coinList,
		notice,
		navigationBar,
		footerBar
	}
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
