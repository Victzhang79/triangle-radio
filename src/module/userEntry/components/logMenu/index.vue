<template>
	<top-menu>
		<ul>
			<!-- <li>简体中文</li> -->
			<li @click="goLogup" :class="{active: page === 'logup'}">注册</li>
			<li @click="goLogin" :class="{active: page === 'login'}">登录</li>
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
	},
	methods: {
		goLogin() {
			if (this.page === 'login') {
				return false;
			}
			this.$router.push('/login');
		},
		goLogup() {
			if (this.page === 'logup') {
				return fasle;
			}
			this.$router.push('/logup');
		}
	}
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
