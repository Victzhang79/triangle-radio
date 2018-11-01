<template>
	<div class="recommend-div">
		<div class="header-title">
			<span class="split-line"></span>
			<span>推荐产品</span>
			<span class="split-line"></span>
		</div>
		<div class="recommend-list">
			<div v-for="(item, index) in recommendFundList" class="recommend-item">
				<div class="title">
					<div class="name">{{item.fundName}}</div>
					<div class="state-icon no-start" v-if="item.status == 0">
						未开始
					</div>
					<div class="state-icon running" v-else-if="item.status == 1">
						进行中
					</div>
					<div class="state-icon profitting" v-else-if="item.status == 2">
						收益中
					</div>
					<div class="state-icon no-start" v-else-if="item.status == 3">
						已结束
					</div>
				</div>
				<div class="content">
					<p class="rate">年化{{Math.floor(item.returnRate * 365 * 100)}}%</p>
					<p class="fund-days">{{item.fundDays}}天周期</p>
					<p class="buy-progress">认购进度<span class="font-blue">{{Number(item.purchaseProgress * 100).toFixed(2)}}</span>%</p>
					<p class="fund-type">{{fundTypeList[item.fundType]}}</p>
					<div class="btn">
						<span v-if="item.purchaseProgress < 1 && item.status == 1" class="buy" @click="gotoBuy(item.fundId)">认购</span>
						<span v-else class="watch" @click="gotoWatch(item.fundId)">查看</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
	data() {
		return {
			fundTypeList: ['', '固收保本']
		};
	},
	computed: {
		...mapGetters(['recommendFundList'])
	},
	methods: {
		gotoBuy(fundId) {
			this.$router.push({
				name: 'FundDetailCn',
				params: { fundId: fundId }
			});
		},
		gotoWatch(fundId) {
			this.$router.push({
				name: 'FundDetailCn',
				params: { fundId: fundId }
			});
		}
	}
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
