<template>
	<div>
		<el-dialog class="dialog buy-dialog" width="520px" title="" :visible.sync="visible">
			<h3 class="dlg-title">购买AOK</h3>
			<el-form inline label-position="right" style="margin-top: 30px;" label-width="120px" class="wrap">
				<el-form-item label="买入价：">
					<el-input-number class="input" :step="priceStep" v-model="buyPrice">
					</el-input-number>
				</el-form-item>
				<span style="line-height: 40px">{{coins[payCoin]}}</span>
				<el-form-item label="买入数量：">
					<el-input-number class="input" v-model="buyNum" :min="100" :max="100000">
					</el-input-number>
				</el-form-item>
			</el-form>
			<p class="info">需要{{needPrice}}{{coins[payCoin]}}，可用余额为{{balance}}{{coins[payCoin]}}，<span @click="goRechage" class="rechage">充值</span></p>
			<p class="btn-line">
				<el-button @click="buy" class="btn">购买</el-button>
			</p>
		</el-dialog>
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
			}
		},
		needPrice() {
			return this.price * this.buyNum;
		},
		priceStep() {
			let precision = this.price.toString().split('.')[1];
			return 1 / Math.pow(10, precision ? precision.length - 1 : 0);
		}
	},
	watch: {
		price(value) {
			this.buyPrice = value;
		}
	},
	data() {
		return {
			coins: {
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
			// window.location.href =
			// 	window.location.protocol +
			// 	'//' +
			// 	window.location.host +
			// 	'/userCenter';
			this.visible = false;
			this.boxRechargeItem = {
				coinCode: this.payCoin,
				walletAddr: this.walletAddr
			};
			this.boxRechageVisible = true;
		},
		buy() {
			submitOrder(this.payCoin, this.buyPrice, this.buyNum)
				.then(data => {
					if (data.code === 200) {
						this.$message.success(data.data);
						this.visible = false;
					} else {
						this.$message.error(data.msg);
					}
				})
				.catch(err => {
					console.log('error:', err);
				});
		}
	},
	components: {
		boxCharge
	}
};
</script>

<style lang="scss" scoped>
@import '../../assets/css/dialog.scss';
@import './index.scss';
</style>
