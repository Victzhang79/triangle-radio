<template>
	<div class="topbar">
		<div class="topbar-content">
			<a href="http://www.aoabank.com/cn" class="logo">
			</a>
			<ul class="nav-menu">
				<li>
					<a href="http://www.aoabank.com/" class="nav-menu-link active">Home</a>
				</li>
				<li>
					<a href="http://www.aoabank.com/pawn" class="nav-menu-link">Pawn</a>
				</li>
				<li>
					<a href="http://www.aoabank.com/usercenter" class="nav-menu-link">UserCenter</a>
				</li>
				<li class="nav-menu-link language" @mouseenter="showLanguageList" @mouseleave="hideLanguageList">
					English
					<ul class="language-list" :class="{hidden: !show}">
						<li>
							<a class="language-list-item" @click="switchCn">中文</a>
						</li>
						<li>
							<a @click="switchEn" class="language-list-item">English</a>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	name: 'topBar',
	data() {
		return {
			show: false
		};
	},
	methods: {
		showLanguageList() {
			this.show = true;
		},
		hideLanguageList() {
			this.show = false;
		},
		switchCn() {
			let path = this.$route.path;
			if (!this.endWith(path, '/cn')) {
				let switchPath = path + '/cn';
				this.$router.push(switchPath);
			}
		},
		switchEn() {
			let path = this.$route.path;
			if (this.endWith(path, '/cn')) {
				let switchPath = path.substring(0, path.length - 2);
				this.$router.push(switchPath);
			}
		},
		endWith(str, endWithStr) {
			if (
				endWithStr == null ||
				endWithStr == '' ||
				str.length == 0 ||
				endWithStr.length > str.length
			) {
				return false;
			}
			if (str.substring(str.length - endWithStr.length) == endWithStr) {
				return true;
			} else {
				return false;
			}
		},
		changeLanguage(lang) {}
	}
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
