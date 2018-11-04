<template>
	<div class="transaction-page">
		<div class="banner">
			<h1 class="tit">基金理财—跨越牛熊</h1>
			<ul class="list">
				<li class="item">* 成熟团队确保高收益低风险。</li>
				<li class="item">* 冷钱包隔离确保资金安全。</li>
				<li class="item">* 冷钱包隔离确保资金安全。</li>
			</ul>
		</div>
		<div class="mainArea">
			<div class="header">
				<p class="tit">主区</p>
				<p class="note">交易价格来自天天交易所，一分钟更新一次，<a class="link" href="https://www.ttex.com/" target="_blank">点击查看</a></p>
			</div>
			<div class="table">
				<div v-for="(item, index) in transPriceList" :key="index" class="groupItem">
					<div class="firstLine">
						<p class="coin">AOK<span class="coinTxt">/{{coins[item.coinCode].name}}</span></p>
						<p class="price">¥{{item.last}}</p>
						<p class="buy"><button @click="buy(item)">购买</button></p>
					</div>
					<div class="secondLine">
						<p class="transNum">24H成交量：{{item.vol}}</p>
						<p class="history"><button @click="showHistory(item.coinCode)">委托记录</button></p>
					</div>
					<!-- <p class="item">{{item.high}}</p> -->
					<!-- <p class="item">{{item.low}}</p> -->
				</div>
			</div>
		</div>
		<buy-dialog></buy-dialog>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import BuyDialog from '../../dialogs/buy';
export default {
	computed: {
		...mapGetters(['transPriceList'])
	},
	data() {
		return {
			timmer: null,
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
			historyCoinCode: 0,
			historyVisible: true
		};
	},
	mounted() {
		this.timmer = window.setInterval(() => {
			this.$store.dispatch('updateList');
		}, 60000);
	},
	created() {
		this.$store.dispatch('updateList');
	},
	methods: {
		buy(item) {
			this.$store.dispatch('updateRecharge', {
				coinCode: item.coinCode
			});
			this.$store.commit('commitBuyInfo', {
				payCoin: item.coinCode,
				price: item.last
			});
			console.log(item.last);
			this.$store.commit('changeBuyDlgVisible', true);
		},
		showHistory(coinCode) {
			// this.historyCoinCode = coinCode;
			// this.historyVisible = true;
			this.$router.push('/history/' + coinCode);
		}
	},
	components: {
		BuyDialog
	}
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
