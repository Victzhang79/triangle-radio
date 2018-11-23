<template>
	<div class="pager-wrap">
		<div @click="previous" class="previous" :class="{active: previousEnalbe}">
			<p class="txt">上一页</p>
		</div>
		<div @click="next" class="next" :class="{active: nextEnable}">
			<p class="txt">下一页</p>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		pageNo: Number,
		pageSize: Number,
		totalNum: Number
	},
	computed: {
		pageTotal() {
			return Math.ceil(this.totalNum / this.pageSize);
		},
		previousEnalbe() {
			return this.pageNo > 1;
		},
		nextEnable() {
			return this.pageNo < this.pageTotal;
		}
	},
	methods: {
		previous() {
			if (this.pageNo <= 1) {
				return;
			}
			this.$emit('change', this.pageNo - 1);
		},
		next() {
			if (this.pageNo >= this.pageTotal) {
				return;
			}
			this.$emit('change', this.pageNo + 1);
		}
	}
};
</script>

<style lang="scss">
@import './index.scss';
</style>
