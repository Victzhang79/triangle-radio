import { qryTransPriceList, qryWalletInfoByCoinCode } from './../../api/trans';

const state = {
	transPriceList: [],
	buyDialogVisible: false,
	balance: 0,//用户钱包可用余额
	payCoin: '',//支付币种
	price: 0,//现价
	walletAddr: ''//币种钱包地址
};

const getters = {
	transPriceList: state => state.transPriceList,
	balance: state => state.balance,
	payCoin: state => state.payCoin,
	price: state => state.price,
	walletAddr: state => state.walletAddr
}

const mutations = {
	changePriceList(state, value) {
		state.transPriceList = value;
	},
	changeBuyDlgVisible(state, value) {
		state.buyDialogVisible = value;
	},
	commitBuyInfo(state, { payCoin, price }) {
		state.payCoin = payCoin;
		state.price = price;
	}
}

const actions = {
	updateList({ commit }) {
		qryTransPriceList().then(data => {
			if (data.code) {
				commit('changePriceList', data.data);
			} else {
				console.log('更新价格失败:', data.msg);
			}
		}).catch(err => {
			console.log('网络异常：', err);
		})
	},
	updateRecharge({ state }, { coinCode }) {
		qryWalletInfoByCoinCode(coinCode).then(data => {
			if (data.code === 200) {
				state.balance = data.data.withDrawableNum;
				state.walletAddr = data.data.walletAddr;
			}
		});
	}
}

export default {
	state,
	getters,
	mutations,
	actions
}