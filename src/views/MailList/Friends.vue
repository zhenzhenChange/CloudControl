<template>
  <div class="Friends">
    <ButtonList :buttonListInfos="buttonListInfos" />
    <Divider class="float-left" dashed />
    <PagedTable :data="data" :ref="PagedTableRef" :dataColumns="FriendsColumns" />
    <CommonConfirmModal ref="FriendConfirmModal" :config="config" />
    <Drawer width="900" :closable="false" v-model="isShowDrawer">
      <div slot="header" class="header-drawer">
        <div><Icon class="mr-10" color="#2D8CF0" type="md-create" />创建搜索加粉任务</div>
        <div>
          <Button class="mr-10" type="warning" icon="md-refresh" @click="resetClick">重置</Button>
          <Button type="success" icon="md-checkmark" @click="createFriendsTask">立即提交</Button>
        </div>
      </div>
      <Row>
        <Col span="11">
          <Input clearable v-model="friendsTaskName" placeholder="请设置任务名称">
            <span slot="prepend">任务名称</span>
          </Input>
        </Col>
      </Row>
      <Row class="mt-10">
        <Col span="11">
          <Input v-model="currentGroupName" disabled>
            <span slot="prepend">当前分组</span>
          </Input>
        </Col>
        <Col span="12" offset="1">
          <Input v-model="currentGroupID" disabled>
            <span slot="prepend">分组ID</span>
          </Input>
        </Col>
      </Row>
      <Row class="mt-10">
        <Col span="24">
          <span class="ml-10 mr-10">号码格式</span>
          <RadioGroup v-model="mailType">
            <Radio label="纯手机号"></Radio>
            <Radio label="姓名----手机号"></Radio>
          </RadioGroup>
        </Col>
      </Row>
      <Row class="mt-10">
        <Col span="6">
          <div class="upload">
            <span class="title ml-10 mr-10">加粉数据</span>
            <Upload
              :show-upload-list="false"
              action="https://www.baidu.com/"
              :before-upload="handleBeforeUpload"
            >
              <Button icon="md-cloud-upload">上传TXT文件</Button>
            </Upload>
          </div>
        </Col>
        <Col span="4" offset="1">
          <Input disabled :placeholder="`数据条数：${mailListLength}`" />
        </Col>
        <Col span="12" offset="1">
          <Input disabled placeholder="每次上传都会清空上一次" />
        </Col>
      </Row>
      <Row class="mt-10">
        <Col span="24">
          <Input
            type="textarea"
            v-model="mailList"
            :autosize="{ minRows: 5, maxRows: 15 }"
            placeholder="请将号码粘贴或上传至此处，一条号码占一行"
          />
        </Col>
      </Row>
      <Row class="mt-10">
        <Col span="17">
          <span class="ml-10 mr-10">设置来源</span>
          <RadioGroup v-model="setOrigin">
            <Radio label="来源手机号"></Radio>
            <Radio label="来源微信号"></Radio>
            <Radio label="来源腾讯QQ"></Radio>
            <Radio label="来源通讯录"></Radio>
            <Radio label="自定义来源"></Radio>
          </RadioGroup>
        </Col>
        <Col span="6" offset="1" v-show="setOrigin === '自定义来源'">
          <Input clearable v-model="custom" placeholder="请填写来源">
            <span slot="prepend">自定义来源</span>
          </Input>
        </Col>
      </Row>
      <Row class="mt-10">
        <Col span="24">
          <Input clearable v-model="validInfo" placeholder="可自定义验证信息">
            <span slot="prepend">验证信息</span>
          </Input>
        </Col>
      </Row>
      <Row class="mt-10">
        <Col span="11">
          <Input clearable class="float-left" v-model="startTime" placeholder="请设置开始执行时间">
            <span slot="prepend">执行时间</span>
          </Input>
        </Col>
        <Col span="12" offset="1">
          <Input disabled :placeholder="`任务将于 ${startTime ? startTime : 0} 秒后开始执行`">
          </Input>
        </Col>
      </Row>
      <Row class="mt-10">
        <Col span="11">
          <Input clearable class="float-left" v-model="blankTime" placeholder="请设置间隔时长">
            <span slot="prepend">间隔时长</span>
          </Input>
        </Col>
        <Col span="12" offset="1">
          <Input
            disabled
            :placeholder="
              `多个账号进行加粉时，为单个账号设置间隔时长 ${blankTime ? blankTime : 0} 秒`
            "
          >
          </Input>
        </Col>
      </Row>
      <Row class="mt-10">
        <Col span="11">
          <Input clearable v-model="requestNum" placeholder="请设置请求数量">
            <span slot="prepend">单号请求</span>
          </Input>
        </Col>
        <Col span="12" offset="1">
          <Input disabled placeholder="每个账号最多可提交的好友申请数" />
        </Col>
      </Row>
      <Row class="mt-10">
        <Col span="11">
          <Input clearable class="float-left" v-model="freqInte" placeholder="请设置频繁间隔">
            <span slot="prepend">频繁间隔</span>
          </Input>
        </Col>
        <Col span="12" offset="1">
          <Input
            disabled
            :placeholder="`每频繁一次隔 ${freqInte ? freqInte : 0} 秒后，重新开始加粉`"
          >
          </Input>
        </Col>
      </Row>
      <Row class="mt-10 mb-10">
        <Col span="11">
          <Input clearable class="float-left" v-model="freqLimit" placeholder="请设置频繁上限">
            <span slot="prepend">频繁上限</span>
          </Input>
        </Col>
        <Col span="12" offset="1">
          <Input disabled :placeholder="`总频繁数达到 ${freqLimit ? freqLimit : 0} 次后，停止加粉`">
          </Input>
        </Col>
      </Row>
    </Drawer>
    <Modal
      width="550"
      :closable="false"
      v-model="isShowWXModal"
      :mask-closable="false"
      class-name="vertical-center-modal"
    >
      <p slot="header">
        <Icon type="md-send" color="#2D8CF0" class="mr-5 header-icon" />
        为单个微信账号添加指定的好友
      </p>
      <Input clearable v-model="wx" class="mr-10" placeholder="请输入微信账号">
        <span slot="prepend">微信账号</span>
      </Input>
      <Input
        clearable
        v-model="wxContent"
        class="mt-10 mr-10"
        placeholder="可选，默认选取素材库中已有模板"
      >
        <span slot="prepend">验证消息</span>
      </Input>
      <div class="upload mb-10 mt-10 ml-7">
        <span class="title mr-10">账号列表</span>
        <Upload action="" :show-upload-list="false" :before-upload="handleBeforeUpload2">
          <Button icon="md-cloud-upload">上传本地TXT文件</Button>
        </Upload>
      </div>
      <Input
        class="mr-10"
        type="textarea"
        v-model="wxUserList"
        :autosize="{ minRows: 5, maxRows: 20 }"
        placeholder="需要添加的账号列表,一行一个账号"
      >
      </Input>
      <div slot="footer">
        <Button icon="md-remove-circle" @click="catchClick">取消</Button>
        <Button type="success" icon="md-checkmark" @click="sendRequestByWX">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  data() {
    return {
      wx: "",
      data: [],
      custom: "",
      freqInte: "",
      mailList: "",
      pageSize: 10,
      pageIndex: 0,
      blankTime: "",
      freqLimit: "",
      startTime: "",
      validInfo: "",
      requestNum: "",
      operationData: [],
      currentGroupID: "",
      mailType: "纯手机号",
      isShowDrawer: false,
      friendsTaskName: "",
      setOrigin: "来源手机号",
      operationConfig: {},
      currentGroupName: "",
      mailOrigin: "手机搜索",
      content: "",
      userList: "",
      wxContent: "",
      wxUserList: "",
      isShowModal: false,
      isShowWXModal: false,
      PagedTableRef: "FriendsPagedTable",
      config: {
        icon: "md-send",
        color: "#2db7f5",
        title: "群发消息给该分组下的所有账号",
        operation: "群发（消息模板于素材管理设置）",
        btnType: "success",
        btnIcon: "md-checkmark",
        btnText: "确定",
        params: "sendByGroup",
        flag: true
      },
      buttonListInfos: [
        {
          id: "addByAcc",
          type: "primary",
          icon: "md-person-add",
          name: "单个微信账号发送添加好友请求"
        }
      ],
      FriendsColumns: [
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
                  style: { marginRight: "5px" },
                  props: { type: "info", icon: "md-send" },
                  on: {
                    click: () => {
                      const { groupName, groupId } = params.row
                      this.isShowDrawer = true
                      this.currentGroupID = groupId
                      this.currentGroupName = groupName
                    }
                  }
                },
                "创建普通加粉任务"
              ),
              h(
                "Button",
                {
                  props: { type: "success", icon: "md-paper-plane" },
                  on: {
                    click: () => {
                      this.$refs["FriendConfirmModal"].isShowConfirmModal = true
                      this.$refs["FriendConfirmModal"].configParams = params.row
                    }
                  }
                },
                "群发消息"
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
    mailListLength() {
      return this.mailList.split(/[\r\n]/g).filter(item => item !== "").length
    }
  },
  methods: {
    async allData() {
      const params = { user_id: this.user_id }
      const { data } = await this.$http.get("/account/getAllGroup", { params })
      this.$refs[this.PagedTableRef].total = data.length
    },
    async initData() {
      this.data = []
      const params = { user_id: this.user_id, pageIndex: this.pageIndex, pageSize: this.pageSize }
      const { data } = await this.$http.get("/account/getAllGroup", { params })
      data.forEach((item, index) => {
        this.data.push({
          serialNumber: index + 1,
          groupName: item.groupName,
          groupId: String(item.groupId),
          groupCreateDate: this.$options.filters.date(item.groupCreateDate)
        })
      })
    },
    async sendByGroup({ groupId: group_id }) {
      this.$refs["FriendConfirmModal"].isShowConfirmModal = false
      const { msg } = await this.$http.post("/contact/sendMessageByGroup", { group_id })
      this.$Message.info(msg)
    },
    async sendRequestByWX() {
      if (!this.wx) {
        this.$Message.warning("请填入微信账号！")
        return
      }
      if (!this.wxUserList) {
        this.$Message.warning("请上传或填入账号列表！")
        return
      }
      this.isShowWXModal = false
      let contact = this.wxUserList.split(/[\r\n]/g).filter(item => item !== "")
      const args = { wxid: this.wx, request_list: contact, content: this.wxContent }
      const { msg } = await this.$http.post("/contact/addFriends", args)
      this.$Message.info(msg)
      this.wx = this.wxContent = this.wxUserList = ""
    },
    catchClick() {
      this.isShowModal = false
      this.isShowWXModal = false
    },
    handleBeforeUpload2(file) {
      const reader = new FileReader()
      reader.readAsText(file)
      reader.onload = () => (this.wxUserList = reader.result)
      return false
    },
    handleBeforeUpload(file) {
      const reader = new FileReader()
      reader.readAsText(file)
      reader.onload = () => (this.mailList = reader.result)
      return false
    },
    resetClick() {
      this.friendsTaskName = ""
      this.mailList = ""
      this.validInfo = ""
      this.startTime = ""
      this.blankTime = ""
      this.requestNum = ""
      this.freqInte = ""
      this.freqLimit = ""
      this.custom = ""
    },
    async createFriendsTask() {
      const msgArr = [
        { name: "任务名称", value: this.friendsTaskName },
        { name: "加粉数据", value: this.mailList },
        { name: "验证信息", value: this.validInfo },
        { name: "执行时间", value: this.startTime },
        { name: "单号请求", value: this.requestNum },
        { name: "间隔时间", value: this.blankTime },
        { name: "频繁间隔", value: this.freqInte },
        { name: "频繁上限", value: this.freqLimit }
      ]
      let flag = false
      msgArr.forEach(item => {
        if (!item.value) {
          this.$Message.warning(`${item.name}不能为空`)
          flag = false
          return
        }
        flag = true
      })
      if (this.setOrigin === "自定义来源") {
        if (!this.custom) {
          this.$Message.warning(`自定义来源不能为空`)
          return
        }
      }
      const type =
        this.setOrigin === "来源手机号"
          ? "15"
          : this.setOrigin === "来源微信号"
          ? "3"
          : this.setOrigin === "来源腾讯QQ"
          ? "1"
          : this.setOrigin === "来源通讯录"
          ? "13"
          : this.custom
      let requestList = this.mailList.split(/[\r\n]/g).filter(item => item !== "")
      const args = {
        groupId: this.currentGroupID,
        startTime: this.startTime,
        requestList,
        origin: type,
        endTime: 20,
        interval: this.blankTime,
        maxRequest: this.requestNum,
        frequentlyInterval: this.freqInte,
        frequentlyMaxNumber: this.freqLimit,
        taskName: this.friendsTaskName,
        content: this.validInfo
      }
      if (flag) {
        const res = await this.$http.post("/contact/addFriendsByGroup", args)
        this.$Message.info(res.msg)
        this.resetClick()
      }
    },
    async clearMailList() {
      this.$refs[this.ConfirmModalRef].isShowConfirmModal = false
      const { msg } = await this.$http.post("/contact/clearContact", { user_id: this.user_id })
      this.$Message.info(msg)
    }
  }
}
</script>

<style lang="scss" scoped>
.ivu-radio-group {
  vertical-align: bottom;
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

.header-drawer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.ivu-col-span-17 {
  height: 32px;
  line-height: 32px;
}
</style>
