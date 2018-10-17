import http from '@/util/http';
import Util from '@/util';

export default {
  // 查询典当信息列表
  qryPawnInfoList: () => {
    return http.get(
      Util.DOMAIN + 'qryPawnInfoList?mock_apiId=5b9a304efa3991422a090e0e'
    );
  },
  // 查询币种价格信息接口
  getCoinPrice: coinCodes => {
    return http.get(
      Util.DOMAIN +
        'getCoinPrice?coinCodes=' +
        coinCodes +
        '&mock_apiId=5b9a325e16813c2546c249d3'
    );
  },

  // 保存用户典当信息
  savePawn: params => {
    return http.post(
      Util.DOMAIN + 'pawn?mock_apiId=5b7ff131727d49524da90963',
      params
    );
  },

  // 认证状态接口
  getCredentStatus: () => {
    return http.get(
      Util.DOMAIN + 'getCredentStatus?mock_apiId=5b7fc2057a47d219303362ac'
    );
  }
};
