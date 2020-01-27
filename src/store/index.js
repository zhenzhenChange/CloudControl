import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user_id: "" || localStorage.getItem("user_id"),
    TagData: "" || localStorage.getItem("TagData"),
    GroupData: "" || localStorage.getItem("GroupData")
  },
  mutations: {
    saveID: (state, user_id) => {
      state.user_id = user_id
      localStorage.setItem("user_id", user_id)
    },
    saveTagData: (state, tag_data) => {
      state.TagData = tag_data
      localStorage.setItem("TagData", tag_data)
    },
    saveGroupData: (state, group_data) => {
      state.GroupData = group_data
      localStorage.setItem("GroupData", group_data)
    }
  },
  getters: {
    user_id: state => {
      state.user_id
    },
    TagData: state => {
      state.TagData
    },
    GroupData: state => {
      state.GroupData
    }
  }
})
