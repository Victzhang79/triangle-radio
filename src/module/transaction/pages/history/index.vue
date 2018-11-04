
<template>
	<div class="history-page">
		<div class="nav-title">
			KOOBANK-COINS
		</div>
		<div class="nav-list">
			<div class="nav-item" @click="showList(0)" :class="{active: activeNav === 0}">当前委托</div>
			<div class="nav-item" @click="showList(1)" :class="{active: activeNav === 1}">历史记录</div>
		</div>
		<table-entrust v-if="activeNav === 0"></table-entrust>
		<table-history v-if="activeNav === 1"></table-history>
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

