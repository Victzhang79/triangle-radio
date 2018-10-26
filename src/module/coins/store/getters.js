import Util from '../../../util';

export const walletList = state => state.walletList; // 币钱包列表信息
export const withdrawResult = state => state.withdrawResult; // 币钱包列表信息
export const fundList = state => state.fundList; // 币生币基金列表
// 币生币基金推荐列表
export const recommendFundList = state => {
  let fundList = state.recommendFundList;
  for (let item of fundList) {
    if (item.interestsDate && item.startDate) {
      if (!Util.compareDate(item.startDate)) {
        item.status = 0; // 0: 未开始，1: 进行中，2: 收益中
      } else if (Util.compareDate(item.interestsDate)) {
        item.status = 2;
      } else {
        item.status = 1;
      }
    }
  }
  return fundList;
};
export const total_fundNum = state => state.total_fundNum; // 币生币基金总数
// 币生币基金详情
export const fundDetailData = state => {
  let fundDetailData = state.fundDetailData;
  if (
    fundDetailData.startDate &&
    fundDetailData.interestsDate &&
    fundDetailData.settleDate
  ) {
    console.log(Util.compareDate(fundDetailData.startDate));
    if (!Util.compareDate(fundDetailData.startDate)) {
      // 开始时间大于今天
      fundDetailData.status = 0; // 0: 未开始，1: 进行中，2: 收益中
    } else if (Util.compareDate(fundDetailData.interestsDate)) {
      fundDetailData.status = 2;
    } else {
      fundDetailData.status = 1;
    }
    fundDetailData.startDate = fundDetailData.startDate.replace(/-/g, '.');
    fundDetailData.interestsDate = fundDetailData.interestsDate.replace(
      /-/g,
      '.'
    );
    fundDetailData.settleDate = fundDetailData.settleDate.replace(/-/g, '.');
  }
  console.log(fundDetailData);
  return fundDetailData;
};
