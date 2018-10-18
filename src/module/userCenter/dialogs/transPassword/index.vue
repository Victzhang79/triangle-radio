<template>
	<el-dialog class="dialog" width="520px" title="" :visible.sync="visible">
		<h3 class="dlg-title">设置资金密码</h3>
		<p class="warnInfo">警告：资金密码不要与登录密码或者其他密码一致，由此产生的号码被盗，本站概不负责。</p>
		<el-form :model="ruleForm" :rules="rules" :inline="false" ref="setTranPasswordForm" label-position="top" class="demo-ruleForm wrap">
			<el-form-item label="手机">
				<el-input v-model="securityInfo.userMobile" placeholder="请输入手机号" disabled></el-input>
			</el-form-item>
			<el-form-item label="验证码" prop="authCode">
				<el-input class="authCode" v-model="ruleForm.authCode" placeholder="请输入验证码">
					<el-button style="width:118px" @click="getAuthCode" slot="append" class="authBtn" :disabled="!authBtnState">{{authBtnText}}</el-button>
				</el-input>
			</el-form-item>
			<el-form-item label="资金密码" prop="transPassword">
				<el-input type="password" v-model="ruleForm.transPassword" placeholder="请输入新密码">
					<template slot="prepend"><img src="../../assets/imgs/lock.png" style="padding-top:4px;"></template>
				</el-input>
			</el-form-item>
			<el-form-item label="确认密码" prop="repeatPassword">
				<el-input type="password" v-model="ruleForm.repeatPassword" placeholder="请再次确认密码">
					<template slot="prepend"><img src="../../assets/imgs/lock.png" style="padding-top:4px;"></template>
				</el-input>
			</el-form-item>
			<el-form-item class="btn-line">
				<el-button @click="setPassword('setTranPasswordForm')" class="btn" type="primary" round>提交</el-button>
			</el-form-item>
		</el-form>
	</el-dialog>
</template>

<script>
import { mapGetters } from 'vuex';
import { setTransPass, getVeriCode4Tx } from '../../api/security.js';
import encryptPassword from '../../../../util/rsaEncrypt'; //密码rsa加密
export default {
	data() {
		const repeatPassValidator = (rule, value, callback) => {
			if (value !== this.ruleForm.transPassword) {
				callback(new Error('两次输入密码不一致!'));
			} else {
				callback();
			}
		};
		return {
			ruleForm: {
				phone: '',
				authCode: '',
				transPassword: '',
				repeatPassword: ''
			},
			rules: {
				// phone: [
				// 	{
				// 		required: true,
				// 		message: '请输入号码',
				// 		trigger: 'blur'
				// 	},
				// 	{
				// 		pattern: /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/,
				// 		message: '号码格式不正确',
				// 		trigger: 'blur'
				// 	}
				// ],
				authCode: [
					{
						required: true,
						message: '请输入验证码',
						trigger: 'blur'
					},
					{
						pattern: /^\d{6}$/,
						message: '验证码格式不正确',
						trigger: 'blur'
					}
				],
				transPassword: [
					{
						required: true,
						message: '请输入新密码',
						trigger: 'blur'
					},
					{
						pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
						message:
							'8-16位，由数字和字母组成，不能全是数字或全是字母。',
						trigger: 'blur'
					}
				],
				repeatPassword: [
					{
						required: true,
						message: '请再次输入密码',
						trigger: 'blur'
					},
					{
						validator: repeatPassValidator,
						trigger: 'blur'
					}
				]
			},
			authBtnState: true, //获取验证码按钮状态：false-不可点击，true-可点击
			authBtnText: '获取验证码',
			countDownTimmer: null //倒计时循环timmer
		};
	},
	computed: {
		...mapGetters(['securityInfo']),
		visible: {
			get() {
				return this.$store.state.security.setTransPwdDlgVisi;
			},
			set(value) {
				this.$store.commit('changeSetTransPwdDlgVisi', value);
			}
		}
	},
	methods: {
		setPassword(formName) {
			this.$refs[formName].validate(valid => {
				if (!valid) {
					return false;
				}
				setTransPass(
					// this.ruleForm.phone,
					this.ruleForm.authCode,
					encryptPassword(this.ruleForm.transPassword)
				)
					.then(data => {
						if (data.code === 200) {
							this.$message({
								message: '密码设置成功！',
								type: 'success'
							});
							this.visible = false;
						} else {
							this.$message.error(data.msg);
						}
					})
					.catch(err => {
						this.$message.error('设置失败，稍后重试。');
					});
			});
		},
		// 发送短信验证码
		getAuthCode() {
			if (!this.authBtnState) {
				return false;
			}
			getVeriCode4Tx().then(data => {
				console.log(data);
				if (data.code === 200) {
					this.countDown();
				}
			});
		},
		// 发送短信验证码按钮倒计时
		countDown() {
			this.authBtnState = false;
			let count = 60;
			this.countDownTimmer = setInterval(() => {
				if (count === 0) {
					clearInterval(this.countDownTimmer);
					this.authBtnText = '获取验证码';
					this.authBtnState = true;
					return false;
				}
				this.authBtnText = count + '秒后重试';
				count--;
			}, 1000);
		}
	}
};
</script>

<style lang="scss" scoped>
@import '../../../../assets/style/dialog.scss';
</style>
