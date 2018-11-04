<template>
	<div class="transaction-page">
		<div class="banner">
			<h1 class="tit">KOOBANK克班克——数字资产管理集团-投资银行</h1>
			<ul class="list">
				<li class="item">* 由前VISA、Standard Chartered Bank、JPMorgan、Microsoft、VCSIG等高管联合创建。</li>
				<li class="item">* 团队具有超过十年以上金融证券投资、家族财富管理、私募股权投资经验。</li>
				<li class="item">* 聚焦数字资产配置与管理，去中心化的数字资产管理未来解决方案。</li>
			</ul>
		</div>
		<div class="mainArea">
			<div class="header">
				<p class="tit">主区</p>
				<p class="note">交易价格来自天天交易所，<a class="link" href="https://www.ttex.com/" target="_blank">点击查看</a></p>
			</div>
			<div class="table">
				<div class="table-head">
					<span>币种</span>
					<span>价格</span>
					<span>最高</span>
					<span>最低</span>
					<span>24H成交量</span>
					<span>操作</span>
				</div>
				<div class="table-body">
					<div v-for="(item, index) in transPriceList" :key="index" class="groupItem">
						<div class="item">
							<img class="icon" :src="coins[item.coinCode].imgPath">
							AOK/{{coins[item.coinCode].name}}
						</div>
						<div class="item downFluctuation">{{item.last}}</div>
						<div class="item">{{item.high}}</div>
						<div class="item">{{item.low}}</div>
						<div class="item">{{item.vol}}</div>
						<div class="item">
							<el-button @click="buy(item)" size="small" style="background-color:#2ab3ce;color: #fff;border-color:#2ab3ce;" round>购买</el-button>
							<el-button @click="showHistory(item.coinCode)" size="small" round>委托记录</el-button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<buy-dialog></buy-dialog>
		<!-- <history v-model="historyVisible" :coinCode="historyCoinCode"></history> -->
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import BuyDialog from '../../dialogs/buy';
// import History from '../../dialogs/history';
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
			this.historyCoinCode = coinCode;
			this.historyVisible = true;
		}
	},
	components: {
		BuyDialog,
		History
	}
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
