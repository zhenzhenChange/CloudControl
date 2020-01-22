import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userID: "" || localStorage.getItem("userID")
  },
  mutations: {
    SaveUserID: (state, userID) => {
      state.userID = userID
      localStorage.setItem("userID", userID)
    }
  },
  actions: {},
  modules: {
    userID: state => {
      state.userID
    }
  }
})
