<template>
	<div>
		<asset-item v-for="(item, index) in coinList" :coinInfo="item" pageType="shareholder" @sale="saleClick(index)" :key="index"></asset-item>
		<box-sale v-model="showSaleBox" :cansellNum="cansellNum" @saleSuccess="saleSuccess"></box-sale>
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
			cansellNum: 0,
			coinList: [
				{
					title: '币种：AOK',
					list: [
						{
							name: '锁币数量',
							value: 0
						},
						{
							name: '可售数量',
							value: 0
						},
						{
							name: '已售数量',
							value: 0
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
							title: '币种：AOK',
							list: [
								{
									name: '锁币数量',
									value: res.data.totalNum
								},
								{
									name: '可售数量',
									value: res.data.cansellNum
								},
								{
									name: '已售数量',
									value:
										res.data.soldNum + res.data.entrustNum
								}
							]
						}
					];
					this.cansellNum = res.data.cansellNum;
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

