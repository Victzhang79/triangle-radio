import http from '../../../util/http';
import {
	getVeriCodePath,
	registeUserPath,
	chkUserLogPassPath,
	resetUserLogPassPath,
	modifyUserLogPassPath
} from './map';

/**
 * 获取短信验证码
 * @param {string} userMobile 手机号码
 */
function getVeriCode(userMobile) {
	return http.get(getVeriCodePath + '&userMobile=' + userMobile);
}

/**
 * 注册新用户
 * @param {string} userMobile 手机号码
 * @param {string} veriCode 短信验证码
 * @param {string} logPass 登录密码
 * @param {string} inviteCode 邀请码
 */
function registeUser(userMobile, veriCode, logPass, inviteCode) {
	let data = {
		userMobile,
		veriCode,
		logPass
	};
	if (inviteCode) {
		data.inviteCode = inviteCode;
	}
	return http.post(registeUserPath, data);
}

/**
 * 登录
 * @param {string} userMobile 手机号码
 * @param {string} veriCode 短信验证码
 * @param {string} logPass 登录密码
 */
function chkUserLogPass(userMobile, veriCode, logPass) {
	// return http.get(chkUserLogPassPath + '&userMobile=' + userMobile + '&veriCode=' + veriCode + '&logPass=' + logPass);
	return http.post(chkUserLogPassPath, {
		userMobile,
		veriCode,
		logPass
	})
}

/**
 * 重置密码
 * @param {string} userMobile 手机号码
 * @param {string} veriCode 短信验证码
 * @param {string} newLogPass 登录密码
 */
function resetUserLogPass(userMobile, veriCode, newLogPass) {
	return http.post(resetUserLogPassPath, {
		userMobile,
		veriCode,
		newLogPass
	});
}

/**
 * 修改登录密码
 * @param {string} userMobile 手机号码
 * @param {string} veriCode 短信验证码
 * @param {string} oldLogPass 登录密码
 * @param {string} newLogPass 登录密码
 */
function modifyUserLogPass(userMobile, veriCode, oldLogPass, newLogPass) {
	return http.post(modifyUserLogPassPath, {
		userMobile,
		veriCode,
		oldLogPass,
		newLogPass
	});
}

export {
	getVeriCode,
	registeUser,
	chkUserLogPass,
	resetUserLogPass,
	modifyUserLogPass
};
