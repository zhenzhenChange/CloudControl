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
          <Input clearable v-model="finalNum" :placeholder="`请设置群最终人数`">
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
      <div class="drawer-footer">
        <Button
          class="mr-10"
          type="warning"
          @click="resetClick"
          icon="md-refresh"
        >
          重置
        </Button>
        <Button type="success" icon="md-checkmark" @click="createGroupTask">
          立即提交
        </Button>
      </div>
    </Drawer>
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
      checkType: "一手",
      currentGroupID: "",
      currentGroupName: "",
      qrcode: "",
      urlArea: "",
      count: 0,
      pageIndex: 0,
      pageSize: 10,
      isShowDrawer: false,
      isShowUrlModal: false,
      isShowRadioModal: false,
      radioSelectConfig: {},
      PagedTableRef: "PullGroupPagedTable",
      PullGroupColumns: [
        { width: 70, align: "center", title: "序号", key: "serialNumber" },
        { align: "center", title: "分组ID", key: "groupId" },
        { align: "center", title: "分组名称", key: "groupName" },
        { align: "center", title: "创建时间", key: "groupCreateDate" },
        {
          width: 230,
          title: "操作",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: { type: "info", icon: "md-hand" },
                  style: { marginRight: "5px" },
                  on: {
                    click: () => {
                      const { groupName, groupId } = params.row
                      this.isShowDrawer = true
                      this.currentGroupID = groupId
                      this.currentGroupName = groupName
                    }
                  }
                },
                "邀请任务"
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
      let grpUrl = []
      this.urlList.split(/[\r\n]/g).forEach(item => grpUrl.push(item))
      grpUrl = grpUrl.filter(item => item !== "")
      const params = {
        maxPeople: this.finalNum - 5,
        groupId: this.currentGroupID,
        opType: this.checkType === "一手" ? "0" : "1"
      }
      await this.$http.post("/group/setGroupURL", grpUrl)
      const { msg } = await this.$http.get("/group/enterGroup", { params })
      this.$Message.info(msg)
      this.resetClick()
    }
    /* async tryClick() {
      if (!this.urlArea) {
        this.$Message.warning("请填入群链接")
        return
      }
      this.isShowUrlModal = false
      let grpUrl = []
      this.urlArea.split(/[\r\n]/g).forEach(item => grpUrl.push(item))
      grpUrl = grpUrl.filter(item => item !== "")
      const { msg } = await this.$http.post("/group/setGroupURL", grpUrl)
      this.$Message.info(msg)
    },
    catchClick() {
      this.isShowUrlModal = false
      this.isShowRadioModal = false
    } */
  }
}
</script>

<style lang="scss" scoped>
.ivu-radio-group {
  vertical-align: bottom;
}

.drawer-footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  background: #fff;
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
