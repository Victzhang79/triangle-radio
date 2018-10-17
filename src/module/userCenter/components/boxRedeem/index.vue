<template>
	<el-dialog :title="title" :visible.sync="show" width="660px" center :show-close="showCloseBtn" :close-on-click-modal="showCloseBtn" @close="closeBox">
		<div class="closeBtn" @click="closeBox">
			<i class="el-icon-close"></i>
		</div>
		<div class="redeem-content">
			<span>赎回金额：</span>
			<input type="number" min="0" :max="totel" placeholder="0" :value="redeemNumber" />
			<span>{{unit}}</span>
			<span class="link-btn" @click="allRedeem">全部赎回</span>
		</div>
		<div class="form-submit">
			<div class="submit-btn" @click="onSubmit">赎回</div>
		</div>
		</div>
		</div>
		</div>
	</el-dialog>
</template>
<script>
export default {
	props: {
		value: Boolean,
		address: String,
		unit: String,
		totel: Number
	},
	data() {
		return {
			showCloseBtn: false,
			show: false,
			redeemNumber: '',
			title: '您正在进行' + this.unit + '抵押物赎回操作',
			chargeQrcode: 'http://www.aoabank.com/qrcode.81bb422e.png'
		};
	},
	watch: {
		value(val) {
			this.show = val;
		}
	},
	methods: {
		closeBox() {
			this.show = false;
			this.$emit('closeBox');
		},
		allRedeem() {
			this.redeemNumber = this.totel;
		},
		onSubmit() {
			// this.pageForm.
			// this.$store.dispatch('withdrawCash', this.pageForm);
		},
		gotoSetPwd() {
			console.log('gotopwd');
		},
		onCopy() {
			this.$message({
				message: '复制成功',
				type: 'success',
				duration: 1000
			});
		}
	}
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>

