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
			<tr class="table-body" v-for="item in coinsList">
				<td>{{item.name}}</td>
				<td>{{item.free}}</td>
				<td>{{item.lock}}</td>
				<td>{{item.putting}}</td>
				<td class="oprate">
					<span @click="withdrawCash">提现</span>
					<span @click="charge"> 充值</span>
					<span @click="redeem(item.free)">赎回</span>
				</td>
			</tr>
		</table>
		<withdraw-cash v-model="showWithdrawBox" @closeBox="closeWithdrawBox" @closed="closeWithdrawBox"></withdraw-cash>
		<box-redeem v-model="showRedeemBox" :unit="unit" :totel="totel" @closeBox="closeRedeemBox"></box-redeem>
	</div>
</template>
<script>
// 币钱包
import { mapGetters } from 'vuex';
import withdrawCash from '../withdrawCash';
import boxRedeem from '../boxRedeem';
export default {
	data() {
		return {
			coinsList: [
				{ name: 'USDT', free: 100, lock: 50, putting: 1000 },
				{ name: 'BTC', free: 100, lock: 50, putting: 1000 },
				{ name: 'ETC', free: 100, lock: 50, putting: 1000 }
			],
			address: '5678sjsjpfapjpjpwijfpajfpaijfpwij',
			showWithdrawBox: false,
			showChargeBox: false,
			showRedeemBox: false,
			unit: 'XML',
			totel: 0
		};
	},
	components: {
		withdrawCash,
		boxRedeem
	},
	computed: {
		...mapGetters(['walletList'])
	},
	created() {
		this.$store.dispatch('getWalletList');
	},
	methods: {
		withdrawCash() {
			console.log('this.showWithdrawBox', this.showWithdrawBox);
			this.showWithdrawBox = true;
		},
		charge() {
			this.showChargeBox = true;
		},
		redeem(totel) {
			this.totel = totel;
			this.showRedeemBox = true;
		},
		closeWithdrawBox() {
			this.showWithdrawBox = false;
		},
		closeChargeBox() {
			this.showChargeBox = false;
		},
		closeRedeemBox() {
			this.showRedeemBox = false;
		}
	}
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>

