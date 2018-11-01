import * as types from './mutation-types';
import Util from '../../../util';

export default {
  // 设置币钱包数据
  [types.CHANGE_WALLETLIST](state, payload) {
    state.walletList = payload;
  },

  // 设置币生币基金列表数据
  [types.CHANGE_FUNDLIST](state, payload) {
    let fundList = payload.data;
    for (let item of fundList) {
      if (item.interestsDate && item.startDate) {
        // 若未到申购日期，则展示未开始
        if (Util.compareDate(item.startDate)) {
          item.status = 0; // 0: 未开始，1: 进行中，2: 收益中
        } else if (Util.compareDate(item.interestsDate)) {
          // 若未到起息日期，则展示进行中
          item.status = 1;
        } else if (Util.compareDate(item.settleDate)) {
          // 若未到结算日期，则展示收益中
          item.status = 2;
        } else {
          // 已结束
          item.status = 3;
        }
      }
    }
    state.fundList = fundList;
    state.total_fundNum = payload.totalNum;
    if (payload.pageNo == 1 && fundList.length > 0) {
      state.recommendFundList = fundList.slice(0, 2);
    }
  },

  // 设置提现结果
  [types.SET_WITHDRAWRESULT](state, payload) {
    state.withdrawResult = payload;
  },

  // 设置基金详情
  [types.CHANGE_FUNDDETAIL](state, payload) {
    let fundDetailData = payload;
    if (
      fundDetailData.startDate &&
      fundDetailData.interestsDate &&
      fundDetailData.settleDate
    ) {
      if (Util.compareDate(fundDetailData.startDate)) {
        // 若未到申购日期，则展示未开始
        fundDetailData.status = 0; // 0: 未开始，1: 进行中，2: 收益中
      } else if (Util.compareDate(fundDetailData.interestsDate)) {
        // 若未到起息日期，则展示进行中
        fundDetailData.status = 1;
      } else if (Util.compareDate(fundDetailData.settleDate)) {
        // 若未到结算日期，则展示进行中
        fundDetailData.status = 2;
      } else {
        // 已结束
        fundDetailData.status = 3;
      }
      fundDetailData.startDate = fundDetailData.startDate.replace(/-/g, '.');
      fundDetailData.interestsDate = fundDetailData.interestsDate.replace(
        /-/g,
        '.'
      );
      fundDetailData.settleDate = fundDetailData.settleDate.replace(/-/g, '.');
    }
    state.fundDetailData = fundDetailData;
  }
};
