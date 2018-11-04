import Util from '@/util';

const HOST = Util.DOMAIN;

const qryTransPriceListPath = HOST + 'qryTransPriceList' + '?mock_apiId=5bd7a62ee207ad01a393fd88';
const submitOrderPath = HOST + 'submitOrder' + '?mock_apiId=5bd7a9a64fb9700191a79aea';
const qryWalletInfoByCoinCodePath = HOST + 'qryWalletInfoByCoinCode' + '?mock_apiId=5b95066143f4b33e734504e7';

export {
	qryTransPriceListPath,
	submitOrderPath,
	qryWalletInfoByCoinCodePath
}