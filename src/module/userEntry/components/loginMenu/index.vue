<template>
	<top-menu>
		<ul>
			<li>简体中文</li>
			<li>注册</li>
			<li>登录</li>
		</ul>
	</top-menu>
</template>

<script>
import topMenu from '../../../../components/topMenu/index';
export default {
	components: {
		topMenu
	}
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
