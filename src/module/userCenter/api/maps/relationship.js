import Util from '@/util';
// const HOST = 'http://apimanage.58corp.com/';// mock
const HOST = Util.DOMAIN;// 线上


const qryUserSubOneListPath = HOST + 'qryUserSubOneList' + '?mock_apiId=5c0bccf08ee5a3018c40cb08'; //获取用户一级下级信息
const getUserLeaderInfoPath = HOST + 'getUserLeaderInfo' + '?mock_apiId=5c0bcc7a8c90b50248347e50';//获取用户直属上级信息


export {
	qryUserSubOneListPath,
	getUserLeaderInfoPath
}