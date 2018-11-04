<template>
	<div>
		<van-popup class="dialog buy-dialog" v-model="visible">
			<div @click="visible=false" class="close"></div>
			<h3 class="dlg-title">购买AOK</h3>
			<div class="wrap">
				<label>
					<span class="labelTit">买入价：</span>
					<input v-validate="rules.buyPriceRule.validation" type="number" class="shortInput" :step="priceStep" v-model="buyPrice" width="50%" name="buyPrice">
					<span>{{coins[payCoin]}}</span>
					<p v-show="errors.has('buyPrice')" class="error-tip">{{ rules.buyPriceRule.text}}</p>
				</label>
				<label>
					<span class="labelTit">买入数量：</span>
					<input v-validate="rules.buyNumRule.validation" type="text" class="shortInput" v-model="buyNum" name="buyNum">
					<p v-show="errors.has('buyNum')" class="error-tip">{{ rules.buyNumRule.text}}</p>
				</label>
			</div>
			<p class="info">需要{{needPriceShow}}{{coins[payCoin]}}，可用余额为{{balanceShow}}{{coins[payCoin]}}，<span @click="goRechage" class="rechage">充值</span></p>
			<p class="btn-line">
				<button @click="buy" class="btn">购买</button>
			</p>
		</van-popup>
		<box-charge v-model="boxRechageVisible" :item="boxRechargeItem"></box-charge>
	</div>

</template>

<script>
import { mapGetters } from 'vuex';
import { submitOrder } from '../../api/trans';
import boxCharge from '@/components/recharge';

export default {
	computed: {
		...mapGetters(['balance', 'payCoin', 'price', 'walletAddr']),
		visible: {
			get() {
				return this.$store.state.transaction.buyDialogVisible;
			},
			set(value) {
				this.$store.commit('changeBuyDlgVisible', value);
				if (!value) {
					this.$store.commit('commitBuyInfo', {
						payCoin: 0,
						price: 0
					});
				}
			}
		},
		needPrice() {
			return this.buyPrice * this.buyNum;
		},
		priceStep() {
			let precision = this.buyPrice.toString().split('.')[1];
			return 1 / Math.pow(10, precision ? precision.length - 1 : 0);
		},
		needPriceShow() {
			let precision = this.needPrice.toString().split('.')[1];
			if (precision !== undefined && precision.length > 8) {
				return this.needPrice.toFixed(8);
			} else {
				return this.needPrice.toString();
			}
		},
		balanceShow() {
			let precision = this.balance.toString().split('.')[1];
			if (precision !== undefined && precision.length > 8) {
				return this.balance.toFixed(8);
			} else {
				return this.balance.toString();
			}
		}
	},
	watch: {
		price(value) {
			this.buyPrice = value;
		}
	},
	created() {
		this.buyPrice = this.price;
	},
	data() {
		return {
			rules: {
				buyPriceRule: {
					validation: {
						required: true
					},
					text: '购买价格不能为空'
				},
				buyNumRule: {
					validation: {
						required: true,
						min_value: '100',
						max_value: '100000'
					},
					text: '100个起售，最多不超过100,000个'
				}
			},
			coins: {
				'0': '',
				'1': 'USDT',
				'2': 'BTC',
				'3': 'ETH',
				'4': 'TTF'
			},
			buyNum: 100,
			buyPrice: this.price,
			boxRechageVisible: false,
			boxRechargeItem: {
				coinCode: 0,
				walletAddr: ''
			}
		};
	},
	methods: {
		goRechage() {
			this.visible = false;
			this.boxRechargeItem = {
				coinCode: this.payCoin,
				walletAddr: this.walletAddr
			};
			setTimeout(() => {
				this.boxRechageVisible = true;
			}, 300);
		},
		buy() {
			this.$validator.validateAll().then(result => {
				if (result) {
					submitOrder(this.payCoin, this.buyPrice, this.buyNum)
						.then(data => {
							if (data.code === 200) {
								this.$toast.success(data.data);
								this.visible = false;
							} else {
								this.$toast.fail(data.msg);
							}
						})
						.catch(err => {
							console.log('error:', err);
						});
				}
			});
		}
	},
	components: {
		boxCharge
	}
};
</script>

<style lang="scss" scoped>
@import '@/assets/style/dialog.scss';
@import './index.scss';
</style>
