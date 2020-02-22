import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user_id: "" || localStorage.getItem("user_id"),
    GroupData: "" || localStorage.getItem("GroupData"),
    Shreshold: "" || localStorage.getItem("Shreshold"),
    webSocketData: "",
    blankTime: ""
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
    saveWebSocketData: (state, webSocketData) => (state.webSocketData = webSocketData),
    saveBlankTime: (state, blankTime) => (state.blankTime = blankTime)
  },
  getters: {
    user_id: state => state.user_id,
    GroupData: state => state.GroupData,
    Shreshold: state => state.Shreshold
  },
  actions: {
    saveWebSocketData({ commit }, { VueInstance, webSocketData }) {
      const data = []
      webSocketData.forEach(async item => {
        const params = { groupId: item.groupId, taskName: item.taskName }
        const { state } = await VueInstance.$http.get("/order/getAddFriendOrderState", { params })
        data.push({
          groupId: item.groupId,
          taskName: item.taskName,
          deadCount: item.deadCount,
          passCount: item.passCount,
          maxRequest: item.maxRequest,
          failureCount: item.failureCount,
          sayHelloCount: item.sayHelloCount,
          groupOnlineCount: item.groupOnlineCount,
          phoneNumberNotUsed: item.phoneNumberNotUsed,
          taskState: Number(state) === 0 ? "进行中" : "已完成"
        })
        commit("saveWebSocketData", data)
      })
    }
  }
})
