import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn:false,
    isAdmin:false,
    userName:'',
    userId:null,
  },
  getters: {
  },
  mutations: {
    setLoginStatus(state, status) {
      state.isLoggedIn = status
    },
    setUserName(state,status){
      state.userName = status
    },
    setAdminStatus(state, status) {
      state.isAdmin = status
    },
    setUserId(state, status){
      state.userId = status
    }
  },
  actions: {
  },
  modules: {
  }
})
