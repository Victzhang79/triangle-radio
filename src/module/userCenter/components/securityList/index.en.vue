<template>
	<div class="security-list">
		<div class="userInfo clear">
			<p class="hello fl">{{helloTime + ','+ securityInfo.userMobile}}</p>
			<p class="lastLogTime fl">Last login time:{{securityInfo.lastLogTime}}</p>
			<p class="lastLogIp fl">Last login Ip:{{securityInfo.lastLogIp}}</p>
		</div>
		<ul class="list">
			<li class="item">
				<img class="icon" src="../../assets/imgs/icon-user.png">
				<span class="txt">Username:
					<em>{{securityInfo.userMobile}}</em>
				</span>
			</li>
			<li class="item">
				<img class="icon" src="../../assets/imgs/icon-email.png">
				<span class="txt">Safe mailbox:
					<em>{{securityInfo.emailStatus=='1'?'Authenticated':'Unauthorized'}}</em>
				</span>
				<el-button @click="setSafeEmail" class="btn fr" disabled plain>Authenticate</el-button>
			</li>
			<li class="item">
				<img class="icon" src="../../assets/imgs/icon-key.png">
				<span class="txt">Login password:
					<em>{{securityInfo.logPassStatus=='1'?'Unset':'Have set'}}</em>
				</span>
				<el-button @click="setLogPassword" class="btn fr" plain>{{securityInfo.logPassStatus!='1'?'Set':'Reset'}}</el-button>
				<p class="progess-group">
					<span>Security level:</span>
					<el-progress class="progess" :percentage="securityInfo.logPassLevel==1?33:securityInfo.logPassLevel==2?66:100" :show-text="false" :stroke-width="7" color="#FC8282"></el-progress>
				</p>
			</li>
			<li class="item">
				<img class="icon" src="../../assets/imgs/icon-key.png">
				<span class="txt">Capital password:
					<em>{{securityInfo.transPassStatus=='1'?'Have set':'Unset'}}</em>
				</span>
				<el-button @click="setTransPassword" class="btn fr" plain>{{securityInfo.transPassStatus!='1'?'Set':'Reset'}}</el-button>
				<p class="progess-group">
					<span>Security level:</span>
					<el-progress class="progess" :percentage="securityInfo.transPassLevel=='1'?33:securityInfo.transPassLevel=='2'?66:100" :show-text="false" :stroke-width="7" color="#FC8282"></el-progress>
				</p>
			</li>
			<li class="item">
				<img class="icon" src="../../assets/imgs/icon-phone.png">
				<span class="txt">Google payment validation:
					<em class="warn">{{securityInfo.googleValidStatus=='1'?'Open':'Closed'}}</em>
				</span>
				<el-button class="btn fr" :disabled="securityInfo.googleValidStatus!='1'" plain>Authenticate</el-button>
			</li>
		</ul>
		<safe-email-dialog></safe-email-dialog>
		<log-password-dialog></log-password-dialog>
		<trans-password-dialog></trans-password-dialog>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import safeEmailDialog from '../../dialogs/safeEmail';
import logPasswordDialog from '../../dialogs/logPassword/index.en';
import transPasswordDialog from '../../dialogs/transPassword/index.en';
export default {
	computed: {
		...mapGetters(['securityInfo'])
	},
	data() {
		return {
			helloTime:
				new Date().getHours() < 12
					? 'Good morning'
					: new Date().getHours() < 19
						? 'Good afternoon'
						: 'Good evening'
		};
	},
	methods: {
		setSafeEmail() {
			this.$store.commit('changeSafeEmailDlgVisi', true);
		},
		setLogPassword() {
			this.$store.commit('changeModifyLogPwdDlgVisi', true);
		},
		setTransPassword() {
			this.$store.commit('changeSetTransPwdDlgVisi', true);
		}
	},
	components: {
		safeEmailDialog,
		logPasswordDialog,
		transPasswordDialog
	}
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
