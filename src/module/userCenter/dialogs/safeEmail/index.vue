<template>
	<el-dialog class="dialog" width="520px" title="修改登录密码" :visible.sync="visible">
		<el-form :model="ruleForm" :rules="rules" :inline="false" ref="ruleForm" label-position="top" class="demo-ruleForm wrap">
			<el-form-item label="手机" prop="phone">
				<el-input v-model="ruleForm.phone" placeholder="请输入手机号"></el-input>
			</el-form-item>
			<el-form-item label="验证码" prop="authCode">
				<el-input class="authCode" v-model="ruleForm.authCode" placeholder="请输入验证码"></el-input>
				<el-button @click="getAuthCode" class="authBtn">获取验证码</el-button>
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input v-model="ruleForm.authCode" placeholder="请输入新密码"></el-input>
			</el-form-item>
			<el-form-item label="确认密码" prop="repeatPassword">
				<el-input v-model="ruleForm.authCode" placeholder="请再次确认密码"></el-input>
			</el-form-item>
			<el-form-item class="btn-line">
				<el-button class="btn" type="primary" round>提交</el-button>
			</el-form-item>
		</el-form>
	</el-dialog>
</template>

<script>
import { mapGetters } from 'vuex';
import { getVeriCode } from '../../api/security.js';
export default {
	data() {
		return {
			ruleForm: {
				phone: '',
				authCode: '',
				password: '',
				repeatPassword: ''
			},
			rules: {
				phone: [
					{
						required: true,
						message: '请输入号码',
						trigger: 'blur'
					},
					{
						pattern: /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/,
						message: '号码格式不正确',
						trigger: 'blur'
					}
				]
			}
		};
	},
	computed: {
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
		getAuthCode() {
			getVeriCode()
				.then(data => {
					console.log(data);
				})
				.catch(err => {
					console.log(err);
				});
		}
	}
};
</script>

<style lang="scss" scoped>
@import '../../../../assets/style/dialog.scss';
</style>
