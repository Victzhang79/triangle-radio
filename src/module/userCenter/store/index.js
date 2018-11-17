import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters';
import * as actions from './actions';
import mutations from './mutations';
import security from './modules/security';
import identification from './modules/identification';
import fix from './modules/fix';

if (!window.Vuex) {
	Vue.use(Vuex);
}

const state = {
	walletList: [], // 币钱包列表
	withdrawResult: false, // 提现结果
	fundList: [], // 币生币基金列表
	depositTypeIndex: undefined // 定存类型
};

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
	modules: {
		security,
		identification,
		fix
	}
});
