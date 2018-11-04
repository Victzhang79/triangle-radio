<template>
	<div class="right-contnt">
		<p v-if="showTip" class="tip">
			{{tipText}}
		</p>
		<table v-else>
			<tr class="table-header" v-show="totalNum > 0">
				<th>操作</th>
				<th class="time">时间</th>
				<th>委托价</th>
				<th>委托量</th>
				<th>成交总额</th>
				<th>状态</th>
			</tr>
			<tbody>
				<tr v-for="item in entrustList" class="table-body">
					<td>买入</td>
					<td>{{item.createTime}}</td>
					<td>{{item.buyPrice}}{{coinNameList[coinCode]}}</td>
					<td>{{item.buyNum}}</td>
					<td>{{item.orderAmount}}{{coinNameList[coinCode]}}</td>
					<td><span class="operate" @click="cancelOrder(item.orderId)">取消</span></td>
				</tr>
			</tbody>
		</table>
		<div class="pagers" v-if="totalNum > pageSize">
			<el-pagination layout="prev, pager, next" :page-size.sync="pageSize" :pager-count="pageCount" :total="totalNum" prev-text='上一页' next-text='下一页' @current-change="gotoPage" @prev-click='prevPage' @next-click='nextPage' :current-page.sync="pageNo">
			</el-pagination>
		</div>
	</div>
</template>
<script>
import Api from '../../api';
import Util from '../../../../util';
export default {
	props: {
		coinCode: Number
	},
	data() {
		return {
			showTip: false,
			tipText: '',
			coinNameList: Util.coinNameList,
			entrustList: [],
			pageNo: 1,
			pageSize: 10,
			pageCount: 7,
			totalNum: 0,
			duration: 1500
		};
	},
	created() {
		this.getOrderList(this.pageNo);
	},
	methods: {
		getOrderList(pageNo) {
			Api.getOrderList({
				type: '1',
				coinCode: this.coinCode,
				pageNo: pageNo,
				pageSize: this.pageSize
			})
				.then(res => {
					if (res.code == 200) {
						if (res.totalNum == 0) {
							this.tipText = '您目前没有任何委托记录';
							this.showTip = true;
						} else {
							this.showTip = false;
							this.entrustList = res.data;
							this.totalNum = res.totalNum;
						}
					} else {
						this.tipText = '获取委托记录失败，请稍后重试';
						this.showTip = true;
					}
				})
				.catch(e => {
					this.tipText = '获取委托记录失败，请稍后重试';
					this.showTip = true;
				});
		},
		gotoPage(val) {
			this.getOrderList(val);
		},
		prevPage() {
			let page = this.pageNo - 1;
			this.getOrderList(page);
		},
		nextPage(pageNum) {
			let page = this.pageNo + 1;
			this.getOrderList(page);
		},
		cancelOrder(orderId) {
			Api.cancelOrder(orderId)
				.then(res => {
					if (res.code == 200) {
						this.$message({
							message: '委托单取消成功',
							type: 'success',
							duration: this.duration
						});
						this.getOrderList(this.pageNo);
					} else {
						this.$message({
							message: '委托单取消失败，请重试',
							type: 'error',
							duration: this.duration
						});
					}
				})
				.catch(e => {
					this.$message({
						message: '委托单取消失败，请重试',
						type: 'error',
						duration: this.duration
					});
				});
		}
	}
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>

