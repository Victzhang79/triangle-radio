<template>
	<div>
		<asset-item v-for="(item, index) in walletArray" :coinInfo="item" pageType="wallet" @withdraw="putForward(index)" @recharge="recharge(index)" :key="index"></asset-item>
		<recharge v-model="showChargeBox" :item="checkItem"></recharge>
		<withdraw-cash v-model="showWithdrawBox" :item="checkItem" @closeBox="closeWithdrawBox">
		</withdraw-cash>
		<pwd-dialog v-model="showPwdDialog" submitBtnText="确定" @submit="submitWithdraw"></pwd-dialog>
	</div>
</template>
<script>
// 币钱包
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
			},
			ethAmount: 0,
			btcAmount: 0,
			hasSet: false,
			duration: 1500
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
		putForward(index) {
			let checkedItem = this.walletList[index];
			// 当提现AOK时，若提现数量不足1000限制提现
			if (
				checkedItem.coinCode == 8 &&
				checkedItem.withDrawableNum < 1000
			) {
				this.$toast.fail({
					message: '一次提现最低不能低于1000个AOK，请确认',
					duration: this.duration
				});
				return false;
			}
			if (!this.hasSet) {
				this.setAmount();
			}
			checkedItem.btcAmount = this.btcAmount;
			checkedItem.ethAmount = this.ethAmount;
			this.checkItem = checkedItem;
			this.showPwdDialog = true;
		},
		setAmount() {
			for (let item of this.walletList) {
				if (item.coinCode == 2) {
					this.btcAmount = item.withDrawableNum;
				} else if (item.coinCode == 3) {
					this.ethAmount = item.withDrawableNum;
				}
			}
			this.hasSet = true;
		},
		recharge(index) {
			this.checkItem = this.walletList[index];
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

