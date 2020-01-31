<template>
  <div class="Friends">
    <ButtonList :buttonListInfos="buttonListInfos" />
    <Divider class="float-left" dashed />
    <PagedTable
      :data="data"
      :ref="PagedTableRef"
      :dataColumns="FriendsColumns"
    />
    <CommonConfirmModal ref="FriendConfirmModal" :config="config" />
    <Modal
      width="550"
      :closable="false"
      v-model="isShowModal"
      :mask-closable="false"
      class-name="vertical-center-modal"
    >
      <p slot="header">
        <Icon type="md-send" color="#2D8CF0" class="mr-5 header-icon" />
        该标签下的所有账号都发送添加指定的好友的请求
      </p>
      <div class="color-blue">标签名称：{{ TagName }}</div>
      <div class="color-blue mt-10">标签ID： {{ TagID }}</div>
      <Input
        clearable
        v-model="content"
        class="mt-10 mr-10"
        placeholder="可选，默认选取素材库中已有模板"
      >
        <span slot="prepend">验证消息</span>
      </Input>
      <div class="upload mb-10 mt-10 ml-7">
        <span class="title mr-10">账号列表</span>
        <Upload
          action=""
          :show-upload-list="false"
          :before-upload="handleBeforeUpload"
        >
          <Button icon="md-cloud-upload">上传本地TXT文件</Button>
        </Upload>
      </div>
      <Input
        class="mr-10"
        type="textarea"
        v-model="userList"
        :autosize="{ minRows: 5, maxRows: 20 }"
        placeholder="需要添加的账号列表,一行一个账号"
      >
      </Input>
      <div slot="footer">
        <Button icon="md-remove-circle" @click="catchClick">取消</Button>
        <Button type="success" icon="md-checkmark" @click="sendRequest">
          确定
        </Button>
      </div>
    </Modal>
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
        <Upload
          action=""
          :show-upload-list="false"
          :before-upload="handleBeforeUpload2"
        >
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
        <Button type="success" icon="md-checkmark" @click="sendRequestByWX">
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
      wx: "",
      data: [],
      pageIndex: 0,
      pageSize: 10,
      TagID: "",
      TagName: "",
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
        title: "群发消息给该标签下的所有账号",
        operation: "群发（消息模板于素材管理设置）",
        btnType: "success",
        btnIcon: "md-checkmark",
        btnText: "确定",
        params: "sendByTag",
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
        { align: "center", title: "标签名称", key: "tagName" },
        { align: "center", title: "标签ID", key: "tagId" },
        {
          sortable: true,
          align: "center",
          title: "创建时间",
          key: "tagCreateDate"
        },
        {
          width: 400,
          title: "操作",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: { type: "warning", icon: "md-send" },
                  style: { marginRight: "5px" },
                  on: {
                    click: () => {
                      this.isShowModal = true
                      this.TagID = params.row.tagId
                      this.TagName = params.row.tagName
                    }
                  }
                },
                "发送添加好友请求"
              ),
              h(
                "Button",
                {
                  props: { type: "info", icon: "md-paper-plane" },
                  style: { marginRight: "5px" },
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
    ...mapState({ user_id: state => state.user_id })
  },
  methods: {
    async allData() {
      const { data } = await this.$http.get("/account/getAllTag", {
        params: { user_id: this.user_id }
      })
      this.$refs[this.PagedTableRef].total = data.length
    },
    async initData() {
      this.data = []
      const { data } = await this.$http.get("/account/getAllTag", {
        params: {
          user_id: this.user_id,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      data.forEach((item, index) => {
        this.data.push({
          serialNumber: index + 1,
          tagName: item.tagName,
          tagId: String(item.tagId),
          tagCreateDate: this.$options.filters.date(item.tagCreateDate)
        })
      })
    },
    async sendByTag({ tagId: tag_id }) {
      this.$refs["FriendConfirmModal"].isShowConfirmModal = false
      const { msg } = await this.$http.post("/contact/sendMessageByTag", {
        tag_id
      })
      this.$Message.info(msg)
    },
    async sendRequest() {
      if (!this.userList) {
        this.$Message.warning("请上传或填入账号列表！")
        return
      }
      this.isShowModal = false
      let contact = []
      contact = this.userList.split(/\n/g).filter(item => item !== "")
      const { msg } = await this.$http.post("/contact/addFriendsByTag", {
        tag_id: this.TagID,
        request_list: contact,
        content: this.content
      })
      this.$Message.info(msg)
      this.TagID = this.userList = this.content = ""
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
      let contact = []
      contact = this.wxUserList.split(/\n/g).filter(item => item !== "")
      const { msg } = await this.$http.post("/contact/addFriends", {
        wxid: this.wx,
        request_list: contact,
        content: this.wxContent
      })
      this.$Message.info(msg)
      this.wx = this.wxContent = this.wxUserList = ""
    },
    catchClick() {
      this.isShowModal = false
      this.isShowWXModal = false
    },
    handleBeforeUpload(file) {
      const reader = new FileReader()
      reader.readAsText(file)
      reader.onload = () => {
        this.userList = reader.result
      }
      return false
    },
    handleBeforeUpload2(file) {
      const reader = new FileReader()
      reader.readAsText(file)
      reader.onload = () => {
        this.wxUserList = reader.result
      }
      return false
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
</style>
