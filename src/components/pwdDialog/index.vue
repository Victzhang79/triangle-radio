<template>
	<van-popup class="dialog" v-model="show" click-overlay="closeBox">
		<div @click="closeBox" class="close"></div>
		<h2 class="title">交易密码</h2>
		<div class="demo-ruleForm wrap">
			<label>
				<p class="labelTit">交易密码：</p>
				<input type="password" v-validate="rules.transPass.validation" v-model="pageForm.transPass" placeholder="请输入交易密码" name="transPass">
				<span v-show="errors.has('transPass')" class="error-tip">{{ rules.transPass.text}}</span>
			</label>
			<label>
				<p class="labelTit">验证码：</p>
				<input class="authCode" maxlength="6" v-validate="rules.veriCode.validation" v-model="pageForm.veriCode" placeholder="请输入验证码" name="veriCode">
				<button class="authBtn" @click="sendCheckcode" :class="{disabled:hasSend}">{{sendCodeText}}</button>
				<span v-show="errors.has('veriCode')" class="error-tip">{{ rules.veriCode.text}}</span>
			</label>
			<p class="input-tip">
				<span class="link-span" @click="gotoSetPwd">设置密码</span>
			</p>
			<p class="btn-line">
				<button @click="submit()" class="btn">{{submitBtnText}}</button>
			</p>
		</div>
	</van-popup>
</template>

<script>
import Api from './api';
import rsaEncrypt from '../../util/rsaEncrypt'; //密码rsa加密
export default {
	props: {
		value: Boolean,
		submitBtnText: String
	},
	data() {
		return {
			title: '交易密码',
			show: this.value,
			ISFALSE: false,
			sendCodeText: '获取验证码',
			pageForm: {
				transPass: '',
				veriCode: ''
			},
			rules: {
				transPass: {
					validation: {
						required: true,
						regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
					},
					text: '8-16位，必须包含数字和字母。'
				},
				veriCode: {
					validation: {
						required: true,
						regex: /^\d{6}$/
					},
					text: '验证码格式错误'
				}
			},
			hasSend: false,
			duration: 1500
		};
	},
	watch: {
		value(val) {
			this.show = val;
			if (val) {
				Api.getVeriStatus().then(res => {
					if (res.code == 200) {
						let veriStatus = res.data;
						if (veriStatus == '1') {
							this.closeBox();
							this.$emit('submit');
							return false;
						}
					}
					this.pageForm = {
						transPass: '',
						veriCode: ''
					};
				});
			}
		}
	},
	methods: {
		closeBox() {
			this.$emit('input', false);
		},
		gotoSetPwd() {
			window.location.href =
				'//' + location.host + '/m/userCenter#/security/cn';
		},
		async sendCheckcode() {
			if (!this.hasSend) {
				let getCheckCodeRes = await Api.getCheckcode();
				if ((getCheckCodeRes.code = 200)) {
					this.$toast({
						message: '发送成功',
						type: 'success',
						duration: this.duration
					});
					this.countDown();
				} else {
					this.$toast.fail({
						message: '发送失败',
						duration: this.duration
					});
				}
			}
		},
		// 按钮倒计时
		countDown(wait = 60) {
			if (wait === 0) {
				this.sendCodeText = '重新获取';
				this.hasSend = false;
			} else {
				this.hasSend = true;
				this.sendCodeText = '已发送' + wait + 's';
				wait--;
				this.timer = setTimeout(() => {
					this.countDown(wait);
				}, 1000);
			}
		},
		submit() {
			this.$validator.validateAll().then(valid => {
				if (valid) {
					Api.veriPass({
						transPass: rsaEncrypt(this.pageForm.transPass),
						veriCode: this.pageForm.veriCode
					}).then(res => {
						if (res.code == 200) {
							this.closeBox();
							this.$emit('submit');
						} else {
							let errInfo = res.message || '密码或验证码有误';
							this.$toast.fail({
								message: errInfo,
								duration: this.duration
							});
						}
					});
				} else {
					// this.$toast.fail({
					// 	message: '请正确填写所有必填项',
					// 	duration: this.duration
					// });
				}
			});
		}
	}
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
