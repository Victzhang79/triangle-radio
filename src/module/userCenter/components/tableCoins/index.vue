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
    <tr class="table-body" v-for="item in coinsList">
      <td>{{item.name}}</td>
      <td>{{item.number}}</td>
      <td>{{item.startTime}}</td>
      <td>{{item.endTime}}</td>
      <td>{{item.profit}}</td>
      <td>{{item.state}}</td>
    </tr>
  </table>
</template>
<script>
// 币生币
import { mapGetters } from 'vuex';
export default {
	data() {
		return {
			coinsList: [
				{
					name: 'XMX- 个月锁仓',
					number: 100,
					startTime: '2018-8-30',
					endTime: '2019-8-30',
					profit: 10000,
					state: '锁定期'
				},
				{
					name: 'XMX- 个月锁仓',
					number: 100,
					startTime: '2018-8-30',
					endTime: '2019-8-30',
					profit: 10000,
					state: '未锁定'
				},
				{
					name: 'XMX- 个月锁仓',
					number: 100,
					startTime: '2018-8-30',
					endTime: '2019-8-30',
					profit: 10000,
					state: '已到期'
				},
				{
					name: 'XMX- 个月锁仓',
					number: 100,
					startTime: '2018-8-30',
					endTime: '2019-8-30',
					profit: 10000,
					state: '已到期'
				}
			]
		};
	},
	computed: {
		...mapGetters(['fundList'])
	},
	created() {
		this.$store.dispatch('getFundList');
	},
	methods: {}
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>

