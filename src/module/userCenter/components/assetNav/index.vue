<template>
	<div class="second-tab">
		<van-tabs v-model="activeTab" :class="{showFour: isShareholder}" @change="handleClick">
			<van-tab title="币钱包"></van-tab>
			<van-tab title="基金理财"></van-tab>
			<van-tab title="币典当"></van-tab>
			<van-tab title="代持" v-if="isShareholder"></van-tab>
		</van-tabs>
	</div>
</template>
<script>
import Cookie from 'js-cookie';
export default {
	data() {
		return {
			activeTab: 0,
			isShareholder: false
		};
	},
	created() {
		let isHolder = Cookie.get('isHolder');
		if (isHolder == 1) {
			this.isShareholder = true;
		}
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

