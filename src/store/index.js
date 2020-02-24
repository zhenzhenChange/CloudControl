import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user_id: "" || localStorage.getItem("user_id"),
    GroupData: "" || localStorage.getItem("GroupData"),
    Shreshold: "" || localStorage.getItem("Shreshold"),
    webSocketData: "",
    GroupDataTotal: "" || localStorage.getItem("GroupDataTotal")
  },
  mutations: {
    saveID: (state, userId) => {
      state.user_id = userId
      localStorage.setItem("user_id", userId)
    },
    saveShreshold: (state, shreshold) => {
      state.Shreshold = shreshold
      localStorage.setItem("Shreshold", shreshold)
    },
    saveGroupData: (state, groupData) => {
      state.GroupData = groupData
      localStorage.setItem("GroupData", groupData)
    },
    saveGroupDataTotal: (state, total) => {
      state.GroupDataTotal = Number(total)
      localStorage.setItem("GroupDataTotal", Number(total))
    },
    saveWebSocketData: (state, webSocketData) => {
      state.webSocketData = webSocketData
    }
  },
  getters: {
    user_id: state => state.user_id,
    GroupData: state => state.GroupData,
    Shreshold: state => state.Shreshold,
    GroupDataTotal: state => state.GroupDataTotal
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
