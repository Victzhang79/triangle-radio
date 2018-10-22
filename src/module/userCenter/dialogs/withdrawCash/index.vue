<template>
	<van-popup class="dialog" v-model="value">
		<div @click="closeBox" class="close"></div>
		<h2 class="title">提现操作</h2>
		<h3 class="dlg-title">您正在进行{{coinName}}充值操作</h3>
		<div class="balance-tip">最多可提现
			<span>
				<span>{{item.withDrawableNum}}</span>
				<span class="unit"> {{coinName}}</span>
			</span>
		</div>
		<form class="demo-ruleForm wrap">
			<label>
				<p class="labelTit">提现金额：</p>
				<input v-model="pageForm.withDrawNum" :placeholder="moneyPlaceholder">
				<span class="input-unit">USDTTT</span>
				<span class="suffix-btn" @click="allWithdraw">全部提现</span>
			</label>
			<label>
				<p class="labelTit">钱包地址：</p>
				<input class="authCode" v-model="pageForm.toWalletAddr" placeholder="请输入钱包地址">
			</label>
			<p class="erc20-tip" v-if="showErcTip">{{tipContent}}</p>
			<p class="btn-line">
				<button @click="onSubmit('pageForm')" class="btn" type="primary" round>确认提现</button>
			</p>
		</form>
	</van-popup>
</template>

<script>
import Api from '../../api';
import { mapGetters } from 'vuex';
import Util from '../../../../util';
export default {
	props: {
		value: Boolean,
		item: Object
	},
	data() {
		var checkWithDrawNum = (rule, value, callback) => {
			if (!value) {
				return callback(new Error('请输入提现金额'));
			}

			if (value <= 0) {
				callback(new Error('提现金额必须大于0'));
			} else if (value > this.item.withDrawableNum) {
				callback(new Error('不能大于最多可提现金额'));
			} else {
				callback();
			}
		};
		return {
			showCloseBtn: false,
			showErcTip: false,
			tipContent: '',
			title: '提现操作',
			isDisabled: false,
			pageForm: {
				coinCode: 1,
				withDrawNum: '', // 提现数量
				toWalletAddr: '' //提现目的钱包地址
			},
			coinName: '',
			cash: 0, // 提现后得到现金数
			profit: 0, // 提现费
			profitRate: 0.05, // 提现手续费率
			formObj: {},
			address: '', // 钱包地址
			moneyPlaceholder: '最多提现：',
			duration: 1500,
			rules: {
				withDrawNum: [
					{
						required: true,
						validator: checkWithDrawNum,
						trigger: 'change'
					},
					{ validator: checkWithDrawNum, trigger: 'blur' }
				],
				toWalletAddr: [
					{
						required: true,
						message: '请输入要转入的钱包地址',
						trigger: 'blur'
					}
				]
			}
		};
	},
	watch: {
		// 'pageForm.withDrawNum': function(val, oldVal) {
		// 	if (val > 0) {
		// 		this.profit = val * this.profitRate;
		// 		this.cash = val - this.profit;
		// 	} else {
		// 		this.profit = 0;
		// 		this.cash = 0;
		// 	}
		// },
		item(val) {
			this.pageForm = {
				coinCode: val.coinCode,
				withDrawNum: '',
				toWalletAddr: '' //提现目的钱包地址
			};
			if ([4, 8].indexOf(val.coinCode) > -1) {
				this.showErcTip = true;
				this.tipContent =
					'基于以太坊ERC20的币，提现需要消耗以太坊作为手续费，请确保您的账户有足够的以太坊';
			} else if (val.coinCode === 1) {
				this.showErcTip = true;
				this.tipContent =
					'usdt提现需要消耗比特币作为手续费，请确保您的账户有足够的比特币';
			} else {
				this.showErcTip = false;
			}

			this.coinName = Util.coinNameList[val.coinCode];
			this.moneyPlaceholder = '最多提现：' + val.withDrawableNum;
		}
	},
	methods: {
		closeBox(result) {
			this.pageForm = {
				coinCode: 1,
				withDrawNum: '', // 提现数量清空
				toWalletAddr: '' //提现目的钱包地址清空
			};
			this.$emit('input', false);
			this.$emit('closeBox', result);
		},
		onSubmit(formName) {
			if (!this.isDisabled) {
				this.$refs[formName].validate(valid => {
					if (valid) {
						console.log('this.item:', this.item);
						if (
							[4, 8].indexOf(this.item.coinCode) > -1 &&
							this.item.ethAmount == 0
						) {
							this.$toast.fail({
								message:
									'基于以太坊ERC20的币，提现需要消耗以太坊作为手续费，您的ETH余额为0',
								duration: this.duration
							});
							return false;
						}
						if (
							this.item.coinCode == 1 &&
							this.item.btcAmount == 0
						) {
							this.$toast.fail({
								message:
									'usdt提现需要消耗比特币作为手续费，您的BTC余额为0',
								duration: this.duration
							});
							return false;
						}
						this.isDisabled = true;
						setTimeout(() => {
							this.submitInfo();
						}, 10000);
					} else {
						this.$toast.fail({
							message: '请正确填写所有必填项',
							duration: this.duration
						});
						return false;
					}
				});
			}
		},
		async submitInfo() {
			let withdrawCash = await this.$store.dispatch(
				'withdrawCash',
				this.pageForm
			);
			this.isDisabled = false;
			if (withdrawCash) {
				this.closeBox(true); // 操作成功
				this.money = '';
				this.address = '';
				// this.checkCode = '';
			} else {
				this.$toast.fail({
					message: '提现失败请重试',
					duration: this.duration
				});
			}
		},
		allWithdraw() {
			this.pageForm.withDrawNum = this.item.withDrawableNum;
		}
	}
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
