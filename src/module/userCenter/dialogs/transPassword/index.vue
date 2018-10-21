<template>
	<van-popup class="dialog" v-model="visible">
		<div @click="visible=false" class="close"></div>
		<h3 class="dlg-title">设置资金密码</h3>
		<p class="warnInfo">警告：资金密码不要与登录密码或者其他密码一致，由此产生的号码被盗，本站概不负责。</p>
		<div class="demo-ruleForm wrap">
			<label>
				<p class="labelTit">手机</p>
				<input v-model="securityInfo.userMobile" placeholder="请输入手机号" disabled>
			</label>
			<label>
				<p class="labelTit">验证码</p>
				<input v-validate="rules.authCode.validation" class="authCode" v-model="ruleForm.authCode" placeholder="请输入验证码" name="authCode">
				<button @click="getAuthCode" slot="append" class="authBtn" :class="{disabled:!authBtnState}">{{authBtnText}}</button>
				<span v-show="errors.has('authCode')" class="error-tip">{{ rules.authCode.text}}</span>
			</label>
			<label>
				<p class="labelTit">资金密码</p>
				<input v-validate="rules.transPassword.validation" type="password" v-model="ruleForm.transPassword" placeholder="请设置资金密码" name="transPassword" ref="transPassword">
				<span v-show="errors.has('transPassword')" class="error-tip">{{ rules.transPassword.text}}</span>
			</label>
			<label>
				<p class="labelTit">确认密码</p>
				<input v-validate="rules.repeatPassword.validation" type="password" v-model="ruleForm.repeatPassword" placeholder="请再次确认密码" name="repeatPassword" data-vv-as="transPassword">
				<span v-show="ruleForm.repeatPassword&&errors.has('repeatPassword')" class="error-tip">{{rules.repeatPassword.text}}</span>
			</label>
			<p class="btn-line">
				<button @click="setPassword('setTranPasswordForm')" class="btn" type="primary" round>提交</button>
			</p>
		</div>
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
				authCode: {
					validation: {
						required: true,
						regex: /^\d{6}$/
					},
					text: '验证码格式错误'
				},
				transPassword: {
					validation: {
						required: true,
						regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
					},
					text: '8-16位，必须包含数字和字母。'
				},
				repeatPassword: {
					validation: {
						required: true,
						confirmed: 'transPassword'
					},
					text: '两次密码不一致。'
				}
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
			// this.$refs[formName].validate(valid => {
			// 	if (!valid) {
			// 		return false;
			// 	}
			this.$validator.validateAll().then(result => {
				if (result) {
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
				}
			});
		},
		// 发送短信验证码
		getAuthCode() {
			if (!this.authBtnState) {
				return false;
			}
			this.authBtnState = false;
			getVeriCode4Tx()
				.then(data => {
					if (data.code === 200) {
						this.countDown();
					} else {
						this.$toast.fail('获取验证码失败：', data.msg);
						this.authBtnState = true;
					}
				})
				.catch(() => {
					this.$toast.fail('获取验证码失败');
				});
		},
		// 发送短信验证码按钮倒计时
		countDown() {
			// this.authBtnState = false;
			let count = 60;
			this.authBtnText = count + '秒后重试';
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
