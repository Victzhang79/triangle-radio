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

  // 保存用户认购币生币基金信息
  savePurchaseFund: params => {
    return http.post(
      Util.DOMAIN + 'purchaseFund?mock_apiId=5b7fd11517699b687112aee5',
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

  // 获取验证码接口
  getCheckcode: userMobile => {
    console.log(userMobile);
    return http.get(
      Util.DOMAIN +
        'getVeriCode?userMobile=' +
        userMobile +
        '&mock_apiId=5b7e5cac7ad806420cbf2bd2'
    );
  },
  // 获取用户交易密码和短信验证码校验状态
  getVeriStatus: () => {
    return http.get(
      Util.DOMAIN + 'getVeriStatus?mock_apiId=5ba0ae4c7985ad7958a993bb'
    );
  },
  // 定存接口
  deposit: params => {
    return http.post(
      Util.DOMAIN + 'deposit?mock_apiId=5beab4305c74cd0203113b0b',
      params
    );
  },
  // 查询用户定存记录列表
  getDepositList: () => {
    return http.get(
      Util.DOMAIN +
        'qryUserDepositList?mock_apiId=5bed2ac2d7140601973d0a4c' +
        // params.depositType +
        '&pageNo=1' +
        // params.pageNo +
        '&pageSize=30'
      // params.pageSize
    );
  },
  // 查询用户总业绩
  getUserTotalArchive: () => {
    return http.get(
      Util.DOMAIN + 'getUserTotalArchive?mock_apiId=5bf074a4088b6a8d8401af09'
    );
  },
  // 认证状态接口
  getCredentStatus: () => {
    return http.get(
      Util.DOMAIN + 'getCredentStatus?mock_apiId=5b7fc2057a47d219303362ac'
    );
  }
};
