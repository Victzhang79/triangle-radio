<template>
	<van-popup class="dialog" v-model="value">
		<div @click="closeBox" class="close"></div>
		<h3 class="dlg-title">{{title}}</h3>
		<form class="demo-ruleForm wrap">

			<label>
				<span class="labelTit">赎回金额：</span>
				<input type="number" class="redeem-num" v-model="checkedItem.pawnNum" readonly="true" />
				<span>{{pawnCoinCodeName}}</span>
			</label>

			<p class="btn-line">
				<button @click="onSubmit" class="btn">全部赎回</button>
			</p>
		</form>
	</van-popup>
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
			title:
				'您正在进行' +
				Util.coinNameList[this.pawnCoinCode] +
				'抵押物赎回操作',
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
			this.$emit('input', false);
		},
		onSubmit() {
			Api.redeem({
				pawnId: this.checkedItem.pawnId
			})
				.then(res => {
					if (res.code == 200) {
						this.$toast({
							message: '赎回成功',
							type: 'success',
							duration: this.duration
						});
						this.closeBox(true);
					} else {
						let errInfo = res.msg || '赎回失败，请稍后重试';
						this.$toast.fail({
							message: errInfo,
							duration: this.duration
						});
					}
				})
				.catch(e => {
					this.$toast.fail({
						message: e.message,
						duration: this.duration
					});
				});
		}
	}
};
</script>

<style lang="scss" scoped>
@import '../../../../assets/style/dialog.scss';
@import './index.scss';
</style>
