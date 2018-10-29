<template>
	<div class="asset">
		<asset-nav @change-tab="changeTab"></asset-nav>
		<table-wallet v-if="currentTab == 0"></table-wallet>
		<table-coins v-if="currentTab == 1"></table-coins>
		<table-pawn v-if="currentTab == 2"></table-pawn>
		<shareholder v-if="currentTab == 3"></shareholder>
	</div>
</template>
<script>
import assetNav from '../assetNav';
import tableWallet from '../tableWallet';
import tableCoins from '../tableCoins';
import tablePawn from '../tablePawn';
import shareholder from '../shareholder';

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
		tablePawn,
		shareholder
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

