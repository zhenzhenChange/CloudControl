<template>
  <div>
    <Button type="info" icon="md-refresh" @click="refreshData">刷新数据</Button>
    <PagedTable
      v-if="webSocketData"
      ref="TaskPagedTable"
      :data="webSocketData"
      :dataColumns="Columns"
      :CusTotal="webSocketData.length"
    />
    <Modal
      width="350"
      :closable="false"
      :mask-closable="false"
      v-model="isShowStopAddModal"
      class-name="vertical-center-modal"
    >
      <p slot="header">
        <Icon
          color="#ED4014"
          type="md-stopwatch"
          class="mr-5 header-icon"
        />终止该分组下的所有加粉任务
      </p>
      <div class="text-center">
        <p>确定要终止吗？</p>
      </div>
      <div slot="footer">
        <Button icon="md-remove-circle" @click="cancel">取消</Button>
        <Button type="error" icon="md-checkmark" @click="stop">确定</Button>
      </div>
    </Modal>
    <Spin class="mt-10"></Spin>
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  name: "taskAdd",
  data() {
    return {
      taskObj: {},
      taskState: "",
      webSocket: null,
      currentGroupID: "",
      currentTaskName: "",
      isShowStopAddModal: false,
      isShowTaskAddDrawer: false,
      Columns: [
        { width: 100, align: "center", title: "分组ID", key: "groupId" },
        { width: 180, align: "center", title: "任务名称", key: "taskName" },
        { width: 150, align: "center", title: "任务状态", key: "taskState" },
        { width: 100, align: "center", title: "单号请求", key: "maxRequest" },
        { width: 130, align: "center", title: "通过好友量", key: "passCount" },
        { width: 130, align: "center", title: "打招呼次数", key: "sayHelloCount" },
        { width: 130, align: "center", title: "单组在线数", key: "groupOnlineCount" },
        { width: 130, align: "center", title: "剩余手机号数", key: "phoneNumberNotUsed" },
        { width: 100, align: "center", title: "死号量", key: "deadCount" },
        { width: 100, align: "center", title: "失败次数", key: "failureCount" },
        {
          width: 410,
          fixed: "right",
          title: "操作",
          align: "center",
          render: (h, params) => {
            const { taskName, groupId } = params.row
            return h("div", [
              h(
                "Button",
                {
                  style: { marginRight: "15px" },
                  props: { type: "error", icon: "md-stopwatch" },
                  on: {
                    click: () => {
                      this.isShowStopAddModal = true
                      this.currentGroupID = groupId
                      this.currentTaskName = taskName
                    }
                  }
                },
                "终止加粉任务"
              ),
              h(
                "Button",
                {
                  props: { type: "error", icon: "md-trash" },
                  on: {
                    click: () => {
                      this.removeOrder(taskName, groupId)
                    }
                  }
                },
                "删除记录"
              )
            ])
          }
        }
      ]
    }
  },
  created() {
    this.initWebSocket()
  },
  destroyed() {
    this.webSocket.close()
  },
  computed: {
    ...mapState({
      user_id: state => state.user_id,
      webSocketData: state => state.webSocketData
    })
  },
  methods: {
    cancel() {
      this.isShowStopAddModal = false
    },
    async stop() {
      this.isShowStopAddModal = false
      const params = { groupId: this.currentGroupID, taskName: this.currentTaskName }
      const { msg } = await this.$http.get("/stopAddFriend", { params })
      this.$Message.info(msg)
    },
    removeOrder(taskName, groupId) {
      const params = { taskName, groupId }
      this.$Modal.confirm({
        title: "删除订单",
        content: "确定要删除吗？",
        okText: "确定",
        cancelText: "取消",
        onOk: async () => {
          const { msg } = await this.$http.get("/order/deleteAddFriendOrder", { params })
          this.$Message.info(msg)
        },
        onCancel() {}
      })
    },
    initWebSocket() {
      if (!("WebSocket" in window)) {
        this.$Notice.error({
          title: "意外错误",
          desc:
            "您的浏览器不支持实时轮询通信，数据将无法实时更新，请升级或更换浏览器（谷歌Chrome、火狐Firefox）"
        })
        return
      }
      this.webSocket = new WebSocket(process.env.VUE_APP_WEB_SOCKET_URL)
      this.webSocket.onopen = () => this.webSocket.send(this.user_id)
      this.webSocket.onmessage = async event => {
        this.$Notice.info({ title: "WebSocket持续更新中。。。", desc: "请求数据中...请稍后..." })
        const data = JSON.parse(event.data)
        if (Array.isArray(data)) {
          let newObj = {}
          let webSocketData = []
          data.forEach(item => {
            newObj = Object.assign(
              {},
              item.orderResponse.addFriendOrder,
              item.orderResponse.getFriendViewResponse
            )
            newObj.state = item.state
            webSocketData.push(newObj)
          })
          await this.$store.dispatch("saveWebSocketData", webSocketData)
        }
      }
      this.webSocket.onerror = () => {
        this.webSocket.close()
        this.initWebSocket()
      }
    },
    refreshData() {
      setTimeout(() => this.webSocket.send(this.user_id), 3000)
    }
  }
}
</script>
