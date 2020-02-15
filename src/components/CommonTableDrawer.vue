<template>
  <div>
    <Drawer width="90" placement="left" :closable="false" v-model="isShowTableDrawer">
      <Button type="error" class="mr-10" icon="md-trash" @click="removeModal">删除</Button>
      <Button type="info" class="mr-10" icon="md-cloud-upload" @click="isShowUploadModal = true">
        上传账号
      </Button>
      <Button class="mr-10" type="warning" icon="md-trending-up" @click="isShowUpModal = true">
        一键上线
      </Button>
      <Button class="mr-10" type="warning" icon="md-trending-down" @click="isShowDownModal = true">
        一键下线
      </Button>
      <Button type="error" class="mr-10" icon="md-close" @click="isShowTrashModal = true">
        一键剔除无效号
      </Button>
      <Button class="mr-10" type="info" icon="md-move" @click="moveModal">分组变更</Button>
      <div class="float-right friends">
        <span class="mr-10">总好友量：{{ friends }}</span>
        <span class="ml-10 mr-10"> 今日通过好友量：{{ todayFriends }} </span>
      </div>
      <Divider dashed />
      <div class="PagedTable">
        <Table
          stripe
          border
          :data="data"
          :ref="TableRef"
          :columns="CommonColumns"
          @on-selection-change="selectionChange"
        />
        <div class="page mt-10">
          <div class="mb-10">
            <Page
              transfer
              show-total
              show-sizer
              show-elevator
              :total="total"
              :current="current"
              :page-size="pageSize"
              @on-change="changePage"
              :page-size-opts="pageSizeOpts"
              @on-page-size-change="changeSize"
            />
          </div>
        </div>
      </div>
    </Drawer>
    <Modal
      width="350"
      :closable="false"
      :mask-closable="false"
      v-model="isShowDeleteModal"
      class-name="vertical-center-modal"
    >
      <p slot="header"><Icon type="md-trash" color="#ED4014" class="mr-5 header-icon" />一键删除</p>
      <div class="text-center">
        <p>确定要删除所选账号吗？</p>
      </div>
      <div slot="footer">
        <Button icon="md-remove-circle" @click="cancel">取消</Button>
        <Button type="error" icon="md-trash" @click="remove">删除</Button>
      </div>
    </Modal>
    <Modal
      width="600"
      :mask-closable="false"
      v-model="isShowUploadModal"
      class-name="vertical-center-modal"
    >
      <p slot="header">
        <Icon color="#2d8cf0" type="md-add-circle" class="mr-5" />上传账号至该分组
      </p>
      <div class="upload mb-10">
        <span class="title mr-10">账号数据</span>
        <Upload action="" :show-upload-list="false" :before-upload="handleBeforeUpload">
          <Button icon="md-cloud-upload">上传TXT文件</Button>
        </Upload>
      </div>
      <Input
        type="textarea"
        v-model="dataList"
        :autosize="{ minRows: 5, maxRows: 20 }"
        placeholder="账号格式：XXXX----XXXX----XXXX（账号----密码----A16/62数据），一个账号单独一行，多个账号多行，支持A16/62"
      >
      </Input>
      <div slot="footer">
        <Button icon="md-remove-circle" @click="cancel">取消</Button>
        <Button type="success" icon="md-checkmark" @click="upload">确定</Button>
      </div>
    </Modal>
    <Modal
      width="350"
      :closable="false"
      :mask-closable="false"
      v-model="isShowUpModal"
      class-name="vertical-center-modal"
    >
      <p slot="header">
        <Icon color="#FF9C08" type="md-trending-up" class="mr-5 header-icon" />一键上线
      </p>
      <div class="text-center">
        <p>确定要上线该分组下的所有账号吗？</p>
      </div>
      <div slot="footer">
        <Button icon="md-remove-circle" @click="cancel">取消</Button>
        <Button type="success" icon="md-checkmark" @click="up">确定</Button>
      </div>
    </Modal>
    <Modal
      width="350"
      :closable="false"
      :mask-closable="false"
      v-model="isShowDownModal"
      class-name="vertical-center-modal"
    >
      <p slot="header">
        <Icon color="#FF9C08" type="md-trending-down" class="mr-5 header-icon" />一键下线
      </p>
      <div class="text-center">
        <p>确定要下线该分组下的所有账号吗？</p>
      </div>
      <div slot="footer">
        <Button icon="md-remove-circle" @click="cancel">取消</Button>
        <Button type="success" icon="md-checkmark" @click="down">确定</Button>
      </div>
    </Modal>
    <Modal
      width="350"
      :closable="false"
      :mask-closable="false"
      v-model="isShowTrashModal"
      class-name="vertical-center-modal"
    >
      <p slot="header">
        <Icon color="#ED4014" type="md-close" class="mr-5 header-icon" />一键剔除该分组下的无效账号
      </p>
      <div class="text-center">
        <p>确定要剔除吗？</p>
      </div>
      <div slot="footer">
        <Button icon="md-remove-circle" @click="cancel">取消</Button>
        <Button type="error" icon="md-checkmark" @click="trash">确定</Button>
      </div>
    </Modal>
    <Modal
      width="350"
      :closable="false"
      :mask-closable="false"
      v-model="isShowMoveModal"
      class-name="vertical-center-modal"
    >
      <p slot="header">
        <Icon type="md-move" color="#2DB7F5" class="mr-5 header-icon" />移动至新分组
      </p>
      <div class="SearchSelect mr-30">
        <span class="title mr-10">账号分组</span>
        <Select
          transfer
          clearable
          filterable
          class="select"
          v-model="value"
          placeholder="请选择分组"
        >
          <Option :key="option.value" :value="option.value" v-for="option in options">
            {{ option.label }}
          </Option>
        </Select>
      </div>
      <div class="clear-both"></div>
      <div slot="footer">
        <Button icon="md-remove-circle" @click="cancel">取消</Button>
        <Button type="info" icon="md-move" @click="move">移动</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { mapState } from "vuex"
export default {
  name: "TableDrawer",
  data() {
    return {
      row: "",
      data: [],
      total: 0,
      value: "",
      current: 1,
      allData: [],
      options: [],
      friends: "",
      groupID: "",
      dataList: "",
      mutex: false,
      pageSize: 10,
      pageIndex: 0,
      errorMsg: [],
      todayFriends: "",
      selectConfig: {},
      operationData: [],
      isShowUpModal: false,
      isShowDownModal: false,
      isShowMoveModal: false,
      isShowTrashModal: false,
      isShowDeleteModal: false,
      isShowUploadModal: false,
      isShowTableDrawer: false,
      TableRef: "DrawerPagedTable",
      PagedTableRef: "DrawerPagedTable",
      pageSizeOpts: [10, 30, 50, 100, 150, 200, 400],
      CommonColumns: [
        { width: 60, align: "center", type: "selection" },
        { width: 70, align: "center", title: "序号", key: "serialNumber" },
        { width: 130, align: "center", title: "账号", key: "account" },
        { width: 130, align: "center", tooltip: true, title: "密码", key: "accountPwd" },
        { width: 180, align: "center", tooltip: true, title: "账号A16数据", key: "account62A16" },
        { width: 100, align: "center", title: "好友数", key: "accountFriendCount" },
        {
          width: 130,
          align: "center",
          title: "账号是否有效",
          key: "accountIsValid",
          render: (h, params) => {
            const row = params.row
            const color = row.accountIsValid ? "success" : "error"
            const text = row.accountIsValid ? "正常" : "无效"
            return h("Tag", { props: { type: "border", color } }, text)
          }
        },
        {
          width: 130,
          align: "center",
          title: "登录状态",
          key: "accountState",
          render: (h, params) => {
            const row = params.row
            const color = row.accountState ? "success" : "error"
            const text = row.accountState ? "在线" : "离线"
            return h("Tag", { props: { type: "dot", color } }, text)
          }
        },
        { width: 190, align: "center", tooltip: true, title: "微信ID", key: "accountWxid" },
        {
          title: "操作",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: { size: "small", type: "error", icon: "md-trash", disabled: this.mutex },
                  on: {
                    click: () => {
                      this.isShowDeleteModal = true
                      this.row = params.row
                    }
                  }
                },
                "删除"
              )
            ])
          }
        }
      ]
    }
  },
  computed: {
    ...mapState({ user_id: state => state.user_id, GroupData: state => state.GroupData })
  },
  methods: {
    async initAllData(group_id) {
      const { data } = await this.$http.post("/account/getAccount", { group_id })
      const res = await this.$http.get("/getGroupPassAndAll", { params: { groupId: group_id } })
      this.todayFriends = res.todayPassCount
      this.friends = res.allCount
      console.log(res)
      this.allData = data
      this.total = data.length
    },
    async getAccountDataByGroupID(group_id) {
      this.data = []
      this.options = JSON.parse(this.GroupData)
      const pageSize = String(this.pageSize)
      const pageIndex = String(this.pageIndex)
      const postArgs = { group_id, pageSize, pageIndex }
      const res = await this.$http.post("/account/getAccount", postArgs)
      const params = { groupId: group_id }
      const errData = await this.$http.get("/getErrorAccount", { params })
      let errMsg = ""
      res.data.forEach((item, index) => {
        if (Array.isArray(errData)) {
          errData.forEach(sonItem => {
            if (item.account === sonItem.account) {
              errMsg = sonItem.errorMsg
            }
          })
        }
        this.data.push({
          serialNumber: index + 1,
          account: item.account,
          account62A16: item.account62A16,
          accountFriendCount: item.accountFriendCount ? item.accountFriendCount : "无",
          accountIsValid: item.accountIsValid,
          accountPwd: item.accountPwd,
          accountState: item.accountState,
          accountWxid: item.accountWxid || errMsg
        })
      })
      this.todayFriends = res.passCount
    },
    changePage(index) {
      this.current = index
      this.pageIndex = index - 1
      this.getAccountDataByGroupID(this.groupID)
    },
    changeSize(pageSize) {
      this.pageSize = pageSize
      this.getAccountDataByGroupID(this.groupID)
    },
    selectionChange(selection) {
      this.operationData = selection
      selection.length ? (this.mutex = true) : (this.mutex = false)
    },
    removeModal() {
      if (!this.operationData.length) {
        this.$Message.warning("请选择处理项")
        return
      }
      this.isShowDeleteModal = true
    },
    async remove() {
      this.isShowDeleteModal = false
      const accounts = []
      if (this.row) {
        const { account } = this.row
        accounts.push(account)
        this.row = ""
      } else {
        this.operationData.forEach(item => accounts.push(item.account))
      }
      const args = { accounts, groupId: "", requestType: 1 }
      const { msg } = await this.$http.post("/account/deleteAccount", args)
      this.$Message.info(msg)
      this.initAllData(this.groupID)
      this.$refs[this.TableRef].selectAll(false)
      this.getAccountDataByGroupID(this.groupID)
    },
    cancel() {
      this.isShowMoveModal = false
      this.isShowDeleteModal = false
      this.isShowUploadModal = false
      this.isShowUpModal = false
      this.isShowDownModal = false
      this.isShowTrashModal = false
    },
    async upload() {
      let list = this.dataList
        .split(/[\r\n]/g)
        .map(item => item.split(/----/g))
        .map(item => {
          return { account: item[0], password: item[1], a16Data64: item[2] }
        })
      list.forEach((item, index) => {
        if (!item.account || !item.password || !item.a16Data64) list.splice(index, 1)
      })
      const args = { list, userId: this.user_id, groupId: this.groupID }
      const { msg } = await this.$http.post("/account/addAccount", args)
      this.dataList = ""
      this.$Message.info(msg)
      this.isShowUploadModal = false
      this.initAllData(this.groupID)
      this.getAccountDataByGroupID(this.groupID)
    },
    handleBeforeUpload(file) {
      const reader = new FileReader()
      reader.readAsText(file)
      reader.onload = () => (this.dataList = reader.result)
      return false
    },
    async up() {
      this.isShowUpModal = false
      const args = { list: [{}], request_type: "0", group_id: this.groupID }
      const { data } = await this.$http.post("/account/loginMulti", args)
      let account = ""
      let errorMsg = ""
      if (data.error.length !== 0) {
        data.error.forEach(item => {
          const msg = JSON.parse(item.msg).Message
          account = item.account
          const start = msg.indexOf("<Content><![CDATA[") + 18
          const end = msg.lastIndexOf("]]></Content>")
          errorMsg = msg.substring(start, end)
          this.errorMsg.push({ account, errorMsg })
        })
        const saveArgs = { data: this.errorMsg, groupId: this.groupID }
        await this.$http.post("/saveErrorAccount", saveArgs)
      }
      this.initAllData(this.groupID)
      this.getAccountDataByGroupID(this.groupID)
      this.$Message.info(`上线成功${data.success.length}个，失败${data.error.length}个`)
    },
    async down() {
      this.isShowDownModal = false
      const args = { wxids: [], requestType: "0", groupId: this.groupID }
      const { data } = await this.$http.post("/account/logout", args)
      this.initAllData(this.groupID)
      this.getAccountDataByGroupID(this.groupID)
      this.$Message.info(`下线成功${data.success.length}个，失败${data.error.length}个`)
    },
    moveModal() {
      if (!this.operationData.length) {
        this.$Message.warning("请选择处理项")
        return
      }
      this.isShowMoveModal = true
    },
    async move() {
      this.isShowMoveModal = false
      const account_list = []
      this.operationData.forEach(item => account_list.push(item.account))
      const args = { account_list, group_id: this.value }
      const { msg } = await this.$http.post("/account/setAccountGroup", args)
      this.value = ""
      this.$Message.success(msg)
      this.initAllData(this.groupID)
      this.getAccountDataByGroupID(this.groupID)
      this.$refs[this.TableRef].selectAll(false)
    },
    async trash() {
      this.isShowTrashModal = false
      const accounts = []
      this.allData.forEach(item => {
        if (!item.accountIsValid) accounts.push(item.account)
      })
      const args = { accounts, groupId: "", requestType: 1 }
      const { msg } = await this.$http.post("/account/deleteAccount", args)
      this.$Message.info(msg)
      this.initAllData(this.groupID)
      this.$refs[this.TableRef].selectAll(false)
      this.getAccountDataByGroupID(this.groupID)
    }
  }
}
</script>

<style lang="scss" scoped>
.upload {
  .title {
    width: 56px;
    float: left;
    height: 32px;
    display: block;
    line-height: 32px;
  }
}

.SearchSelect {
  display: flex;
  align-items: center;
  justify-content: center;
  .title {
    float: left;
    height: 32px;
    line-height: 32px;
  }
  .select {
    width: 70%;
    margin-top: 1px;
    ::v-deep .ivu-select-input {
      padding-bottom: 5px;
    }
  }
}

.friends {
  height: 32px;
  line-height: 32px;
}
</style>
