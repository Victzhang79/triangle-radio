<template>
	<van-popup class="dialog" v-model="value" click-overlay="closeBox">
		<div @click="closeBox" class="close"></div>
		<h2 class="dialog-title">身份认证</h2>
		<div class="dialog-body">
			<div class="sub-title">{{actionName}}前请先进行身份认证</div>
			<img src="//www.koobank.com/m/img/user_head.png" class="user-head" />
		</div>
		<div class="dialog-footer">
			<div class="submit-btn" @click="submit">立即身份认证</div>
		</div>
	</van-popup>
</template>
<script>
export default {
	props: {
		value: Boolean,
		actionName: String
	},
	data() {
		return {
			ISFALSE: false
		};
	},
	methods: {
		closeBox() {
			this.$emit('input', false);
		},
		submit() {
			location.href = '//' + location.host + '/#/identification';
		}
	}
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>