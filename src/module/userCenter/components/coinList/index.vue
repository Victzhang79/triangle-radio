<template>
	<div class="coin-list">
		<div class="list-head">
			<span class="head-item">币种</span>
			<span class="head-item">可用</span>
			<span class="head-item">锁仓</span>
			<span class="head-item">操作</span>
		</div>
		<div class="list-body">
			<div class="list-item" v-for="(item, index) in coinList">
				<div class="coin-info">
					<img class="icon" :src="coins[item.coinCode].imgPath">
					<span>{{coins[item.coinCode].name}}</span>
					<span></span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import Util from '@/util';
export default {
	data() {
		return {
			coinNameList: Util.coinNameList,
			coins: {
				'1': {
					name: 'USDT',
					imgPath: '//www.koobank.com/icon_usdt.jpeg'
				},
				'2': {
					name: 'BTC',
					imgPath: '//www.koobank.com/icon_btc.jpeg'
				},
				'3': {
					name: 'ETH',
					imgPath: '//www.koobank.com/icon_eth.jpeg'
				},
				'4': {
					name: 'TTF',
					imgPath: '//www.koobank.com/icon_ttf.jpeg'
				}
			},
			coinList: [
				{
					coinCode: 1,
					priceCny: 1000.23,
					withDrawableNum: 29,
					lockedNum: 1002
				},
				{
					coinCode: 2,
					priceCny: 1000.23,
					withDrawableNum: 29,
					lockedNum: 1002
				},
				{
					coinCode: 3,
					priceCny: 1000.23,
					withDrawableNum: 29,
					lockedNum: 1002
				},
				{
					coinCode: 8,
					priceCny: 1000.23,
					withDrawableNum: 29,
					lockedNum: 1002
				}
			]
		};
	}
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
