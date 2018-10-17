<template>
	<div class="app">
		<el-container>
			<el-aside>
				<left-nav :currentIndex="1">
				</left-nav>
			</el-aside>
			<el-main>
				<security-list></security-list>
			</el-main>
		</el-container>
	</div>
</template>
<script>
import leftNav from '../../components/leftNav/index.cn';
import securityList from '../../components/securityList';
export default {
	components: {
		leftNav,
		securityList
	},
	created() {
		// 获取页面数据
		this.$store.dispatch('getSecurityInfo');
	},
	methods: {}
};
</script>
<style lang="scss" scoped>
.app {
	width: 100%;
	height: 100%;
}
.el-container {
	display: -ms-flexbox;
	display: flex;
	-ms-flex-direction: row;
	flex-direction: row;
	-ms-flex: 1;
	flex: 1;
	-ms-flex-preferred-size: auto;
	flex-basis: auto;
	box-sizing: border-box;
	width: 100%;
	height: 100%;
}
.el-aside {
	background: #f9f9f9;
	box-shadow: inset 1px 4px 8px 0 rgba(236, 236, 236, 0.5);
	width: 240px !important;
}
.el-main {
	padding: 30px;
	background: #ffffff;
}
</style>
