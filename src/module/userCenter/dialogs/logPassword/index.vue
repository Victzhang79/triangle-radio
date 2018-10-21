<template>
	<van-popup class="dialog" v-model="visible">
		<div @click="visible=false" class="close"></div>
		<h3 class="dlg-title">修改登录密码</h3>
		<div class="demo-ruleForm wrap">
			<label>
				<p class="labelTit">手机</p>
				<input v-model="securityInfo.userMobile" placeholder="请输入手机号" disabled>
			</label>
			<label>
				<p class="labelTit">验证码</p>
				<input v-validate="rules.authCode.validation" class="authCode" v-model="ruleForm.authCode" placeholder="请输入验证码" name="authCode">
				<button class="authBtn" @click="getAuthCode" :class="{disabled:!authBtnState}">{{authBtnText}}</button>
				<span v-show="errors.has('authCode')" class="error-tip">{{ rules.authCode.text}}</span>
			</label>
			<label>
				<p class="labelTit">旧密码</p>
				<input v-validate="rules.oldPassword.validation" type="password" v-model="ruleForm.oldPassword" placeholder="输入当前密码" name="oldPassword">
				<span v-show="errors.has('oldPassword')" class="error-tip">{{ rules.oldPassword.text}}</span>
			</label>
			<label>
				<p class="labelTit">新密码</p>
				<input v-validate="rules.newPassword.validation" type="password" v-model="ruleForm.newPassword" placeholder="请输入新密码" name="newPassword" ref="newPassword">
				<span v-show="errors.has('newPassword')" class="error-tip">{{rules.newPassword.text}}</span>
			</label>
			<label>
				<p class="labelTit">确认密码</p>
				<input v-validate="rules.repeatPassword.validation" type="password" v-model="ruleForm.repeatPassword" placeholder="请再次确认密码" name="repeatPassword" data-vv-as="newPassword">
				<span v-show="ruleForm.repeatPassword&&errors.has('repeatPassword')" class="error-tip">{{rules.repeatPassword.text}}</span>
			</label>
			<p class="btn-line">
				<button @click="setPassword" class="btn">提交</button>
			</p>
		</div>
	</van-popup>
</template>

<script>
import { mapGetters } from 'vuex';
import { modifyUserLogPass, getVeriCode4Tx } from '../../api/security.js';
import encryptPassword from '../../../../util/rsaEncrypt'; //密码rsa加密
export default {
	data() {
		const repeatPassValidator = (rule, value, callback) => {
			if (value !== this.ruleForm.newPassword) {
				callback(new Error('两次输入密码不一致!'));
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
				authCode: {
					validation: {
						required: true,
						regex: /^\d{6}$/
					},
					text: '验证码格式错误'
				},
				oldPassword: {
					validation: {
						required: true,
						regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
					},
					text: '密码格式不正确。'
				},
				newPassword: {
					validation: {
						required: true,
						regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
					},
					text: '8-16位，必须包含数字和字母。'
				},
				repeatPassword: {
					validation: {
						required: true,
						confirmed: 'newPassword'
					},
					text: '两次密码不一致。'
				}
			},
			authBtnState: true, //获取验证码按钮状态：false-不可点击，true-可点击
			authBtnText: '获取验证码',
			confirmPwdError: false, // 两次输入的密码不一致
			countDownTimmer: null //倒计时循环timmer
		};
	},
	computed: {
		...mapGetters(['securityInfo']),
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
		setPassword() {
			this.$validator.validateAll().then(result => {
				if (result) {
					if (
						this.ruleForm.oldPassword === this.ruleForm.newPassword
					) {
						this.$toast.fail('新密码与旧密码相同。');
						return false;
					}
					modifyUserLogPass(
						// this.ruleForm.phone,
						this.ruleForm.authCode,
						encryptPassword(this.ruleForm.oldPassword),
						encryptPassword(this.ruleForm.newPassword)
					)
						.then(data => {
							if (data.code === 200) {
								this.$toast({
									message: '密码设置成功！',
									type: 'success'
								});
								this.visible = false;
							} else {
								this.$toast.fail(data.msg);
							}
						})
						.catch(err => {
							this.$toast.fail('设置失败，稍后重试。');
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
