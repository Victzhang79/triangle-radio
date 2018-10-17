import http from '@/util/http';
import Util from '@/util';

export default {
  // 获取用户指定币种的钱包信息
  getWalletInfoByCoincode: coinCode => {
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
  // 获取用户典当信息列表
  getPawnedList: userMobile => {
    return http.get(
      Util.DOMAIN +
        'qryPawnedList?userMobile=' +
        userMobile +
        '&mock_apiId=5b7e5cac7ad806420cbf2bd2'
    );
  },

  // USDT提现
  withdrawCash: params => {
    return http.post(
      Util.DOMAIN + 'withdraw?mock_apiId=5b7fc4b4b2a0fd193649ee75',
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

  // 校验交易密码
  veriPass: params => {
    return http.post(
      Util.DOMAIN +
        'chkTransPassAndSmsCode?mock_apiId=5ba0afad43f4b33e73450574',
      params
    );
  },
  // 获取验证码，交易操作用（无需传手机号，使用注册手机号）
  getCheckcode: () => {
    return http.post(
      Util.DOMAIN + 'getVeriCode4Tx?mock_apiId=5ba0bf5943f4b33e7345057e'
    );
  },

  // 获取用户交易密码和短信验证码校验状态
  getVeriStatus: () => {
    return http.get(
      Util.DOMAIN + 'getVeriStatus?mock_apiId=5ba0ae4c7985ad7958a993bb'
    );
  },

  //  获取充值钱包地址接口
  getWalletAddr4Recharge: () => {
    return http.get(
      Util.DOMAIN + 'getWalletAddr4Recharge?mock_apiId=5ba0ae4c7985ad7958a993bb'
    );
  }
};
