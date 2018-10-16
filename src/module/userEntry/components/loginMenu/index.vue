<template>
	<top-menu>
		<ul>
			<!-- <li>简体中文</li> -->
			<li :class="{active: page === 'logup'}">注册</li>
			<li :class="{active: page === 'login'}">登录</li>
		</ul>
	</top-menu>
</template>

<script>
import topMenu from '../../../../components/topMenu/index';
export default {
	props: {
		page: String
	},
	components: {
		topMenu
	}
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
