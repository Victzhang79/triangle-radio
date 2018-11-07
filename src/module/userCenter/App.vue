<template>
	<div id="app">
		<router-view></router-view>
		<!-- <footer-bar></footer-bar> -->
	</div>
</template>

<script>
import topBar from '../../components/header/cn';
import footerBar from '../../components/footer';

export default {
	name: 'app',
	components: {
		topBar,
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
