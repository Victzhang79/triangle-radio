<template>
	<div class="security-list">
		<div class="userInfo-wrap">
			<img class="logo" src="~@/assets/imgs/logo.png" alt="波点钱包">
		</div>

		<ul class="list">
			<li class="item">
				<span class="txt">用户名：
					<em>{{securityInfo.userMobile}}</em>
				</span>
			</li>
			<li class="item">
				<span class="txt">登录密码：
					<em>{{securityInfo.logPassStatus=='1'?'已设置':'未设置'}}</em>
				</span>
				<button @click="setLogPassword" class="btn fr" plain>{{securityInfo.logPassStatus!='1'?'设置':'修改'}}</button>
			</li>
			<li class="item">
				<span class="txt">资金密码：
					<em>{{securityInfo.transPassStatus=='1'?'已设置':'未设置'}}</em>
				</span>
				<button @click="setTransPassword" class="btn fr" plain>{{securityInfo.transPassStatus!='1'?'设置':'修改'}}</button>
			</li>
			<li class="item">
				<span class="txt">身份认证：
					<em>{{identiStateInfo[identiStatus]}}</em>
				</span>
				<button @click="identify" class="btn fr" :class="{disabled: identiStatus==='1'||identiStatus==='3'||identiStatus==='4'}" plain>认证</button>
			</li>
			<li class="item carve">
				<span class="txt">邀请返佣：
					<em>邀请码{{securityInfo.inviteCode}}</em>
				</span>
				<button @click="invite()" class="btn fr" plain>邀请</button>
			</li>
			<li class="item" @click="showAchievement">
				<span class="txt">总业绩
				</span>
				<button class="btn fr" plain>查看</button>
			</li>
			<li class="item" @click="showDownload">
				<span class="txt">下载APP
				</span>
				<button class="btn fr" plain>下载</button>
			</li>
			<li class="item carve" @click="logout">
				<p class="fullTxt">退出</p>
			</li>
		</ul>
		<log-password-dialog></log-password-dialog>
		<trans-password-dialog></trans-password-dialog>
		<invite-code-dialog></invite-code-dialog>
		<download-dialog v-model="showDownloadDialog"></download-dialog>
		<achievement-dialog v-model="showAchievementDialog"></achievement-dialog>
		<contact-us-dialog></contact-us-dialog>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
// import safeEmailDialog from '../../dialogs/safeEmail';
import logPasswordDialog from '../../dialogs/logPassword';
import transPasswordDialog from '../../dialogs/transPassword';
import inviteCodeDialog from '../../dialogs/inviteCode';
import downloadDialog from '../../dialogs/download';
import achievementDialog from '../../dialogs/achievementDialog';
import contactUsDialog from '../../dialogs/contactUs';
import Cookie from 'js-cookie';
export default {
	computed: {
		...mapGetters(['securityInfo', 'identiStatus'])
	},
	data() {
		return {
			helloTime:
				new Date().getHours() < 12
					? '上午好'
					: new Date().getHours() < 19
						? '下午好'
						: '晚上好',
			lastLogIp: '',
			lastLogTime: '',
			identiStateInfo: [
				'未认证',
				'认证通过',
				'认证失败',
				'审核中',
				'网络异常'
			],
			showDownloadDialog: false,
			showAchievementDialog: false
		};
	},
	// created() {
	// this.lastLogIp = Cookie.get('lastLogIp');
	// this.lastLogTime = Cookie.get('lastLogTime');
	// },
	methods: {
		// setSafeEmail() {
		// 	this.$store.commit('changeSafeEmailDlgVisi', true);
		// },
		setLogPassword() {
			this.$store.commit('changeModifyLogPwdDlgVisi', true);
		},
		setTransPassword() {
			this.$store.commit('changeSetTransPwdDlgVisi', true);
		},
		invite() {
			console.log('邀请码：', this.securityInfo.inviteCode);
			this.$store.commit('changeInviteDlgVisi', true);
		},
		identify() {
			if (
				this.identiStatus === '1' ||
				this.identiStatus === '3' ||
				this.identiStatus === '4'
			) {
				return false;
			}
			this.$router.push('/identification');
		},
		showDownload() {
			this.showDownloadDialog = true;
		},
		showAchievement() {
			this.showAchievementDialog = true;
		},
		logout() {
			Cookie.remove('token');
			window.location.href =
				window.location.protocol +
				'//' +
				window.location.host +
				'/userEntry';
		}
	},
	components: {
		// safeEmailDialog,
		logPasswordDialog,
		transPasswordDialog,
		inviteCodeDialog,
		downloadDialog,
		achievementDialog,
		contactUsDialog
	}
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
