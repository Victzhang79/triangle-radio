<template>
	<div class="public-footer-bar-wrap">
		<div class="public-footer-bar">
			<div class="footer-item" @click="showWallet()">
				<p class="icon-wrap">
					<span class="footer-icon-wallet icon" :class="{'icon-wallet-active': activeIndex == 1}"></span>
				</p>
				<span class="footer-word" :class="{active: activeIndex == 1}">我的钱包</span>
				<!-- <span class="split"></span> -->
			</div>
			<div class="footer-item" @click="showFindPage">
				<p class="icon-wrap">
					<span class="footer-icon-find icon" :class="{'icon-find-active': activeIndex == 3}"></span>
				</p>
				<p class="footer-word" :class="{active: activeIndex == 3}">发现</p>
			</div>
			<div class="footer-item" @click="showUserCenter">
				<p class="icon-wrap">
					<span class="footer-icon-user icon" :class="{'icon-user-active': activeIndex == 2}"></span>
				</p>
				<p class="footer-word" :class="{active: activeIndex == 2}">个人中心</p>
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
		} else if(this.$route.name == 'SecuritySetting') {
			this.activeIndex = 2;
		} else {
			this.activeIndex = 3;
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
		},
		showFindPage() {
			if (this.activeIndex != 3) {
				this.activeIndex = 3;
				this.$router.push('/find');
			}
		}
	}
};
</script>

<style lang="scss">
@import './index.scss';
</style>
