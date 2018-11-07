<template>
	<div class="top-menu">
		<div @click="clickLogo" class="logo"><img src="../../assets/imgs/logo.png" alt=""></div>
		<div class="menu-list">
			<slot></slot>
		</div>
	</div>
</template>

<script>
export default {
	methods: {
		clickLogo() {
			window.location.href =
				window.location.protocol +
				'//' +
				window.location.host +
				'/m/home';
		}
	}
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
