<template>
	<van-popup class="dialog" v-model="show">
		<div @click="closeBox" class="close"></div>
		<h3 class="dlg-title">出售代持</h3>
		<div class="demo-ruleForm wrap">
			<label>
				<span class="labelTit">出售个数：</span>
				<input type="number" v-model="sellNum" :placeholder="placeholder" :max="cansellNum" />
				<p class="tip">备注：代持出售后，我们的工作人员会按市场价出售，出售金额会按您指定的方式返还给您，感谢您的支持！</p>
			</label>

			<p class="btn-line">
				<button @click="onSubmit" class="btn">出售</button>
			</p>
		</div>
	</van-popup>
</template>

<script>
import Api from '../../api';
import Util from '../../../../util';
export default {
	props: {
		value: Boolean,
		cansellNum: Number
	},
	data() {
		return {
			show: this.value,
			sellNum: '',
			placeholder: '最多可出售' + this.maxSale + '个',
			duration: 1500
		};
	},
	watch: {
		value(val) {
			this.show = val;
		},
		cansellNum(val) {
			this.placeholder = '最多可出售' + val + '个';
		}
	},
	methods: {
		closeBox() {
			this.$emit('input', false);
		},
		onSubmit() {
			if (this.sellNum > this.cansellNum) {
				this.$toast.fail({
					message: '最多可出售' + this.cansellNum + '个',
					duration: this.duration
				});
				return false;
			}
			Api.sellCoin(this.sellNum)
				.then(res => {
					if (res.code == 200) {
						this.$toast({
							message: '出售成功',
							duration: this.duration
						});
						this.closeBox();
						this.$emit('saleSuccess');
					} else {
						let errInfo = res.msg || '出售失败，请稍后重试';
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
