import Util from '@/util';
// const HOST = 'http://apimanage.58corp.com/';// mock
const HOST = Util.DOMAIN;// 线上


const getUserWalletDetailPath = HOST + 'getUserWalletDetail' + '?mock_apiId=5bf5f5efc885a401c5e425eb'; //获取用户资金变动明细
const getUserTotalAssetPath = HOST + 'getUserTotalAsset' + '?mock_apiId=5bfe9379b54dce8fa2c7cbe7';//获取用户总资产


export {
	getUserWalletDetailPath,
	getUserTotalAssetPath
}