<template>
	<el-dialog class="dialog" width="520px" title="" :visible.sync="visible">
		<h3 class="dlg-title">change login password</h3>
		<el-form :model="ruleForm" :rules="rules" :inline="false" ref="resetPasswordForm" label-position="top" class="demo-ruleForm wrap">
			<el-form-item label="phone" prop="phone">
				<el-input v-model="ruleForm.phone" placeholder="Input your phone number"></el-input>
			</el-form-item>
			<el-form-item label="SMS verification" prop="authCode">
				<el-input class="authCode" v-model="ruleForm.authCode" placeholder="Input the SMS verification code">
					<el-button style="width:118px" @click="getAuthCode" slot="append" class="authBtn" :disabled="!authBtnState">{{authBtnText}}</el-button>
				</el-input>
			</el-form-item>
			<el-form-item label="old password" prop="oldPassword">
				<el-input type="password" v-model="ruleForm.oldPassword" placeholder="Input your current password">
					<template slot="prepend"><img src="../../assets/imgs/lock.png" style="padding-top:4px;"></template>
				</el-input>
			</el-form-item>
			<el-form-item label="new password" prop="newPassword">
				<el-input type="password" v-model="ruleForm.newPassword" placeholder="Input your new password">
					<template slot="prepend"><img src="../../assets/imgs/lock.png" style="padding-top:4px;"></template>
				</el-input>
			</el-form-item>
			<el-form-item label="repeat password" prop="repeatPassword">
				<el-input type="password" v-model="ruleForm.repeatPassword" placeholder="Input your new password again">
					<template slot="prepend"><img src="../../assets/imgs/lock.png" style="padding-top:4px;"></template>
				</el-input>
			</el-form-item>
			<el-form-item class="btn-line">
				<el-button @click="setPassword('resetPasswordForm')" class="btn" type="primary" round>submit</el-button>
			</el-form-item>
		</el-form>
	</el-dialog>
</template>

<script>
import { mapGetters } from 'vuex';
import { modifyUserLogPass, getVeriCode } from '../../api/security.js';
import encryptPassword from '../../../../util/rsaEncrypt'; //密码rsa加密
export default {
	data() {
		const repeatPassValidator = (rule, value, callback) => {
			if (value !== this.ruleForm.newPassword) {
				callback(
					new Error('The password input again is inconsistent.')
				);
			} else {
				callback();
			}
		};
		const newPassValidator = (rule, value, callback) => {
			if (value === this.ruleForm.oldPassword) {
				callback(new Error('不能与旧密码一致!'));
			} else {
				callback();
			}
		};
		return {
			ruleForm: {
				phone: '',
				authCode: '',
				oldPassword: '',
				newPassword: '',
				repeatPassword: ''
			},
			rules: {
				phone: [
					{
						required: true,
						message: 'Phone number is required',
						trigger: 'blur'
					},
					{
						pattern: /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/,
						message: 'Error in number format.',
						trigger: 'blur'
					}
				],
				authCode: [
					{
						required: true,
						message: 'SMS verification code is required.',
						trigger: 'blur'
					},
					{
						pattern: /^\d{6}$/,
						message: 'Error in SMS verification code format.',
						trigger: 'blur'
					}
				],
				oldPassword: [
					{
						required: true,
						message: 'Old password shold not be empty.',
						trigger: 'blur'
					},
					{
						pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
						message: 'Error in password format.',
						trigger: 'blur'
					}
				],
				newPassword: [
					{
						required: true,
						message: 'New please is required.',
						trigger: 'blur'
					},
					{
						pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
						message:
							'8-16 characters,contain both letters and numbers.',
						trigger: 'blur'
					},
					{
						validator: newPassValidator,
						trigger: 'blur'
					}
				],
				repeatPassword: [
					{
						required: true,
						message: 'Please input your new password again.',
						trigger: 'blur'
					},
					{
						validator: repeatPassValidator,
						trigger: 'blur'
					}
				]
			},
			authBtnState: true, //获取验证码按钮状态：false-不可点击，true-可点击
			authBtnText: 'get code',
			countDownTimmer: null //倒计时循环timmer
		};
	},
	computed: {
		visible: {
			get() {
				return this.$store.state.security.modifyLogPwdDlgVisi;
			},
			set(value) {
				this.$store.commit('changeModifyLogPwdDlgVisi', value);
			}
		}
	},
	methods: {
		setPassword(formName) {
			this.$refs[formName].validate(valid => {
				if (!valid) {
					return false;
				}
				modifyUserLogPass(
					this.ruleForm.phone,
					this.ruleForm.authCode,
					encryptPassword(this.ruleForm.oldPassword),
					encryptPassword(this.ruleForm.newPassword)
				)
					.then(data => {
						if (data.code === 200) {
							this.$message({
								message:
									'The new password establishes the success.',
								type: 'success'
							});
							this.visible = false;
						} else {
							this.$message.error(data.msg);
						}
					})
					.catch(err => {
						this.$message.error('Failed,please try again later.');
					});
			});
		},
		// 发送短信验证码
		getAuthCode() {
			if (!this.authBtnState) {
				return false;
			}
			if (
				!/^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/.test(
					this.ruleForm.phone
				)
			) {
				return false;
			}
			getVeriCode(this.ruleForm.phone).then(data => {
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
					this.authBtnText = 'get code';
					this.authBtnState = true;
					return false;
				}
				this.authBtnText = count + 's later';
				count--;
			}, 1000);
		}
	}
};
</script>

<style lang="scss" scoped>
@import '../../../../assets/style/dialog.scss';
</style>
