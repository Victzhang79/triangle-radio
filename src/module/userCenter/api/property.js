import http from '@/util/http';
import { getUserWalletDetailPath, getUserTotalAssetPath } from './maps/property';

/**
 * 获取用户资金变动明细
 * @param {number} pageNo 分页号码
 * @param {number} pageSize 分页大小
 */
function getUserWalletDetail(pageNo, pageSize) {
	return http.get(getUserWalletDetailPath + '&pageNo=' + pageNo + '&pageSize=' + pageSize);
}

/**
 * 获取用户总资产
 */
function getUserTotalAsset() {
	return http.get(getUserTotalAssetPath);
}

export {
	getUserWalletDetail,
	getUserTotalAsset
}