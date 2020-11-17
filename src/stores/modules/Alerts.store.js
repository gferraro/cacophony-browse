import api from "../../api/index";

const state = {
  alerts: [],
  currentAlert: null,
  fetched: false
};

const getters = {};

async function _getAlert(alertId, commit) {
  const { result } = await api.alert.getAlert();
  const alert = result.alerts.find(alert => alert.id === alertId);
  commit("setCurrentAlert", alert);
}

const actions = {
  async GET_ALERTS({ commit }) {
    commit("fetching");
    const { result } = await api.alert.getAlerts();
    commit("receiveAlerts", result.Alerts);
    commit("fetched");
  },

  async GET_ALERT({ commit }, alertId) {
    commit("fetching");
    await _getAlert(alertId, commit);
    commit("fetched");
  },

  async ADD_ALERT({ commit }, alertName) {
    commit("fetching");
    const { success, result } = await api.alert.addNewAlert(alertName);
    console.log(result);
    if (!success) {
      return result.message;
    } else {
      await _getAlert(result.id, commit);
      // FIXME: A bunch of different components all rely on this fetched state.
      //  Modal to add user to group in admin area is only dismissed when fetching is true
      commit("fetching");
      // FIXME This is a hack. Fix eventually. If we don't set a timeout fetching never gets set
      setTimeout(() => {
        commit("fetched");
      }, 10);
    }
  }
};

const mutations = {
  receiveAlerts(state, alerts) {
    state.alerts = alerts;
  },
  setCurrentAlert(state, alert) {
    state.currentAlert = alert;
  },
  fetching(state) {
    state.fetched = false;
  },
  fetched(state) {
    state.fetched = true;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
