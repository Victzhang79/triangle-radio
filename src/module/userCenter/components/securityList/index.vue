<template>
	<div class="security-list">
		<div class="userInfo-wrap">
			<div class="userInfo clear">
				<p class="hello fl">{{helloTime + '，'+ securityInfo.userMobile}}</p>
				<p class="lastLogTime fl">上次登录时间：{{lastLogTime}}</p>
				<p class="lastLogIp fl">上次登录IP：{{lastLogIp}}</p>
			</div>
		</div>

		<ul class="list">
			<li class="item">
				<img class="icon" src="../../assets/imgs/icon-user.png">
				<span class="txt">用户名：
					<em>{{securityInfo.userMobile}}</em>
				</span>
			</li>
			<li class="item">
				<img class="icon" src="../../assets/imgs/icon-email.png">
				<span class="txt">安全邮箱：
					<em>{{securityInfo.emailStatus=='1'?'已认证':'未认证'}}</em>
				</span>
				<button @click="setSafeEmail" class="btn fr disabled" disabled plain>认证</button>
			</li>
			<li class="item password">
				<img class="icon" src="../../assets/imgs/icon-key.png">
				<span class="txt">登录密码：
					<em>{{securityInfo.logPassStatus=='1'?'已设置':'未设置'}}</em>
				</span>
				<button @click="setLogPassword" class="btn fr" plain>{{securityInfo.logPassStatus!='1'?'设置':'修改'}}</button>
				<p class="progess-group">
					<span>安全级别：</span>
					<van-progress class="progess" :percentage="securityInfo.logPassLevel==1?33:securityInfo.logPassLevel==2?66:securityInfo.logPassLevel==3?100:0" :show-pivot="false" color="#FC8282" />
				</p>
			</li>
			<li class="item password">
				<img class="icon" src="../../assets/imgs/icon-key.png">
				<span class="txt">资金密码：
					<em>{{securityInfo.transPassStatus=='1'?'已设置':'未设置'}}</em>
				</span>
				<button @click="setTransPassword" class="btn fr" plain>{{securityInfo.transPassStatus!='1'?'设置':'修改'}}</button>
				<p class="progess-group">
					<span>安全级别：</span>
					<van-progress class="progess" :percentage="securityInfo.transPassLevel=='1'?33:securityInfo.transPassLevel=='2'?66:securityInfo.logPassLevel=='3'?100:0" :show-pivot="false" color="#FC8282" />
				</p>
			</li>
			<li class="item">
				<img class="icon" src="../../assets/imgs/icon-phone.png">
				<span class="txt">支付Google验证：
					<em class="warn">{{securityInfo.googleValidStatus=='1'?'已开启':'已关闭'}}</em>
				</span>
				<button class="btn fr disabled" :disabled="securityInfo.googleValidStatus!='1'" plain>验证</button>
			</li>
		</ul>
		<!-- <safe-email-dialog></safe-email-dialog> -->
		<log-password-dialog></log-password-dialog>
		<!-- <trans-password-dialog></trans-password-dialog> -->
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import safeEmailDialog from '../../dialogs/safeEmail';
import logPasswordDialog from '../../dialogs/logPassword';
import transPasswordDialog from '../../dialogs/transPassword';
import Cookie from 'js-cookie';
export default {
	computed: {
		...mapGetters(['securityInfo'])
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
			lastLogTime: ''
		};
	},
	created() {
		this.lastLogIp = Cookie.get('lastLogIp');
		this.lastLogTime = Cookie.get('lastLogTime');
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
