import Util from '@/util';
// const HOST = 'http://apimanage.58corp.com/';// mock
const HOST = Util.DOMAIN;// 线上


const qryNationListPath = HOST + 'qryNationList' + '?mock_apiId=5b7fb6dd4748e0193cfa5d46'; //查询全部国籍码表信息接口
const uploadPicPath = 'http://47.244.98.207:8080/' + 'uploadPic' + '?mock_apiId=5b80a9fd6d0885522ff0e64a'; //上传图片接口
const credentPath = HOST + 'credent' + '?mock_apiId=5b7fbf9271e256191805cc0f'; //用户身份认证接口
const getCredentStatusPath = HOST + 'getCredentStatus' + '?mock_apiId=5b7fc2057a47d219303362ac'; //获取用户身份认证状态接口


export {
	getCredentStatusPath,
	qryNationListPath,
	uploadPicPath,
	credentPath
}