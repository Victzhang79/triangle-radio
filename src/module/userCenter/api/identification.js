import 'whatwg-fetch';
import http from '@/util/http';
import {
	getCredentStatusPath,
	qryNationListPath,
	uploadPicPath,
	credentPath
} from './maps/identifiMap';

/** 
 * 获取用户身份认证状态
 */
function getCredentStatus() {
	return http.get(getCredentStatusPath);
}

/** 
 * 查询国籍码表信息
 * @param {string} langType 语言类型
 */
function qryNationList(langType) {
	return http.get(qryNationListPath + '&langType=' + langType);
}

/** 
 * 上传图片接口
 */
function uploadPic(file) {
	let formData = new FormData();
	formData.append("file", file);
	return fetch(uploadPicPath, {
		// headers: {
		// 	Accept: '*/*',
		// 	'Content-Type': 'multipart/form-data;boundary=----WebKitFormBoundaryNODLTgyvuArHCETf'
		// },
		method: 'POST',
		body: formData
	}).then(data => {
		return data.json();
	});
}

/** 
 * 保存用户身份认证信息
 * @param {string} data 用户身份信息
 * @param {string} data.nationCode 国籍代码
 * @param {string} data.familyName 姓
 * @param {string} data.givenName 名
 * @param {string} data.credentType 证件类型 1：居民身份证，2：护照，3：士官证，4：港澳通行证，9：其他
 * @param {string} data.credentNo 证件号码
 * @param {string} data.credentPic 证件图片地址
 */
function credent(data) {
	return http.post(credentPath, data);
}

export {
	getCredentStatus,
	qryNationList,
	uploadPic,
	credent
}