<template>
	<div>
		<table>
			<tr class="table-header">
				<th>抵押币种</th>
				<th>抵押数量</th>
				<th>抵押价格</th>
				<th>平仓价格</th>
				<th>借贷额度</th>
				<th>借贷日期</th>
				<th>日利率</th>
				<th>利息</th>
				<th>状态</th>
				<th>操作</th>
			</tr>
			<tr class="table-body" v-for="item in pawnList">
				<td>{{pawnCoinCodeName[item.pawnCoinCode]}}</td>
				<td>{{item.pawnNum}}</td>
				<td>{{item.pawnPrice.toFixed(2)}}</td>
				<td>{{item.closePrice.toFixed(2)}}</td>
				<td>{{item.loanNum}}</td>
				<td>{{item.loanDate}}</td>
				<td>{{item.dayRate * 100}}%</td>
				<td>{{item.interest.toFixed(2)}}</td>
				<td>{{statusList[item.status]}}</td>
				<td class="oprate">
					<span @click="redeem(item)" v-if="item.status == 6">赎回</span>
					<span class="disabled" v-else>赎回</span>
				</td>
			</tr>
		</table>
		<div class="pagers">
			<el-pagination layout="prev, pager, next" :page-size.sync="pageSize" :pager-count="pageCount" :total="totalNum" prev-text='上一页' next-text='下一页' @current-change="gotoPage" @prev-click='prevPage' @next-click='nextPage' :current-page.sync="pageNo">
			</el-pagination>
		</div>
		<box-redeem v-model="showRedeemBox" :checkedItem="checkedItem" @closeBox="closeRedeemBox"></box-redeem>
		<pwd-dialog v-model="showPwdDialog" submitBtnText="确定赎回" @submit="submitRedeem" @closeBox="closePwdBox"></pwd-dialog>
	</div>
</template>
<script>
import Api from '../../api';
import boxRedeem from '../boxRedeem/index.cn';
import pwdDialog from '../../../../components/pwdDialog/cn';
import Util from '../../../../util';
export default {
	data() {
		return {
			showRedeemBox: false,
			showPwdDialog: false,
			unit: 'ETH',
			totel: 0,
			pageNo: 1,
			pageSize: 10,
			pageCount: 7,
			totalNum: 0,
			pawnList: [],
			pawnCoinCodeName: Util.coinNameList,
			statusList: [
				'',
				'锁定中',
				'已平仓',
				'已赎回',
				'已补仓',
				'需补仓',
				'待赎回'
			],
			checkedItem: {
				pawnNum: 0
			},
			duration: 1500
		};
	},
	components: {
		boxRedeem,
		pwdDialog
	},
	created() {
		this.getPawnedList(this.pageNo, this.pageSize);
	},
	methods: {
		getPawnedList(pageNo = this.pageNo, pageSize = this.pageSize) {
			Api.getPawnedList({ pageNo, pageSize }).then(res => {
				if (res.code == 200) {
					this.pawnList = res.data;
					this.totalNum = res.totalNum;
					if (res.data.length == 0) {
						this.$message.error({
							message: '您当前没有典当记录',
							duration: this.duration
						});
					}
				} else {
					this.$message.error({
						message: '获取典当信息失败，请稍后重试',
						duration: this.duration
					});
				}
			});
		},
		gotoPage(val) {
			this.getPawnedList(val);
		},
		prevPage() {
			let page = this.pageNo - 1;
			this.getPawnedList(page);
		},
		nextPage(pageNum) {
			let page = this.pageNo + 1;
			this.getPawnedList(page);
		},
		redeem(item) {
			this.showPwdDialog = true;
			this.checkedItem = item;
		},
		submitRedeem() {
			this.showPwdDialog = false;
			this.showRedeemBox = true;
		},
		closePwdBox() {
			this.showPwdDialog = false;
		},
		closeRedeemBox(result) {
			this.showRedeemBox = false;
			if (result) {
				// 交易成功
				this.getPawnedList(this.pageNo, this.pageSize);
			}
		}
	}
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>

