<template>
  <div class="PullGroup">
    <Button type="info" icon="md-refresh" @click="refreshData">刷新数据</Button>
    <PagedTable :data="data" :ref="PagedTableRef" :dataColumns="PullGroupColumns" />
    <Drawer width="90" :closable="false" v-model="isShowReportDrawer">
      <div slot="header">
        <Icon type="md-book" color="#2D8CF0" class="mr-10" />
        拉群任务报表（共{{ dataLength || 0 }}条数据）
        <Button type="info" class="ml-10" icon="md-download" @click="exportData">导出报表</Button>
      </div>
      <PagedTable
        :show="'no'"
        :data="reportData"
        ref="ReportPagedTable"
        :dataColumns="reportColumns"
      />
    </Drawer>
    <Modal
      width="350"
      :closable="false"
      :mask-closable="false"
      v-model="isShowStopModal"
      class-name="vertical-center-modal"
    >
      <p slot="header">
        <Icon
          color="#ED4014"
          type="md-stopwatch"
          class="mr-5 header-icon"
        />终止该分组下的所有拉群任务
      </p>
      <div class="text-center">
        <p>确定要终止吗？</p>
      </div>
      <div slot="footer">
        <Button icon="md-remove-circle" @click="cancel">取消</Button>
        <Button type="error" icon="md-checkmark" @click="stop">确定</Button>
      </div>
    </Modal>
    <Modal
      width="450"
      :closable="false"
      :mask-closable="false"
      v-model="isShowAddModal"
      class-name="vertical-center-modal"
    >
      <p slot="header">
        <Icon color="#57C5F7" type="md-add" class="mr-5 header-icon" />为该订单补充群Url
      </p>
      <Row>
        <Col span="24">
          <Input clearable v-model="addPeople" placeholder="请设置群最终人数">
            <span slot="prepend">最终人数</span>
          </Input>
        </Col>
      </Row>
      <Row class="mt-10">
        <Col span="24">
          <span class="ml-10 mr-10">类型选择</span>
          <RadioGroup v-model="addType">
            <Radio label="一手"></Radio>
            <Radio label="二手"></Radio>
          </RadioGroup>
        </Col>
      </Row>
      <Row class="mt-10">
        <Col span="24">
          <Input disabled :placeholder="`共补充 ${supplyUrlListLength} 条群Url`" />
        </Col>
      </Row>
      <Row class="mt-10">
        <Col span="24">
          <Input
            type="textarea"
            v-model="supplyUrlList"
            :autosize="{ minRows: 5, maxRows: 15 }"
            placeholder="请将群链接粘贴至此处，一条链接占一行"
          />
        </Col>
      </Row>
      <div slot="footer">
        <Button icon="md-remove-circle" @click="cancel">取消</Button>
        <Button type="success" icon="md-checkmark" @click="addUrl">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import getSystemTime from "../../lib/getSystemTime.js"
export default {
  data() {
    return {
      row: "",
      data: [],
      dataLength: 0,
      urlList: "",
      finalNum: "",
      pageSize: 10,
      pageIndex: 0,
      addPeople: "",
      groupTaskName: "",
      supplyUrlList: "",
      reportData: [],
      addType: "一手",
      checkType: "一手",
      currentGroupID: "",
      isShowDrawer: false,
      currentTaskName: "",
      currentGroupName: "",
      isShowAddModal: false,
      isShowStopModal: false,
      isShowReportDrawer: false,
      PagedTableRef: "PullGroupPagedTable",
      reportColumns: [
        { title: "群成员手机号", align: "center", key: "phone" },
        { title: "群成员WXID", align: "center", key: "WXID" },
        { title: "群成员昵称", align: "center", key: "nickName" },
        { title: "群名称", align: "center", key: "roomName" },
        { width: 130, title: "群ID", align: "center", key: "groupID" },
        { title: "群Url", align: "center", key: "groupUrl" },
        { width: 110, title: "当前群人数", align: "center", key: "memberCount" },
        { width: 110, title: "拉群前人数", align: "center", key: "beforeCount" },
        { width: 170, title: "上传时间", align: "center", key: "uploadTime" }
      ],
      PullGroupColumns: [
        { width: 180, align: "center", title: "分组ID", key: "groupId" },
        { width: 200, align: "center", title: "任务名称", key: "taskName" },
        {
          width: 150,
          align: "center",
          title: "群聊Urls数量",
          key: "grpUrl",
          render: (h, params) => {
            const { grpUrl } = params.row
            return h("div", [h("span", { domProps: { innerHTML: grpUrl.length } })])
          }
        },
        { width: 150, align: "center", title: "最大人数", key: "maxPeople" },
        { width: 180, align: "center", title: "类型", key: "opType" },
        { width: 180, align: "center", title: "订单状态", key: "pullState" },
        {
          width: 650,
          title: "操作",
          fixed: "right",
          align: "center",
          render: (h, params) => {
            const { taskName, groupId } = params.row
            return h("div", [
              h(
                "Button",
                {
                  style: { marginRight: "15px" },
                  props: { type: "info", icon: "md-add" },
                  on: {
                    click: () => {
                      this.isShowAddModal = true
                      this.row = params.row
                    }
                  }
                },
                "补充群Urls"
              ),
              h(
                "Button",
                {
                  style: { marginRight: "15px" },
                  props: { type: "success", icon: "md-eye" },
                  on: {
                    click: () => {
                      this.isShowReportDrawer = true
                      this.getReportData(taskName, groupId)
                    }
                  }
                },
                "查看拉群报表"
              ),
              h(
                "Button",
                {
                  style: { marginRight: "15px" },
                  props: { type: "error", icon: "md-stopwatch" },
                  on: {
                    click: () => {
                      this.isShowStopModal = true
                      this.currentGroupID = groupId
                      this.currentTaskName = taskName
                    }
                  }
                },
                "终止拉群任务"
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
  },
  computed: {
    ...mapGetters(["user_id"]),
    supplyUrlListLength() {
      return this.supplyUrlList.split(/[\r\n]/g).filter(item => item !== "").length
    }
  },
  methods: {
    async initData() {
      this.data = []
      const data = await this.$http.get("/getEnterGroupInfo")
      const Table = this.$refs[this.PagedTableRef]
      Table && (Table.total = Object.keys(data).length)
      data.forEach(item => {
        this.data.push({
          grpUrl: item.groupOrderInfo.grpUrl,
          groupId: item.groupOrderInfo.groupId,
          taskName: item.groupOrderInfo.taskName,
          maxPeople: item.groupOrderInfo.maxPeople + 5,
          opType: item.groupOrderInfo.opType === 0 ? "一手" : "二手",
          pullState: Number(item.state) === 0 ? "进行中" : "已完成"
        })
      })
    },
    cancel() {
      this.isShowAddModal = false
      this.isShowStopModal = false
    },
    async stop() {
      this.isShowStopModal = false
      const params = { groupId: this.currentGroupID, taskName: this.currentTaskName }
      const { msg } = await this.$http.get("/stopEnterGroup", { params })
      this.initData()
      this.$Message.info(msg)
    },
    async getReportData(taskName, groupId) {
      this.reportData = []
      const data = await this.$http.get("/groupView", { params: { taskName, groupId } })
      let msg
      const uploadTime = getSystemTime()
      data.forEach(item => {
        if (item) {
          if (item.roomName === "有异常,请检查账号状态") {
            msg = "部分有异常,请检查账号状态或账号下是否有好友"
          } else {
            msg = "OK"
            const countBefore = item.countBefore
            const memberCount = item.groupInfo.memberCount
            const chatRoomMember = item.groupInfo.chatRoomMember
            chatRoomMember.forEach(sonItem => {
              let objPhone
              // TODO 用函数 + find 实现寻找对应的手机号
              Object.keys(item.idtoMd5).forEach(objItem => {
                if (sonItem.userName === objItem) {
                  objPhone = item.idtoMd5[objItem]
                }
              })
              this.reportData.push({
                WXID: sonItem.userName,
                phone: objPhone || "未上传或非本平台",
                nickName: sonItem.nickName,
                uploadTime,
                memberCount,
                groupUrl: item.url,
                roomName: item.roomName,
                groupID: item.chatRoomName.split("@")[0],
                beforeCount: countBefore
              })
              this.dataLength = this.reportData.length
            })
          }
        }
      })
      this.$Message.info(msg)
    },
    async addUrl() {
      if (!this.addPeople) {
        this.$Message.warning("请设置群最终人数！")
        return
      }
      if (this.addPeople > 39) {
        this.$Message.warning("群最终人数不能大于39！")
        return
      }
      if (!this.supplyUrlList) {
        this.$Message.warning("请填入群链接！")
        return
      }
      this.isShowAddModal = false
      const { groupId, taskName } = this.row
      const grpUrl = this.supplyUrlList.split(/[\r\n]/g).filter(item => item !== "")
      const opType = this.addType === "一手" ? 0 : 1
      const args = { grpUrl, groupId, taskName, maxPeople: this.addPeople - 5, opType }
      const { msg } = await this.$http.post("/group/addGroupURL", args)
      this.initData()
      this.$Message.info(msg)
    },
    exportData() {
      const Time = getSystemTime()
      const PagedTable = this.$refs.ReportPagedTable
      const Table = PagedTable.$refs[PagedTable.TableRef]
      Table.exportCsv({ filename: `拉群订单报表  ${Time}` })
    },
    removeOrder(taskName, groupId) {
      const params = { taskName, groupId }
      this.$Modal.confirm({
        title: "删除订单",
        content: "确定要删除吗？",
        okText: "确定",
        cancelText: "取消",
        onOk: async () => {
          const { msg } = await this.$http.get("/order/deleteEnterGroupOrder", { params })
          this.$Message.info(msg)
          this.initData()
        },
        onCancel() {}
      })
    },
    refreshData() {
      this.initData()
    }
  }
}
</script>

<style lang="scss" scoped>
.ivu-radio-group {
  vertical-align: bottom;
}

.drawer-footer {
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: right;
  padding: 10px 16px;
  position: absolute;
  background: #fff;
  border-top: 1px solid #e8e8e8;
}

.upload {
  .title {
    width: 56px;
    float: left;
    height: 32px;
    display: block;
    line-height: 32px;
  }
}
</style>
