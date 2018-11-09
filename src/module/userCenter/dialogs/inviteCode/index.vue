<template>
	<van-popup class="dialog" v-model="visible">
		<div @click="visible=false" class="close"></div>
		<h3 class="dlg-title">邀请好友</h3>
		<div class="wrap">
			<div class="qr-code">
				<qrcode tag="img" :value="'http://www.trxwallet.net/userEntry#/logup/'+securityInfo.inviteCode"></qrcode>
			</div>
			<p class="grayText">http://www.trxwallet.net/userEntry/#/logup/{{securityInfo.inviteCode}}</p>
			<p class="btn-line">
				<button v-clipboard:copy="'http://www.trxwallet.net/userEntry/#/logup/'+ securityInfo.inviteCode" v-clipboard:success="copyInviteLink" class="btn">复制链接</button>
			</p>
		</div>
	</van-popup>
</template>

<script>
import { mapGetters } from 'vuex';
// import { modifyUserLogPass, getVeriCode4Tx } from '../../api/security.js';
// import encryptPassword from '../../../../util/rsaEncrypt'; //密码rsa加密
export default {
	computed: {
		...mapGetters(['securityInfo']),
		visible: {
			get() {
				return this.$store.state.security.inviteDlgVisi;
			},
			set(value) {
				this.$store.commit('changeInviteDlgVisi', value);
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
</style>
