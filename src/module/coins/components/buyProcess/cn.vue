<template>
	<div class="buy-process">
		<div class="header-title">
			<span>认购流程</span>
		</div>
		<div class="process">
			<img src="//www.aoabank.com/process.png" class="process-img" />
			<div class="process-desc">
				<div class="desc">
					<span>申购日</span>
					<span class="date">{{fundDetail.startDate}}</span>
				</div>
				<div class="desc">
					<span>起息日</span>
					<span class="date">{{fundDetail.interestsDate}}</span>
				</div>
				<div class="desc">
					<span>结算日</span>
					<span class="date">{{fundDetail.settleDate}}</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
	props: {
		fundDetail: Object
	},
	data() {
		return {};
	},
	computed: {
		...mapGetters(['recommendFundList'])
	}
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
