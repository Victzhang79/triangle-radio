<template>
	<van-popup class="dialog" v-model="visible">
		<div @click="visible=false" class="close"></div>
		<h3 class="dlg-title">客服QQ</h3>
		<div class="wrap">
			<div class="qr-code">
				<!-- <qrcode tag="img" :value="'http://www.trxwallet.net/userEntry#/logup/'+securityInfo.inviteCode"></qrcode> -->
				<img src="http://www.trxwallet.net/img/cs_qq.png" alt="客服微信">
			</div>
			<p class="grayText">QQ号：2679058425</p>
			<p class="btn-line">
				<button v-clipboard:copy="'2679058425'" v-clipboard:success="copyInviteLink" class="btn">复制QQ号</button>
			</p>
		</div>
	</van-popup>
</template>

<script>
// import { mapGetters } from 'vuex';
export default {
	computed: {
		// ...mapGetters(['securityInfo']),
		visible: {
			get() {
				return this.$store.state.security.contactDlgVisi;
			},
			set(value) {
				this.$store.commit('changeContactDlgVisi', value);
			}
		}
	},
	methods: {
		copyInviteLink() {
			this.$toast.success('复制成功！');
			this.visible = false;
		}
	}
};
</script>

<style lang="scss" scoped>
@import '../../../../assets/style/dialog.scss';
.qr-code {
	width: px2rem(300px);
	overflow: hidden;
	margin: px2rem(20px) auto 0;
	// border: 1px solid #979797;
	img {
		width: 100%;
		border: 1px solid #979797;
		border-radius: 8px;
	}
}
.grayText {
	text-align: center;
}
</style>
