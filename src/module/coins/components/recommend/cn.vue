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
					<div class="state-icon profitting" v-else>
						收益中
					</div>
				</div>
				<div class="content">
					<p class="rate">{{(item.returnRate * 365 * 100).toFixed(2)}}%</p>
					<p class="fund-days">30天年化</p>
					<p class="buy-progress">认购进度<span class="font-blue">{{item.purchaseProgress.toFixed(2)}}</span>%</p>
					<p class="fund-type">{{fundTypeList[item.fundType]}}</p>
					<div class="btn">
						<span v-if="item.purchaseProgress < 100" class="buy" @click="gotoBuy(item.fundId)">认购</span>
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
