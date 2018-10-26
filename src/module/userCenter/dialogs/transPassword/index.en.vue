<template>
	<van-popup class="dialog" v-model="visible">
		<div @click="visible=false" class="close"></div>
		<h3 class="dlg-title">Set capital password</h3>
		<p class="warnInfo">Notice: The fund password should not be consistent with the login password or other passwords.</p>
		<el-form :model="ruleForm" :rules="rules" :inline="false" ref="setTranPasswordForm" label-position="top" class="demo-ruleForm wrap">
			<el-form-item label="phone">
				<el-input v-model="securityInfo.userMobile" placeholder="Input your phone number" disabled></el-input>
			</el-form-item>
			<el-form-item label="SMS verification" prop="authCode">
				<el-input class="authCode" v-model="ruleForm.authCode" placeholder="Input the SMS verification code">
					<el-button style="width:118px" @click="getAuthCode" slot="append" class="authBtn" :disabled="!authBtnState">{{authBtnText}}</el-button>
				</el-input>
			</el-form-item>
			<el-form-item label="Capital password" prop="transPassword">
				<el-input type="password" v-model="ruleForm.transPassword" placeholder="Input your capital password">
					<template slot="prepend"><img src="../../assets/imgs/lock.png" style="padding-top:4px;"></template>
				</el-input>
			</el-form-item>
			<el-form-item label="repeat password" prop="repeatPassword">
				<el-input type="password" v-model="ruleForm.repeatPassword" placeholder="Input your capital password again">
					<template slot="prepend"><img src="../../assets/imgs/lock.png" style="padding-top:4px;"></template>
				</el-input>
			</el-form-item>
			<el-form-item class="btn-line">
				<el-button @click="setPassword('setTranPasswordForm')" class="btn" type="primary" round>submit</el-button>
			</el-form-item>
		</el-form>
	</van-popup>
</template>

<script>
import { mapGetters } from 'vuex';
import { setTransPass, getVeriCode4Tx } from '../../api/security.js';
import encryptPassword from '../../../../util/rsaEncrypt'; //密码rsa加密
export default {
	data() {
		const repeatPassValidator = (rule, value, callback) => {
			if (value !== this.ruleForm.transPassword) {
				callback(
					new Error('The password input again is inconsistent.')
				);
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
				// 		message: 'Phone number is required',
				// 		trigger: 'blur'
				// 	},
				// 	{
				// 		pattern: /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/,
				// 		message: 'Error in number format.',
				// 		trigger: 'blur'
				// 	}
				// ],
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
				transPassword: [
					{
						required: true,
						message: 'Capital please is required.',
						trigger: 'blur'
					},
					{
						pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
						message:
							'8-16 characters,contain both letters and numbers.',
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
							this.$toast(
								'Capital password establishes the success.'
							);
							this.visible = false;
						} else {
							this.$toast.fail(data.msg);
						}
					})
					.catch(err => {
						this.$toast.fail('Failed,please try again later.');
					});
			});
		},
		// 发送短信验证码
		getAuthCode() {
			if (!this.authBtnState) {
				return false;
			}
			// if (
			// 	!/^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/.test(
			// 		this.ruleForm.phone
			// 	)
			// ) {
			// 	return false;
			// }
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
