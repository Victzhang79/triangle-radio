import http from '@/util/http';

import {
	getVeriCodePath,
	getVeriCode4TxPath,
	modifyUserLogPassPath,
	setTransPassPath,
	setSafeEmailPath,
	// uploadPicPath,
	getSafeInfoPath
} from './maps/securityMap';

/**
 * 获取短信验证码
 * @param {string} userMobile 手机号码
 */
function getVeriCode(userMobile) {
	return http.get(getVeriCodePath + '&userMobile=' + userMobile);
}

/**
 * 获取短信验证码-登录后不需要传手机号
 */
function getVeriCode4Tx() {
	return http.get(getVeriCode4TxPath);
}

/**
 * 修改登录密码
 * @param {string} userMobile 手机号码
 * @param {string} veriCode 短信验证码
 * @param {string} oldLogPass 登录密码
 * @param {string} newLogPass 登录密码
 */
function modifyUserLogPass(veriCode, oldLogPass, newLogPass) {
	return http.post(modifyUserLogPassPath, {
		// userMobile,
		veriCode,
		oldLogPass,
		newLogPass
	});
}

/** 
 * 设置交易密码
 * @param {string} userMobile 用户手机号
 * @param {string} veriCode 短信验证码
 * @param {string} transPass 交易密码
 */
function setTransPass(veriCode, transPass) {
	return http.post(setTransPassPath, {
		// userMobile,
		veriCode,
		transPass
	});
}

/** 
 * 设置安全邮箱
 * @param {string} safeEmail 安全邮箱
 */
function setSafeEmail(safeEmail) {
	return http.post(setSafeEmailPath, {
		safeEmail
	});
}

/** 
 * 上传图片
 */
// function uploadPic() { }

/** 
 * 获取安全设置信息
 */
function getSafeInfo() {
	return http.get(getSafeInfoPath);
}

export {
	getVeriCode,
	getVeriCode4Tx,
	modifyUserLogPass,
	setTransPass,
	setSafeEmail,
	// uploadPic,
	getSafeInfo
}