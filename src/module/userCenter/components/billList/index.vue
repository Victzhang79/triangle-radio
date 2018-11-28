<template>
	<ul class="bill-list">
		<li v-for="(item, index) in list" :key="index" class="item">
			<div class="left">
				<p class="type">{{opTypes[item.type]}}</p>
				<p class="time">{{item.createDate}}</p>
			</div>
			<div class="right">
				<p class="num">{{item.coinNum}}</p>
				<p class="note">{{notes[item.type]}}</p>
			</div>
		</li>
	</ul>
</template>

<script>
export default {
	props: {
		list: {
			type: Array,
			default() {
				return [
					{
						type: '1', //钱包明细变动类型：1.充值、2.提现、3.定存冻结、4.定存解冻、5.定存利息、6.业绩释放、7.发放锁仓、8.锁定可用余额、9.解锁锁仓
						coinCode: 'Cynthia', //取值范围：1：USDT、2：BTC、3：ETH、9：TRX
						coinNum: 330,
						createDate: '2018-11-22 21:15'
					},
					{
						type: '1',
						coinCode: 'Cynthia',
						coinNum: 330,
						createDate: '2018-11-22 21:15'
					}
				];
			}
		}
	},
	data() {
		return {
			opTypes: [
				'',
				'充值',
				'提现',
				'定存冻结',
				'定存解冻',
				'定存利息',
				'业绩释放',
				'发放锁仓',
				'锁定可用余额',
				'解锁锁仓'
			],
			notes: [
				'',
				'已完成',
				'已完成',
				'已完成',
				'已完成',
				'定存利息',
				'每日释放',
				'发放锁仓',
				'余额锁定',
				'解锁'
			]
		};
	}
};
</script>

<style lang="scss">
@import './index.scss';
</style>
