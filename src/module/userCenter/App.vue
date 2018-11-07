<template>
	<div id="app">
		<router-view></router-view>
		<footer-bar></footer-bar>
	</div>
</template>

<script>
import footerBar from './components/footerBar';

export default {
	name: 'app',
	components: {
		footerBar
	}
};
</script>

<style lang="scss">
html,
body,
#app {
	height: 100%;
}
@import '../../assets/style/public.scss';
</style>
