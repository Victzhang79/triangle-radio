<template>
	<van-popup class="dialog" v-model="show" @click-overlay="closeBox">
		<div @click="closeBox" class="close"></div>
		<h3 class="dlg-title">总业绩</h3>
		<div class="content">
			<div class="line">
				<span class="item-title">一级下级总人数：</span>
				<span>{{firstNumber}} 人</span>
			</div>
			<div class="line">
				<span class="item-title">下级总人数：</span>
				<span>{{totalNumber}} 人</span>
			</div>
			<div class="line">
				<span class="item-title">一级总业绩：</span>
				<span>{{firstAchievement}} TRX</span>
			</div>
			<div class="line">
				<span class="item-title">下级总业绩：</span>
				<span>{{totalAchievement}} TRX</span>
			</div>
		</div>
	</van-popup>
</template>

<script>
export default {
	props: {
		value: Boolean
	},
	data() {
		return {
			show: this.value,
			firstNumber: 0,
			totalNumber: 0,
			firstAchievement: 0,
			totalAchievement: 0
		};
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
