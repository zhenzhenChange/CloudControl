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
  data() {
    return {
      data: [],
      mutex: false,
      GroupData: [],
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
          name: "添加",
          icon: "md-add-circle",
          type: "primary"
        },
        { id: "up", name: "一键上线", icon: "md-trending-up", type: "warning" },
        {
          id: "down",
          name: "一键下线",
          type: "warning",
          icon: "md-trending-down"
        }
      ],
      MAccountColumns: [
        { width: 60, align: "center", type: "selection" },
        { width: 70, align: "center", title: "序号", key: "serialNumber" },
        {
          width: 120,
          title: "锁状态",
          align: "center",
          key: "lockState",
          render: (h, params) => {
            const row = params.row
            const color = row.lockState ? "success" : "error"
            const text = row.lockState ? "正常" : "锁定"
            return h("Tag", { props: { type: "dot", color } }, text)
          }
        },
        {
          width: 120,
          align: "center",
          title: "账号状态",
          key: "accountStatus",
          render: (h, params) => {
            const row = params.row
            const color = row.accountStatus ? "success" : "error"
            const text = row.accountStatus ? "正常" : "离线"
            return h("Tag", { props: { type: "dot", color } }, text)
          }
        },
        {
          width: 150,
          tooltip: true,
          align: "center",
          title: "微信登录名",
          key: "wechatLoginName"
        },
        { width: 120, align: "center", title: "密码", key: "password" },
        { width: 120, align: "center", title: "昵称", key: "nickName" },
        {
          width: 120,
          tooltip: true,
          align: "center",
          title: "WXID",
          key: "wxId"
        },
        {
          width: 120,
          tooltip: true,
          align: "center",
          title: "微信号",
          key: "wechatNumber"
        },
        {
          width: 150,
          tooltip: true,
          align: "center",
          title: "签名",
          key: "autograph"
        },
        {
          width: 120,
          tooltip: true,
          align: "center",
          title: "所属分组",
          key: "subordinate"
        },
        {
          width: 120,
          key: "sex",
          title: "性别",
          align: "center",
          render: (h, params) => {
            const row = params.row
            const color = row.sex ? "success" : "magenta"
            const text = row.sex ? "男" : "女"
            return h("Tag", { props: { type: "border", color } }, text)
          }
        },
        {
          width: 120,
          tooltip: true,
          align: "center",
          title: "城市",
          key: "city"
        },
        {
          width: 150,
          tooltip: true,
          align: "center",
          title: "设备类型",
          key: "equipmentType"
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
                      this.online(params.row)
                    }
                  }
                },
                "上线"
              )
            ])
          }
        }
      ]
    }
  },
  created() {
    this.getData()
  },
  computed: {
    ...mapState({ user_id: state => state.user_id })
  },
  methods: {
    async getData() {
      const res = await this.$http.get("/account/getAllGroup", {
        params: { user_id: this.user_id }
      })
      res.forEach((item, index) => {
        this.data.push({
          serialNumber: index + 1,
          lockState: item.groupName,
          accountStatus: item.groupName,
          wechatLoginName: item.groupName,
          password: item.groupName,
          nickName: item.groupName,
          wxId: item.groupName,
          wechatNumber: item.groupName,
          autograph: item.groupName,
          subordinate: item.groupName,
          sex: item.groupName,
          city: item.groupName,
          equipmentType: item.groupName
        })
        this.GroupData.push({ label: item.groupName, value: item.groupId })
      })
    },
    async uploadData(accountData, group_id) {
      let list = []
      let str = accountData.split(/\n/g)
      list = str
        .map(item => item.split(/----/g))
        .map(item => {
          return { account: item[0], password: item[1], a16Data64: item[2] }
        })
      list.forEach((item, index) => {
        if (!item.account || !item.password || !item.a16Data64) {
          list.splice(index, 1)
        }
      })
      const { data } = await this.$http.post("/account/addAccount", {
        list,
        groupId: String(group_id),
        userId: this.user_id
      })
      this.$refs[this.CreateModalRef].accountData = ""
      this.$refs[this.CreateModalRef].isShowCreateModal = false
      this.$refs[this.CreateModalRef].$refs["select"].value = ""
      this.$Message.info(
        `已成功添加${data.success.length}条数据，失败${data.error.length}条`
      )
    },
    online({ wxId }) {
      this.operationConfig = {
        icon: "ios-trending-up",
        color: "#19BE6B",
        title: "上线",
        operation: "上线",
        btnType: "success",
        btnIcon: "md-checkmark",
        btnText: "确定"
      }
      this.operationData.push(wxId)
      this.$refs["ConfirmModal"].isShowConfirmModal = true
    },
    async onlineByGroup(params) {
      const { msg, data } = await this.$http.post("/account/loginMulti", {
        group_id: String(params),
        list: [{}],
        request_type: "0"
      })
      if (msg === "everything is OK") {
        this.$Message.info(
          `成功登录账号${data.success.length}个，失败${data.error.length}个！`
        )
      }
      this.$refs[this.SelectModalRef].$refs["SearchSelect1"].value = ""
      this.$refs[this.SelectModalRef].isShowSelectModal = false
    },
    remove() {
      this.operationConfig = {
        icon: "md-trash",
        color: "#ED4014",
        title: "删除",
        operation: "删除",
        btnType: "error",
        btnIcon: "md-trash",
        btnText: "删除",
        url: "/account/deleteAccount",
        deleteArgs: "request_type",
        looperArgs: "wxids"
      }
      this.$refs["ConfirmModal"].isShowConfirmModal = true
    }
  }
}
</script>
