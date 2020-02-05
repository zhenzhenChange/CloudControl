<template>
  <!-- 账号管理 -->
  <div class="MAccount">
    <ButtonList :buttonListInfos="buttonListInfos" />
    <Divider dashed />
    <UnCheckButton :el="PagedTableRef" />
    <PagedTable
      :data="data"
      :ref="PagedTableRef"
      :dataColumns="MAccountColumns"
    />
    <CommonConfirmModal
      :ref="ConfirmModalRef"
      :data="operationData"
      :config="operationConfig"
    />
    <CommonSelectModal :ref="SelectModalRef" :config="selectConfig" />
    <CommonCreateModal :ref="CreateModalRef" :config="createConfig" />
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  name: "MAccountVue",
  data() {
    return {
      data: [],
      params: "",
      pageIndex: 0,
      pageSize: 10,
      mutex: false,
      selectConfig: {},
      createConfig: {},
      operationData: [],
      operationConfig: {},
      PagedTableRef: "MAccountPagedTable",
      CreateModalRef: "MAccountCreateModal",
      SelectModalRef: "MAccountSelectModal",
      ConfirmModalRef: "MAccountConfirmModal",
      buttonListInfos: [
        { id: "remove-m", name: "删除", icon: "md-trash", type: "error" },
        {
          id: "create-m",
          name: "上传账号数据",
          icon: "md-add-circle",
          type: "primary"
        },
        { id: "up", name: "一键上线", icon: "md-trending-up", type: "warning" },
        {
          id: "down",
          name: "一键下线",
          type: "warning",
          icon: "md-trending-down"
        },
        {
          id: "GroupChange",
          type: "info",
          icon: "md-repeat",
          name: "分组变更"
        }
      ],
      MAccountColumns: [
        { width: 60, align: "center", type: "selection" },
        { width: 70, align: "center", title: "序号", key: "serialNumber" },
        { width: 130, title: "账号", align: "center", key: "account" },
        {
          width: 180,
          align: "center",
          tooltip: true,
          title: "账号A16数据",
          key: "account62A16"
        },
        {
          width: 100,
          align: "center",
          title: "好友数",
          key: "accountFriendCount"
        },
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
          tooltip: true,
          title: "密码",
          key: "accountPwd"
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
        {
          width: 180,
          align: "center",
          tooltip: true,
          title: "微信ID",
          key: "accountWxid"
        },
        {
          width: 150,
          align: "center",
          tooltip: true,
          title: "所属分组",
          key: "groupName"
        },
        { width: 100, align: "center", title: "分组ID", key: "groupId" },
        {
          width: 150,
          align: "center",
          tooltip: true,
          title: "操作人",
          key: "userId"
        },
        {
          width: 230,
          title: "操作",
          fixed: "right",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    size: "small",
                    type: "warning",
                    disabled: this.mutex,
                    icon: "ios-trending-up"
                  },
                  style: { marginRight: "5px" },
                  on: {
                    click: () => {
                      this.operationConfig = {
                        icon: "ios-trending-up",
                        color: "#19BE6B",
                        title: "上线",
                        operation: "上线",
                        btnType: "success",
                        btnIcon: "md-checkmark",
                        btnText: "确定",
                        params: "onByID",
                        paramsValue: params.row,
                        flag: true
                      }
                      this.$refs[this.ConfirmModalRef].isShowConfirmModal = true
                    }
                  }
                },
                "上线"
              ),
              h(
                "Button",
                {
                  props: {
                    size: "small",
                    type: "error",
                    disabled: this.mutex,
                    icon: "md-trash"
                  },
                  style: { marginRight: "5px" },
                  on: {
                    click: () => {
                      this.operationConfig = {
                        icon: "md-trash",
                        color: "#ED4014",
                        title: "删除",
                        operation: "删除",
                        btnType: "error",
                        btnIcon: "md-trash",
                        btnText: "删除",
                        params: "removeByID",
                        paramsValue: params.row,
                        flag: true
                      }
                      this.$refs[this.ConfirmModalRef].isShowConfirmModal = true
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
        this.data.push({
          serialNumber: index + 1,
          account: item.account,
          account62A16: item.account62A16,
          accountFriendCount: item.accountFriendCount
            ? item.accountFriendCount
            : "无",
          accountIsValid: item.accountIsValid,
          accountPwd: item.accountPwd,
          accountState: item.accountState,
          accountWxid: item.accountWxid
            ? item.accountWxid
            : "无微信ID或信息异常",
          groupName: item.groupName ? item.groupName : "无",
          groupId: item.groupId ? String(item.groupId) : "无",
          userId: item.userId
        })
      })
    },
    async allData() {
      const { data } = await this.$http.get("/account/getAccountInfo", {
        params: { user_id: this.user_id }
      })
      let FriendCount = 0
      let DeadAccount = 0
      let OnlineAccount = 0
      data.forEach(item => {
        if (item.accountFriendCount) {
          FriendCount += item.accountFriendCount
        }
        if (!item.accountIsValid) {
          DeadAccount += 1
        }
        if (item.accountState) {
          OnlineAccount += 1
        }
      })
      const DataCount = { FriendCount, DeadAccount, OnlineAccount }
      this.$store.commit("saveDataCount", JSON.stringify(DataCount))
      this.$refs[this.PagedTableRef].total = data.length
    },
    async onlineByWXID(row) {
      let arr = []
      let WXIDArray = []
      const ref = this.$refs
      if (row) {
        arr.push(row)
      } else {
        arr = this.operationData
      }
      arr.forEach(item => {
        WXIDArray.push({
          account: item.account,
          a16_data62: item.account62A16,
          pwd: item.accountPwd
        })
      })
      const { data } = await this.$http.post("/account/loginMulti", {
        group_id: "",
        list: WXIDArray,
        request_type: "1"
      })
      if (row) {
        let msg = ""
        msg = data.success.length ? "成功" : "失败"
        this.$Message.info(`上线${msg}！`)
        ref[this.ConfirmModalRef].isShowConfirmModal = false
        return
      }
      this.clear()
      this.allData()
      this.initData()
      const obj = this.dataFormat(data)
      this.$Message.info(`成功上线账号${obj.succ}个，失败${obj.err}个！`)
    },
    async onlineByGroup(params) {
      this.clear()
      const { data } = await this.$http.post("/account/loginMulti", {
        group_id: String(params),
        list: [{}],
        request_type: "0"
      })
      this.allData()
      this.initData()
      const obj = this.dataFormat(data)
      this.$Message.info(`成功上线账号${obj.succ}个，失败${obj.err}个！`)
    },
    async offlineByWXID() {
      const WXIDArray = []
      this.operationData.forEach(item => WXIDArray.push(item.accountWxid))
      const { data } = await this.$http.post("/account/logout", {
        groupId: 0,
        wxids: WXIDArray,
        requestType: "1"
      })
      this.clear()
      this.allData()
      this.initData()
      const obj = this.dataFormat(data)
      this.$Message.info(`成功下线账号${obj.succ}个，失败${obj.err}个！`)
    },
    async offlineByGroup(params) {
      this.clear()
      const { data } = await this.$http.post("/account/logout", {
        groupId: String(params),
        wxids: [],
        requestType: "0"
      })
      this.allData()
      this.initData()
      const obj = this.dataFormat(data)
      this.$Message.info(`成功下线账号${obj.succ}个，失败${obj.err}个！`)
    },
    async removeByWXID(row) {
      const accounts = []
      if (row) {
        const { account } = row
        accounts.push(account)
      } else {
        this.operationData.forEach(item => accounts.push(item.account))
      }
      const { data } = await this.$http.post("/account/deleteAccount", {
        groupId: "",
        accounts,
        requestType: 1
      })
      const obj = this.dataFormat(data)
      if (row) {
        if (obj.succ) {
          this.$Message.success("删除成功！")
        }
        if (obj.err) {
          this.$Message.error("删除失败！")
        }
      } else {
        this.$Message.info(`成功删除账号${obj.succ}个，失败${obj.err}个！`)
      }
      this.clear()
      this.allData()
      this.initData()
    },
    async removeByGroup(groupID) {
      this.clear()
      const { data } = await this.$http.post("/account/deleteAccount", {
        groupId: String(groupID),
        accounts: [],
        requestType: 0
      })
      const obj = this.dataFormat(data)
      this.$Message.info(`成功删除账号${obj.succ}个，失败${obj.err}个！`)
      this.allData()
      this.initData()
    },
    async uploadData(accountData, group_id) {
      let list = []
      list = accountData
        .split(/[\r\n]/g)
        .map(item => item.split(/----/g))
        .map(item => {
          return { account: item[0], password: item[1], a16Data64: item[2] }
        })
      list.forEach((item, index) => {
        if (!item.account || !item.password || !item.a16Data64)
          list.splice(index, 1)
      })
      const { data } = await this.$http.post("/account/addAccount", {
        list,
        groupId: String(group_id),
        userId: this.user_id
      })
      this.clear()
      this.allData()
      this.initData()
      const obj = this.dataFormat(data)
      this.$Message.info(`成功上传账号${obj.succ}个，失败${obj.err}个！`)
    },
    async moveGroup(groupId) {
      const account_list = []
      this.operationData.forEach(item => account_list.push(item.account))
      const { msg } = await this.$http.post("/account/setAccountGroup", {
        account_list,
        group_id: String(groupId)
      })
      this.clear()
      this.allData()
      this.initData()
      this.$Message.success(msg)
    },
    clear() {
      const refs = this.$refs
      const table = refs[this.PagedTableRef]
      const select = refs[this.CreateModalRef].$refs["select"]
      const SearchSelect = refs[this.SelectModalRef].$refs["SearchSelect"]

      select ? (select.value = "") : ""
      SearchSelect ? (SearchSelect.value = "") : ""
      refs[this.CreateModalRef].accountData = ""

      table.$refs[table.TableRef].selectAll(false)
      refs[this.SelectModalRef].isShowSelectModal = false
      refs[this.CreateModalRef].isShowCreateModal = false
      refs[this.ConfirmModalRef].isShowConfirmModal = false
    },
    dataFormat(data) {
      const succ = data.success.length
      const err = data.error.length
      const dataObj = { succ, err }
      return dataObj
    }
  }
}
</script>
