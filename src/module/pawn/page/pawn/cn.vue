<template>
	<div>
		<top-bar></top-bar>
		<div class="header">
			<h1 class="header-title">AoABank——方便、安全、快捷的数字资产典当平台</h1>
			<p class="header-content">* 支持全球多种数字资产进行典当：BTC，ETH，EOS，OKB，BNB，HT等所有价值数字资产
			</p>
			<p class="header-content">* 采用智能合约，多签名钱包等安全技术</p>
			<p class="header-content">* 最高60%比例！最快10分钟！USDT立即领走</p>
			<p class="header-content">* 成熟安全的风控模型！多方监管的资金账户！</p>
		</div>
		<div class="main">
			<div class="main-content">
				<div class="collateral">
					<div class="collateral-options fl">
						<div class="title"><span>典当物</span></div>
						<div class="collateral">
							<div class="collateral-item">
								<div class="clearfix">
									<div class="fl" id="pawnInput">
										<button type="button" class="ant-dropdown-trigger" id="currency-input"><img src="../../assets/imgs/eth.png" class="currency-icon"><span class="coinName" id="coinType">ETH</span><i class="anticon anticon-caret-down caret-down-icon"></i>
										</button>
										<div class="ant-dropdown dropdown-left" style="display:none">
											<div class="ant-dropdown">
												<ul class="ant-dropdown-menu temp ant-dropdown-menu-vertical" role="menu">
													<li class="ant-dropdown-menu-item" role="menuitem">
														<div><img src="../../assets/imgs/btc.png" class="caret-currency-icon" alt="">BTC</div>
													</li>
													<li class="ant-dropdown-menu-item" role="menuitem">
														<div><img src="../../assets/imgs/eth.png" class="caret-currency-icon" alt="">ETH</div>
													</li>
													<li class="ant-dropdown-menu-item" role="menuitem">
														<div><img src="../../assets/imgs/ttf.png" class="caret-currency-icon" alt="">TTF</div>
													</li>
													<li class="ant-dropdown-menu-item" role="menuitem">
														<div><img src="../../assets/imgs/sexc.png" class="caret-currency-icon" alt="">SEXC</div>
													</li>
													<li class="ant-dropdown-menu-item" role="menuitem">
														<div><img src="../../assets/imgs/park.png" class="caret-currency-icon" alt="">PARK</div>
													</li>
												</ul>
											</div>
										</div>
									</div>
									<div class="collateral-input-wrapper fr">
										<input id="pawnValue" type="number" placeholder="0" value="">
									</div>
								</div>
							</div>
						</div>
						<p class="collateral-tip"><span>充值 </span>*最多只能借贷当前币价的50%</p>
					</div>
					<div class="tranfer"><img src="../../assets/imgs/tranfer.png"></div>
					<div class="loan fr">
						<div class="title"><span>借款</span></div>
						<div class="collateral">
							<div class="collateral-item">
								<div class="clearfix">
									<div class="loanInput">
										<button type="button" class=" ant-dropdown-trigger">
											<img class="currency-icon" alt="" src="../../assets/imgs/usdt.png"><span class="coinName">USDT</span></button>
									</div>
									<div class="collateral-input-wrapper fr">
										<input id="loanValue" type="number" class="fr" placeholder="0" value="">
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="describe">
					<p><span class="title">期　　限：</span><span> 30日</span></p>
					<p><span class="title">月 利 息 ：</span><span> 2%</span></p>
					<p><span class="title">到期应还：</span><span id="payable"> 0 </span><span> usd</span></p>
					<!-- <p><span class="title">平仓价格：</span><span> 150usd</span></p> -->
				</div>
			</div>
		</div>
		<footer-bar></footer-bar>
	</div>
</template>
<script>
import Api from '../../api';
import coinListConfig from '../../util/config.coinList';
import pwdDialog from '../../../../components/pwdDialog';
import agreeDialog from '../agreeDialog/cn';
import identityAuth from '../identityAuth/cn';
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
			this.showPawnSelect = true;
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
				this.$message.error({
					message: '请勾选同意协议',
					duration: this.duration
				});
			} else if (this.credentStatus != '1') {
				// 是否需要身份认证
				this.showIdentityAuth = true;
			} else if (this.pawnAmount <= 0) {
				this.$message.error({
					message: '典当数量必须大于0',
					duration: this.duration
				});
			} else {
				this.showPwdDialog = true;
			}
		},
		submitPawn() {
			this.$confirm('确定进行典当吗？')
				.then(_ => {
					console.log(this.coinList[this.activePawn].coinCode);
					let params = {
						pawnCoinCode: this.coinList[this.activePawn].coinCode,
						pawnNum: this.pawnAmount,
						loanCoinCode: this.loanCoinCode,
						loanNum: this.loanValue
					};
					Api.savePawn(params).then(res => {
						if (res.code == 200) {
							this.$message({
								message: '恭喜你，典当成功',
								type: 'success',
								duration: this.duration
							});
							setTimeout(() => {
								location.reload();
							}, this.duration);
						} else {
							let message = res.msg || '典当失败失败，请重试';
							this.$message.error({
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

