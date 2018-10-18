<template>
	<van-popup v-model="show" class="dialog">
		<div @click="close" class="close"></div>
		<slot>
			<p>内容</p>
		</slot>
	</van-popup>
	<!-- <h1>dialog</h1> -->
</template>

<script>
import Vue from 'vue';
import { Popup } from 'vant';
Vue.use(Popup);
export default {
	props: {
		visiable: Boolean
	},
	data() {
		return {
			show: true
		};
	},
	watch: {
		visiable() {
			this.show = this.visiable;
		}
	},
	methods: {
		close() {
			this.$emit('close');
		}
	}
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
