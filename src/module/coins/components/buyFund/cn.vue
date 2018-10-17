<template>
	<div class="buy-box">
		<div class="header-title">
			<span>购买{{fundDetail.fundName}}：</span>
		</div>
		<div class="purchase">
			<span class="name">数量：</span>
			<input type="number" v-model="amount" class="input" :min="least" :max="remain" placeholder="0" />
			<span class="unit">{{coinName}}</span>
			<span class="btn" :class="{disabled: disabled}" @click="purchaseClick">立即购买</span>
		</div>
		<div class="recharge-tip">
			<span>钱包里面共有{{walletRemain}}个{{coinName}}，</span>
			<span class="a-link" @click="recharge">立即充值</span>
		</div>
		<pwd-dialog v-model="showPwdDialog" submitBtnText="确定购买" @submit="purchase" @closeBox="closePwdBox"></pwd-dialog>
		<box-charge v-model="showRecharge" :item="currItem" @closeBox="closeRecharge"></box-charge>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';
import pwdDialog from '../../../../components/pwdDialog/cn';
import boxCharge from '../../../../components/boxCharge/cn';
import Api from '../../api';
import Util from '../../../../util';

export default {
	props: {
		fundDetail: Object,
		walletRemain: Number,
		walletAddr: String
	},
	components: {
		boxCharge,
		pwdDialog
	},
	data() {
		return {
			amount: this.fundDetail.leastPurchaseNum,
			remain:
				this.fundDetail.fundAmount *
				(1 - this.fundDetail.purchaseProgress / 100),
			least: this.fundDetail.leastPurchaseNum,
			currItem: {},
			coinName: Util.coinNameList[this.fundDetail.coinCode],
			showCloseBtn: false,
			showPwdDialog: false,
			duration: 1500,
			showRecharge: false
		};
	},
	computed: {
		disabled() {
			return this.fundDetail.status == 0 ? true : false;
		}
	},
	watch: {
		fundDetail(val) {
			this.least = val.leastPurchaseNum;
			this.amount = val.leastPurchaseNum;
			this.coinName = Util.coinNameList[val.coinCode];
		}
	},
	methods: {
		purchaseClick() {
			if (this.disabled) {
				this.$message.error('基金认购还未开始哦');
			} else if (this.amount < this.least) {
				this.$message.error('购买数量不能小于起购数量哦');
			} else if (this.amount > this.remain) {
				this.$message.error('购买数量不能大于产品余额哦');
			} else {
				this.showPwdDialog = true;
			}
		},
		purchase() {
			if (this.walletRemain < this.amount) {
				this.$message.error({
					message: '余额不足，请充值后购买',
					duration: this.duration
				});
				return false;
			}
			this.$confirm('确定进行购买吗？')
				.then(_ => {
					this.$store
						.dispatch('savePurchaseFund', {
							fundId: this.fundDetail.fundId,
							purchaseNum: this.amount
						})
						.then(res => {
							if (res.code == 200) {
								this.$message({
									message: '恭喜你，购买成功',
									type: 'success',
									duration: this.duration
								});
								setTimeout(() => {
									location.reload();
								}, 1000);
							} else if (res.code == 403) {
								this.$message.error('请先进行身份认证');
								setTimeout(() => {
									window.location.href =
										'//' +
										location.host +
										'/userCenter#/identification/cn';
								}, 1000);
							} else {
								let message = res.msg || '购买失败，请重试';
								this.$message.error(message);
							}
						});
				})
				.catch(_ => {});
		},
		recharge() {
			this.currItem = {
				coinCode: this.fundDetail.coinCode,
				walletAddr: this.walletAddr
			};
			this.showRecharge = true;
		},
		closeRecharge() {
			this.showRecharge = false;
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
