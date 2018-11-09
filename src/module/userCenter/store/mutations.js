import * as types from './mutation-types';

export default {
  // 设置币钱包数据
  [types.CHANGE_WALLETLIST](state, payload) {
    state.walletList = payload;
  },

  // 设置币生币基金列表数据
  [types.CHANGE_FUNDLIST](state, payload) {
    state.fundList = payload;
  },

  // 设置提现结果
  [types.SET_WITHDRAWRESULT](state, payload) {
    state.withdrawResult = payload;
  },
  // 设置提现结果
  [types.SET_DIPOSIT](state, payload) {
    state.depositType = payload;
  }
};
