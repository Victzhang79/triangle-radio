<template>
	<div>
		<table>
			<tr class="table-header">
				<th>币种</th>
				<th>可提现</th>
				<th>锁定中</th>
				<th>提现中</th>
				<th>操作</th>
			</tr>
			<tr class="table-body" v-for="item in walletList">
				<td>{{coinNameList[item.coinCode]}}</td>
				<td>{{item.withDrawableNum}}</td>
				<td>{{item.lockedNum}}</td>
				<td>{{item.withDrawingNum}}</td>
				<td class="oprate">
					<span @click="putForward(item)">提现</span>
					<span @click="recharge(item)"> 充值</span>
				</td>
			</tr>
		</table>
		<withdraw-cash v-model="showWithdrawBox" :item="checkItem" @closeBox="closeWithdrawBox" @closed="closeWithdrawBox">
		</withdraw-cash>
		<box-charge v-model="showChargeBox" :item="checkItem" @closeBox="closeChargeBox"></box-charge>
		<pwd-dialog v-model="showPwdDialog" submitBtnText="确定" @submit="submitWithdraw" @closeBox="closePwdBox"></pwd-dialog>
	</div>
</template>
<script>
// 币钱包
import withdrawCash from '../withdrawCash/index.cn';
import boxCharge from '../../../../components/boxCharge/cn';
import pwdDialog from '../../../../components/pwdDialog/cn';
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
		boxCharge,
		pwdDialog
	},
	computed: {
		...mapGetters(['walletList'])
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

