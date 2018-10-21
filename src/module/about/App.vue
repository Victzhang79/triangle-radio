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
@import '../../assets/style/public.scss';
#app {
	font-family: PingFangSC-Regular, Microsoft YaHei, tahoma, arial, 'Avenir',
		Helvetica, \5b8b\4f53, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
</style>
