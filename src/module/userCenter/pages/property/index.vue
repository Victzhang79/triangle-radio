<template>
	<div class="property-page">
		<navigation-bar :backPath="'/security'" :title="'资金明细'"></navigation-bar>
		<div class="userInfo-wrap">
			<img class="logo" src="~@/assets/imgs/logo.png" alt="波点钱包">
		</div>
		<div class="banner">
			<p>我的资产</p>
			<p class="num">{{totalProperty}}TRX</p>
			<p>≈{{totalPropertyInCny}}元</p>
			<!-- <div class="tabs">
				<p class="tab" @click="changeTab(0)" :class="{active: tabChose===0}"><img src="../../assets/imgs/icon_zdmx.png" alt="">账单明细</p>
				<p class="tab" @click="changeTab(1)" :class="{active: tabChose===1}"><img src="../../assets/imgs/icon_mrhz.png" alt="">每日汇总</p>
			</div> -->
		</div>
		<bill-list :list="billList"></bill-list>
		<!-- <daily-list v-show="tabChose===1"></daily-list> -->

		<pager :pageNo="pageNo" :pageSize="pageSize" :totalNum="totalNum" @change="pageChange" class="pager"></pager>
	</div>
</template>

<script>
import navigationBar from '@/components/navigationBar';
import BillList from '../../components/billList';
import DailyList from '../../components/dailyList';
import Pager from '@/components/pager';
import { getUserWalletDetail, getUserTotalAsset } from '../../api/property.js';
export default {
	data() {
		return {
			// tabChose: 0,
			totalProperty: '0',
			totalPropertyInCny: '0',
			billList: [],
			pageNo: 1,
			totalNum: 100,
			pageSize: 10
		};
	},
	created() {
		this.updateBillList();
	},
	methods: {
		// changeTab(index) {
		// 	if (this.tabChose === index) {
		// 		return;
		// 	}
		// 	this.tabChose = index;
		// }
		getTotalProperty() {
			getUserTotalAsset()
				.then(data => {
					if (data.code === 200) {
						this.totalProperty = Number(
							data.data.totalAssetTrx
						).toFixed(1);
						this.totalPropertyInCny = Number(
							data.data.totalPropertyInCny
						).toFixed(1);
					} else {
						this.$toast.fail(data.msg);
					}
				})
				.catch(() => {
					this.$toast.fail('网路异常，稍后重试。');
				});
		},
		updateBillList() {
			getUserWalletDetail(this.pageNo, this.pageSize)
				.then(data => {
					if (data.code === 200) {
						this.totalNum = data.totalNum;
						this.billList = data.data;
					} else {
						this.$toast.fail(data.msg);
					}
				})
				.catch(() => {
					this.$toast.fail('网路异常，稍后重试。');
				});
		},
		pageChange(page) {
			this.pageNo = page;
			this.updateBillList();
		}
	},
	components: {
		navigationBar,
		BillList,
		DailyList,
		Pager
	}
};
</script>

<style lang="scss">
@import './index.scss';
</style>
