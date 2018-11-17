<template>
	<div class="history-page-wrap">
		<navigation-bar :backPath="'/deposit/'+historyBackPath"></navigation-bar>
		<div class="history-page">
			<div v-if="historyList.length==0" class="no-records">
				<p class="tit">{{noRecordTitle}}</p>
				<p class="txt">{{noRecordText}}</p>
			</div>
			<div v-else class="records-list">
				<table>
					<tr class="t-header">
						<th>定存类型</th>
						<th>定存数量</th>
						<th>定存时间</th>
					</tr>
					<tr v-for="(item, index) in historyList" :key="index" class="t-body">
						<td>{{depositTypes[item.depositType]}}</td>
						<td>{{item.depositNum}}</td>
						<td>{{item.createTime}}</td>
					</tr>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import navigationBar from '@/components/navigationBar';
import Apis from '../../api';
export default {
	computed: {
		...mapGetters([
			'historyBackPath'
			// 	'historyList',
			// 	'infoId',
			// 	'noRecordTitle',
			// 	'noRecordText'
		])
	},
	data() {
		return {
			historyList: [],
			noRecordTitle: '',
			noRecordText: '',
			depositTypes: [
				'',
				'5天',
				'10天',
				'30天',
				'90天',
				'180天',
				'360天',
				'1000天'
			]
		};
	},
	created() {
		// this.$store.dispatch('initHistoryList', {
		// 	infoId: this.infoId
		// });
		Apis.getDepositList()
			.then(data => {
				if (data.code === 200) {
					this.historyList = data.data;
				} else {
					this.noRecordTitle = '无定存记录';
					this.noRecordText = '您还没有定存过~';
				}
			})
			.catch(() => {
				this.noRecordTitle = '网络异常';
				this.noRecordText = '获取不到数据了，稍后试试~';
			});
	},
	components: {
		navigationBar
	}
};
</script>

<style lang="scss" scoped>
// @import '../../assets/public.scss';
@import './index.scss';
</style>
