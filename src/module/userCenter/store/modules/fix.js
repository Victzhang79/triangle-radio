const state = {
	historyBackPath: ''
};

const getters = {
	historyBackPath: state => state.historyBackPath
};

const mutations = {
	changeHistoryBackPath(state, value) {
		state.historyBackPath = value;
	}
};

export default {
	state,
	getters,
	mutations
}