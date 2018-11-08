<template>
	<div class="navigation-bar-wrap">
		<div class="navigation-bar">
			<div class="navigation">
				<p class="backBtn">
					<span class="back-icon-wrap" @click="back()" v-show="backBtn">
						<img class="backIcon" src="../../assets/imgs/back.png" alt="back">
					</span>
				</p>
				<p class="tit">波点钱包</p>
				<p class="extendBtn"></p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		backBtn: {
			type: Boolean,
			default() {
				return true;
			}
		}
	},
	methods: {
		back() {
			window.history.go(-1);
		}
	}
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
