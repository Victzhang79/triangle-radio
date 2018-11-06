import Util from '@/util';
const HOST = Util.DOMAIN;
// const HOST = 'http://apimanage.58corp.com/';// mock
// const HOST = 'http://10.252.55.195/';// 线上

const getVeriCodePath = HOST + 'getVeriCode' + '?mock_apiId=5b7e5cac7ad806420cbf2bd2'; //获取短信验证码接口
const setSafeEmailPath = HOST + 'setSafeEmail' + '?mock_apiId=5b7fb1a039ee0419427614a5'; //设置安全邮箱接口
const modifyUserLogPassPath = HOST + 'modifyUserLogPass' + '?mock_apiId=5b7faaaab2a0fd193649ee6d'; //修改登录密码接口
const setTransPassPath = HOST + 'setTransPass' + '?mock_apiId=5b7faba2b2a0fd193649ee70'; //设置交易密码接口
const getSafeInfoPath = HOST + 'getLastLogAndSafeInfo' + '?mock_apiId=5b8b33712bbb5a608f40080e'; //获取用户登录和安全设置信息接口
const getVeriCode4TxPath = HOST + 'getVeriCode4Tx' + '?mock_apiId=5ba0bf5943f4b33e7345057e';

// const setGooglePassPath = HOST + 'setGooglePass' + '?mock_apiId=5b7fafb82fec1119249c3948'; //设置支付Google验证接口（二期）
// const getCaptchaImgPath = HOST + 'getCaptchaImg' + '?mock_apiId=5b83e17ab848587a697ab3e8'; //获取图片验证码接口
// const chkCaptchaImgPath = HOST + 'chkCaptchaImg' + '?mock_apiId=5b83e1efcaa7b67a5dc23161'; //验证图片验证码是否正确接口

export {
	getVeriCodePath,
	getVeriCode4TxPath,
	modifyUserLogPassPath,
	setTransPassPath,
	setSafeEmailPath,
	// uploadPicPath,
	getSafeInfoPath
};
