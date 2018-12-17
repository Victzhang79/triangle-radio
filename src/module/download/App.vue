<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	name: 'app'
};
</script>

<style lang="scss">
// @import '../../assets/css/reset.scss';
// @import '../../assets/css/base.scss';
@import '../../assets/style/public.scss';
html,
body {
	height: 100%;
}
#app {
	height: 100%;
}
</style>
