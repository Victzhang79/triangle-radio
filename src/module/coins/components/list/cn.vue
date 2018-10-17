<template>
	<div class="fund-list">
		<table>
			<tr class="table-header">
				<th>名称</th>
				<th>编号</th>
				<th>收益率</th>
				<th>基金周期（天）</th>
				<th>认购进度</th>
				<th>基金类型</th>
				<th></th>
			</tr>
			<tr class="table-body" v-for="item in fundList">
				<td>{{item.fundName}}</td>
				<td>{{item.fundNo}}</td>
				<td class="font-blue">年化{{(item.returnRate * 365 * 100).toFixed(2)}}%</td>
				<td>{{item.fundDays}}</td>
				<td>{{item.purchaseProgress.toFixed(2)}}%</td>
				<td>{{fundTypeList[item.fundType]}}</td>
				<td class="oprate">
					<span @click="gotoBuy(item.fundId)" class="buy-btn btn" v-if="item.purchaseProgress < 100">认购</span>
					<span @click="gotoWatch(item.fundId)" class="watch-btn btn" v-else>查看</span>
				</td>
			</tr>
		</table>
		<div class="pagers">
			<el-pagination layout="prev, pager, next" page-size.sync="10" :pager-count="pageCount" :total="totalNum" prev-text='上一页' next-text='下一页' @current-change="gotoPage" @prev-click='prevPage' @next-click='nextPage' :current-page.sync="currPage">
			</el-pagination>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		fundList: Array,
		totalNum: Number,
		pageNo: Number
	},
	data() {
		return {
			fundTypeList: ['', '固收保本'],
			pageCount: 5,
			currPage: this.pageNo
		};
	},
	methods: {
		gotoBuy(fundId) {
			this.$router.push({
				name: 'FundDetailCn',
				params: { fundId: fundId }
			});
		},
		gotoWatch(fundId) {
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
</style>
