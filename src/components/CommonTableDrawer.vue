<template>
  <div>
    <Drawer
      width="90"
      placement="left"
      :closable="false"
      v-model="isShowTableDrawer"
    >
      <ButtonList :buttonListInfos="buttonListInfos" />
      <Divider dashed />
      <UnCheckButton :el="PagedTableRef" />
      <PagedTable
        :data="data"
        :ref="PagedTableRef"
        :dataColumns="CommonColumns"
      />
    </Drawer>
  </div>
</template>
<script>
export default {
  name: "TableDrawer",
  data() {
    return {
      data: [],
      pageSize: 10,
      pageIndex: 0,
      isShowTableDrawer: false,
      PagedTableRef: "DrawerPagedTable",
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
      CommonColumns: [
        { width: 60, align: "center", type: "selection" },
        { width: 70, align: "center", title: "序号", key: "serialNumber" },
        { width: 130, align: "center", title: "账号", key: "account" },
        {
          width: 130,
          align: "center",
          tooltip: true,
          title: "密码",
          key: "accountPwd"
        },
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
          width: 190,
          align: "center",
          tooltip: true,
          title: "微信ID",
          key: "accountWxid"
        },
        {
          width: 230,
          title: "操作",
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
    // this.initData()
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
          accountWxid: item.accountWxid ? item.accountWxid : "未登录或账号异常"
        })
      })
    }
    /* async getAccountDataByGroupID(group_id) {
      const postArgs = {
        group_id,
        pageSize: this.pageSize,
        pageIndex: this.pageIndex
      }
      const res = await this.$http.post("/account/getAccount", postArgs)
      console.log(res)
    } */
  }
}
</script>
