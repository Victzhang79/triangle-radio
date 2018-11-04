<template>
	<el-dialog :visible.sync="show" class="history-dialog" width="950px" center :show-close="showCloseBtn" :close-on-click-modal="showCloseBtn" @close="closeBox(false)">
		<div class="closeBtn" @click="closeBox(false)">
			<i class="el-icon-close"></i>
		</div>
		<el-container>
			<el-aside>
				<div class="left-nav">
					<div class="nav-title">委托记录</div>
					<div class="nav-list">
						<div class="nav-item" :class="{active: activeNav === 0}" @click="showList(0)">
							当前委托
						</div>
						<div class="nav-item" :class="{active: activeNav === 1}" @click="showList(1)">
							历史记录
						</div>
					</div>
				</div>
			</el-aside>
			<el-main>
				<table-entrust v-if="activeNav === 0" :coinCode="coinCode"></table-entrust>
				<table-history v-if="activeNav === 1" :coinCode="coinCode"></table-history>
			</el-main>
		</el-container>

	</el-dialog>
</template>
<script>
import Api from '../../api';
import Util from '../../../../util';
import tableEntrust from './tableEntrust';
import tableHistory from './tableHistory';
export default {
	props: {
		value: Boolean,
		coinCode: { type: Number, default: 8 }
	},
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
	watch: {
		value(val) {
			this.show = val;
			if (val) {
				this.activeNav = 0;
			} else {
				this.activeNav = false; // 为了保证打开弹窗时显示最新的委托记录
			}
		}
	},
	methods: {
		closeBox(result) {
			this.$emit('input', false);
		},
		showList(index) {
			this.activeNav = index;
		}
	}
};
</script>
<style lang="scss">
@import './index.scss';
</style>

