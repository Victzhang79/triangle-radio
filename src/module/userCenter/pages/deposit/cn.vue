<template>
	<div class="deposit-app">
		<navigation-bar :backPath="'/'" :extendBtn="true" :extendTxt="'定存记录'" :extendPath="'/history'"></navigation-bar>
		<div class="deposit-list">
			<div v-for="(item, index) in list" :key="index" class="deposit-item">
				<span class="deposit-mes">定存{{item.days}}天，日利率{{item.rate}}%</span>
				<van-switch v-model="item.checked" size="25px" active-color="#13CE66" inactive-color="#ddd" @input="onInput(index, item.checked)" />
			</div>
		</div>
		<div class="deposit-submit">
			<div class="terms">
				<i class="check-box" :class="{'checked': agree}" @click="agreeClick"></i>
				<span @click="agreeClick">我已阅读并同意 </span>
				<span class="terms-link" @click="showAgreement">《波点钱包服务协议》</span>
			</div>
			<span class="deposit-submit-btn" @click="save">定存</span>
		</div>
		<div class="deposit-tip">
			<p class="deposit-tip-title">说明</p>
			<div class="deposit-tip-mes">
				<p>1. 利息为（T+1）,到期日晚上24:00发至钱包地址，可随时提取</p>
				<p>2. 本金在到期后一次性返还</p>
			</div>
		</div>
		<agree-dialog v-model="showAgreeDialog" @submit="agreeCheck"></agree-dialog>
		<deposit-box v-model="showBox" :TRXRemain="TRXRemain" :checkedItem="checkedItem"></deposit-box>
	</div>
</template>
<script>
import navigationBar from '@/components/navigationBar';
import depositBox from '../../dialogs/depositBox';
import agreeDialog from '../../components/agreeDialog';
import { mapGetters } from 'vuex';
export default {
	components: {
		navigationBar,
		depositBox,
		agreeDialog
	},
	data() {
		return {
			list: [
				{ days: 5, rate: 0.2, checked: false, type: '1', min: 1000 },
				{ days: 10, rate: 0.5, checked: false, type: '2', min: 1000 },
				{ days: 30, rate: 2, checked: false, type: '3', min: 20000 },
				{ days: 90, rate: 3, checked: false, type: '4', min: 100000 },
				{ days: 180, rate: 4, checked: false, type: '5', min: 300000 }
			],
			checkedIndex: '',
			checkedItem: {},
			TRXRemain: '',
			agree: true,
			showAgreeDialog: false,
			showBox: false,
			duration: 1500
		};
	},
	computed: {
		...mapGetters(['depositTypeIndex'])
	},
	watch: {
		checkedIndex(val) {
			if (typeof val != 'undefined' && val !== '') {
				this.checkedItem = this.list[val];
			}
		}
	},
	created() {
		if (
			typeof this.depositTypeIndex != 'undefined' &&
			this.depositTypeIndex !== ''
		) {
			this.list[this.depositTypeIndex].checked = true;
		}
		this.checkedIndex = this.depositTypeIndex;
		this.TRXRemain = this.$route.params.trxNum;
		this.$store.commit('changeHistoryBackPath', this.TRXRemain); // 保存历史记录页返回按钮参数
	},
	methods: {
		onInput(index, checked) {
			if (checked) {
				for (let i = 0, length = this.list.length; i < length; i++) {
					if (index != i) {
						this.list[i].checked = false;
					}
				}
				this.checkedIndex = index;
			} else {
				this.checkedIndex = undefined;
			}
		},
		agreeClick() {
			this.agree = !this.agree;
		},
		showAgreement() {
			this.showAgreeDialog = true;
		},
		agreeCheck() {
			this.agree = true;
			this.showAgreeDialog = false;
		},
		save() {
			if (
				this.checkedIndex === '' ||
				typeof this.checkedIndex == 'undefined'
			) {
				this.$toast({
					message: '请选择定存类型',
					duration: this.duration
				});
				return false;
			}
			if (!this.agree) {
				this.$toast({
					message: '请勾选同意协议',
					duration: this.duration
				});
				return false;
			}
			this.showBox = true;
			// this.$store.commit(types.SET_DIPOSIT, this.checkedIndex);
			// this.$router.go(-1);
		}
	}
};
</script>
<style lang="scss">
@import './index.scss';
</style>
