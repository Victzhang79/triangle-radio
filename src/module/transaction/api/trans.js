import http from '@/util/http';
import {
	qryTransPriceListPath,
	submitOrderPath,
	qryWalletInfoByCoinCodePath
} from './maps/trans';

/**查询交易价格列表接口
 */
function qryTransPriceList() {
	return http.get(qryTransPriceListPath);
}

/**提交订单接口
 * @param {number} coinCode 价格币种代码 1：USDT、2：BTC、3：ETH、4：TTF
 * @param {string} buyPrice 购买价格
 * @param {string} buyNum 购买数量
 */
function submitOrder(coinCode, buyPrice, buyNum) {
	return http.post(submitOrderPath, {
		coinCode,
		buyPrice,
		buyNum
	});
}

/**查询用户指定币种的钱包信息
 * @param {string} coinCode 币种代码：1：USDT、2：BTC、3：ETH、4：TTF、5：SEXC、6：XMX
 */
function qryWalletInfoByCoinCode(coinCode) {
	return http.get(qryWalletInfoByCoinCodePath + '&coinCode=' + coinCode);
}

export {
	qryTransPriceList,
	submitOrder,
	qryWalletInfoByCoinCode
}