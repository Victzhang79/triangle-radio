import api from '../api';
import * as types from './mutation-types';

// 获取币钱包列表
export const getWalletList = ({ commit, state }) => {
  console.log('aaa');
  return api.getWalletList().then(res => {
    console.log(res);
    if (res.code === 200) {
      commit(types.CHANGE_WALLETLIST, res.data);
    } else {
      commit(types.CHANGE_WALLETLIST, []);
    }
  });
};

// 获取币生币基金列表
export const getFundList = ({ commit, state }, payload) => {
  let params = {
    pageNo: (payload && payload.pageNo) || 0,
    pageSize: (payload && payload.pageSize) || 10
  };
  return api.getFundList(params).then(res => {
    if (res.code === 200) {
      commit(types.CHANGE_FUNDLIST, res.fundList);
    } else {
      commit(types.CHANGE_FUNDLIST, []);
    }
  });
};

// 获取币生币基金详情
export const getFundInfo = ({ commit, state }, fundId) => {
  return api.getFundInfo(fundId).then(res => {
    if (res.code === 200) {
      // commit(types.CHANGE_FUNDLIST, res.fundList);
      return res.data;
    }
  });
};

// 获取用户已认购的币生币基金列表
export const getPurchasedList = ({ commit, state }, pageInfo) => {
  return api.getPurchasedList(pageInfo).then(res => {
    if (res.code === 200) {
      return res.data;
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
    if (res.code === 200) {
      // commit(types.CHANGE_FUNDLIST, res.fundList);
      return true;
    } else {
      return false;
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

// 提现
export const withdrawCash = ({ commit, state }, payload) => {
  return api.withdrawCash(payload).then(res => {
    if (res.code === 200) {
      commit(types.SET_WITHDRAWRESULT, true);
      return true;
    } else {
      commit(types.SET_WITHDRAWRESULT, false);
      return false;
    }
  });
};

// 赎回
export const redeem = ({ commit, state }) => {
  let pawnInfo = {
    pawnId: '', // 典当记录ID
    redeemType: '', // 赎回类型
    redeemNum: '', //赎回数量
    transPass: '' // 交易密码（RSA加密）
  };
  return api.redeem(pawnInfo).then(res => {
    if (res.code === 200) {
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
