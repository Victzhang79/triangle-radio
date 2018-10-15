<template>
  <div>
    <topbar></topbar>
    <footer-cn></footer-cn>
  </div>
</template>
<script>
import topbar from '../../components/topbar/index_cn';
import footerCn from '../../components/footer/index_cn';
export default {
	components: {
		topbar,
		footerCn
	}
};
</script>
<style lang="scss" scoped>
@import '../../../../assets/style/public.scss';
</style>

