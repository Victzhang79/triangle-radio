<template>
	<div class="property-page">
		<navigation-bar :backPath="'/security'" :title="'推荐关系'"></navigation-bar>
		<div class="userInfo-wrap">
			<img class="logo" src="~@/assets/imgs/logo.png" alt="波点钱包">
		</div>
		<!-- <p class="relation-tit">我的上级：</p> -->
		<!-- <div v-if="leaderName" class="leader">
			<div class="left">
				<p class="name">{{leaderName}}</p>
			</div>
			<div class="right">
				<p class="phone">{{leaderPhone}}</p>
			</div>			
		</div>
		<div v-else class="leader">
			<p class="name">无上级</p>
		</div> -->

		<!-- <p class="relation-tit">我的一级下级：</p> -->
		<relation-list  v-if="relationList.length >0" :list="relationList"></relation-list>
		<div v-else class="leader">
			<p class="name">无下级</p>
		</div>

		<pager v-show="totalNum>pageSize" :pageNo="pageNo" :pageSize="pageSize" :totalNum="totalNum" @change="pageChange" class="pager"></pager>
	</div>
</template>

<script>
import navigationBar from '@/components/navigationBar';
import RelationList from '../../components/relationList';
import Pager from '@/components/pager';
import {
	qryUserSubOneList,
	getUserLeaderInfo
} from '../../api/relationship.js';
export default {
	data() {
		return {
			// tabChose: 0,
			leaderName: '',
			leaderPhone: ' ',
			relationList: [],
			pageNo: 1,
			totalNum: 0,
			pageSize: 10,
			requested: false
		};
	},
	created() {
		this.updateRelationList();
		this.getLeaderInfo();
	},
	methods: {
		// changeTab(index) {
		// 	if (this.tabChose === index) {
		// 		return;
		// 	}
		// 	this.tabChose = index;
		// }
		getLeaderInfo() {
			getUserLeaderInfo()
				.then(data => {
					if (data.code === 200) {
						this.leaderPhone = data.data&&data.data.userMobile;
						this.leaderName = data.data&&data.data.userName;
					}
					this.requested = true;
				})
				.catch(() => {
					this.$toast.fail('网路异常，稍后重试。');
				});
		},
		updateRelationList() {
			qryUserSubOneList(this.pageNo, this.pageSize)
				.then(data => {
					if (data.code === 200) {
						this.totalNum = data.totalNum;
						this.relationList = data.data;
					}
				})
				.catch(() => {
					this.$toast.fail('网路异常，稍后重试。');
				});
		},
		pageChange(page) {
			this.pageNo = page;
			this.updateRelationList();
		}
	},
	components: {
		navigationBar,
		RelationList,
		Pager
	}
};
</script>

<style lang="scss">
@import './index.scss';
</style>
