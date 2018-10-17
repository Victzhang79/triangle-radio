import api from '../api';
import * as types from './mutation-types';

// 获取币生币基金列表
export const getFundList = ({ commit, state }, payload) => {
  let params = {
    pageNo: (payload && payload.pageNo) || 1,
    pageSize: (payload && payload.pageSize) || 10
  };
  return api.getFundList(params).then(res => {
    if (res.code === 200) {
      res.pageNo = params.pageNo;
      commit(types.CHANGE_FUNDLIST, res);
    } else {
      commit(types.CHANGE_FUNDLIST, []);
    }
  });
};

// 获取币生币基金详情
export const getFundInfo = ({ commit, state }, fundId) => {
  return api.getFundInfo(fundId).then(res => {
    if (res.code === 200) {
      commit(types.CHANGE_FUNDDETAIL, res.data);
      return res.data;
    } else {
      commit(types.CHANGE_FUNDDETAIL, {});
      return {};
    }
  });
};

// 获取用户已认购的币生币基金列表
export const getPurchasedList = ({ commit, state }, fundId) => {
  return api.getPurchasedList(fundId).then(res => {
    if (res.code === 200) {
      // commit(types.CHANGE_FUNDLIST, res.fundList);
      return res.purchasedList;
    }
  });
};

// 保存用户认购币生币基金信息
export const savePurchaseFund = ({ commit, state }, payload) => {
  let fundInfo = {
    fundId: payload.fundId,
    purchaseNum: payload.purchaseNum,
    transPass: payload.transPass
  };
  return api.savePurchaseFund(fundInfo).then(res => {
    return res;
  });
};

// 获取用户已认购的币生币基金列表
export const getPawnedList = ({ commit, state }, userMobile) => {
  return api.getPawnedList(userMobile).then(res => {
    if (res.code === 200) {
      // commit(types.CHANGE_FUNDLIST, res.fundList);
      return res.pawnList;
    }
  });
};

// 保存用户典当信息
export const savePawn = ({ commit, state }, payload) => {
  let pawnInfo = {
    pawnCoinCode: payload.pawnCoinCode,
    pawnNum: payload.pawnNum,
    loanCoinCode: payload.loanCoinCode,
    loanNum: payload.loanNum,
    transPass: payload.transPass
  };
  return api.savePawn(pawnInfo).then(res => {
    if (res.code === 200) {
      // commit(types.CHANGE_FUNDLIST, res.fundList);
      return true;
    } else {
      return false;
    }
  });
};

// 获取验证码
export const getCheckcode = ({ commit }, userMobile) => {
  return api
    .getCheckcode(userMobile)
    .then(res => {
      if (res.code === 200) {
        return true;
      } else {
        return false;
      }
    })
    .catch(e => {
      return true;
    });
};

// 查询用户币指定币种的钱包信息
export const getWalletInfo = ({ commit, state }, coinCode) => {
  return api.getWalletInfoByCoincode(coinCode).then(res => {
    return res;
  });
};
