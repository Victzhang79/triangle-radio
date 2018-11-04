
<template>
	<div class="history-page">
		<div class="title">
			KOOBANK-COINS
		</div>
		<div class="nav-list">
			<div class="nav-item">当前委托</div>
			<div class="nav-item">历史记录</div>
		</div>
		<table-entrust v-if="activeNav === 0" :coinCode="coinCode"></table-entrust>
		<table-history v-if="activeNav === 1" :coinCode="coinCode"></table-history>
	</div>
</template>

<script>
import Util from '../../../../util';
import tableEntrust from '../../components/tableEntrust';
import tableHistory from '../../components/tableHistory';
export default {
	data() {
		return {
			showCloseBtn: false,
			show: this.value,
			activeNav: 0,
			entrustList: [],
			historyList: [],
			duration: 1500
		};
	},
	components: {
		tableEntrust,
		tableHistory
	},
	methods: {
		showList(index) {
			this.activeNav = index;
		}
	}
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>

