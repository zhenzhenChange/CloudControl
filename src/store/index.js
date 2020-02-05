import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user_id: "" || localStorage.getItem("user_id"),
    GroupData: "" || localStorage.getItem("GroupData"),
    Shreshold: "" || localStorage.getItem("Shreshold"),
    DataCount: "" || localStorage.getItem("DataCount")
  },
  mutations: {
    saveID: (state, user_id) => {
      state.user_id = user_id
      localStorage.setItem("user_id", user_id)
    },
    saveGroupData: (state, group_data) => {
      state.GroupData = group_data
      localStorage.setItem("GroupData", group_data)
    },
    saveShreshold: (state, shreshold) => {
      state.Shreshold = shreshold
      localStorage.setItem("Shreshold", shreshold)
    },
    saveDataCount: (state, dataCount) => {
      state.DataCount = dataCount
      localStorage.setItem("DataCount", dataCount)
    }
  },
  getters: {
    user_id: state => state.user_id,
    GroupData: state => state.GroupData,
    Shreshold: state => state.Shreshold,
    DataCount: state => state.DataCount
  }
})
