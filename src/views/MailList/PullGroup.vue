<template>
  <div class="PullGroup">
    <PagedTable
      :data="data"
      :ref="PagedTableRef"
      :dataColumns="PullGroupColumns"
    />
    <Drawer width="600" :closable="false" v-model="isShowDrawer">
      <div slot="header">
        <Icon type="md-create" color="#2D8CF0" class="mr-10" />创建拉群任务
      </div>
      <Row>
        <Col span="10">
          <Input v-model="currentGroupName" disabled>
            <span slot="prepend">当前分组</span>
          </Input>
        </Col>
        <Col span="13" offset="1">
          <Input v-model="currentGroupID" disabled>
            <span slot="prepend">分组ID</span>
          </Input>
        </Col>
      </Row>
      <Row class="mt-10">
        <Col span="10">
          <Input clearable v-model="finalNum" placeholder="请设置群最终人数">
            <span slot="prepend">最终人数</span>
          </Input>
        </Col>
        <Col span="13" offset="1">
          <Input
            disabled
            placeholder="群最终人数（包括群主与小号），且要 <= 39"
          />
        </Col>
      </Row>
      <Row class="mt-10">
        <Col span="10">
          <span class="ml-10 mr-10">类型选择</span>
          <RadioGroup v-model="checkType">
            <Radio label="一手"></Radio>
            <Radio label="二手"></Radio>
          </RadioGroup>
        </Col>
      </Row>
      <Row class="mt-10">
        <Col span="24">
          <Input disabled placeholder="每次上传都会清空上一次" />
        </Col>
      </Row>
      <Row class="mt-10">
        <Col span="24">
          <Input
            type="textarea"
            v-model="urlList"
            :autosize="{ minRows: 5, maxRows: 15 }"
            placeholder="请将群链接粘贴至此处，一条链接占一行"
          />
        </Col>
      </Row>
      <Row class="mt-10">
        <Col span="12">
          <Input disabled :placeholder="`群链接总数：${urlListLength}`" />
        </Col>
      </Row>
      <div class="drawer-footer">
        <Button
          class="mr-10"
          type="warning"
          icon="md-refresh"
          @click="resetClick"
        >
          重置
        </Button>
        <Button type="success" icon="md-checkmark" @click="createGroupTask">
          立即提交
        </Button>
      </div>
    </Drawer>
    <Drawer width="70" :closable="false" v-model="isShowReportDrawer">
      <div slot="header">
        <Icon type="md-book" color="#2D8CF0" class="mr-10" />拉群任务报表
      </div>
      <PagedTable
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
        <Button type="error" icon="md-checkmark" @click="stop">
          确定
        </Button>
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
      urlList: "",
      finalNum: "",
      pageSize: 10,
      pageIndex: 0,
      reportData: [],
      checkType: "一手",
      currentGroupID: "",
      isShowDrawer: false,
      currentGroupName: "",
      isShowStopModal: false,
      isShowReportDrawer: false,
      PagedTableRef: "PullGroupPagedTable",
      reportColumns: [
        { width: 70, align: "center", title: "序号", key: "serialNumber" },
        { title: "群聊ID", align: "center", key: "ID" },
        { title: "群聊链接", align: "center", key: "Url" },
        { title: "群内人数", align: "center", key: "memberCount" }
      ],
      PullGroupColumns: [
        { width: 70, align: "center", title: "序号", key: "serialNumber" },
        { align: "center", title: "分组ID", key: "groupId" },
        { align: "center", title: "分组名称", key: "groupName" },
        { align: "center", title: "创建时间", key: "groupCreateDate" },
        {
          width: 500,
          title: "操作",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: { type: "info", icon: "md-share-alt" },
                  style: { marginRight: "15px" },
                  on: {
                    click: () => {
                      const { groupName, groupId } = params.row
                      this.isShowDrawer = true
                      this.currentGroupID = groupId
                      this.currentGroupName = groupName
                    }
                  }
                },
                "创建拉群任务"
              ),
              h(
                "Button",
                {
                  props: { type: "success", icon: "md-eye" },
                  style: { marginRight: "15px" },
                  on: {
                    click: () => {
                      const { groupId } = params.row
                      this.isShowReportDrawer = true
                      this.getReportData(groupId)
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
                      const { groupId } = params.row
                      this.isShowStopModal = true
                      this.currentGroupID = groupId
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
    this.allData()
    this.initData()
  },
  computed: {
    ...mapState({ user_id: state => state.user_id }),
    urlListLength() {
      return this.urlList.split(/[\r\n]/g).filter(item => item !== "").length
    }
  },
  methods: {
    async allData() {
      const { data } = await this.$http.get("/account/getAllGroup", {
        params: { user_id: this.user_id }
      })
      this.$refs[this.PagedTableRef].total = data.length
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
    handleBeforeUpload(file) {
      const reader = new FileReader()
      reader.readAsText(file)
      reader.onload = () => (this.urlList = reader.result)
      return false
    },
    resetClick() {
      this.finalNum = this.urlList = ""
    },
    async createGroupTask() {
      if (!this.finalNum) {
        this.$Message.warning("请设置群最终人数！")
        return
      }
      if (this.finalNum > 39) {
        this.$Message.warning("群最终人数不能大于39！")
        return
      }
      if (!this.urlList) {
        this.$Message.warning("请填入群链接！")
        return
      }
      let grpUrl = this.urlList.split(/[\r\n]/g).filter(item => item !== "")
      const params = {
        maxPeople: this.finalNum - 5,
        groupId: this.currentGroupID,
        opType: this.checkType === "一手" ? "0" : "1"
      }
      await this.$http.post("/group/setGroupURL", grpUrl)
      const { msg } = await this.$http.get("/group/enterGroup", { params })
      this.$Message.info(msg)
      this.resetClick()
    },
    cancel() {
      this.isShowStopModal = false
    },
    async stop() {
      this.isShowStopModal = false
      const { msg } = await this.$http.get("/stopEnterGroup", {
        params: { groupId: this.currentGroupID }
      })
      this.$Message.info(msg)
    },
    async getReportData(groupId) {
      this.reportData = []
      const data = await this.$http.get("/groupView", {
        params: { groupId }
      })
      data.forEach((item, index) => {
        for (const key in item) {
          this.reportData.push({
            serialNumber: index + 1,
            ID: key.split("@")[0],
            Url: key.split("###")[1],
            memberCount: item[key].memberCount
          })
        }
      })
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
