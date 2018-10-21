<template>
	<div class="app">
		<top-bar activePage="coins">
		</top-bar>
		<head-banner></head-banner>
		<div class="main">
			<recommend></recommend>
			<list :fundList="fundList" :totalNum='total_fundNum' :pageNo="pageNo" @gotoPage="gotoPage"></list>
		</div>
		<footer-bar>
		</footer-bar>
	</div>
</template>
<script>
import topBar from '../../../../components/header/cn';
import footerBar from '../../../../components/footer';
import headBanner from '../../components/headBanner/cn';
import recommend from '../../components/recommend/cn';
import list from '../../components/list/cn';
import { mapGetters } from 'vuex';
export default {
	data() {
		return {
			pageNo: 0
		};
	},
	components: {
		topBar,
		footerBar,
		headBanner,
		recommend,
		list
	},
	computed: {
		...mapGetters(['fundList', 'total_fundNum']),
		recommendList() {
			if (this.fundList.length > 0) {
				return this.fundList.slice(0, 4);
			}
			return [];
		}
	},
	methods: {
		gotoPage(pageNo) {
			this.pageNo = pageNo;
			this.$store.dispatch('getFundList', { pageNo: pageNo });
		}
	},
	created() {
		this.$store.dispatch('getFundList');
	}
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
