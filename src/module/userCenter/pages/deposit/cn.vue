<template>
	<div class="deposit-app">
		<navigation-bar></navigation-bar>
		<div class="deposit-list">
			<div v-for="(item, index) in list" :key="index" class="deposit-item">
				<span class="deposit-mes">定存{{item.days}}，日利率{{item.rate}}%</span>
				<van-switch v-model="item.checked" size="25px" active-color="#13CE66" inactive-color="#ddd" @input="onInput(index, item.checked)" />
			</div>
		</div>
		<div class="deposit-submit">
			<span class="deposit-submit-btn" @click="save">定存</span>
		</div>
		<div class="deposit-tip">
			<p class="deposit-tip-title">说明</p>
			<div class="deposit-tip-mes">
				<p>1. 利息为（T+1）,到期日晚上24:00发至钱包地址，可随时提取</p>
				<p>2. 本金和利息同步发放</p>
			</div>
		</div>
		<deposit-box v-model="showBox" :TRXRemain="TRXRemain" :days="checkedDays"></deposit-box>
	</div>
</template>
<script>
import navigationBar from '@/components/navigationBar';
import depositBox from '../../dialogs/depositBox';
import { mapGetters } from 'vuex';

export default {
	components: {
		navigationBar,
		depositBox
	},
	data() {
		return {
			list: [
				{ days: 5, rate: 0.2, checked: false },
				{ days: 10, rate: 0.5, checked: false },
				{ days: 30, rate: 2, checked: false },
				{ days: 90, rate: 3, checked: false },
				{ days: 180, rate: 4, checked: false },
				{ days: 360, rate: 5, checked: false },
				{ days: 1000, rate: 6, checked: false }
			],
			checkedIndex: '',
			checkedDays: 0,
			TRXRemain: '',
			showBox: false
		};
	},
	computed: {
		...mapGetters(['depositType'])
	},
	watch: {
		checkedIndex(val) {
			if (typeof val != 'undefined' && val !== '') {
				this.checkedDays = this.list[val].days;
			}
		}
	},
	created() {
		if (typeof this.depositType != 'undefined' && this.depositType !== '') {
			this.list[this.depositType].checked = true;
		}
		this.checkedIndex = this.depositType;
		this.TRXRemain = this.$route.params.trxNum;
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
