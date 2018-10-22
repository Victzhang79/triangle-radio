<template>
	<div>
		<asset-item v-for="item of fundList" :coinInfo="item"></asset-item>
	</div>
</template>
<script>
// 币生币
import Util from '../../../../util';
import assetItem from '../assetItem';

export default {
	data() {
		return {
			fundList: [],
			statusList: ['', '已开始', '锁定中', '已结束'],
			pageNo: 1,
			pageSize: 1000,
			duration: 1500
		};
	},
	components: {
		assetItem
	},
	created() {
		this.$store
			.dispatch('getPurchasedList', {
				pageNo: this.pageNo,
				pageSize: this.pageSize
			})
			.then(data => {
				if (data.length > 0) {
					let arr = [];
					for (let item of data) {
						arr.push({
							title: '名称：' + item.fundName,
							list: [
								{
									name: '购买数量',
									value: item.purchaseNum
								},
								{
									name: '起始日期',
									value:
										item.interestsDate.replace(/-/g, '.') +
										' - ' +
										item.settleDate.replace(/-/g, '.')
								},
								{
									name: '预估收益',
									value: item.evaIncome
								},
								{
									name: '状　　态',
									value: this.statusList[item.status]
								}
							]
						});
					}
					this.fundList = arr;
				} else {
					this.fundList = [];
				}
			})
			.catch(e => {
				this.$toast.fail({
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

