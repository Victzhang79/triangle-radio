<template>
	<div class="fund-detail">
		<div class="header-title">
			<span>产品详情</span>
		</div>
		<div class="detail">
			<p v-for="item in list">
				<span>{{item.name}}</span>
				<span v-html="item.value" v-if="item.name=='产品介绍：'"></span>
				<span v-else>{{item.value}}</span>
			</p>
		</div>
	</div>
</template>
<script>
import Util from '../../../../util';
import { mapGetters } from 'vuex';
export default {
	props: {
		fundDetail: Object
	},
	data() {
		return {
			list: [
				{ name: '认购币种：', value: '' },
				{ name: '收益计算方式：', value: '年化收益' },
				{ name: '产品额度：', value: 0 },
				{
					name: '额度限制：',
					value: '0起购，无上限'
				},
				{
					name: '起始时间：',
					value: '申购日开始，起息日到结束，或者额度认购完毕'
				},
				{ name: '投资期限：', value: '天' },
				{
					name: '产品介绍：',
					value: ''
				}
			]
		};
	},
	watch: {
		fundDetail(val) {
			this.list = [
				{ name: '认购币种：', value: Util.coinNameList[val.coinCode] },
				{ name: '收益计算方式：', value: '年化收益' },
				{ name: '产品额度：', value: val.fundAmount },
				{
					name: '额度限制：',
					value: val.leastPurchaseNum + '起购，无上限'
				},
				{
					name: '起始时间：',
					value:
						val.startDate +
						'开始，到' +
						val.interestsDate +
						'结束，或者额度认购完毕'
				},
				{ name: '投资期限：', value: val.fundDays + '天' },
				{
					name: '产品介绍：',
					value: val.fundDesc.replace(/&n/g, '<br>')
				}
			];
		}
	},
	computed: {
		...mapGetters(['recommendFundList'])
	}
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
