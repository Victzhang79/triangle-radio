<template>
	<div class="second-tab">
		<van-tabs v-model="activeTab" @change="handleClick">
			<van-tab title="币钱包"></van-tab>
			<van-tab title="币生币"></van-tab>
			<van-tab title="币典当"></van-tab>
		</van-tabs>
	</div>
</template>
<script>
export default {
	data() {
		return {
			activeTab: 0
		};
	},
	methods: {
		handleClick(index, title) {
			this.$emit('change-tab', index);
		}
	}
};
</script>
<style lang="scss">
@import './index.scss';
</style>

