<template>
	<div class="pager-wrap">
		<div class="previous" :class="{active: previousEnalbe}">
			<p class="txt">上一页</p>
		</div>
		<div class="next" :class="{active: nextEnable}">
			<p class="txt">下一页</p>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		pageNo: Number,
		pageSize: Number,
		TotalNum: Number
	},
	computed: {
		previousEnalbe() {
			return this.pageNo > 1;
		},
		nextEnable() {
			return this.pageNo < Math.ceil(this.TotalNum / this.pageSize);
		}
	}
};
</script>

<style lang="scss">
@import './index.scss';
</style>
