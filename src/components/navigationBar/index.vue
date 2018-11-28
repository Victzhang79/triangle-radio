<template>
	<div class="navigation-bar-wrap">
		<div class="navigation-bar">
			<div class="navigation">
				<p class="backBtn">
					<span class="back-icon-wrap" @click="back()" v-show="backBtn">
						<img class="backIcon" src="../../assets/imgs/back.png" alt="back">
					</span>
				</p>
				<p class="tit">{{title}}</p>
				<p v-show="extendBtn" class="extendBtn" @click="extend">{{extendTxt}}</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default() {
				return '波点钱包';
			}
		},
		backBtn: {
			type: Boolean,
			default() {
				return true;
			}
		},
		backPath: {
			type: String,
			default() {
				return '';
			}
		},
		extendBtn: {
			type: Boolean,
			default() {
				return false;
			}
		},
		extendTxt: {
			type: String,
			default() {
				return '扩展按钮';
			}
		},
		extendPath: {
			type: String,
			default() {
				return '';
			}
		}
	},
	methods: {
		back() {
			if (this.backPath === '') {
				this.$router.go(-1);
			} else {
				this.$router.push(this.backPath);
			}
		},
		extend() {
			this.$router.push(this.extendPath);
		}
	}
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
