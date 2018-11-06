<template>
	<div class="left-nav">
		<div class="title">
			<span class="nav-title">User Center</span>
		</div>
		<div class="nav-list">
			<ul>
				<li v-for="(item, index) in navList" class="nav-item" :class="{active: index === currentIndex}" :key="index" @click="jump(item.path)">
					<i :class="item.class" class="icon"></i>
					<span>{{item.name}}</span>
					<i class="arrow el-icon-caret-right"></i>
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
				{ name: 'Asset Status', class: 'icon-asset', path: '/' },
				{
					name: 'Security Setting',
					class: 'icon-setting',
					path: '/security'
				},
				{
					name: 'ID authentication',
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
.nav-list {
	text-align: left;
}
</style>

