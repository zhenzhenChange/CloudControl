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
        该标签下的所有账号都添加指定的好友
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
      <div class="mt-10">
        <span class="mr-10">来源选择</span>
        <RadioGroup v-model="origin">
          <Radio label="来源通讯录"></Radio>
          <Radio label="来源QQ"></Radio>
          <Radio label="来源邮箱"></Radio>
          <Radio label="来源微信"></Radio>
          <Radio label="手机号"></Radio>
        </RadioGroup>
      </div>
      <div class="mt-10">
        <span class="color-red">
          需要添加的账号列表（一次只能添加同一个来源的账号）,一行一个账号
        </span>
        <Input
          type="textarea"
          v-model="userList"
          class="mt-10 mr-10"
          :autosize="{ minRows: 5, maxRows: 20 }"
        >
        </Input>
      </div>
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
      <Input
        clearable
        v-model="wx"
        class="mt-10 mr-10"
        placeholder="请输入微信账号"
      >
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
      <div class="mt-10">
        <span class="mr-10">来源选择</span>
        <RadioGroup v-model="wxOrigin">
          <Radio label="来源通讯录"></Radio>
          <Radio label="来源QQ"></Radio>
          <Radio label="来源邮箱"></Radio>
          <Radio label="来源微信"></Radio>
          <Radio label="手机号"></Radio>
        </RadioGroup>
      </div>
      <div class="mt-10">
        <span class="color-red">
          需要添加的账号列表（一次只能添加同一个来源的账号）,一行一个账号
        </span>
        <Input
          type="textarea"
          v-model="wxUserList"
          class="mt-10 mr-10"
          :autosize="{ minRows: 5, maxRows: 20 }"
        >
        </Input>
      </div>
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
      TagID: "",
      TagName: "",
      content: "",
      wxContent: "",
      userList: "",
      wxUserList: "",
      origin: "来源通讯录",
      wxOrigin: "来源通讯录",
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
                "群发好友"
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
    ...mapState({ user_id: state => state.user_id })
  },
  methods: {
    async initData() {
      this.data = []
      const { data } = await this.$http.get("/account/getAllTag", {
        params: { user_id: this.user_id }
      })
      data.forEach((item, index) => {
        this.data.push({
          serialNumber: index + 1,
          tagName: item.tagName,
          tagId: item.tagId,
          tagCreateDate: this.$options.filters.date(item.tagCreateDate)
        })
      })
    },
    async sendByTag({ tagId: tag_id }) {
      this.$refs["FriendConfirmModal"].isShowConfirmModal = false
      const { msg } = await this.$http.post("/contact/sendMessageByTag", {
        tag_id: String(tag_id)
      })
      this.$Message.info(msg)
    },
    async sendRequest() {
      this.isShowModal = false
      let origin =
        this.origin === "来源QQ"
          ? 1
          : this.origin === "来源微信"
          ? 3
          : this.origin === "来源邮箱"
          ? 2
          : this.origin === "手机号"
          ? 15
          : 10
      const { msg } = await this.$http.post("/contact/addFriendsByTag", {
        tag_id: this.TagID,
        request_list: this.userList,
        content: this.content,
        origin
      })
      this.$Message.info(msg)
      this.TagID = this.userList = this.content = ""
    },
    async sendRequestByWX() {
      this.isShowWXModal = false
      let origin =
        this.wxOrigin === "来源QQ"
          ? 1
          : this.wxOrigin === "来源微信"
          ? 3
          : this.wxOrigin === "来源邮箱"
          ? 2
          : this.wxOrigin === "手机号"
          ? 15
          : 10
      const { msg } = await this.$http.post("/contact/addFriends", {
        wxid: this.wx,
        request_list: this.wxUserList,
        content: this.wxContent,
        origin
      })
      this.$Message.info(msg)
      this.wx = this.wxContent = this.wxUserList = ""
    },
    catchClick() {
      this.isShowModal = false
      this.isShowWXModal = false
    }
  }
}
</script>

<style lang="scss" scoped>
.ivu-radio-group {
  vertical-align: bottom;
}
</style>
