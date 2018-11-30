<template>
	<div class="public-footer-bar-wrap">
		<div class="public-footer-bar">
			<div class="footer-item" @click="showWallet()">
				<span class="footer-icon-wallet icon" :class="{'icon-wallet-active': activeIndex == 1}"></span>
				<span class="footer-word" :class="{active: activeIndex == 1}">我的钱包</span>
				<span class="split"></span>
			</div>
			<div class="footer-item" @click="showUserCenter">
				<span class="footer-icon-user icon" :class="{'icon-user-active': activeIndex == 2}"></span>
				<span class="footer-word" :class="{active: activeIndex == 2}">个人中心</span>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			activeIndex: 1
		};
	},
	created() {
		if (this.$route.name == 'Wallet') {
			this.activeIndex = 1;
		} else {
			this.activeIndex = 2;
		}
	},
	methods: {
		showWallet() {
			if (this.activeIndex != 1) {
				this.activeIndex = 1;
				this.$router.push('/');
			}
		},
		showUserCenter() {
			if (this.activeIndex != 2) {
				this.activeIndex = 2;
				this.$router.push('/security');
			}
		}
	}
};
</script>

<style lang="scss">
@import './index.scss';
</style>
