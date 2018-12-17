<template>
	<div class="download-page">
		<div v-if="wechatPlatfrom" class="guider">
			<img class="arrow" src="../../assets/imgs/arrow.png" alt="">
			<dl>
				<dt>去浏览器中下载：</dt>
				<dd>1.点击右上角<img src="../../assets/imgs/more.png" alt="..."></dd>
				<dd>2.点击“在{{isIos?'Safari':'浏览器'}}中打开”</dd>
			</dl>
		</div>
		<div class="banner">
			<div class="logo"><img src="../../../../assets/imgs/logo.png" alt="tron"></div>
			<div class="banner-title">TRON</div>
			<div class="banner-text">版本： V3.5.1</div>
		</div>
		<p class="intro">大家都在用的安全钱包！点击按钮下载。</p>
		<a href="http://www.trxwallet.net/TronWallet.apk" class="down-btn">Android下载</a>
		<a href="itms-services://?action=download-manifest&url=https://raw.githubusercontent.com/trxwallet/ios/master/manifest.plist" class="down-btn">Iphone下载</a>
	</div>
</template>

<script>
export default {
	data() {
		return {
			// wechatPlatfrom: true,
			wechatPlatfrom: navigator.userAgent.toLowerCase().match(/micromessenger/i) == 'micromessenger' ? true : false,
			isIos: navigator.userAgent.toLowerCase().match(/iphone/i) == 'iphone' ? true : false
		}
	}
}
</script>

<style lang="scss">
@import "~@/assets/style/public.scss";
@import "./index.scss";
</style>
