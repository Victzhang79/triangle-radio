<template>
	<div class="main">
		<div class="main-content">
			<div class="collateral">
				<div class="collateral-options fl">
					<div class="title"><span>典当物</span></div>
					<div class="collateral">
						<div class="collateral-item">
							<div class="clearfix">
								<div class="fl" id="pawnInput">
									<button type="button" class="ant-dropdown-trigger" id="currency-input" @click.stop.prevent="showPawnList"><img :src="coinList[activePawn].logo" class="currency-icon"><span class="coinName" id="coinType">{{coinList[activePawn].name}}</span><i class="anticon anticon-caret-down caret-down-icon"></i>
									</button>
									<div class="ant-dropdown dropdown-left" :class="{hidden: !showPawnSelect}">
										<div class="ant-dropdown">
											<ul class="ant-dropdown-menu temp ant-dropdown-menu-vertical" role="menu">
												<li class="ant-dropdown-menu-item" v-for="(item, index) in coinList" @click="selectCoin(index)">
													<div><img :src="item.logo" class="caret-currency-icon" alt="">{{item.name}}
													</div>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<div class="collateral-input-wrapper fr">
									<input id="pawnValue" type="number" placeholder="0" v-model="pawnAmount" v-on:input="changePawn()">
								</div>
							</div>
						</div>
					</div>
					<p class="collateral-tip"><span @click="recharge">充值 </span>*最多只能借贷当前币价的{{coinList[activePawn].pawnRate * 100}}%</p>
				</div>
				<div class="tranfer"><img src="../../assets/imgs/tranfer.png"></div>
				<div class="loan fr">
					<div class="title"><span>借款</span></div>
					<div class="collateral">
						<div class="collateral-item">
							<div class="clearfix">
								<div class="loanInput">
									<button type="button" class=" ant-dropdown-trigger">
										<img class="currency-icon" alt="" src="//www.koobank.com/m/img/usdt.png"><span class="coinName">{{loanCoinCodeName}}</span></button>
								</div>
								<div class="collateral-input-wrapper fr">
									<input id="loanValue" type="number" class="fr" placeholder="0" v-model="loanValue" v-on:input="changeLoan()">
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="describe">
				<div class="title">
					<span>还币信息</span>
				</div>
				<div class="describe-item">
					<span class="describe-title">期　　限：</span>
					<div class="describe-value">
						{{coinList[activePawn].pawnCycle}} 天
					</div>
				</div>
				<div class="describe-item">
					<span class="describe-title"> 日 利 率 ：</span>
					<div class="describe-value">{{coinList[activePawn].dayRate * 100}}%</div>
				</div>
				<div class="describe-item">
					<span class="describe-title">到期应还：</span>
					<div class="describe-value">
						<span>{{payable}} USDT</span>
					</div>
				</div>
				<div class="describe-item">
					<span class="describe-title">平仓价格：</span>
					<div class="describe-value">
						<span>{{coinList[activePawn].closingPrice.toFixed(2)}} USDT</span>
					</div>
				</div>
				<p class="describe-tip"> *若币价低于市价的<strong>{{coinList[activePawn].closeRate * 100}}%</strong>，则您的币将会被平仓以止损</p>
				<div class="title">
					<span>典当信息</span>
				</div>
				<div class="desc">
					<p>产品推广期间，借款不需要支付手续费，但需按月支付利息</p>
					<p>逾期费用：每逾期一日，收取借款金额的0.01%作为利息</p>
					<p>提前还款：一个借款周期是{{coinList[activePawn].pawnCycle}}天，不支持提前还款</p>
					<p>借款率：数字货币的质押率为{{coinList[activePawn].pawnRate*100}}%，平仓百分比为{{coinList[activePawn].closeRate*100}}%</p>
				</div>
			</div>
			<div class="submit-div">
				<div class="terms">
					<i class="check-box" :class="{'checked': agree}" @click="agreeClick"></i>
					<span @click="agreeClick">我已阅读并同意 </span>
					<span class="terms-link" @click="showAgreement">《KOOBANK借款协议》</span>
				</div>
				<div class="submit-btn" @click="submit">借款</div>
			</div>
		</div>
		<pwd-dialog v-model="showPwdDialog" submitBtnText="确定借款" @submit="submitPawn"></pwd-dialog>
		<agree-dialog v-model="showAgreeDialog" @submit="agreeCheck"></agree-dialog>
		<identity-auth v-model="showIdentityAuth" @submit="gotoAuth" @closeBox="closeIdentityBox"></identity-auth>
		<box-charge v-model="showRecharge" :item="currItem" @closeBox="closeRecharge"></box-charge>
	</div>
</template>
<script>
import Api from '../../api';
import coinListConfig from '../../util/config.coinList';
import pwdDialog from '../../../../components/pwdDialog';
import agreeDialog from '../agreeDialog';
import identityAuth from '../identityAuth';
import boxCharge from '../../../../components/recharge';
export default {
	data() {
		return {
			coinList: [
				{
					name: coinListConfig[1].name,
					logo: coinListConfig[1].logo,
					price: 0,
					dayRate: 0.002,
					pawnRate: 0.5, // 典当率
					closeRate: 0.5,
					closingPrice: 0,
					pawnCycle: 30
				}
			],
			loanCoinCode: 1,
			loanCoinCodeName: coinListConfig[0].name,
			USDTPrice: 1,
			activePawn: 0,
			currItem: {}, // 当前选择的币种信息
			showPawnSelect: false,
			pawnAmount: '',
			loanValue: '',
			payable: 0,
			agree: true,
			pawnCycle: 30,
			credentStatus: '',
			showPwdDialog: false,
			showAgreeDialog: false,
			showIdentityAuth: false,
			showRecharge: false,
			duration: 1500
		};
	},
	components: {
		pwdDialog,
		agreeDialog,
		identityAuth,
		boxCharge
	},
	created() {
		Api.qryPawnInfoList().then(res => {
			if (res.code == 200) {
				let coinArr = [];
				for (let item of res.data) {
					coinArr.push({
						coinCode: item.coinCode,
						name: coinListConfig[item.coinCode - 1].name,
						logo: coinListConfig[item.coinCode - 1].logo,
						price: item.priceUsd,
						dayRate: item.dayRate,
						pawnRate: item.pawnRate, // 典当率
						pawnPrice: item.pawnRate * item.priceUsd, // 典当价格
						closeRate: item.closeRate,
						closingPrice: item.closeRate * item.priceUsd, // 平仓价格
						pawnCycle: item.pawnCycle,
						pawnAddr: item.pawnAddr
					});
				}
				this.coinList = coinArr;
			}
		});

		// 获取USDT当前价格（暂时按和美元1:1处理，以后需要再放开）
		// Api.getCoinPrice(1).then(res => {
		// 	if (res.code == 200) {
		// 		this.USDTPrice = res.data[0].priceUsd;
		// 	}
		// });
	},
	mounted() {
		this.$nextTick(() => {
			document.addEventListener('click', e => {
				this.showPawnSelect = false;
			});
		});
	},
	methods: {
		// 充值
		recharge() {
			let selectedItem = this.coinList[this.activePawn];
			this.currItem = {
				coinCode: selectedItem.coinCode,
				walletAddr: selectedItem.pawnAddr
			};
			console.log(selectedItem);

			this.showRecharge = true;
		},
		closeRecharge() {
			this.showRecharge = false;
		},
		showPawnList() {
			this.showPawnSelect = !this.showPawnSelect;
		},
		hidePawnList() {
			this.showPawnSelect = false;
		},
		showDateList() {
			this.showDateSelect = true;
		},
		hideDateList() {
			this.showDateSelect = false;
		},
		changePawn() {
			this.loanValue = this.coinToUSDT(this.activePawn, this.pawnAmount);
			this.payable = this.calPayable(this.loanValue);
		},
		changeLoan() {
			this.pawnAmount = this.USDTToCoin(this.activePawn, this.loanValue);
			this.payable = this.calPayable(this.loanValue);
		},
		selectCoin(index) {
			this.activePawn = index;
			this.loanValue = this.coinToUSDT(index, this.pawnAmount);
			this.payable = this.calPayable(this.loanValue);
			this.hidePawnList();
		},
		// 当前币兑换USDT(index: coinIndex)
		coinToUSDT(index, number) {
			let money =
				(number * this.coinList[index].pawnPrice) / this.USDTPrice;
			return money.toFixed(8);
		},

		// USDT兑换当前币(index: coinIndex)
		USDTToCoin(index, number) {
			let money =
				(number * this.USDTPrice) / this.coinList[index].pawnPrice;
			return money.toFixed(8);
		},

		// 到期应还金额
		calPayable(money) {
			let currCoin = this.coinList[this.activePawn];
			let dayRate = currCoin.dayRate; // 日利率
			let payable = money * (1 + dayRate * currCoin.pawnCycle);
			return payable.toFixed(2);
		},
		closePwdBox() {
			this.showPwdDialog = false;
		},
		agreeClick() {
			this.agree = !this.agree;
		},
		showAgreement() {
			this.showAgreeDialog = true;
		},
		agreeCheck() {
			this.agree = true;
			this.showAgreeDialog = false;
		},
		closeAgreeBox() {
			this.showAgreeDialog = false;
		},
		closeIdentityBox() {
			this.showIdentityAuth = false;
		},
		gotoAuth() {
			location.href =
				'//' + location.host + '/userCenter#/identification/cn';
		},
		async submit() {
			// 获取认证状态
			await Api.getCredentStatus().then(res => {
				if (res.code == 200) {
					this.credentStatus = res.data.credentStatus;
				}
			});

			if (!this.agree) {
				this.$toast.fail({
					message: '请勾选同意协议',
					duration: this.duration
				});
			} else if (this.credentStatus != '1') {
				// 是否需要身份认证
				this.showIdentityAuth = true;
			} else if (this.pawnAmount <= 0) {
				this.$toast.fail({
					message: '典当数量必须大于0',
					duration: this.duration
				});
			} else {
				this.showPwdDialog = true;
			}
		},
		submitPawn() {
			this.$dialog
				.confirm({ message: '确定进行典当吗？' })
				.then(_ => {
					let params = {
						pawnCoinCode: this.coinList[this.activePawn].coinCode,
						pawnNum: this.pawnAmount,
						loanCoinCode: this.loanCoinCode,
						loanNum: this.loanValue
					};
					Api.savePawn(params).then(res => {
						if (res.code == 200) {
							this.$toast({
								message: '恭喜你，典当成功',
								type: 'success',
								duration: this.duration
							});
							setTimeout(() => {
								location.reload();
							}, this.duration);
						} else {
							let message = res.msg || '典当失败失败，请重试';
							this.$toast.fail({
								message: message,
								duration: this.duration
							});
						}
					});
				})
				.catch(_ => {});
		}
	}
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
