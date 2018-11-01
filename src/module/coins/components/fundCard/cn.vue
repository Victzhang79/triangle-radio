<template>
	<div class="fund-card">
		<div class="header-title">
			<span>{{fundDetail.fundName}}</span>
		</div>
		<div class="card">
			<div class="rate-card">
				<p class=" title">{{Math.floor(fundDetail.returnRate * 365 * 100)}}%</p>
				<p class="tip">{{fundDetail.fundDays}}天，年化预计收益</p>
			</div>
			<div class="detail-card">
				<div class="least-number card-item">
					<p class="title">{{fundDetail.leastPurchaseNum}}{{coinName}}</p>
					<p class="tip">起购数量</p>
					<div class="split"></div>
				</div>
				<div class="amount card-item">
					<p class="title">{{fundDetail.fundAmount}}{{coinName}}</p>
					<p class="tip">产品额度</p>
					<div class="split"></div>
				</div>
				<div class="progress card-item">
					<p class="title">{{Number(fundDetail.purchaseProgress * 100).toFixed(2)}}%</p>
					<p class="tip">认购进度</p>
				</div>
			</div>

			<div class="state-icon profitting" v-if="fundDetailData.status == 2">
				收益中
			</div>
			<div class="state-icon running" v-else-if="fundDetailData.status == 1">
				进行中
			</div>
			<div class="state-icon no-start" v-else-if="fundDetailData.status == 0">
				未开始
			</div>
			<div class="state-icon no-start" v-else-if="fundDetailData.status == 3">
				已结束
			</div>
		</div>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';
import Util from '../../../../util';
export default {
	props: {
		fundDetail: Object
	},
	data() {
		return {
			coinNameList: Util.coinNameList
		};
	},
	computed: {
		...mapGetters(['fundDetailData']),
		coinName() {
			return this.coinNameList[this.fundDetailData.coinCode];
		}
	}
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
