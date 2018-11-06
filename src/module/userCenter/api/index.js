import http from '@/util/http';
import Util from '@/util';

export default {
  // 获取用户币钱包列表信息
  getWalletList: () => {
    return http.get(
      Util.DOMAIN + 'qryWalletInfo?mock_apiId=5b7fc3374748e0193cfa5d49'
    );
  },

  // 获取用户币指定币种的钱包信息
  getWalletInfoByCoinCode: coinCode => {
    return http.get(
      Util.DOMAIN +
        'qryWalletInfoByCoinCode?coinCode=' +
        coinCode +
        '&mock_apiId=5b95066143f4b33e734504e7'
    );
  },

  // 获取币生币基金列表
  getFundList: params => {
    return http.get(
      Util.DOMAIN +
        'qryFundList?pageNo=' +
        params.pageNo +
        '&pageSize=' +
        params.pageSize +
        '&mock_apiId=5b7fd2072fec1119249c3951'
    );
  },

  // 获取用户典当信息列表
  getPawnedList: params => {
    return http.get(
      Util.DOMAIN +
        'qryPawnedList?pageNo=' +
        params.pageNo +
        '&pageSize=' +
        params.pageSize +
        '&mock_apiId=5b7ff4a636ee535247192c6f'
    );
  },

  // 获取币生币基金详情
  getFundInfo: fundId => {
    return http.get(
      Util.DOMAIN +
        'qryFundDetail?fundId=' +
        fundId +
        '&mock_apiId=5b7fc88539ee0419427614aa'
    );
  },
  // 获取用户已认购的币生币基金列表
  getPurchasedList: params => {
    return http.get(
      Util.DOMAIN +
        'qryPurchasedList?pageNo=' +
        params.pageNo +
        '&pageSize=' +
        params.pageSize +
        '&mock_apiId=5b7fdb334de25f5241d93563'
    );
  },
  // 保存用户认购币生币基金信息
  savePurchaseFund: params => {
    return http.post(
      Util.DOMAIN + 'purchaseFund?mock_apiId=5b7fd11517699b687112aee5',
      params
    );
  },
  // 保存用户典当信息
  savePawn: params => {
    return http.post(
      Util.DOMAIN + 'pawn?mock_apiId=5b7ff131727d49524da90963',
      params
    );
  },

  // 提现接口
  withdrawCash: params => {
    return http.post(
      Util.DOMAIN + 'withdraw?mock_apiId=5b7fc4b4b2a0fd193649ee75',
      params
    );
  },
  // 充值
  recharge: params => {
    return http.post(
      Util.DOMAIN + 'recharge?mock_apiId=5b9e0da00c36ac570e401c41',
      params
    );
  },
  // 赎回
  redeem: params => {
    return http.post(
      Util.DOMAIN + 'redeem?mock_apiId=5b7ff75e727d49524da90965',
      params
    );
  },

  // 获取验证码接口
  getCheckcode: userMobile => {
    console.log(userMobile);
    return http.post(
      Util.DOMAIN +
        'getVeriCode?userMobile=' +
        userMobile +
        '&mock_apiId=5b7e5cac7ad806420cbf2bd2'
    );
  },
  // 获取股东代持币种信息
  getShareholderInfo() {
    return http.get(
      Util.DOMAIN + 'qryHoldInfo?mock_apiId=5bd523e40638a4020f5b691a'
    );
  },
  // 股东出售
  sellCoin(sellNum) {
    return http.post(
      Util.DOMAIN + 'sellHold?mock_apiId=5bd525c342073d0186f62c40',
      {
        sellNum: sellNum
      }
    );
  }
};
