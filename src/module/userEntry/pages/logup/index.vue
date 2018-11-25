<template>
	<div class="logup-page">
		<log-menu :page="'logup'"></log-menu>
		<div class="main">
			<h1 class="tit">欢迎注册</h1>
			<div class="entry-form">
				<p class="form-item">
					<span class="name">手机： </span>
					<input v-validate="validateRule.phone.validation" v-model="phone" @blur="()=>this.emptyError=''" name="phone" type="text" class="input" placeholder="请输入手机号" maxlength="11">
					<span v-show="errors.has('phone')" class="error-tip">{{ validateRule.phone.text}}</span>
				</p>
				<p class="form-item">
					<span class="name">验证码： </span>
					<input v-validate="validateRule.authCode.validation" v-model="authCode" @blur="()=>this.emptyError=''" name="authCode" type="text" class="input" placeholder="请输入手机验证码" maxlength="6">
					<span @click="getAuthCode" :class="{disable:authBtnState===0}" class="authcode">{{authBtnText}}</span>
					<span v-show="errors.has('authCode')" class="error-tip">{{ validateRule.authCode.text}}</span>
				</p>
				<p class="form-item">
					<span class="name">密码： </span>
					<input v-validate="validateRule.password.validation" v-model="password" @blur="()=>this.emptyError=''" name="password" type="password" class="input" placeholder="8-16位，由数字和字母组成">
					<span v-show="errors.has('password')" class="error-tip">{{ validateRule.password.text}}</span>
				</p>
				<p class="form-item">
					<span class="name">确认密码： </span>
					<input v-model="pwdAgain" @blur="confirmPassword" name="pwdAgain" type="password" class="input" placeholder="请再次输入密码">
					<span v-show="confirmPwdError" class="error-tip">两次输入的密码不一致</span>
				</p>
				<p class="form-item">
					<span class="name">邀请码： </span>
					<input v-model="invitationCode" type="text" class="input" placeholder="选填">
					<span v-show="emptyError" class="error-tip">{{emptyError}}不能为空</span>
				</p>
				<p class="form-btn" @click="signUp">立即注册</p>
			</div>
		</div>
	</div>
</template>

<script>
import Cookie from 'js-cookie';
import logMenu from '../../components/logMenu';
// import { mapGetters } from 'vuex';
import { getVeriCode, registeUser } from '../../apis/index'; //apis
import encryptPassword from '../../../../util/rsaEncrypt'; //密码rsa加密
export default {
	components: {
		logMenu
	},
	// computed: {
	// 	...mapGetters(['currentLanguage'])
	// },
	data() {
		return {
			phone: '',
			authCode: '',
			password: '',
			pwdAgain: '',
			invitationCode: '',
			confirmPwdError: false, // 两次输入的密码不一致
			emptyError: '',
			validateRule: {
				phone: {
					validation: {
						required: true,
						max: 11,
						regex: /^((13[0-9])|(14[5-9])|(15[0-3,5-9])|(16[5,6])|(17[2-8])|(18[0-9])|(19[8,9]))\d{8}$/
					},
					text: '号码格式错误'
				},
				authCode: {
					validation: {
						required: true,
						regex: /\d{6}/
					},
					text: '验证码格式错误'
				},
				password: {
					validation: {
						required: true,
						regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
					},
					text: '8-16位，必须包含数字和字母。'
				}
			},
			authBtnState: 0, //获取验证码按钮状态：0-不可点击，1-可点击
			authBtnText: '获取验证码',
			countDownTimmer: null //倒计时循环timmer
		};
	},
	watch: {
		phone(value) {
			if (value.length !== 11) {
				this.authBtnState = 0;
				if (this.countDownTimmer) {
					clearInterval(this.countDownTimmer);
					this.authBtnText = '获取验证码';
				}
				return false;
			}
			// 号码校验通过,获取验证码按钮可点
			if (this.validateRule.phone.validation.regex.test(value)) {
				this.authBtnState = 1;
			}
		}
	},
	created() {
		console.log('created:', this.$route.params.invateCode);
		let inviteCode = this.$route.params.invateCode;
		if (inviteCode) {
			this.invitationCode = inviteCode;
		}
	},
	methods: {
		signUp() {
			const validateErrorNum = this.errors.items.length; // 表单验证错误数
			// 表单格式校验失败
			if (validateErrorNum) {
				return false;
			}
			// 必填字段为空
			if (!this.checkEmptyError()) {
				return false;
			}
			// 两次密码不一致
			if (!this.confirmPassword()) {
				return false;
			}
			// alert('注册成功');
			registeUser(
				this.phone,
				this.authCode,
				encryptPassword(this.password),
				this.invitationCode
			)
				.then(data => {
					if (data.code === 200) {
						this.$toast('注册成功，即将跳转登录页');
						Cookie.set('userMobile', this.phone, { expires: 365 });
						this.$router.push('/');
					} else {
						this.$toast.fail(data.msg);
					}
				})
				.catch(err => {
					this.$toast.fail('网络异常，稍后重试。');
					console.log(err);
				});
		},
		// 判断两次密码是否一致
		confirmPassword() {
			this.emptyError = '';
			if (this.password !== this.pwdAgain) {
				this.confirmPwdError = true;
				return false;
			} else {
				this.confirmPwdError = false;
				return true;
			}
		},
		// 空表单校验
		checkEmptyError() {
			if (!this.phone) {
				this.emptyError = '号码';
				return false;
			}
			if (!this.authCode) {
				this.emptyError = '验证码';
				return false;
			}
			if (!this.password) {
				this.emptyError = '密码';
				return false;
			}
			if (!this.pwdAgain) {
				this.emptyError = '确认密码';
				return false;
			}
			if (!this.invitationCode) {
				this.emptyError = '邀请码';
				return false;
			}
			return true;
		},
		// 发送短信验证码
		getAuthCode() {
			if (this.authBtnState === 0) {
				return false;
			}
			this.authBtnState = 0;
			getVeriCode(this.phone)
				.then(data => {
					if (data.code === 200) {
						this.countDown();
					} else {
						this.$toast.fail('获取验证码失败：', data.msg);
						this.authBtnState = 1;
					}
				})
				.catch(() => {
					this.$toast.fail('获取验证码失败');
					this.authBtnState = 1;
				});
		},
		// 发送短信验证码按钮倒计时
		countDown() {
			let count = 60;
			this.countDownTimmer = setInterval(() => {
				if (count === 0) {
					clearInterval(this.countDownTimmer);
					this.authBtnText = '获取验证码';
					this.authBtnState = 1;
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
@import '../../assets/css/public.scss';
</style>
