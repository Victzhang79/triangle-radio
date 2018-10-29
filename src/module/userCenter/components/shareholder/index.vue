<template>
	<div>
		<asset-item v-for="(item, index) in coinList" :coinInfo="item" pageType="shareholder" @sale="saleClick(index)" :key="index"></asset-item>
		<box-sale v-model="showSaleBox" :canSaleNum="canSaleNum" @saleSuccess="saleSuccess"></box-sale>
		<pwd-dialog v-model="showPwdDialog" submitBtnText="确定出售" @submit="submitSale"></pwd-dialog>
	</div>
</template>
<script>
import Api from '../../api';
import boxRedeem from '../../dialogs/redeem';
import assetItem from '../assetItem';
import pwdDialog from '../../../../components/pwdDialog';
import boxSale from '../../dialogs/boxSale';
import Util from '../../../../util';
export default {
	data() {
		return {
			showSaleBox: false,
			showPwdDialog: false,
			canSaleNum: 0,
			coinList: [
				{
					title: '名称：AOK',
					list: [
						{
							name: '代持数量',
							value: 10000
						},
						{
							name: '可售代持',
							value: 1000
						},
						{
							name: '已售代持',
							value: 100
						}
					]
				}
			],
			duration: 1500
		};
	},
	components: {
		boxSale,
		assetItem,
		pwdDialog
	},
	created() {
		this.getCoinInfo();
	},
	methods: {
		getCoinInfo() {
			Api.getShareholderInfo().then(res => {
				if (res.code == 200) {
					this.coinList = [
						{
							title: '名称：AOK',
							list: [
								{
									name: '代持数量',
									value: res.data.totalNum
								},
								{
									name: '可售代持',
									value: res.data.canSaleNum
								},
								{
									name: '已售代持',
									value:
										res.data.soldNum + res.data.entrustNum
								}
							]
						}
					];
					this.canSaleNum = res.data.canSaleNum;
				} else {
					this.$toast.fail({
						message: '获取代持币种失败，请刷新重试',
						duration: this.duration
					});
				}
			});
		},
		saleSuccess() {
			this.getCoinInfo();
		},
		saleClick() {
			this.showPwdDialog = true;
		},
		submitSale() {
			this.showPwdDialog = false;
			this.showSaleBox = true;
		}
	}
};
</script>
<style lang="scss">
@import './index.scss';
</style>

