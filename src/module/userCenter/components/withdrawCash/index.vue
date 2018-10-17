<template>
	<el-dialog :title="title" :visible.sync="show" width="600px" center :show-close="showCloseBtn" :close-on-click-modal="showCloseBtn" @close="closeBox">
		<div class="closeBtn" @click="closeBox">
			<i class="el-icon-close"></i>
		</div>
		<p class="subtitle">You are in the process of withdrawing USDT</p>
		<div class="balance-tip">Can withdraw cash
			<span>
				<span>{{balance}}</span>
				<span class="unit"> USDT</span>
			</span>
		</div>
		<div class="page-form">
			<input v-model="mobile" type="hidden"></input>
			<div class="form-item">
				<span class="item-title">Withdrawal Amount:</span>
				<div class="item-value">
					<input type="text" required v-validate v-model="money" />
					<span class="suffix-btn" @click="allWithdraw">Full withdrawal</span>
				</div>
				<div class="item-tip">
					<p>Withdrawal fee:
						<span class="profit">{{profit}} USDT</span>
					</p>
					<p>You will get:
						<span class="final-cash">{{cash}}</span> USDT</p>
				</div>
			</div>
			<div class="form-item">
				<span class="item-title">Wallet address:</span>
				<div class="item-value">
					<input type="text" v-validate="validateRule.address.validation" v-model="address" />
				</div>
			</div>
			<div class="form-item">
				<span class="item-title">Fund password:</span>
				<div class="item-value">
					<input type="password" v-validate="validateRule.password.validation" v-model="password" />
				</div>
				<p class="input-tip">
					<span class="link-span" @click="gotoSetPwd">Set password</span>
				</p>
			</div>
			<div class="form-item">
				<span class="item-title">SMS verification:</span>
				<div class="item-value">
					<input type="text" v-validate="validateRule.checkCode.validation" v-model="checkCode" />
					<span class="suffix-btn">Send verification code</span>
				</div>
			</div>
			<div class="form-submit">
				<div class="submit-btn" @click="onSubmit">Put forward</div>
			</div>
		</div>
		</div>
	</el-dialog>
</template>
<script>
export default {
	props: {
		value: Boolean
	},
	data() {
		return {
			showCloseBtn: false,
			show: false,
			title: 'Put forward',
			balance: '1000',
			cash: '98.182',
			profit: 5,
			money: '',
			address: '',
			password: '',
			mobile: '',
			checkCode: '',
			validateRule: {
				money: {
					validation: {
						required: true
					},
					text: 'Please enter the cash withdrawal amount.'
				},
				address: {
					validation: {
						required: true
					},
					text: 'Please enter your wallet address.'
				},
				password: {
					validation: {
						required: true
					},
					text: 'Please input the fund password.'
				},
				checkCode: {
					validation: {
						required: true
					},
					text: 'Please enter SMS verification code.'
				}
			}
		};
	},
	watch: {
		value(val) {
			console.log(val);
			this.show = val;
		},
		money(val) {
			this.profit = val * 0.05;
			this.cash = val - this.profit;
		}
	},
	methods: {
		closeBox() {
			this.show = false;
			this.$emit('closeBox');
		},
		onSubmit() {
			let pageForm = {
				money: this.money,
				address: this.address,
				password: this.password,
				mobile: this.mobile,
				checkCode: this.checkCode
			};
			this.$store.dispatch('withdrawCash', pageForm);
		},
		gotoSetPwd() {
			console.log('gotopwd');
		},
		allWithdraw() {
			this.money = this.balance;
		}
	}
};
</script>
<style lang="scss" scoped>
@import './index.scss';
.page-form .form-item .item-tip {
	margin-left: 120px;
}
.page-form .form-item .item-title {
	display: inline-block;
	width: 132px;
}
.page-form .link-span {
	right: 15px;
}
</style>

