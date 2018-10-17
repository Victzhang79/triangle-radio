<template>
  <el-tabs v-model="activeTab" @tab-click="handleClick">
    <el-tab-pane label="Coin Purse" name="0">Coin Purse</el-tab-pane>
    <el-tab-pane label="Coins" name="1">Coins</el-tab-pane>
    <el-tab-pane label="Coin Pawns" name="2">Coin Pawns</el-tab-pane>
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

