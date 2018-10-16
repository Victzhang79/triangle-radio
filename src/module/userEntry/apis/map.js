// const HOST = 'http://apimanage.58corp.com/';// mock
// const HOST = 'http://10.252.55.195/';// 线上
import Util from '@/util';
const HOST = Util.DOMAIN;

const getVeriCodePath = HOST + 'getVeriCode' + '?mock_apiId=5b7e5cac7ad806420cbf2bd2'; //获取短信验证码接口
const registeUserPath = HOST + 'registeUser' + '?mock_apiId=5b7fa31ab2a0fd193649ee6a'; //注册用户接口
const chkUserLogPassPath = HOST + 'chkUserLogPass' + '?mock_apiId=5b7faffe56f92a191e1a8c91'; //验证用户登录密码接口
const resetUserLogPassPath = HOST + 'resetUserLogPass' + '?mock_apiId=5b7fa9a32fec1119249c3945'; //重置登录密码接口
const modifyUserLogPassPath = HOST + 'modifyUserLogPass' + '?mock_apiId=5b7faaaab2a0fd193649ee6d'; //修改登录密码接口

// const getCaptchaImgPath= HOST + 'getCaptchaImg' + '?mock_apiId=5b83e17ab848587a697ab3e8'; //获取图片验证码接口
// const chkCaptchaImgPath= HOST + 'chkCaptchaImg' + '?mock_apiId=5b83e1efcaa7b67a5dc23161'; //验证图片验证码是否正确接口

// const setTransPassPath= HOST + 'setTransPass' + '?mock_apiId=5b7faba2b2a0fd193649ee70'; //设置交易密码接口
// const setGooglePassPath= HOST + 'setGooglePass' + '?mock_apiId=5b7fafb82fec1119249c3948'; //设置支付Google验证接口（二期）
// const setSafeEmailPath= HOST + 'setSafeEmail' + '?mock_apiId=5b7fb1a039ee0419427614a5'; //设置安全邮箱接口
// const qryNationListPath= HOST + 'qryNationList' + '?mock_apiId=5b7fb6dd4748e0193cfa5d46'; //查询全部国籍码表信息接口
// const credentPath= HOST + 'credent' + '?mock_apiId=5b7fbf9271e256191805cc0f'; //查询全部国籍码表信息接口
// const getCredentStatusPath= HOST + 'getCredentStatus' + '?mock_apiId=5b7fc2057a47d219303362ac'; //获取用户身份认证状态接口
// const uploadPicPath= HOST + 'uploadPic' + '?mock_apiId=5b80a9fd6d0885522ff0e64a'; //上传图片接口
export {
	getVeriCodePath,
	registeUserPath,
	chkUserLogPassPath,
	resetUserLogPassPath,
	modifyUserLogPassPath
};
