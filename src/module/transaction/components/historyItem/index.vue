
<template>
	<div class='history-item'>
		<div class="title">买入</div>
		<div class="time">{{item.createTime}}</div>
		<div class="content">
			<div class="line">
				<span class="item-title">委托价：</span>
				<span class="price">{{item.buyPrice}}{{coinNameList[item.coinCode]}}</span>
				<span class="item-title">委托量：</span>
				<span class="item-value">{{item.buyNum}}</span>
			</div>
			<div class="line">
				<span class="item-title">成交总额：</span>
				<span class="item-value">{{item.orderAmount}}{{coinNameList[item.coinCode]}}</span>
			</div>
			<div class="status">
				<span class="cancel-btn" v-if="type=='entrust'">取消</span>
				<span v-else class="state" :class="{red: item.orderStatus == 1}">{{item.orderStatus == 1 ? '已成交' : '已取消'}}</span>
			</div>
		</div>
	</div>
</template>
<script>
import Util from '../../../../util';

export default {
	props: {
		item: Object,
		type: String
	},
	data() {
		return {
			coinNameList: Util.coinNameList
		};
	}
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
