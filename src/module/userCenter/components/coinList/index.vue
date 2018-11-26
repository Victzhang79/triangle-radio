<template>
	<div class="coin-list">
		<div class="list-head">
			<span class="coin-name">币种</span>
			<span class="head-item">可用</span>
			<span class="head-item">锁仓</span>
			<span class="head-item">可释放</span>
			<span class="head-item-opr">操作</span>
		</div>
		<div class="list-body">
			<div v-for="(item, index) in coinList" :key="index">
				<div class="list-item" @click="showOpr(index)">
					<div class="coin-logo">
						<div class="icon" :class="coins[item.coinCode].className"></div>
						<!-- <img class="icon" :src="coins[item.coinCode].imgPath"> -->
					</div>
					<div class="coin-info td-item">
						<span class="coin-name">{{coins[item.coinCode].name}}</span>
						<span v-if="[3, 9].indexOf(item.coinCode)" class="coin-price">¥{{trxNumberShow(item.priceCny)}}</span>
					</div>
					<div class="red-font td-item">
						<span>{{item.coinCode == 9 ? trxNumberShow(item.withDrawableNum) : item.withDrawableNum}}</span>
						<p v-if="[3, 9].indexOf(item.coinCode)" class="coin-price  coin-money">¥{{trxNumberShow(item.priceCny * item.withDrawableNum)}}</p>
					</div>
					<div class="gray-font td-item"><span>{{item.coinCode == 9 ? trxNumberShow(item.lockedNum) : item.lockedNum}}</span>
						<p v-if="[3, 9].indexOf(item.coinCode)" class="coin-price coin-money">¥{{trxNumberShow(item.priceCny * item.lockedNum)}}</p>
					</div>
					<div class="gray-font td-item"><span>{{item.coinCode == 9 ? trxNumberShow(item.withDrawingNum) : item.withDrawingNum}}</span>
						<p v-if="[3, 9].indexOf(item.coinCode)" class="coin-price coin-money">¥{{trxNumberShow(item.priceCny * item.lockedNum)}}</p>
					</div>
					<div class="opr td-item">
						<span class="icon-more" :class="showOprIndex === index ? 'more-up' : 'more-down'"></span>
					</div>
				</div>
				<div v-show="showOprIndex === index" class="opr-list">
					<span class="opr-btn" @click="withdraw(item)">提现</span>
					<span class="opr-btn" @click="recharge(item)">充值</span>
					<span class="opr-btn" v-if="item.coinCode == 9" @click="deposit(item)">定存</span>
				</div>
			</div>
		</div>
		<recharge v-model="showRechargeBox" :item="checkItem"></recharge>
		<withdraw-cash v-model="showWithdrawBox" :item="checkItem" :withdrawSuccess="withdrawSuccess">
		</withdraw-cash>
		<pwd-dialog v-model="showPwdDialog" submitBtnText="确定" @submit="submitWithdraw"></pwd-dialog>
		<identity-auth v-model="showIdentityAuth" actionName="提现"></identity-auth>
	</div>
</template>
<script>
import pwdDialog from '@/components/pwdDialog';
import withdrawCash from '../../dialogs/withdrawCash';
import recharge from '@/components/recharge';
import identityAuth from '@/components/identityAuth';
import Util from '@/util';
import Api from '../../api';
import { setTimeout } from 'timers';
export default {
	data() {
		return {
			coinNameList: Util.coinNameList,
			coins: {
				'1': {
					name: 'USDT',
					className: 'icon-usdt'
				},
				'2': {
					name: 'BTC',
					className: 'icon-btc'
				},
				'3': {
					name: 'ETH',
					className: 'icon-eth'
				},
				'9': {
					name: 'TRX',
					className: 'icon-trx'
				}
			},
			// 初始化列表
			coinList: [
				{
					userId: '',
					coinCode: 9,
					withDrawableNum: 0,
					lockedNum: 0,
					withDrawingNum: 0,
					userMobile: '',
					walletAddr: ''
				},
				{
					userId: '',
					coinCode: 3,
					withDrawableNum: 0,
					lockedNum: 0,
					withDrawingNum: 0,
					userMobile: '',
					walletAddr: ''
				},
				{
					userId: '',
					coinCode: 2,
					withDrawableNum: 0,
					lockedNum: 0,
					withDrawingNum: 0,
					userMobile: '',
					walletAddr: ''
				},
				{
					userId: '',
					coinCode: 1,
					withDrawableNum: 0,
					lockedNum: 0,
					withDrawingNum: 0,
					userMobile: '',
					walletAddr: ''
				}
			],
			credentStatus: undefined,
			showRechargeBox: false,
			showWithdrawBox: false,
			showPwdDialog: false,
			showIdentityAuth: false,
			showOprIndex: '',
			checkItem: {
				coinCode: '',
				withDrawableNum: '',
				userMobile: '',
				walletAddr: ''
			},
			duration: 1500
		};
	},
	components: {
		pwdDialog,
		withdrawCash,
		recharge,
		identityAuth
	},
	created() {
		this.getWalletList();
		Api.getCredentStatus().then(res => {
			if (res.code == 200) {
				this.credentStatus = res.data.credentStatus;
			}
		});
	},
	methods: {
		trxNumberShow(num) {
			return num % 1 === 0 ? num : num.toFixed(1);
		},
		getWalletList() {
			Api.getWalletList().then(res => {
				if (res.code === 200) {
					this.coinList = res.data;
				} else {
					this.coinList = [];
				}
			});
		},
		showOpr(index) {
			if (this.showOprIndex === index) {
				this.showOprIndex = '';
			} else {
				this.showOprIndex = index;
			}
		},
		// 提现
		async withdraw(item) {
			// 未认证通过
			if (this.credentStatus == '3') {
				this.$toast({
					message: '身份认证审核中，请耐心等待',
					duration: this.duration
				});
				return false;
			} else if (this.credentStatus != '1') {
				this.showIdentityAuth = true;
				return false;
			}
			this.checkItem = item;
			// 判断密码校验接口
			Api.getVeriStatus()
				.then(res => {
					if (res.code == 200) {
						let veriStatus = res.data;
						// 密码已校验，直接展示提现框
						if (veriStatus == '1') {
							this.showWithdrawBox = true;
						} else {
							this.showPwdDialog = true;
						}
					} else {
						this.showPwdDialog = true;
					}
				})
				.catch(e => {
					this.showPwdDialog = true;
				});
		},
		submitWithdraw() {
			this.showWithdrawBox = true;
		},
		// 提现成功
		withdrawSuccess() {
			setTimeout(() => {
				this.getWalletList();
			}, 5000);
		},
		// 充值
		recharge(item) {
			if (item.coinCode == 1 || item.coinCode == 2) {
				this.$toast({
					message: '转账人数过多，请稍后再试',
					duration: this.duration
				});
			} else {
				this.checkItem = item;
				this.showRechargeBox = true;
			}
		},
		deposit(item) {
			// this.$toast({
			// 	message: '定存功能即将开放，请耐心等待',
			// 	duration: this.duration
			// });
			this.$router.push(`/deposit/${item.withDrawableNum}`);
		}
	}
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
