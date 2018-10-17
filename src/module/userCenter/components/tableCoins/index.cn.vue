<template>
	<table>
		<tr class="table-header">
			<th>名称</th>
			<th>购买数量</th>
			<th>开始日</th>
			<th>到期日</th>
			<th>预估收益</th>
			<th>状态</th>
		</tr>
		<tr class="table-body" v-for="item in fundList">
			<td>{{item.fundName}}</td>
			<td>{{item.purchaseNum}}</td>
			<td>{{item.interestsDate}}</td>
			<td>{{item.settleDate}}</td>
			<td>{{item.evaIncome}}</td>
			<td>{{statusList[item.status]}}</td>
		</tr>
	</table>
</template>
<script>
// 币生币
import { mapGetters } from 'vuex';
export default {
	data() {
		return {
			fundList: [
				{
					fundName: '',
					purchaseNum: '',
					interestsDate: '', // 起息时间
					settleDate: '', // 结算时间
					evaIncome: 0, // 预计收益
					status: 1
				}
			],
			statusList: ['', '已开始', '锁定中', '已结束'],
			pageNo: 1,
			pageSize: 1000,
			duration: 1500
		};
	},
	created() {
		this.$store
			.dispatch('getPurchasedList', {
				pageNo: this.pageNo,
				pageSize: this.pageSize
			})
			.then(data => {
				if (data.length > 0) {
					this.fundList = data;
				} else {
					this.fundList = [];
				}
			})
			.catch(e => {
				this.$message.error({
					message: '获取币生币基金列表失败，请稍后重试',
					duration: this.duration
				});
			});
	},
	methods: {}
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>

