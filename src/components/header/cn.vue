<template>
	<div class="topbar">
		<a href=":;" class="title">AOABANK</a>
		<ul class="nav-menu">
			<li>
				<a href="/m/cn" class="active">主页</a>
			</li>
			<li>
				<a href="/m/cn/pawn">典当</a>
			</li>
			<!-- <li>
				<a href="/m/cn/qa">问答</a>
			</li>
			<li>
				<a href="/m/cn/team">团队</a>
			</li> -->
			<li class="language" id='language'>
				<a href="javascript:;">中文</a>
				<ul class="language-list clear" id="languageList">
					<li class="language-item">
						<a href="/m/cn">中文</a>
					</li>
					<li class="language-item">
						<a href="/m">English</a>
					</li>
				</ul>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'topBar',
	props: {
		activePage: String
	},
	data() {
		return {
			show: false,
			HOST: window.location.host
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
				this.changeLanguage('cn');
			}
		},
		switchEn() {
			let path = this.$route.path;
			if (this.endWith(path, '/cn')) {
				// let switchPath = path.substring(0, path.length - 2);
				// this.$router.push(switchPath);
				this.changeLanguage('en');
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
		changeLanguage(lang) {
			if (lang === 'cn') {
				let path = this.$route.path;
				path += path.slice(-1) === '/' ? '' : '/';
				path += 'cn';
				this.$router.push(path);
			} else if (lang === 'en') {
				this.$router.push(this.$route.path.slice(0, -2));
			} else {
				return false;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
