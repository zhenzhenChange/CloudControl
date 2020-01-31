<template>
  <!-- 账号设置 -->
  <div class="SAccount">
    <ButtonList :buttonListInfos="buttonListInfos" />
    <Divider dashed />
    <!-- <div class="mb-10 config float-left mr-20">
      <span class="mr-10">好友请求配置</span>
      <RadioGroup v-model="isChecking">
        <Radio label="需要验证"></Radio>
        <Radio label="不需要验证"></Radio>
      </RadioGroup>
    </div> -->
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
    <CommonSelectModal :ref="SelectModalRef" :config="selectConfig" />
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
      pageIndex: 0,
      pageSize: 10,
      selectConfig: {},
      operationData: [],
      operationConfig: {},
      isChecking: "需要验证",
      isUpdateType: "修改密码",
      PagedTableRef: "SAccountPagedTable",
      SelectModalRef: "SAccountSelectModal",
      ConfirmModalRef: "SAccountConfirmModal",
      buttonListInfos: [
        /* {
          id: "request",
          name: "好友请求设置",
          icon: "md-settings",
          type: "success"
        }, */
        {
          id: "ChangeMeans",
          name: "修改资料",
          icon: "md-repeat",
          type: "warning"
        }
      ],
      SAccountColumns: [
        { width: 60, align: "center", type: "selection" },
        { width: 70, align: "center", title: "序号", key: "serialNumber" },
        { width: 130, align: "center", title: "账号", key: "account" },
        { width: 130, align: "center", title: "密码", key: "accountPwd" },
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
    async initData() {
      this.data = []
      const { data } = await this.$http.get("/account/getAccountInfo", {
        params: {
          user_id: this.user_id,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      data.forEach((item, index) => {
        if (item.accountWxid) {
          this.data.push({
            serialNumber: index + 1,
            account: item.account,
            accountWxid: item.accountWxid
              ? item.accountWxid
              : "无微信ID或信息异常",
            accountPwd: item.accountPwd,
            groupName: item.groupName ? item.groupName : "无",
            tagName: item.tagName ? item.tagName : "无",
            groupId: item.groupId ? String(item.groupId) : "无",
            tagId: item.tagId ? String(item.tagId) : "无"
          })
        }
      })
    },
    async allData() {
      const { data } = await this.$http.get("/account/getAccountInfo", {
        params: { user_id: this.user_id }
      })
      this.$refs[this.PagedTableRef].total = data.length
    },
    /* async requestSetByGroup(groupId) {
      this.clear()
      const { msg } = await this.$http.post("/account/setFriendRequest", {
        group_id: String(groupId),
        wxid_list: [],
        type: this.isChecking === "需要验证" ? 0 : 1,
        request_type: 0
      })
      this.initData()
      this.$Message.success(msg)
    },
    async requestSetByWXID() {
      const wxid_list = []
      this.operationData.forEach(item => wxid_list.push(item.accountWxid))
      const { msg } = await this.$http.post("/account/setFriendRequest", {
        group_id: "",
        wxid_list,
        type: this.isChecking === "需要验证" ? 0 : 1,
        request_type: 1
      })
      this.clear()
      this.initData()
      this.$Message.success(msg)
    }, */
    async changeMeansByGroup(groupId) {
      this.clear()
      const change_type =
        this.isUpdateType === "修改密码"
          ? 2
          : this.isUpdateType === "修改昵称"
          ? 0
          : 1
      const { msg } = await this.$http.post("/account/changeDatum", {
        group_id: String(groupId),
        wxid_list: [],
        change_type,
        type: 0,
        user_id: this.user_id
      })
      this.initData()
      this.$Message.success(msg)
    },
    async changeMeansByWXID() {
      const change_type =
        this.isUpdateType === "修改密码"
          ? 2
          : this.isUpdateType === "修改昵称"
          ? 0
          : 1
      const wxid_list = []
      this.operationData.forEach(item => wxid_list.push(item.accountWxid))
      const { msg } = await this.$http.post("/account/changeDatum", {
        group_id: "",
        wxid_list,
        change_type,
        type: 1,
        user_id: this.user_id
      })
      this.clear()
      this.initData()
      this.$Message.success(msg)
    },
    clear() {
      const refs = this.$refs
      const table = refs[this.PagedTableRef]
      const SearchSelect = refs[this.SelectModalRef].$refs["SearchSelect"]

      SearchSelect ? (SearchSelect.value = "") : ""
      refs[this.SelectModalRef].isShowSelectModal = false
      refs[this.ConfirmModalRef].isShowConfirmModal = false
      table.$refs[table.TableRef].selectAll(false)
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
