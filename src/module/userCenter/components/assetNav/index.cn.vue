<template>
  <el-tabs v-model="activeTab" @tab-click="handleClick">
    <el-tab-pane label="币钱包" name="0">币钱包</el-tab-pane>
    <el-tab-pane label="币生币" name="1">币生币</el-tab-pane>
    <el-tab-pane label="币典当" name="2">币典当</el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
	data() {
		return {
			activeTab: 0
		};
	},
	methods: {
		handleClick(tab, event) {
			this.$emit('change-tab', tab.index);
		}
	}
};
</script>
<style lang="scss">
@import './index.scss';
</style>

