<template>
	<div>
		<asset-item v-for="(item, index) in pawnList" :coinInfo="item" pageType="pawn" @redeem="redeem(index)"></asset-item>
		<div v-if="showNull" class="list-tip"><span>{{showTip}}</span></div>
		<div class="pagers">
			<van-pagination v-model="pageNo" :total-items="totalNum" :items-per-page="pageSize" @change="gotoPage" />
		</div>
		<!-- <div class="pagers">
			<el-pagination layout="prev, pager, next" :page-size.sync="pageSize" :pager-count="pageCount" :total="totalNum" prev-text='上一页' next-text='下一页' @current-change="gotoPage" @prev-click='prevPage' @next-click='nextPage' :current-page.sync="pageNo">
			</el-pagination>
		</div> -->
		<box-redeem v-model="showRedeemBox" :checkedItem="checkedItem" @redeemSuccess="redeemSuccess"></box-redeem>
		<pwd-dialog v-model="showPwdDialog" submitBtnText="确定赎回" @submit="submitRedeem"></pwd-dialog>
	</div>
</template>
<script>
import Api from '../../api';
import boxRedeem from '../../dialogs/redeem';
import assetItem from '../assetItem';
import pwdDialog from '../../../../components/pwdDialog';
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
			pawnData: [],
			showNull: false,
			showTip: '您目前没有任何典当记录',
			coinList: Util.coinNameList,
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
		assetItem,
		pwdDialog
	},
	created() {
		this.getPawnedList(this.pageNo, this.pageSize);
	},
	methods: {
		getPawnedList(pageNo = this.pageNo, pageSize = this.pageSize) {
			Api.getPawnedList({ pageNo, pageSize }).then(res => {
				if (res.code == 200) {
					if (res.data.length == 0) {
						this.showNull = true;
						this.showTip = '您目前没有任何典当记录';
					} else {
						this.pawnData = res.data;
						this.totalNum = res.totalNum;
						let arr = [];
						for (let item of res.data) {
							arr.push({
								title:
									'抵押币种：' +
									Util.coinNameList[item.pawnCoinCode],
								list: [
									{
										name: '抵押数量',
										value: item.pawnNum
									},
									{
										name: '抵押价格',
										value: item.pawnPrice
									},
									{
										name: '平仓价格',
										value: item.closePrice
									},
									{
										name: '借贷额度',
										value: item.loanNum
									},
									{
										name: '借贷日期',
										value: item.loanDate
									},
									{
										name: '日 利 率',
										value: (item.dayRate % 100) + '%'
									},
									{
										name: '利　　息',
										value: item.interest.toFixed(2)
									},
									{
										name: '状　　态',
										value: this.statusList[item.status]
									}
								]
							});
						}
						this.pawnList = arr;
					}
				} else {
					this.showNull = true;
					this.showTip = '获取典当信息失败，请刷新重试';
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
		redeem(index) {
			this.showPwdDialog = true;
			this.checkedItem = this.pawnData[index];
		},
		submitRedeem() {
			this.showPwdDialog = false;
			this.showRedeemBox = true;
		},
		redeemSuccess() {
			// 赎回成功回调
			this.getPawnedList(this.pageNo, this.pageSize);
		}
	}
};
</script>
<style lang="scss">
@import './index.scss';
</style>

