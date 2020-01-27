<template>
  <!-- 账号设置 -->
  <div class="SAccount">
    <ButtonList :buttonListInfos="buttonListInfos" />
    <Divider dashed />
    <div class="mb-10 config float-left mr-20">
      <span class="mr-10">好友请求配置</span>
      <RadioGroup v-model="isChecking">
        <Radio label="是"></Radio>
        <Radio label="否"></Radio>
      </RadioGroup>
    </div>
    <div class="clear-both"></div>
    <div class="mb-10 config">
      <span class="mr-10">修改资料配置</span>
      <RadioGroup v-model="isUpdateType">
        <Radio label="修改密码"></Radio>
        <Radio label="修改昵称"></Radio>
        <Radio label="修改头像"></Radio>
      </RadioGroup>
    </div>
    <div class="clear-both"></div>
    <UnCheckButton class="mt-10" :el="PagedTableRef" />
    <PagedTable
      :data="data"
      :ref="PagedTableRef"
      :dataColumns="SAccountColumns"
    />
    <CommonSelectModal ref="SAccountSelectModal" :config="selectConfig" />
    <CommonConfirmModal
      :data="operationData"
      :ref="ConfirmModalRef"
      :config="operationConfig"
    />
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  data() {
    return {
      data: [],
      TagData: [],
      GroupData: [],
      isChecking: "是",
      selectConfig: {},
      operationData: [],
      operationConfig: {},
      isUpdateType: "修改密码",
      PagedTableRef: "SAccountPagedTable",
      SelectModalRef: "SAccountSelectModal",
      ConfirmModalRef: "SAccountConfirmModal",
      buttonListInfos: [
        {
          id: "GroupChange",
          type: "warning",
          icon: "md-repeat",
          name: "分组变更"
        },
        {
          id: "TagChange",
          type: "warning",
          icon: "md-repeat",
          name: "标签变更"
        }
      ],
      SAccountColumns: [
        { width: 60, align: "center", type: "selection" },
        { width: 70, align: "center", title: "序号", key: "serialNumber" },
        { width: 130, align: "center", title: "账号", key: "account" },
        {
          width: 200,
          align: "center",
          title: "微信ID",
          key: "accountWxid"
        },
        {
          tooltip: true,
          align: "center",
          title: "所属分组",
          key: "groupName"
        },
        {
          align: "center",
          title: "分组ID",
          key: "groupId"
        },
        {
          tooltip: true,
          align: "center",
          title: "所属标签",
          key: "tagName"
        },
        {
          align: "center",
          title: "标签ID",
          key: "tagId"
        },
        {
          width: 350,
          title: "操作",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: { type: "success", icon: "md-settings" },
                  style: { marginRight: "5px" },
                  on: {
                    click: () => {
                      this.$refs["MailSet"].isShowConfirmModal = true
                      this.$refs["MailSet"].configParams = params.row
                    }
                  }
                },
                "好友请求设置"
              ),
              h(
                "Button",
                {
                  props: { type: "warning", icon: "md-repeat" },
                  style: { marginRight: "5px" },
                  on: {
                    click: () => {
                      this.$refs["MailSet"].isShowConfirmModal = true
                      this.$refs["MailSet"].configParams = params.row
                    }
                  }
                },
                "修改资料"
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
      const { data } = await this.$http.get("/account/getAccountInfo", {
        params: { user_id: this.user_id }
      })
      data.forEach((item, index) => {
        if (item.accountWxid) {
          this.data.push({
            serialNumber: index + 1,
            account: item.account,
            accountWxid: item.accountWxid
              ? item.accountWxid
              : "无微信ID或信息异常",
            groupName: item.groupName ? item.groupName : "无",
            tagName: item.tagName ? item.tagName : "无",
            groupId: item.groupId ? item.groupId : "无",
            tagId: item.tagId ? item.tagId : "无"
          })
        }
      })
      const { data: GroupData } = await this.$http.get("/account/getAllGroup", {
        params: { user_id: this.user_id }
      })
      const { data: TagData } = await this.$http.get("/account/getAllTag", {
        params: { user_id: this.user_id }
      })
      GroupData.forEach(item => {
        this.GroupData.push({ label: item.groupName, value: item.groupId })
      })
      TagData.forEach(item => {
        this.TagData.push({ label: item.tagName, value: item.tagId })
      })
    },
    async moveGroup(groupId) {
      const wxid_list = []
      this.operationData.forEach(item => wxid_list.push(item.accountWxid))
      const { msg } = await this.$http.post("/account/setAccountGroup", {
        wxid_list,
        group_id: String(groupId)
      })
      this.$Message.success(msg)
      this.$refs[this.SelectModalRef].isShowSelectModal = false
      this.initData()
    },
    async moveTag(tagId) {
      const wxid_list = []
      this.operationData.forEach(item => wxid_list.push(item.accountWxid))
      const { msg } = await this.$http.post("/account/setAccountTag", {
        wxid_list,
        tag_id: String(tagId)
      })
      this.$Message.success(msg)
      this.$refs[this.SelectModalRef].isShowSelectModal = false
      this.initData()
    },
    async requestSetByGroup(groupId) {
      await this.$http.post("/account/setFriendRequest", {
        group_id: String(groupId),
        wxid_list: [],
        type: this.isChecking === "是" ? 0 : 1,
        request_type: 0
      })
      /* this.$Message.success(msg)
      this.$refs[this.SelectModalRef].isShowSelectModal = false
      this.initData() */
    },
    async requestSetByWXID() {
      const wxid_list = []
      this.operationData.forEach(item => wxid_list.push(item.accountWxid))
      await this.$http.post("/account/setFriendRequest", {
        group_id: "",
        wxid_list,
        type: this.isChecking === "是" ? 0 : 1,
        request_type: 1
      })
      /* this.$Message.success(msg)
      this.$refs[this.SelectModalRef].isShowSelectModal = false
      this.initData() */
    },
    async changeMeansByGroup(groupId) {
      const changeType =
        this.isUpdateType === "修改密码"
          ? 2
          : this.isUpdateType === "修改昵称"
          ? 0
          : 1
      await this.$http.post("/account/changeDatum", {
        group_id: String(groupId),
        wxid_list: [],
        change_type: changeType,
        type: 0
      })
    },
    async changeMeansByWXID() {
      const changeType =
        this.isUpdateType === "修改密码"
          ? 2
          : this.isUpdateType === "修改昵称"
          ? 0
          : 1
      const wxid_list = []
      this.operationData.forEach(item => wxid_list.push(item.accountWxid))
      await this.$http.post("/account/changeDatum", {
        group_id: "",
        wxid_list,
        change_type: changeType,
        type: 1
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.config {
  .ivu-radio-group {
    vertical-align: bottom;
  }
}
</style>
