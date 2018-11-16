<template>
	<van-popup class="dialog" v-model="show" @click-overlay="closeBox">
		<div @click="closeBox" class="close"></div>
		<h3 class="dlg-title">定存{{checkedItem.days}}天</h3>
		<div class="demo-ruleForm wrap">
			<label>
				<span class="labelTit">定存数量：</span>
				<input type="number" v-model="amount" :placeholder="placeholder" :max="TRXRemain" min="0" />
				<p class="tip">您的波场余额为{{TRXRemain}}</p>
			</label>
			<p class="btn-line">
				<button @click="onSubmit" class="btn">确定</button>
			</p>
		</div>
	</van-popup>
</template>

<script>
import Api from '../../api';
import * as types from '../../store/mutation-types';

export default {
	props: {
		value: Boolean,
		checkedItem: Object,
		TRXRemain: [Number, String]
	},
	data() {
		return {
			show: this.value,
			amount: undefined,
			placeholder: '请输入定存数量',
			duration: 1500
		};
	},
	watch: {
		value(val) {
			this.show = val;
		},
		show(val) {
			this.$emit('input', val);
		}
	},
	methods: {
		closeBox() {
			this.show = false;
		},
		onSubmit() {
			if (typeof this.amount == 'undefined') {
				this.$toast({
					message: '请填写不少于1000的定存数量',
					duration: this.duration
				});
				return false;
			}
			if (this.amount < this.checkedItem.min) {
				this.$toast({
					message: '定存数量不能少于' + this.checkedItem.min + '个',
					duration: this.duration
				});
				return false;
			}
			if (Number(this.amount) > Number(this.TRXRemain)) {
				this.$toast({
					message: '最多可定存' + this.TRXRemain + '个',
					duration: this.duration
				});
				return false;
			}
			Api.deposit({
				depositType: this.checkedItem.type,
				depositNum: Number(this.amount)
			})
				.then(res => {
					if (res.code == 200) {
						this.$toast({
							message: '定存成功',
							duration: this.duration
						});
						setTimeout(() => {
							this.$store.commit(
								types.SET_DIPOSIT,
								this.checkedItem.type - 1
							);
							this.closeBox();
							this.$router.push('/');
						}, this.duration);
					} else {
						let errInfo = res.msg || '定存失败，请稍后重试';
						this.$toast({
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
