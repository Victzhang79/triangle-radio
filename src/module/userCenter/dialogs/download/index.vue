<template>
	<van-popup class="dialog" v-model="value">
		<div @click="closeBox" class="close"></div>
		<h3 class="dlg-title">下载</h3>
		<div>
			<p class="download-title">Android下载</p>
			<div class="qrcode">
				<qrcode tag="img" value="http://www.trxwallet.net/m/userCenter#/security"></qrcode>
			</div>
			<p class="download-link"><a href="http://www.trxwallet.net/m/userCenter">http://www.trxwallet.net/m/userCenter</a></p>
			<p class="download-title">IOS下载</p>
			<div class="qrcode">
				<qrcode tag="img" value="http://www.trxwallet.net/m/userCenter#/security"></qrcode>
			</div>
			<p class="download-link"><a href="http://www.trxwallet.net/m/userCenter">http://www.trxwallet.net/m/userCenter</a></p>
		</div>
	</van-popup>
</template>

<script>
export default {
	props: {
		value: Boolean
	},

	methods: {
		closeBox() {
			this.$emit('input', false);
		}
	}
};
</script>

<style lang="scss" scoped>
@import '../../../../assets/style/dialog.scss';
@import './index.scss';
</style>
