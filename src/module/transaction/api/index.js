import http from '@/util/http';
import Util from '@/util';

export default {
  // 获取用户订单列表
  getOrderList: params => {
    return http.get(
      Util.DOMAIN +
        'qryOrderList?type=' +
        params.type +
        '&coinCode=' +
        params.coinCode +
        '&pageNo=' +
        params.pageNo +
        '&pageSize=' +
        params.pageSize +
        '&mock_apiId=5bd7abe7baa7530178cec862'
    );
  },
  // 取消订单
  cancelOrder: orderId => {
    return http.get(
      Util.DOMAIN +
        'cancelOrder?orderId=' +
        orderId +
        '&mock_apiId=5bd7be6f164b920191a29011'
    );
  }
};
