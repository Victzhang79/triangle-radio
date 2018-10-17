<template>
  <div class="asset">
    <div class="title">
      <span>资产状况</span>
    </div>
    <asset-nav @change-tab="changeTab"></asset-nav>
    <table-wallet v-if="currentTab == 0"></table-wallet>
    <table-coins v-if="currentTab == 1"></table-coins>
    <table-pawn v-if="currentTab == 2"></table-pawn>
  </div>
</template>
<script>
import assetNav from '../assetNav/index.cn';
import tableWallet from '../tableWallet/index.cn';
import tableCoins from '../tableCoins/index.cn';
import tablePawn from '../tablePawn/index.cn';

export default {
	data() {
		return {
			currentTab: 0
		};
	},
	components: {
		assetNav,
		tableWallet,
		tableCoins,
		tablePawn
	},
	methods: {
		changeTab(index) {
			this.currentTab = index;
		}
	}
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>

