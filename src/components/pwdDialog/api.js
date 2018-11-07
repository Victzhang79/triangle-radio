import http from '@/util/http';
import Util from '@/util';

export default {
  // 校验交易密码
  veriPass: params => {
    return http.post(
      Util.DOMAIN +
        'chkTransPassAndSmsCode?mock_apiId=5ba0afad43f4b33e73450574',
      params
    );
  },
  // 获取验证码，交易操作用（无需传手机号，使用注册手机号）
  getCheckcode: () => {
    return http.post(
      Util.DOMAIN + 'getVeriCode4Tx?mock_apiId=5ba0bf5943f4b33e7345057e'
    );
  },

  // 获取用户交易密码和短信验证码校验状态
  getVeriStatus: () => {
    return http.get(
      Util.DOMAIN + 'getVeriStatus?mock_apiId=5ba0ae4c7985ad7958a993bb'
    );
  }
};
