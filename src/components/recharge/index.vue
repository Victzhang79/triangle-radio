<template>
	<van-popup class="dialog" v-model="show" @click-overlay="closeBox">
		<div @click="closeBox" class="close"></div>
		<h2 class="title">充值操作</h2>
		<h3 class="dlg-title">您正在进行{{coinNameList[item.coinCode]}}充值操作</h3>
		<div class="demo-ruleForm wrap">
			<p class="item-title">{{coinNameList[item.coinCode]}}钱包地址：</p>
			<p class="address" v-clipboard:copy="item.walletAddr" v-clipboard:success="onCopy">{{item.walletAddr}}</p>
			<p><span class="link-btn" v-clipboard:copy="item.walletAddr" v-clipboard:success="onCopy" v-clipboard:error="copyError">复制</span></p>
			<p class="btn-line">
				<button @click="closeBox" class="btn">确定</button>
			</p>
		</div>
	</van-popup>
</template>

<script>
import Util from '../../util';
export default {
	props: {
		value: Boolean,
		item: Object
	},
	data() {
		return {
			show: this.value,
			title: '充值操作',
			ISFALSE: false,
			coinNameList: Util.coinNameList
		};
	},
	watch: {
		value(val) {
			this.show = val;
		}
	},
	methods: {
		closeBox() {
			this.$emit('input', false);
		},
		onCopy() {
			this.$toast({
				message: '复制成功',
				duration: 1000
			});
		},
		copyError() {
			this.$toast({
				message: '复制失败，请手动复制',
				duration: 1000
			});
		}
	}
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
