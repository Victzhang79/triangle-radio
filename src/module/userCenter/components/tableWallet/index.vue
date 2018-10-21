<template>
	<div>
		<asset-item v-for="item of walletArray" :coinInfo="item" pageType="wallet" @withdraw="putForward(item)" @recharge="recharge(item)"></asset-item>
		<recharge v-model="showChargeBox" :item="checkItem"></recharge>
		<withdraw-cash v-model="showWithdrawBox" :item="checkItem">
		</withdraw-cash>
		<pwd-dialog v-model="showPwdDialog" submitBtnText="确定" @submit="submitWithdraw" @closeBox="closePwdBox"></pwd-dialog>
	</div>
</template>
<script>
// 币钱包
// import withdrawCash from '../withdrawCash/index.cn';
import assetItem from '../assetItem';
import recharge from '../../../../components/recharge';
import withdrawCash from '../../dialogs/withdrawCash';
import pwdDialog from '../../../../components/pwdDialog';
import Util from '../../../../util';
import { mapGetters } from 'vuex';
export default {
	data() {
		return {
			coinNameList: Util.coinNameList,
			showWithdrawBox: false,
			showChargeBox: false,
			showPwdDialog: false,
			checkRedeemItem: {
				pawnCoinCode: '',
				pawnNum: 0,
				pawnId: ''
			},
			coinCode: 1,
			unit: 'XML',
			totel: 0,
			checkItem: {
				coinCode: '',
				withDrawableNum: '',
				userMobile: '',
				walletAddr: ''
			}
		};
	},
	components: {
		withdrawCash,
		assetItem,
		recharge,
		pwdDialog
	},
	computed: {
		...mapGetters(['walletList']),
		walletArray() {
			let arr = [];
			for (let item of this.walletList) {
				arr.push({
					title: '币种：' + Util.coinNameList[item.coinCode],
					list: [
						{ name: '可提现', value: item.withDrawableNum },
						{ name: '锁定中', value: item.lockedNum },
						{ name: '提现中', value: item.withDrawingNum }
					]
				});
			}
			return arr;
		}
	},
	created() {
		this.$store.dispatch('getWalletList');
	},
	methods: {
		// 提现
		putForward(item) {
			this.checkItem = item;
			this.showPwdDialog = true;
		},
		recharge(item) {
			this.checkItem = item;
			this.showChargeBox = true;
		},
		submitWithdraw() {
			this.closePwdBox();
			this.showWithdrawBox = true;
		},
		closeWithdrawBox(result) {
			if (result) {
				this.$store.dispatch('getWalletList');
			}
			this.showWithdrawBox = false;
		},
		closeChargeBox() {
			this.showChargeBox = false;
		},
		closePwdBox() {
			this.showPwdDialog = false;
		}
	}
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>

