<template>
	<div class="app">
		<top-bar activePage="coins">
		</top-bar>
		<head-banner></head-banner>
		<div class="main">
			<fund-card :fundDetail="fundDetailData"></fund-card>
			<buy-process :fundDetail="fundDetailData"></buy-process>
			<fund-detail :fundDetail="fundDetailData"></fund-detail>
			<buy-fund v-if="fundDetailData.purchaseProgress < 100" :fundDetail="fundDetailData" :walletRemain='walletRemain' :walletAddr="walletAddr"></buy-fund>
		</div>
		<footer-bar>
		</footer-bar>
	</div>
</template>
<script>
import topBar from '../../../../components/header/cn';
import footerBar from '../../../../components/footer';
import headBanner from '../../components/headBanner/cn';
import fundCard from '../../components/fundCard/cn';
import buyProcess from '../../components/buyProcess/cn';
import fundDetail from '../../components/fundDetail/cn';
import buyFund from '../../components/buyFund/cn';
import { mapGetters } from 'vuex';
export default {
	data() {
		return {
			pageNo: 0,
			walletRemain: 0,
			walletAddr: ''
		};
	},
	components: {
		topBar,
		footerBar,
		headBanner,
		fundCard,
		buyProcess,
		fundDetail,
		buyFund
	},
	computed: {
		...mapGetters(['fundDetailData'])
	},
	created() {
		let fundId = this.$route.params.fundId;
		this.$store.dispatch('getFundInfo', fundId).then(data => {
			let coinCode = data.coinCode;
			this.$store.dispatch('getWalletInfo', coinCode).then(res => {
				if (res.code == 200) {
					let totalNum = res.data.withDrawableNum;
					this.walletRemain = totalNum;
					this.walletAddr = res.data.walletAddr;
				}
			});
		});
		document.documentElement.scrollTop = 188;
	}
};
</script>
<style lang="scss">
@import './index.scss';
</style>
