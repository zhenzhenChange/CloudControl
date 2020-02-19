<template>
  <div>
    <PagedTable :data="data" ref="TaskPagedTable" :dataColumns="Columns" />
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
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  data() {
    return {
      data: [],
      timer: null,
      taskObj: {},
      taskState: "",
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
                      clearInterval(this.timer)
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
    this.initData()
    clearInterval(this.timer)
    this.timer = setInterval(() => this.initData(), 15000)
  },
  destroyed() {
    clearInterval(this.timer)
  },
  computed: {
    ...mapState({ user_id: state => state.user_id })
  },
  methods: {
    async initData() {
      this.data = []
      let newObj = {}
      let newArr = []
      let data = await this.$http.get("/order/getAddFriendOrder")
      data.forEach(item => {
        newObj = Object.assign({}, item.addFriendOrder, item.getFriendViewResponse)
        newArr.push(newObj)
      })
      newArr.forEach(async item => {
        const params = { groupId: item.groupId, taskName: item.taskName }
        const state = await this.$http.get("/order/getAddFriendOrderState", { params })
        this.data.push({
          groupId: item.groupId,
          taskName: item.taskName,
          deadCount: item.deadCount,
          passCount: item.passCount,
          maxRequest: item.maxRequest,
          failureCount: item.failureCount,
          sayHelloCount: item.sayHelloCount,
          groupOnlineCount: item.groupOnlineCount,
          taskState: state === 0 ? "进行中" : "已完成",
          phoneNumberNotUsed: item.phoneNumberNotUsed
        })
      })
      const TaskTable = this.$refs["TaskPagedTable"]
      if (TaskTable) {
        TaskTable.total = Object.keys(data).length
      }
    },
    cancel() {
      this.isShowStopAddModal = false
    },
    async stop() {
      this.isShowStopAddModal = false
      const params = { groupId: this.currentGroupID, taskName: this.currentTaskName }
      const { msg } = await this.$http.get("/stopAddFriend", { params })
      this.$Message.info(msg)
      this.initData()
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
          this.initData()
        },
        onCancel() {}
      })
    }
  }
}
</script>
