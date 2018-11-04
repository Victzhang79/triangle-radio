
<template>
	<div class='history-item'>
		<div class="title">买入</div>
		<div class="time">2018-12-20</div>
		<div class="content">
			<div>
				<span class="item-title">委托价：</span>
				<span class="price">200BTC</span>
				<span class="item-title">委托量：</span>
				<span class="item-value">10000</span>
			</div>
			<div>
				<span class="item-title">成交总额：</span>
				<span class="item-value">1000000BTC</span>
			</div>
			<div class="status">
				<span class="cancel-btn" v-if="type=='entrust'">取消</span>
				<span v-else class="state" :class="{red: item.orderStatus == 1}">{{item.orderStatus == 1 ? '已成交' : '已取消'}}</span>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		item: Object,
		type: String
	}
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
