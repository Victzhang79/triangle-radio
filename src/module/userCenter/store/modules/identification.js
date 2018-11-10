import {
	getCredentStatus,
	qryNationList
} from '../../api/identification';

const state = {
	identiStatus: '0',//身份认证状态：0：未认证，1：认证通过， 2：认证失败， 3：审核中 (4:网络异常)
	refuseReason: '',// 审核未通过原因
	nationList: [
		{
			nationCode: '1',
			nationName: '中国'
		}
	]//国籍码表
}

const getters = {
	identiStatus: state => state.identiStatus,
	refuseReason: state => state.refuseReason,
	nationList: state => state.nationList
}

const mutations = {
	changeIdentiStatus(state, value) {
		state.identiStatus = value;
	},
	changeRefuseReason(state, value) {
		if (value) {
			state.refuseReason = '未通过审核（原因：' + value + '），请重新认证';
		} else {
			state.refuseReason = '未通过审核，请重新认证';
		}
	},
	changeNationList(state, data) {
		state.nationList = data;
	}
}

const actions = {
	// 获取用户认证状态
	initIdentiStatus({ commit }) {
		getCredentStatus().then(data => {
			if (data.code === 200) {
				// console.log('identistatus:', data);
				// state.identiStatus = data.data;
				commit('changeIdentiStatus', data.data && data.data.credentStatus)
				if ((data.data && data.data.credentStatus) === '2') {
					commit('changeRefuseReason', data.data.reason);
				}
				// return data;
			} else {
				// throw ('error');
				commit('changeIdentiStatus', '4')
			}
		}).catch(() => {
			commit('changeIdentiStatus', '4')
		});
	},
	// 初始化国籍码表
	initNationList({ commit }, langType) {
		qryNationList(langType).then(data => {
			if (data.code === 200) {
				commit('changeNationList', data.data);
				// return data;
			} else {
				throw ('error');
			}
		}).catch(() => { })
	}
}

export default {
	state,
	getters,
	mutations,
	actions
}