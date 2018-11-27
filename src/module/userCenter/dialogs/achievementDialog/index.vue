<template>
	<van-popup class="dialog" v-model="show" @click-overlay="closeBox">
		<div @click="closeBox" class="close"></div>
		<h3 class="dlg-title">总业绩</h3>
		<div class="content">
			<div class="line">
				<span class="item-title">一级下级人数：</span>
				<span>{{subOne}} 人</span>
			</div>
			<div class="line">
				<span class="item-title">总下级人数：</span>
				<span>{{subTotal}} 人</span>
			</div>
			<div class="line">
				<span class="item-title">一级总业绩：</span>
				<span>{{archiveOne}} TRX</span>
			</div>
			<div class="line">
				<span class="item-title">总业绩：</span>
				<span>{{archiveTotal}} TRX</span>
			</div>
			<div class="tip">注：每天中午12点更新数据</div>
		</div>
	</van-popup>
</template>

<script>
import Api from '../../api';

export default {
	props: {
		value: Boolean
	},
	data() {
		return {
			show: this.value,
			subOne: 0,
			subTotal: 0,
			archiveOne: 0,
			archiveTotal: 0
		};
	},
	created() {
		Api.getUserTotalArchive().then(res => {
			if (res.code == 200) {
				this.subOne = res.data.subOne;
				this.subTotal = res.data.subTotal;
				this.archiveOne = res.data.archiveOne;
				this.archiveTotal = res.data.archiveTotal;
			}
		});
	},
	watch: {
		value(val) {
			this.show = val;
		}
	},
	methods: {
		closeBox() {
			this.$emit('input', false);
		}
	}
};
</script>

<style lang="scss" scoped>
@import '../../../../assets/style/dialog.scss';
@import './index.scss';
</style>
