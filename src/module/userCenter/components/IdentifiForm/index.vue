<template>
	<div class="identifi-form">
		<p class="notice-bar" style="text-align:center;" v-if="identiStatus=='1'">已通过认证，不可重复认证。
		</p>
		<p class="notice-bar" v-else-if="identiStatus=='3'">您的认证信息已提交，请耐心等待。
		</p>
		<p class="notice-bar" v-else-if="identiStatus=='2'">{{refuseReason}}
		</p>
		<div class="wrap">
			<h2 class="title">实名认证</h2>
			<div class="main-form">
				<form :disabled="identiStatus=='1'||identiStatus=='3'">
					<label class="label" label="" prop="nationCode">
						<span class="labelName">国籍：</span>
						<select name="nationCode" v-validate="IdentiRules.nationCode.validation" class="input-item" v-model="IdentiForm.nationCode" placeholder="请选择" :disabled="identiStatus=='1'||identiStatus=='3'">
							<option v-for="item in nationList" :key="item.nationCode" :label="item.nationName" :value="item.nationCode">{{item.nationName}}
							</option>
						</select>
						<span v-show="errors.has('nationCode')" class="error-tip">{{IdentiRules.nationCode.text}}</span>
					</label>
					<label class="label" label="" prop="familyName">
						<span class="labelName">姓：</span>
						<input name="familyName" v-validate="IdentiRules.familyName.validation" class="input-item" v-model="IdentiForm.familyName" placeholder="请填写你的姓氏" :disabled="identiStatus=='1'||identiStatus=='3'">
						<span v-show="errors.has('familyName')" class="error-tip">{{IdentiRules.familyName.text}}</span>
					</label>
					<label class="label" label="" prop="givenName">
						<span class="labelName">名：</span>
						<input name="givenName" v-validate="IdentiRules.givenName.validation" class="input-item" v-model="IdentiForm.givenName" placeholder="请填写你的名字" :disabled="identiStatus=='1'||identiStatus=='3'">
						<span v-show="errors.has('givenName')" class="error-tip">{{IdentiRules.givenName.text}}</span>
					</label>
					<label class="label" label="" prop="credentType">
						<p class="labelNameblock fixPos">证件类型：</p>
						<select name="credentType" v-validate="IdentiRules.credentType.validation" class="input-item long" v-model="IdentiForm.credentType" placeholder="请选择" :disabled="identiStatus=='1'||identiStatus=='3'">
							<option v-for="item in credentTypes" :key="item.value" :label="item.label" :value="item.value">
								{{item.label}}
							</option>
						</select>
						<span v-show="errors.has('credentType')" class="error-tip">{{IdentiRules.credentType.text}}</span>
					</label>
					<label class="label" label="" prop="credentNo">
						<p class="labelNameblock">证件号：</p>
						<input name="credentNo" v-validate="IdentiRules.credentNo.validation" class="input-item long" v-model="IdentiForm.credentNo" placeholder="请填写你的证件号码" :disabled="identiStatus=='1'||identiStatus=='3'">
						<span v-show="errors.has('credentNo')" class="error-tip">{{IdentiRules.credentNo.text}}</span>
					</label>
				</form>
			</div>
			<div class="pic-upload">
				<h3 class="tit">证件图片</h3>
				<div class="uploader">
					<van-uploader ref="uploader" class="avatar-uploader" :before-read="beforeAvatarUpload" :after-read="handleAvatarSuccess" :disabled="identiStatus=='1'||identiStatus=='3'">
						<img v-if="imageUrl" :src="imageUrl" class="avatar">
						<p v-else>
							<i class="add-icon"></i>
							<span class="upload-txt">请上传</span>
						</p>
					</van-uploader>
					<p class="under-txt">上传新图片</p>
				</div>
			</div>
			<div class="example-wrap">
				<div class="example">
					<p class="ex-txt">示例</p>
					<div class="img">
						<!-- <img src="../../assets/imgs/identiExp.png" alt="示例"> -->
						<img src="../../assets/imgs/shili_x.jpg" alt="示例">
					</div>
					<div class="img">
						<img src="../../assets/imgs/shili.jpg" alt="示例">
					</div>
				</div>
				<dl class="notice">
					<dt>提示</dt>
					<dd>1.请手持相关证件，照片需要免冠，需本人手持证件；</dd>
					<dd>2.必须看清晰证件号且证件号不能被遮挡；</dd>
					<dd>3.照片大小限制在2M以内；</dd>
				</dl>
			</div>
			<a class="admit-btn" href="javascript:void(0);" @click="credentCommit('IdentificationForm')" :class="{disabled: identiStatus=='1'||identiStatus=='3'}">提交</a>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
// import { uploadPicPath } from '../../api/maps/identifiMap.js';
import { uploadPic } from '../../api/identification.js';
import { credent } from '../../api/identification.js';
export default {
	data() {
		// let checkCredentNo = (rule, value, callback) => {
		// 	console.log(this.IdentiForm.credentType);
		// 	let regexNo;
		// 	switch (this.IdentiForm.credentType) {
		// 		case '1': //身份证
		// 			regexNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
		// 			break;
		// 		case '2': //护照
		// 			regexNo = /^1[45][0-9]{7}|([P|p|S|s]\d{7})|([S|s|G|g]\d{8})|([Gg|Tt|Ss|Ll|Qq|Dd|Aa|Ff]\d{8})|([H|h|M|m]\d{8，10})$/;
		// 			break;
		// 		case '3': //士官证
		// 			regexNo = /[\u4e00-\u9fa5](字第){1}(\d{4,8})(号?)$/;
		// 			break;
		// 		case '4': //港澳通行证
		// 			regexNo = /^[HMhm]{1}([0-9]{10}|[0-9]{8})$/;
		// 			break;
		// 	}
		// 	if (regexNo && !regexNo.test(value)) {
		// 		callback(new Error('证件格式不正确'));
		// 	} else {
		// 		callback();
		// 	}
		// };
		return {
			IdentiForm: {
				nationCode: '1',
				familyName: '',
				givenName: '',
				credentType: '1',
				credentNo: '',
				credentPic: ''
			},
			IdentiRules: {
				nationCode: {
					validation: {
						required: true
					},
					text: '请选择国籍'
				},
				familyName: {
					validation: {
						required: true
					},
					text: '请填写您的姓氏'
				},
				givenName: {
					validation: {
						required: true
					},
					text: '请填写您的名字'
				},
				credentType: {
					validation: {
						required: true
					},
					text: '请选择证件类型'
				},
				credentNo: {
					validation: {
						required: true
						// regex: checkCredentNo
					},
					text: '请填写正确的证件号码'
				}
			},
			credentTypes: [
				// 1：居民身份证，2：护照，3：士官证，4：港澳通行证，9：其他
				{
					value: '1',
					label: '居民身份证'
				},
				{
					value: '2',
					label: '护照'
				},
				{
					value: '3',
					label: '士官证'
				},
				{
					value: '4',
					label: '港澳通行证'
				},
				{
					value: '9',
					label: '其他'
				}
			],
			imageUrl: ''
			// uploadPicPath: uploadPicPath
		};
	},
	computed: {
		...mapGetters(['identiStatus', 'refuseReason', 'nationList'])
	},
	methods: {
		handleAvatarSuccess(file) {
			// this.imageUrl = file.content;
			uploadPic(this.$refs.uploader.$refs.input.files[0])
				.then(data => {
					// console.log('uploadPic:', data);
					if (data.code === 200) {
						this.imageUrl = file.content;
						this.IdentiForm.credentPic = data.data;
					} else {
						this.$toast.fail(data.msg);
					}
				})
				.catch(() => {
					this.$toast.fail('网络异常');
				});
		},
		beforeAvatarUpload(file) {
			const isJPG = file.type === 'image/jpeg';
			const isPng = file.type === 'image/png';
			const isLt2M = file.size / 1024 / 1024 < 2;

			if (!(isJPG || isPng)) {
				this.$toast.fail('上传图片只能是 JPG或PNG 格式!');
				return false;
			}
			if (!isLt2M) {
				this.$toast.fail('上传图片大小不能超过 2MB!');
				return false;
			}
			return isLt2M && (isJPG || isPng);
		},
		credentCommit(formName) {
			if (this.identiStatus == '1' || this.identiStatus == '3') {
				return false;
			}
			this.$validator.validateAll().then(valid => {
				// 表单验证
				if (!valid) {
					return false;
				}
				// 未上传照片
				if (!this.IdentiForm.credentPic) {
					this.$toast.fail('请上传证件照片');
					return false;
				}
				credent(this.IdentiForm)
					.then(data => {
						this.$toast('身份信息已提交，请耐心等待认证结果。');
						// 改变认证状态
						this.$store.commit('changeIdentiStatus', 3);
					})
					.catch(err => {
						this.$toast.fail('提交失败，请稍后重试。');
					});
			});
		}
	}
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
