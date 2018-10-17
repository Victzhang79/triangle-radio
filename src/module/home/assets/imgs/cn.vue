<template>
	<div>
		<topbar></topbar>
		<div class="header">
			<h1 class="header-title">AOABANK：安全、方便、低息的数字资产理财平台</h1>
			<p class="header-content">* 支持全球多种数字资产进行典当：BTC，ETH，EOS，OKB，BNB，HT等所有价值数字资产</p>
			<p class="header-content">* 采用智能合约，多签名钱包等安全技术</p>
			<p class="header-content">* 最高60%比例！最快10分钟！USDT立即领走</p>
			<p class="header-content">* 成熟安全的风控模型！多方监管的资金账户！</p>
			<!-- <a href="http://www.aoabank.com/ANK链白皮书.pdf" class="download" download="AOABANK白皮书">白皮书下载</a> -->
		</div>
		<div class="main">
			<div class="main-content">
				<h3 class="main-content-title">AOABANK来了！</h3>
				<p class="main-content-msg">AOABANK是专门提供数字资产理财的专业性平台。是业内首次提出“典当币”业务的平台，目前支持多个币种的典当，服务了数以万计的投资者。此外，平台依托于专业基金机构，即将推出虚拟货币基金产品，敬请期待。</p>
			</div>
			<div class="main-item bg-grey">
				<h3 class="main-content-title">用户资金安全性</h3>
				<p class="main-content-msg">用户资产存在相应币种冷钱包，隔离存放，我们服务器不会中心化存储用户资产。同时，采用多种方式保护用户私钥安全，诸如多级验证，冷热钱包备份等。 </p>
				<img src="./imgs/anquan.png" alt="" class="main-content-img">
			</div>
			<div class="main-item">
				<h3 class="main-content-title">基金产品真实可靠</h3>
				<p class="main-content-msg">我们对进驻平台的基金采取理财保证金制，即基金产品在进驻我平台的同时，会质押一定比例的币资金，放在指定地址，在一定程度上确保资金安全，最大限度规避跑路或者挤兑风险，在保证理财产品收益的同时，有效保障投资者的资金安全。</p>
				<img src="./imgs/kekao.png" alt="" class="main-content-img">
			</div>
			<div class="main-item bg-grey">
				<h3 class="main-content-title">一流的资金容纳深度</h3>
				<p class="main-content-msg">现在，高收益率的币基金供不应求，基金质量也良莠不齐，而我们每个季度会主动淘汰成长性差的基金产品，引入成长性高的基金产品，并对基金产品的持仓进行完整披露，在此基础上确保投资者有更多基金可选，最终成为容纳百亿的资管平台。</p>
				<img src="./imgs/yiliu.png" alt="" class="main-content-img">
			</div>
			<div class="main-item">
				<h3 class="main-content-title">安全多样的典当币种</h3>
				<p class="main-content-msg">不仅支持主流币种的典当，也支持TTF,SEXC等小币种的典当，更多典当币种正在上线中，是目前支持最多典当币种的平台。同时提供完善的全流程服务，诸如平仓报警，平仓险已获诸多用户好评。</p>
				<img src="./imgs/fengxi.png" alt="" class="main-content-img">
			</div>
			<div class="main-media">
				<h2 class="main-media-title">
					合作媒体
					<span class="main-media-title-tips">Associated Media</span>
				</h2>
				<ul class="main-media-content clear">
					<li>
						<a target="_blank" href="http://finance.dailyherald.com/dailyherald/news/read/36634220/">
							<img src="./imgs/dailyherald.png" alt="">
						</a>
					</li>
					<li>
						<a target="_blank" href="http://markets.financialcontent.com/stocks/news/read/36634220">
							<img src="./imgs/financialcontent.png" alt="">
						</a>
					</li>
					<li>
						<a href="http://finance.jsonline.com/jsonline/news/read/36634220/" target="_blank">
							<img src="./imgs/jsonline.png" alt="">
						</a>
					</li>
					<li>
						<a href="http://investor.wallstreetselect.com/wss/news/read/36634220/" target="_blank">
							<img src="./imgs/wallstreetselect.gif" alt="">
						</a>
					</li>
					<li>
						<a href="http://iw-us-500.industryweek.com/industryweek/news/read/36634220" target="_blank">
							<img src="./imgs/industryweek.png" alt="">
						</a>
					</li>
					<li>
						<a href="http://thenumbers.marketplace.org/publicradio/news/read/36634220" target="_blank">
							<img src="./imgs/marketplace.png" class="h" alt="">
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
							<img class="agency-img" src="./imgs/kbjt.png" alt="">
						</a>
					</li>
					<li>
						<a href="javascript:;" target="_blank">
							<img src="./imgs/ys.jpg" alt="">
						</a>
					</li>
					<li>
						<a href="http://www.esfund.com.cn/" target="_blank">
							<img src="./imgs/esfund.png" alt="">
						</a>
					</li>
				</ul>
			</div>
		</div>
		<footer-cn></footer-cn>
	</div>
</template>
<script>
import topBar from '../../../../components/header/cn';
import footerBar from '../../../../components/footer';
export default {
	components: {
		topbar,
		footerCn
	}
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>

