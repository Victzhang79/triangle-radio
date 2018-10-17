import * as types from './mutation-types';
import Vue from 'vue';

export default {
  // 设置币钱包数据
  [types.CHANGE_WALLETLIST](state, payload) {
    state.walletList = payload;
  },

  // 设置币生币基金列表数据
  [types.CHANGE_FUNDLIST](state, payload) {
    state.fundList = payload.data;
    state.total_fundNum = payload.totalNum;
    if (payload.pageNo == 1 && payload.data.length > 0) {
      state.recommendFundList = payload.data.slice(0, 4);
    }
  },

  // 设置提现结果
  [types.SET_WITHDRAWRESULT](state, payload) {
    state.withdrawResult = payload;
  },
  // 设置基金详情
  [types.CHANGE_FUNDDETAIL](state, payload) {
    state.fundDetailData = payload;
  }
};
