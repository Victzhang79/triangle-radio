<template>
	<div>
		<top-bar activePage="home">
		</top-bar>
		<div class="header">
			<h1 class="header-title">KOOBANK克班克——数字资产管理集团-投资银行</h1>
			<p class="header-content">* 由前VISA、Standard Chartered Bank、JPMorgan、Microsoft、VCSIG等高管联合创建。</p>
			<p class="header-content">* 团队具有超过十年以上金融证券投资、家族财富管理、私募股权投资经验。</p>
			<p class="header-content">* 聚焦数字资产配置与管理，去中心化的数字资产管理未来解决方案。</p>
			<p class="header-content">* 提供机构资产管理、基金投资、个人资管（存、贷、基金超市）、资管链、投行咨询业务。</p>
			<!-- <a href="http://www.KOOBANK.com/ANK链白皮书.pdf" class="download" download="KOOBANK白皮书">白皮书下载</a> -->
		</div>
		<div class="main">
			<div class="main-content">
				<h3 class="main-content-title">KOOBANK克班克 基金理财、数字资产典当 来了！</h3>
				<p class="main-content-msg">继2017年推出数字资产投资基金、区块链应用研究院之后，KOOBANK推出数字资产“典当币”（目前支持20多个币种的典当），依托于海量高净值LP与VC资源，相继推出数字资产KBK FOF基金、AOK理财基金、量化固收基金等产品。期待与行业专业基金机构、优秀项目、社群开展广泛合作。</p>
			</div>
			<div class="main-item bg-grey">
				<h3 class="main-content-title">用户资金安全性</h3>
				<p class="main-content-msg">用户资产存在相应币种冷钱包，隔离存放，我们服务器不会中心化存储用户资产。同时，采用多种方式保护用户私钥安全，诸如多级验证，冷热钱包备份等。 </p>
				<img src="../../assets/imgs/anquan.png" alt="" class="main-content-img">
			</div>
			<div class="main-item">
				<h3 class="main-content-title">基金产品真实可靠</h3>
				<p class="main-content-msg">我们对进驻平台的基金采取理财保证金制，即基金产品在进驻我平台的同时，会质押一定比例的币资金，放在指定地址，在一定程度上确保资金安全，最大限度规避跑路或者挤兑风险，在保证理财产品收益的同时，有效保障投资者的资金安全。</p>
				<img src="../../assets/imgs/kekao.png" alt="" class="main-content-img">
			</div>
			<div class="main-item bg-grey">
				<h3 class="main-content-title">一流的资金容纳深度</h3>
				<p class="main-content-msg">现在，高收益率的币基金供不应求，基金质量也良莠不齐，而我们每个季度会主动淘汰成长性差的基金产品，引入成长性高的基金产品，并对基金产品的持仓进行完整披露，在此基础上确保投资者有更多基金可选，最终成为容纳百亿的资管平台。</p>
				<img src="../../assets/imgs/yiliu.png" alt="" class="main-content-img">
			</div>
			<div class="main-item">
				<h3 class="main-content-title">安全多样的典当币种</h3>
				<p class="main-content-msg">不仅支持主流币种的典当，也支持TTF,SEXC等小币种的典当，更多典当币种正在上线中，是目前支持最多典当币种的平台。同时提供完善的全流程服务，诸如平仓报警，平仓险已获诸多用户好评。</p>
				<img src="../../assets/imgs/fengxi.png" alt="" class="main-content-img">
			</div>
			<div class="main-media">
				<h2 class="main-media-title">
					合作媒体
					<span class="main-media-title-tips">Associated Media</span>
				</h2>
				<ul class="main-media-content clear">
					<li>
						<a target="_blank" href="http://finance.dailyherald.com/dailyherald/news/read/36634220/">
							<img src="../../assets/imgs/dailyherald.png" alt="">
						</a>
					</li>
					<li>
						<a target="_blank" href="http://markets.financialcontent.com/stocks/news/read/36634220">
							<img src="../../assets/imgs/financialcontent.png" alt="">
						</a>
					</li>
					<li>
						<a href="http://finance.jsonline.com/jsonline/news/read/36634220/" target="_blank">
							<img src="../../assets/imgs/jsonline.png" alt="">
						</a>
					</li>
					<li>
						<a href="http://investor.wallstreetselect.com/wss/news/read/36634220/" target="_blank">
							<img src="../../assets/imgs/wallstreetselect.gif" alt="">
						</a>
					</li>
					<li>
						<a href="http://iw-us-500.industryweek.com/industryweek/news/read/36634220" target="_blank">
							<img src="../../assets/imgs/industryweek.png" alt="">
						</a>
					</li>
					<li>
						<a href="http://thenumbers.marketplace.org/publicradio/news/read/36634220" target="_blank">
							<img src="../../assets/imgs/marketplace.png" class="h" alt="">
						</a>
					</li>
				</ul>
			</div>
			<div class="main-agency">
				<h2 class="main-agency-title">
					投资机构
					<span class="main-agency-title-tips">Investment agency</span>
				</h2>
				<ul class="main-agency-content clear">
					<li>
						<a target="_blank" href="http://www.koobank.com/">
							<img class="agency-img" src="../../assets/imgs/kbjt.png" alt="">
						</a>
					</li>
					<li>
						<a href="javascript:;" target="_blank">
							<img src="../../assets/imgs/ys.jpg" alt="">
						</a>
					</li>
					<li>
						<a href="http://www.esfund.com.cn/" target="_blank">
							<img src="../../assets/imgs/esfund.png" alt="">
						</a>
					</li>
				</ul>
			</div>
		</div>
		<footer-bar></footer-bar>
	</div>
</template>

<script>
import topBar from '../../../../components/header/cn';
import footerBar from '../../../../components/footer';
export default {
	components: {
		topBar,
		footerBar
	}
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>


