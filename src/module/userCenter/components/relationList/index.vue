<template>
	<ul class="relation-list">
		<li class="item subTit">
			<div class="left">
				<p class="tit">认证姓名</p>
			</div>
			<div class="middle">
				<p class="tit">手机号</p>
			</div>
			<div class="right">
				<p class="tit">定存数</p>
			</div>
		</li>
		<li v-for="(item, index) in list" :key="index" class="item">
			<div class="left">
				<p class="time">{{item.userName}}</p>
			</div>
			<div class="middle">
				<p class="phone">{{item.userMobile}}</p>
			</div>
			<div class="right">
				<p class="num">{{item.depositNum}}TRX</p>
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
						"userMobile": 17600000000,
						"userName": "东方不败",
						"depositNum": 300000
					},
					{
						"userMobile": 17600000000,
						"userName": "独孤求败",
						"depositNum": 100000000
					}
				];
			}
		}
	},
	data() {
		return {
			// opTypes: [
			// 	'',
			// 	'充值',
			// 	'提现',
			// 	'定存冻结',
			// 	'定存解冻',
			// 	'定存利息',
			// 	'业绩释放',
			// 	'发放锁仓',
			// 	'锁定可用余额',
			// 	'解锁锁仓'
			// ]
		};
	}
};
</script>

<style lang="scss">
@import './index.scss';
</style>
