<template>
	<div class="property-page">
		<navigation-bar :backPath="'/security'"></navigation-bar>
		<div class="userInfo-wrap">
			<img class="logo" src="~@/assets/imgs/logo.png" alt="波点钱包">
		</div>
		<div class="banner">
			<p>我的资产</p>
			<p class="num">1456784TRX</p>
			<p>≈22256788元</p>
			<div class="tabs">
				<p class="tab" @click="changeTab(0)" :class="{active: tabChose===0}"><img src="../../assets/imgs/icon_zdmx.png" alt="">账单明细</p>
				<p class="tab" @click="changeTab(1)" :class="{active: tabChose===1}"><img src="../../assets/imgs/icon_mrhz.png" alt="">每日汇总</p>
			</div>
		</div>
		<bill-list v-show="tabChose===0"></bill-list>
		<daily-list v-show="tabChose===1"></daily-list>

		<pager :pageNo="pageNo" :pageSize="pageSize" :totalNum="totalNum" @change="pageChange" class="pager"></pager>
	</div>
</template>

<script>
import navigationBar from '@/components/navigationBar';
import BillList from '../../components/billList';
import DailyList from '../../components/dailyList';
import Pager from '@/components/pager';
export default {
	data() {
		return {
			tabChose: 1,
			billList: [],
			pageNo: 1,
			totalNum: 100,
			pageSize: 10
		};
	},
	methods: {
		changeTab(index) {
			if (this.tabChose === index) {
				return;
			}
			this.tabChose = index;
		}
	},
	methods: {
		pageChange(page) {
			console.log('pageNum:', page);
			this.pageNo = page;
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
