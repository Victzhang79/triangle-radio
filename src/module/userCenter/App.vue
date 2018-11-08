<template>
	<div id="app">
		<navigation-bar :backBtn="false"></navigation-bar>
		<router-view></router-view>
		<footer-bar></footer-bar>
	</div>
</template>

<script>
import navigationBar from '@/components/navigationBar';
import footerBar from './components/footerBar';

export default {
	name: 'app',
	components: {
		navigationBar,
		footerBar
	}
};
</script>

<style lang="scss">
html,
body {
	height: 100%;
	user-select: none;
	background: #f7f7f7;
}
#app {
	background: #f7f7f7;
}
@import '../../assets/style/public.scss';
</style>
