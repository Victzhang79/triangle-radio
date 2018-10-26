<template>
	<div class="asset-item">
		<div class="title">{{coinInfo.title}}</div>
		<div class="content">
			<div v-for="(item, index) of coinInfo.list" class="item-line" :key="index">
				<span class="item-name">{{item.name}}：</span>
				<span class="item-value">{{item.value}}</span>
			</div>
		</div>
		<div v-if="pageType == 'wallet'" class="wallet-footer">
			<span class="btn" @click="clickHandle('withdraw')">提现</span>
			<span class="btn" @click="clickHandle('recharge')">充值</span>
		</div>
		<div v-if="pageType == 'pawn'" class="item-footer">
			<span class="pawn-btn" @click="clickHandle('redeem')">赎回</span>
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
		return {};
	},
	components: {},

	created() {},
	methods: {
		clickHandle(eventName) {
			this.$emit(eventName);
		}
	}
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>

