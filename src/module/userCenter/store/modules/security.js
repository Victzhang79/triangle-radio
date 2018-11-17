import { getSafeInfo } from '../../api/security';

const state = {
	securityInfo: {
		emailStatus: '',
		googleValidStatus: '',
		// lastLogIp: '',
		// lastLogTime: '',
		logPassLevel: '',
		logPassStatus: '',
		transPassLevel: '',
		transPassStatus: '',
		userMobile: ''
	},// 安全设置页信息
	// safeEmailDlgVisi: false,//显示安全邮箱设置弹窗
	modifyLogPwdDlgVisi: false,// 显示更新密码弹窗
	setTransPwdDlgVisi: false,// 显示设置资金密码弹窗
	inviteDlgVisi: false,//邀请二维码弹窗
	contactDlgVisi: false//客服微信二维码弹窗
}

const getters = {
	securityInfo: state => state.securityInfo,
	// safeEmailDlgVisi: state => state.safeEmailDlgVisi,
	modifyLogPwdDlgVisi: state => state.modifyLogPwdDlgVisi,
	setTransPwdDlgVisi: state => state.setTransPwdDlgVisi,
	inviteDlgVisi: state => state.inviteDlgVisi,
	contactDlgVisi: state => state.contactDlgVisi
}

const mutations = {
	updataSecurityInfo(state, data) {
		state.securityInfo = data;
	},
	// 安全邮箱弹窗显示控制
	// changeSafeEmailDlgVisi(state, value) {
	// 	state.safeEmailDlgVisi = value;
	// },
	// 设置/修改登录密码弹窗显示控制
	changeModifyLogPwdDlgVisi(state, value) {
		state.modifyLogPwdDlgVisi = value;
	},
	// 设置/修改资金密码弹窗显示控制
	changeSetTransPwdDlgVisi(state, value) {
		state.setTransPwdDlgVisi = value;
	},
	// 邀请返佣弹窗
	changeInviteDlgVisi(state, value) {
		state.inviteDlgVisi = value;
	},
	// 联系客服
	changeContactDlgVisi(state, value) {
		state.contactDlgVisi = value;
	}
}

const actions = {
	// 安全设置页初始化信息
	getSecurityInfo({ commit }) {
		getSafeInfo().then(data => {
			console.log(data.data);
			commit('updataSecurityInfo', data.data);
		}).catch(() => {
			console.log('获取数据失败');
		})
	}
}

export default {
	state,
	getters,
	mutations,
	actions
}