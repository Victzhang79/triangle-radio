<template>
	<div class="app">
		<!-- <left-nav :currentIndex="2"></left-nav> -->
		<identifi-form></identifi-form>
	</div>
</template>
<script>
// import leftNav from '../../components/leftNav/index.cn';
import identifiForm from '../../components/IdentifiForm/index';
export default {
	components: {
		// leftNav,
		identifiForm
	},
	created() {
		// 获取页面数据
		this.$store
			.dispatch('initIdentiStatus')
			.then(data => {
				if (data.code == 200) {
					if (
						(data.data && data.data.credentStatus) == 0 ||
						(data.data && data.data.credentStatus) == 2
					)
						this.$store.dispatch('initNationList', '1');
				} else {
					this.$toast.fail('获取认证状态失败，请稍后重试。');
				}
			})
			.catch(err => {
				// this.$toast.fail('网络异常，稍后重试');
			});
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
