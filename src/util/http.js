import 'whatwg-fetch';
/**
 * [post]
 * @param  {[String]} url              [资源路径]
 * @param  {[String]} data             [发送数据]
 * @param  {[String]} responseDataType [响应数据格式]
 * @return {[Promise]}                  [description]
 */
function post(url, data, responseDataType) {
	return fetch(url, {
		headers: {
			Accept: 'application/json'
			// 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
		},
		// credentials: 'include',
		mode: 'cors',
		method: 'POST',
		// body: _urlEncode(data)
		body: JSON.stringify(data)
	}).then(function (response) {
		return _formatData(response, responseDataType);
	});
}
/**
 * [get]
 * @param  {[String]} url              [资源路径]
 * @param  {[String]} responseDataType [响应数据格式]
 * @return {[Promise]}                  [description]
 */
function get(url, responseDataType) {
	return fetch(url, {
		method: 'GET',
		mode: 'cors'
		// credentials: 'include'
	}).then(function (response) {
		return _formatData(response, responseDataType);
	});
}
/**
 * [_formatData 格式化response]
 * @param  {[type]} response [响应]
 * @param  {[String]} type     [数据格式]
 * @return {[type]}          [description]
 */
function _formatData(response, type) {
	switch (type) {
		case 'arrayBuffer':
			return response.arrayBuffer();
		case 'blob':
			return response.blob();
		case 'formData':
			return response.formData();
		case 'text':
			return response.text();
		default:
			return response.json();
	}
}
/**
 * [_urlEncode 格式化json为url参数]
 * @param  {[type]} params
 * @return {[type]} string         [description]
 */
function _urlEncode(params) {
	if (typeof params === 'object') {
		return Object.keys(params)
			.map(key => {
				return (
					encodeURIComponent(key) +
					'=' +
					encodeURIComponent(params[key])
				);
			})
			.join('&');
	} else {
		return params;
	}
}

export default {
	post,
	get
};
