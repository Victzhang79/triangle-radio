<template>
	<div class="fund-list">
		<div class="header-title">
			<span class="split-line"></span>
			<span>所有产品</span>
			<span class="split-line"></span>
		</div>
		<coin-item v-for="item of fundList" :coinInfo="item" pageType="coins" @gotoDetail="gotoDetail"></coin-item>
		<div class="pagers">
			<van-pagination v-model="pageNo" :total-items="totalNum" :items-per-page="pageSize" @change="gotoPage" />
		</div>
	</div>
</template>
<script>
import coinItem from '../coinItem';
export default {
	props: {
		fundList: Array,
		totalNum: Number,
		pageNo: Number
	},
	components: {
		coinItem
	},
	data() {
		return {
			fundTypeList: ['', '固收保本'],
			pageSize: 5,
			currPage: this.pageNo
		};
	},
	methods: {
		gotoDetail(fundId) {
			this.$router.push({
				name: 'FundDetailCn',
				params: { fundId: fundId }
			});
		},

		gotoPage(val) {
			this.$emit('gotoPage', val);
		},
		prevPage() {
			let page = this.pageNo - 1;
			this.$emit('gotoPage', page);
		},
		nextPage(pageNum) {
			let page = this.pageNo + 1;
			this.$emit('gotoPage', page);
		}
	}
};
</script>
<style lang="scss" scoped>
@import './index.scss';

.pagers {
	width: px2rem(636px);
	text-align: center;
	margin: px2rem(50px) auto;
	background: #f7f7f7;
	font-size: px2rem(24px);
	color: #888585;
	.van-pagination__item {
		min-width: px2rem(36px);
		height: px2rem(36px);
		line-height: px2rem(36px);
		text-align: center;
		font-size: px2rem(24px);
		color: #878585;
		background: #f7f7f7;
		margin: 0 px2rem(10px);
	}
	.van-pagination li.van-pagination__item--active {
		background: #ffffff;
		border: 1px solid #e9e9e9;
		border-radius: px2rem(2px);
		font-size: px2rem(18px);
		color: #2ab3ce;
	}
	.van-pagination__item--disabled,
	.van-pagination__item--disabled:active {
		color: #b8b8b8;
	}
}
</style>
