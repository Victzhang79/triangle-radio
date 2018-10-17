<template>
  <div>
    <table>
      <tr class="table-header">
        <th>抵押币种</th>
        <th>抵押数量</th>
        <th>抵押价格</th>
        <th>平仓价格</th>
        <th>借贷额度</th>
        <th>借贷日期</th>
        <th>日利率</th>
        <th>利息</th>
        <th>操作</th>
      </tr>
      <tr class="table-body" v-for="item in coinsList">
        <td>{{item.name}}</td>
        <td>{{item.number}}</td>
        <td>{{item.price}}</td>
        <td>{{item.sellingPrice}}</td>
        <td>{{item.borrowingLimit}}</td>
        <td>{{item.limitTime}}</td>
        <td>{{item.dailyRate}}</td>
        <td>{{item.interest}}</td>
        <td class="oprate">
          <span @click="redeemBox(item.number)">赎回</span>
        </td>
      </tr>
    </table>
    <box-redeem v-model="showRedeemBox" :unit="unit" :totel="totel" @closeBox="closeRedeemBox"></box-redeem>
  </div>
</template>
<script>
import boxRedeem from '../boxRedeem';
export default {
	data() {
		return {
			showRedeemBox: false,
			unit: 'ETH',
			totel: 0,
			coinsList: [
				{
					name: 'ETH',
					number: 100,
					price: 2000,
					sellingPrice: 1000,
					borrowingLimit: '2018-8-30',
					limitTime: '2019-8-30',
					dailyRate: '0.025%',
					interest: 10
				},
				{
					name: 'TTX',
					number: 100,
					price: 2000,
					sellingPrice: 1000,
					borrowingLimit: '2018-8-30',
					limitTime: '2019-8-30',
					dailyRate: '0.025%',
					interest: 10
				},
				{
					name: 'BTC',
					number: 100,
					price: 2000,
					sellingPrice: 1000,
					borrowingLimit: '2018-8-30',
					limitTime: '2019-8-30',
					dailyRate: '0.025%',
					interest: 10
				},
				{
					name: 'SEXC',
					number: 1000,
					price: 1000,
					sellingPrice: 500,
					borrowingLimit: '2018-8-30',
					limitTime: '2019-8-30',
					dailyRate: '0.025%',
					interest: 10
				}
			]
		};
	},
	components: {
		boxRedeem
	},
	methods: {
		redeemBox(totel) {
			this.totel = totel;
			this.showRedeemBox = true;
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

