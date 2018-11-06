<template>
	<div class="left-nav">
		<div class="nav-list">
			<ul>
				<li v-for="(item, index) in navList" class="nav-item" :class="{active: index === currentIndex}" :key="index" @click="jump(item.path)">
					{{item.name}}
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		currentIndex: Number
	},
	data() {
		return {
			navList: [
				{ name: '资产状况', class: 'icon-asset', path: '/' },
				{
					name: '安全设置',
					class: 'icon-setting',
					path: '/security'
				},
				{
					name: '身份认证',
					class: 'icon-user',
					path: '/identification'
				}
			]
		};
	},
	methods: {
		jump(path) {
			this.$router.push(path);
		}
	}
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>

