<template>
	<van-popup class="dialog" v-model="show" @click-overlay="closeBox">
		<div @click="closeBox" class="close"></div>
		<!-- <h3 class="dlg-title">APP下载</h3> -->
		<div>
			<p class="download-title">Android下载</p>
			<div class="qrcode">
				<qrcode tag="img" value="http://www.trxwallet.net/TronWallet.apk"></qrcode>
			</div>
			<p class="download-link"><a href="http://www.trxwallet.net/TronWallet.apk">http://www.trxwallet.net/TronWallet.apk</a></p>
			<p class="download-tip">请在手机浏览器中打开链接</p>
			<p class="download-title">IOS下载</p>
			<div class="qrcode">
				<qrcode tag="img" value="itms-services://?action=download-manifest&url=https://raw.githubusercontent.com/trxwallet/ios/master/manifest.plist"></qrcode>
			</div>
			<p class="download-link"><a href="itms-services://?action=download-manifest&url=https://raw.githubusercontent.com/trxwallet/ios/master/manifest.plist">itms-services://?action=download-manifest&url=https://raw.githubusercontent.com/trxwallet/ios/master/manifest.plist</a></p>
			<p class="download-tip">请在手机浏览器中打开链接</p>
		</div>
	</van-popup>
</template>

<script>
export default {
	props: {
		value: Boolean
	},
	data() {
		return {
			show: this.value,
			duration: 1500
		};
	},
	watch: {
		value(val) {
			this.show = val;
		}
	},
	methods: {
		closeBox() {
			this.$emit('input', false);
		},
		copyLink() {
			this.$toast({
				message: '复制成功！',
				duration: this.duration
			});
		}
	}
};
</script>

<style lang="scss" scoped>
@import '../../../../assets/style/dialog.scss';
@import './index.scss';
</style>
