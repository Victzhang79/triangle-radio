<template>
	<el-dialog :visible.sync="value" width="660px" center :show-close="showCloseBtn" :close-on-click-modal="showCloseBtn" @close="closeBox(false)">
		<span slot="title" class="dialog-title">{{title}}</span>
		<div class="closeBtn" @click="closeBox(false)">
			<i class="el-icon-close"></i>
		</div>
		<div class="redeem-content">
			<span>赎回金额：</span>
			<input type="number" class="redeem-num" v-model="checkedItem.pawnNum" readonly="true" />
			<span>{{pawnCoinCodeName}}</span>
			<!-- <span class="link-btn" @click="allRedeem">全部赎回</span> -->
		</div>
		<div class="form-submit">
			<div class="submit-btn" @click="onSubmit">确认赎回</div>
		</div>
	</el-dialog>
</template>
<script>
import Api from '../../api';
import Util from '../../../../util';
export default {
	props: {
		value: Boolean,
		checkedItem: Object
	},
	data() {
		return {
			pawnCoinCodeList: Util.coinNameList,
			pawnCoinCodeName: '',
			showCloseBtn: false,
			title: '您正在进行抵押物赎回操作',
			duration: 1500
		};
	},
	watch: {
		checkedItem(val) {
			console.log(val);
			this.pawnCoinCodeName = this.pawnCoinCodeList[val.pawnCoinCode];
			this.title =
				'您正在进行' + this.pawnCoinCodeName + '抵押物赎回操作';
		}
	},
	methods: {
		closeBox(result) {
			this.$emit('closeBox', result);
		},
		onSubmit() {
			Api.redeem({
				pawnId: this.checkedItem.pawnId
			})
				.then(res => {
					if (res.code == 200) {
						this.$message({
							message: '赎回成功',
							type: 'success',
							duration: this.duration
						});
						this.closeBox(true);
					} else {
						let errInfo = res.msg || '赎回失败，请稍后重试';
						this.$message.error({
							message: errInfo,
							duration: this.duration
						});
					}
				})
				.catch(e => {
					this.$message.error({
						message: e.message,
						duration: this.duration
					});
				});
		}
	}
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>

