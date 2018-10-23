<template>
	<div class="asset-item">
		<div class="title">{{coinInfo.fundName}}</div>
		<div class="content">
			<div class="item-line">
				<span class="item-name">编　　号：</span>
				<span class="item-value">{{coinInfo.fundNo}}</span>
			</div>
			<div class="item-line">
				<span class="item-name"> 收 益 率：</span>
				<span class="item-value blue">年化{{Math.floor(coinInfo.returnRate * 365 * 100)}}%</span>
			</div>
			<div class="item-line">
				<span class="item-name">基金周期：</span>
				<span class="item-value">{{coinInfo.fundDays}}天</span>
			</div>
			<div class="item-line">
				<span class="item-name">认购进度：</span>
				<span class="item-value">{{Number(coinInfo.purchaseProgress * 100).toFixed(2)}}%</span>
			</div>
			<div class="item-line">
				<span class="item-name">基金类型：</span>
				<span class="item-value">{{fundTypeList[coinInfo.fundType]}}</span>
			</div>
		</div>
		<div class="item-footer">
			<span class="btn" v-if="coinInfo.purchaseProgress < 1" @click="gotoDetail(coinInfo.fundId)">认购</span>
			<span class="btn" v-else @click="gotoDetail(coinInfo.fundId)">查看</span>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		coinInfo: Object,
		pageType: String
	},
	data() {
		return {
			fundTypeList: ['', '固收保本']
		};
	},
	components: {},

	created() {},
	methods: {
		gotoDetail(fundId) {
			this.$emit('gotoDetail', fundId);
		}
	}
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>

