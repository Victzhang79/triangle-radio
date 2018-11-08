<template>
	<div class="app">
		<navigation-bar></navigation-bar>
		<div class="deposit-list">
			<div v-for="(item, index) in list" :key="index" class="deposit-item">
				<span class="deposit-mes">定存{{item.days}}，日利率{{item.rate}}</span>
				<van-switch :value="checked" size="36px" active-color="#4b0" inactive-color="#f44" @input="onInput" />
			</div>
		</div>
	</div>
</template>
<script>
import navigationBar from '@/components/navigationBar';
export default {
	components: {
		navigationBar
	},
	data() {
		return {
			checked: true,
			list: [{}]
		};
	},

	methods: {
		onInput(checked) {
			console.log(checked);
		}
	}
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
