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
				<p>1. 定存利息单日晚间24:00发放至钱包地址，可随时提取</p>
				<p>2. 到期后本金会在到期日晚间24:00发放至钱包地址</p>
			</div>
		</div>
	</div>
</template>
<script>
import navigationBar from '@/components/navigationBar';
import { mapGetters } from 'vuex';
import * as types from '../../store/mutation-types';

export default {
	components: {
		navigationBar
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
			checkedIndex: ''
		};
	},
	computed: {
		...mapGetters(['depositType'])
	},
	created() {
		if (typeof this.depositType != 'undefined' && this.depositType !== '') {
			this.list[this.depositType].checked = true;
		}
		this.checkedIndex = this.depositType;
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
			this.$store.commit(types.SET_DIPOSIT, this.checkedIndex);
			this.$router.go(-1);
		}
	}
};
</script>
<style lang="scss">
@import './index.scss';
</style>
