<template>
	<div class="coin-list">
		<div class="list-head">
			<span class="coin-name">币种</span>
			<span class="head-item">可用</span>
			<span class="head-item">锁仓</span>
			<span class="head-item">可释放</span>
			<span class="head-item-opr">操作</span>
		</div>
		<div class="list-body">
			<div v-for="(item, index) in coinList" :key="index">
				<div class="list-item" @click="showOpr(index)">
					<div class="coin-logo">
						<div class="icon" :class="coins[item.coinCode].className"></div>
						<!-- <img class="icon" :src="coins[item.coinCode].imgPath"> -->
					</div>
					<div class="coin-info td-item">
						<span class="coin-name">{{coins[item.coinCode].name}}</span>
						<!-- <span class="coin-price">≈{{item.priceCny}} CNY</span> -->
					</div>
					<div class="red-font td-item">{{item.withDrawableNum}}</div>
					<div class="gray-font td-item">{{item.lockedNum}}</div>
					<div class="gray-font td-item">{{item.withDrawingNum}}</div>
					<div class="opr td-item">
						<span class="icon-more" :class="showOprIndex === index ? 'more-up' : 'more-down'"></span>
					</div>
				</div>
				<div v-show="showOprIndex === index" class="opr-list">
					<span class="opr-btn" @click="withdraw(item)">提现</span>
					<span class="opr-btn" @click="recharge(item)">充值</span>
					<span class="opr-btn" v-if="item.coinCode == 9" @click="deposit(item)">定存</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import Util from '@/util';
import Api from '../../api';
export default {
	data() {
		return {
			coinNameList: Util.coinNameList,
			coins: {
				'1': {
					name: 'USDT',
					className: 'icon-usdt'
				},
				'2': {
					name: 'BTC',
					className: 'icon-btc'
				},
				'3': {
					name: 'ETH',
					className: 'icon-eth'
				},
				'9': {
					name: 'TRX',
					className: 'icon-trx'
				}
			},
			// 初始化列表
			coinList: [
				{
					userId: '',
					coinCode: 1,
					withDrawableNum: 0,
					lockedNum: 0,
					withDrawingNum: 0,
					userMobile: '',
					walletAddr: ''
				},
				{
					userId: '',
					coinCode: 2,
					withDrawableNum: 0,
					lockedNum: 0,
					withDrawingNum: 0,
					userMobile: '',
					walletAddr: ''
				},
				{
					userId: '',
					coinCode: 3,
					withDrawableNum: 0,
					lockedNum: 0,
					withDrawingNum: 0,
					userMobile: '',
					walletAddr: ''
				},
				{
					userId: '',
					coinCode: 9,
					withDrawableNum: 0,
					lockedNum: 0,
					withDrawingNum: 0,
					userMobile: '',
					walletAddr: ''
				}
			],
			showOprIndex: '',
			duration: 1500
		};
	},
	created() {
		Api.getWalletList().then(res => {
			if (res.code === 200) {
				this.coinList = res.data;
			} else {
				this.coinList = [];
			}
		});
	},
	methods: {
		showOpr(index) {
			if (this.showOprIndex === index) {
				this.showOprIndex = '';
			} else {
				this.showOprIndex = index;
			}
		},
		withdraw(item) {
			this.$toast({
				message: '冲提功能即将开放，敬请期待',
				duration: this.duration
			});
		},
		recharge(item) {
			this.$toast({
				message: '冲提功能即将开放，敬请期待',
				duration: this.duration
			});
		},
		deposit(item) {
			this.$router.push(`/deposit/${item.withDrawableNum}`);
		}
	}
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
