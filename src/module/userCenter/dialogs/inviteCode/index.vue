<template>
	<van-popup class="dialog" v-model="visible">
		<div @click="visible=false" class="close"></div>
		<h3 class="dlg-title">邀请好友</h3>
		<div class="wrap">
			<div class="qr-code">
				<qrcode tag="img" :value="'http://www.trxwallet.net/userEntry#/logup/'+securityInfo.inviteCode"></qrcode>
			</div>
			<p class="grayText invite-link">http://www.trxwallet.net/userEntry/#/logup/{{securityInfo.inviteCode}}</p>
			<p class="btn-line">
				<button v-clipboard:copy="'http://www.trxwallet.net/userEntry/#/logup/'+ securityInfo.inviteCode" v-clipboard:success="copyInviteLink" v-clipboard:error="copyError" class="btn">复制链接</button>
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
		},
		copyError() {
			this.$toast({
				message: '复制失败，请手动复制',
				duration: 1000
			});
		}
	}
};
</script>

<style lang="scss">
@import '../../../../assets/style/dialog.scss';
.invite-link {
	user-select: text;
}
</style>
