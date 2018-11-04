
<template>
	<div class='history-list'>
		<history-item v-for="(item,index) in historyList" :item="item" type="entrust" :key="index"></history-item>
		<div class="pagers">
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
		this.getOrderList(this.pageNo);
	},
	methods: {
		getOrderList(pageNo) {
			Api.getOrderList({
				type: '2',
				coinCode: this.coinCode,
				pageNo: pageNo,
				pageSize: this.pageSize
			})
				.then(res => {
					if (res.code == 200) {
						if (res.totalNum == 0) {
							this.tipText = '您目前没有任何交易记录';
							this.showTip = true;
						} else {
							this.showTip = false;
							this.historyList = res.data;
							this.totalNum = res.totalNum;
						}
					} else {
						this.tipText = '获取历史记录失败，请稍后重试';
						this.showTip = true;
					}
				})
				.catch(e => {
					this.tipText = '获取历史记录失败，请稍后重试';
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
		}
	}
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
