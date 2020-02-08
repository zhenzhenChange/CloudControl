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
        <Button type="error" icon="md-checkmark" @click="stop">
          确定
        </Button>
      </div>
    </Modal>
    <Drawer width="40" :closable="false" v-model="isShowTaskAddDrawer">
      <div slot="header">
        <Icon type="md-book" color="#2D8CF0" class="mr-10" />加粉任务报表
      </div>
      <Row>
        <Col span="11">
          <Card class="text-center">
            <p slot="title">死号量</p>
            <div>
              <h1>{{ taskObj.deadCount }}</h1>
            </div>
          </Card>
        </Col>
        <Col span="11" offset="2">
          <Card class="text-center">
            <p slot="title">失败次数</p>
            <div>
              <h1>{{ taskObj.failureCount }}</h1>
            </div>
          </Card>
        </Col>
      </Row>
      <Row class="mt-25">
        <Col span="11">
          <Card class="text-center">
            <p slot="title">单组在线数</p>
            <div>
              <h1>{{ taskObj.groupOnlineCount }}</h1>
            </div>
          </Card>
        </Col>
        <Col span="11" offset="2">
          <Card class="text-center">
            <p slot="title">通过好友量</p>
            <div>
              <h1>{{ taskObj.passCount }}</h1>
            </div>
          </Card>
        </Col>
      </Row>
      <Row class="mt-25">
        <Col span="24">
          <Card class="text-center">
            <p slot="title">打招呼次数</p>
            <div>
              <h1>{{ taskObj.sayHelloCount }}</h1>
            </div>
          </Card>
        </Col>
      </Row>
    </Drawer>
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  data() {
    return {
      data: [],
      taskObj: {},
      currentGroupID: "",
      isShowStopAddModal: false,
      isShowTaskAddDrawer: false,
      Columns: [
        { width: 70, align: "center", title: "序号", key: "serialNumber" },
        { align: "center", title: "分组ID", key: "groupId" },
        { align: "center", title: "分组名称", key: "groupName" },
        { align: "center", title: "创建时间", key: "groupCreateDate" },
        {
          width: 400,
          title: "操作",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: { type: "success", icon: "md-eye" },
                  style: { marginRight: "15px" },
                  on: {
                    click: () => {
                      this.isShowTaskAddDrawer = true
                      const { groupId } = params.row
                      this.taskAddData(groupId)
                    }
                  }
                },
                "查看加粉报表"
              ),
              h(
                "Button",
                {
                  props: { type: "error", icon: "md-stopwatch" },
                  on: {
                    click: () => {
                      const { groupId } = params.row
                      this.isShowStopAddModal = true
                      this.currentGroupID = groupId
                    }
                  }
                },
                "终止加粉任务"
              )
            ])
          }
        }
      ]
    }
  },
  created() {
    this.allData()
    this.initData()
  },
  computed: {
    ...mapState({ user_id: state => state.user_id })
  },
  methods: {
    async allData() {
      const { data } = await this.$http.get("/account/getAllGroup", {
        params: { user_id: this.user_id }
      })
      this.$refs["TaskPagedTable"].total = data.length
    },
    async initData() {
      this.data = []
      const { data } = await this.$http.get("/account/getAllGroup", {
        params: {
          user_id: this.user_id,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      data.forEach((item, index) => {
        this.data.push({
          serialNumber: index + 1,
          groupName: item.groupName,
          groupId: String(item.groupId),
          groupCreateDate: this.$options.filters.date(item.groupCreateDate)
        })
      })
    },
    cancel() {
      this.isShowStopAddModal = false
    },
    async stop() {
      this.isShowStopAddModal = false
      const { msg } = await this.$http.get("/stopAddFriend", {
        params: { groupId: this.currentGroupID }
      })
      this.$Message.info(msg)
    },
    async taskAddData(groupId) {
      const res = await this.$http.get("/getAddFriendView", {
        params: { groupId }
      })
      this.taskObj = res
    }
  }
}
</script>
