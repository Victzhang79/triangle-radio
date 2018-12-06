<template>
	<div>
		<ul v-if="list.length>0" class="bill-list">
			<li v-for="(item, index) in list" :key="index" class="item">
				<div class="left">
					<p class="type">{{opTypes[item.changeType]}}</p>
					<p class="time">{{item.createTime}}</p>
				</div>
				<div class="right">
					<p :class="{active: sign[item.changeType]==='+'}" class="num">{{sign[item.changeType]}}{{item.changeNum}}</p>
					<p class="note">{{notes[item.changeType]}}</p>
				</div>
			</li>
		</ul>
		<div v-else class="no-data">目前没有账单明细数据~</div>
	</div>

</template>

<script>
export default {
	props: {
		list: {
			type: Array,
			default() {
				return [
					// {
					// 	changeType: '1', //钱包明细变动类型：1.充值、2.提现、3.定存冻结、4.定存解冻、5.定存利息、6.业绩释放、7.发放锁仓、8.锁定可用余额、9.解锁锁仓
					// 	coinCode: 'Cynthia', //取值范围：1：USDT、2：BTC、3：ETH、9：TRX
					// 	changeNum: 330,
					// 	createTime: '2018-11-22 21:15'
					// },
					// {
					// 	changeType: '1',
					// 	coinCode: 'Cynthia',
					// 	changeNum: 330,
					// 	createTime: '2018-11-22 21:15'
					// }
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
				'解锁锁仓',
				'定存提成',
				'注册赠送',
				'888释放'
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
				'解锁',
				'已发放',
				'注册赠送',
				'注册赠送'
			],
			sign: ['', '+', '-', '-', '+', '+', '+', '+', '-', '+', '+', '+', '+']
		};
	}
};
</script>

<style lang="scss">
@import './index.scss';
</style>
