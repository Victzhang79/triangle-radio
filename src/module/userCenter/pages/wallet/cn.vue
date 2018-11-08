<template>
	<div class="app">
		<head-banner></head-banner>
		<coin-list></coin-list>
	</div>
</template>
<script>
import headBanner from '../../components/headBanner';
import coinList from '../../components/coinList';
export default {
	components: {
		headBanner,
		coinList
	}
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
