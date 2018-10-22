<template>
	<top-menu>
		<ul class="nav-menu">
			<li @click="()=>{this.hideMenuVisible=!this.hideMenuVisible;}">
				<img class="list-btn" src="../../assets/imgs/hiden_list.png" alt="展开">
				<transition name="slide">
					<ul v-show="hideMenuVisible" class="hide-list">
						<li :class="{active: activePage === 'about'}">
							<a :href="HOST+'/m/about'">关于我们</a>
						</li>
						<li :class="{active: activePage === 'usercenter'}">
							<a :href="HOST+(isLog?'/m/userCenter':'/m/userEntry')">用户中心</a>
						</li>
						<li @click="logOut" v-if="isLog">退出登录</li>
					</ul>
				</transition>
			</li>
			<li :class="{active: activePage === 'pawn'}">
				<a :href="HOST+'/m/pawn'">典当</a>
			</li>
			<li :class="{active: activePage === 'coins'}">
				<a :href="HOST+'/m/coins'">基金理财</a>
			</li>
			<li :class="{active: activePage === 'home'}">
				<a :href="HOST+'/m'">主页</a>
			</li>
		</ul>
	</top-menu>
</template>

<script>
import topMenu from '../topMenu/index';
import Cookie from 'js-cookie';
export default {
	name: 'topBar',
	props: {
		activePage: String
	},
	data() {
		return {
			hideMenuVisible: false,
			isLog: !!Cookie.get('token'),
			HOST: '//' + window.location.host
		};
	},
	methods: {
		logout() {
			Cookie.remove('token');
			window.location.href =
				window.location.protocol +
				'//' +
				window.location.host +
				'/m/userEntry';
		}
	},
	components: {
		topMenu
	}
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
