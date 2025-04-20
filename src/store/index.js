import { createStore } from 'vuex'

export default createStore({
  state: {
    configuration: {
      cpu: '',
      motherboard: '',
      ram: '',
      gpu: '',
      storage: ''
    }
  },
  mutations: {
    setConfiguration(state, config) {
      state.configuration = config
    }
  },
  actions: {
    saveConfiguration({ commit }, config) {
      commit('setConfiguration', config)
    }
  }
})