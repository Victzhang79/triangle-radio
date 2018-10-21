<template>
	<van-popup class="dialog" v-model="value">
		<div @click="closeBox" class="close"></div>
		<h2 class="title">交易密码</h2>
		<form class="demo-ruleForm wrap">
			<label>
				<p class="labelTit">交易密码：</p>
				<input type="password" v-model="pageForm.transPass" placeholder="请输入交易密码">
			</label>
			<label>
				<p class="labelTit">验证码：</p>
				<input class="authCode" maxlength="6" v-model="pageForm.veriCode" placeholder="请输入验证码">
				<button class="authBtn" @click="sendCheckcode" :class="{disabled:hasSend}">{{sendCodeText}}</button>
			</label>
			<p class="input-tip">
				<span class="link-span" @click="gotoSetPwd">设置密码</span>
			</p>
			<p class="btn-line">
				<button @click="submit('pageForm')" class="btn">{{submitBtnText}}</button>
			</p>
		</form>
	</van-popup>
</template>

<script>
import Api from '../../module/coins/api';
import rsaEncrypt from '../../util/rsaEncrypt'; //密码rsa加密
export default {
	props: {
		value: Boolean,
		submitBtnText: String
	},
	data() {
		return {
			showCloseBtn: false,
			title: '交易密码',
			show: this.value,
			sendCodeText: '获取验证码',
			pageForm: {
				transPass: '',
				veriCode: ''
			},
			rules: {
				transPass: [
					{
						required: true,
						pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
						message: '请输入正确的资金密码',
						trigger: 'blur'
					}
				],
				veriCode: [
					{
						required: true,
						pattern: /^\d{6}$/,
						message: '请输入正确的短信验证码',
						trigger: 'blur'
					}
				]
			},
			hasSend: false,
			duration: 1500
		};
	},
	watch: {
		value(val) {
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
					this.show = val;
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
			this.show = false;
			this.$emit('input', false);
		},
		gotoSetPwd() {
			window.open('//' + location.host + '/userCenter#/security/cn');
		},
		async sendCheckcode() {
			if (!this.hasSend) {
				let getCheckCodeRes = await Api.getCheckcode();
				if ((getCheckCodeRes.code = 200)) {
					this.$message({
						message: '验证码发送成功',
						type: 'success',
						duration: this.duration
					});
					this.countDown();
				} else {
					this.$message.error({
						message: '验证码发送失败',
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
		submit(formName) {
			this.$refs[formName].validate(valid => {
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
							this.$message.error({
								message: errInfo,
								duration: this.duration
							});
						}
					});
				} else {
					this.$message.error({
						message: '请正确填写所有必填项',
						duration: this.duration
					});
				}
			});
		}
	}
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
