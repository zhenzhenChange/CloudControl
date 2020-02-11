<template>
  <div class="PullGroup">
    <PagedTable :data="data" :ref="PagedTableRef" :dataColumns="PullGroupColumns" />
    <Drawer width="80" :closable="false" v-model="isShowReportDrawer">
      <div slot="header">
        <Icon type="md-book" color="#2D8CF0" class="mr-10" />拉群任务报表
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
import { mapState } from "vuex"
export default {
  data() {
    return {
      row: "",
      data: [],
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
        { width: 70, align: "center", title: "序号", key: "serialNumber" },
        { title: "群名称", align: "center", key: "chatRoonName" },
        { title: "群ID", align: "center", key: "ID" },
        { title: "群Url", align: "center", key: "url" },
        { title: "当前群人数", align: "center", key: "memberCount" },
        { title: "拉群前人数", align: "center", key: "beforeCount" },
        { title: "群成员WXID", align: "center", key: "WXID" },
        { title: "群成员昵称", align: "center", key: "nickName" },
        { title: "群成员手机号", align: "center", key: "phone" }
      ],
      PullGroupColumns: [
        { align: "center", title: "任务名称", key: "taskName" },
        {
          width: 180,
          align: "center",
          title: "群聊Urls数量",
          key: "grpUrl",
          render: (h, params) => {
            const { grpUrl } = params.row
            /*  let url = ""
            grpUrl.forEach(item => (url += `${item}<br/>`)) */
            return h("div", [h("span", { domProps: { innerHTML: grpUrl.length } })])
          }
        },
        { align: "center", title: "最大人数", key: "maxPeople" },
        { align: "center", title: "类型", key: "opType" },
        // { align: "center", title: "分组名称", key: "groupName" },
        { align: "center", title: "分组ID", key: "groupId" },
        {
          width: 500,
          title: "操作",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: { type: "info", icon: "md-add" },
                  style: { marginRight: "15px" },
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
                  props: { type: "success", icon: "md-eye" },
                  style: { marginRight: "15px" },
                  on: {
                    click: () => {
                      const { taskName, groupId } = params.row
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
                  props: { type: "error", icon: "md-stopwatch" },
                  on: {
                    click: () => {
                      const { taskName, groupId } = params.row
                      this.isShowStopModal = true
                      this.currentGroupID = groupId
                      this.currentTaskName = taskName
                    }
                  }
                },
                "终止拉群任务"
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
    ...mapState({ user_id: state => state.user_id }),
    supplyUrlListLength() {
      const length = this.supplyUrlList.split(/[\r\n]/g).filter(item => item !== "").length
      return length
    }
  },
  methods: {
    async initData() {
      this.data = []
      const data = await this.$http.get("/getEnterGroupInfo")
      this.$refs[this.PagedTableRef].total = Object.keys(data).length
      for (const key in data) {
        this.data.push({
          grpUrl: JSON.parse(data[key]).grpUrl,
          groupId: JSON.parse(data[key]).groupId,
          taskName: JSON.parse(data[key]).taskName,
          maxPeople: JSON.parse(data[key]).maxPeople + 5,
          opType: JSON.parse(data[key]).opType === 0 ? "一手" : "二手"
        })
      }
    },
    cancel() {
      this.isShowAddModal = false
      this.isShowStopModal = false
    },
    async stop() {
      this.isShowStopModal = false
      const params = { groupId: this.currentGroupID, taskName: this.currentTaskName }
      const { msg } = await this.$http.get("/stopEnterGroup", { params })
      this.$Message.info(msg)
    },
    async getReportData(taskName, groupId) {
      this.reportData = []
      const data = await this.$http.get("/groupView", { params: { taskName, groupId } })
      data.forEach((item, index) => {
        let memberCount = item.groupInfo.memberCount
        this.reportData.push({
          url: item.url,
          serialNumber: index + 1,
          memberCount: memberCount,
          chatRoonName: item.chatRoonName,
          ID: item.chatRoonName.split("@")[0],
          WXID: "",
          nickName: "",
          phone: "",
          beforeCount: memberCount - Object.keys(item.idtoMd5).length
        })
      })
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
      this.$Message.info(msg)
    },
    exportData() {
      const date = new Date()
      const year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      let hours = date.getHours()
      let minutes = date.getMinutes()
      let seconds = date.getSeconds()
      if (month >= 1 && month <= 9) month = "0" + month
      if (day >= 0 && day <= 9) day = "0" + day
      if (hours >= 0 && hours <= 9) hours = "0" + hours
      if (minutes >= 0 && minutes <= 9) minutes = "0" + minutes
      if (seconds >= 0 && seconds <= 9) seconds = "0" + seconds
      const Time = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
      const PagedTable = this.$refs.ReportPagedTable
      const Table = PagedTable.$refs[PagedTable.TableRef]
      Table.exportCsv({ filename: `拉群订单报表  ${Time}` })
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
