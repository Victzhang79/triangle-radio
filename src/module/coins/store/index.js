import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters';
import * as actions from './actions';
import mutations from './mutations';

if (!window.Vuex) {
  Vue.use(Vuex);
}

const state = {
  walletList: [], // 币钱包列表
  withdrawResult: false, // 提现结果
  fundList: [], // 币生币基金列表
  recommendFundList: [], // 币生币基金推荐列表（前四条）
  total_fundNum: 0, //币生币基金列表数量
  fundDetailData: {}
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});
