import http from '@/util/http';
import {
	qryUserSubOneListPath,
	getUserLeaderInfoPath
} from './maps/relationship';

/**
 * 获取用户一级下级信息
 * @param {number} pageNo 分页号码
 * @param {number} pageSize 分页大小
 */
function qryUserSubOneList(pageNo, pageSize) {
	return http.get(qryUserSubOneListPath + '&pageNo=' + pageNo + '&pageSize=' + pageSize);
}

/**
 * 获取用户上级信息
 */
function getUserLeaderInfo() {
	return http.get(getUserLeaderInfoPath);
}

export {
	qryUserSubOneList,
	getUserLeaderInfo
}