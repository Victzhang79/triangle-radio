
<template>
	<div class='history-list'>
		<p v-if="showTip" class="tip">
			{{tipText}}
		</p>
		<history-item v-for="(item,index) in historyList" :item="item" type="entrust" :key="index" @cancelOrder="cancelOrder"></history-item>
		<div class="pagers" v-if="totalNum > pageSize">
			<van-pagination v-model="currPage" :total-items="totalNum" :items-per-page="pageSize" @change="gotoPage" :force-ellipses="ISTRUE" />
		</div>
	</div>
</template>
<script>
import historyItem from '../historyItem';
import Util from '../../../../util';
import Api from '../../api';
export default {
	components: {
		historyItem
	},
	data() {
		return {
			showTip: false,
			coinCode: 0,
			tipText: '',
			coinNameList: Util.coinNameList,
			historyList: [],
			pageSize: 10,
			currPage: 1,
			totalNum: 0,
			ISTRUE: true,
			duration: 1500
		};
	},
	created() {
		this.coinCode = this.$route.params.coinCode;
		this.getOrderList(this.currPage);
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
							this.historyList = res.data;
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
			let page = this.currPage - 1;
			this.getOrderList(page);
		},
		nextPage(pageNum) {
			let page = this.currPage + 1;
			this.getOrderList(page);
		},
		cancelOrder(orderId) {
			Api.cancelOrder(orderId)
				.then(res => {
					if (res.code == 200) {
						this.$toast({
							message: '委托单取消成功',
							duration: this.duration
						});
						this.getOrderList(this.currPage);
					} else {
						this.$toast.fail({
							message: '委托单取消失败，请重试',
							duration: this.duration
						});
					}
				})
				.catch(e => {
					this.$toast.fail({
						message: '委托单取消失败，请重试',
						duration: this.duration
					});
				});
		}
	}
};
</script>
<style lang="scss" scoped>
@import './index.scss';
.pagers {
	width: px2rem(636px);
	text-align: center;
	margin: 0 auto;
	padding: px2rem(50px) 0;
	background: #f7f7f7;
	font-size: px2rem(24px);
	color: #888585;
	li.van-pagination__item {
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
