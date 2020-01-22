<template>
  <!-- 账号管理 -->
  <div class="MAccount">
    <SearchSelect :info="'分组'" :title="'账号分组'" :options="cityList" />
    <SearchSelect :info="'在线状态'" :title="'微信状态'" :options="cityList" />
    <SearchInput :infos="['微信登录名', '代理IP']" />
    <Divider dashed />
    <ButtonList :buttonListInfos="buttonListInfos" />
    <Divider dashed />
    <UnCheckButton :el="refEl" />
    <PagedTable :ref="refEl" :dataColumns="MAccountColumns" />
    <CommonConfirmModal
      ref="ConfirmModal"
      :data="operationData"
      :config="operationConfig"
    />
    <CommonCreateModal ref="CreateModal" :title="'添加账号'" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      mutex: false,
      operationData: [],
      operationConfig: {},
      refEl: "MAccountPagedTable",
      cityList: [
        { value: "New York", label: "New York" },
        { value: "London", label: "London" },
        { value: "Sydney", label: "Sydney" },
        { value: "Ottawa", label: "Ottawa" },
        { value: "Paris", label: "Paris" },
        { value: "Canberra", label: "Canberra" }
      ],
      buttonListInfos: [
        { id: "remove", name: "删除", icon: "md-trash", type: "error" },
        { id: "create", name: "添加", icon: "md-add-circle", type: "primary" },
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
  mounted() {
    this.$refs[this.refEl].tableData = this.data
  },
  methods: {
    async getData() {
      const { data } = await this.$http.get("/account/deleteAccount")
      const length = data.length
      for (let i = 0; i < length; i++) {
        this.data.push({
          serialNumber: data[i].serialNumber,
          lockState: data[i].lockState,
          accountStatus: data[i].accountStatus,
          wechatLoginName: data[i].wechatLoginName,
          password: data[i].password,
          nickName: data[i].nickName,
          wxId: data[i].wxId,
          wechatNumber: data[i].wechatNumber,
          autograph: data[i].autograph,
          subordinate: data[i].subordinate,
          sex: data[i].sex,
          city: data[i].city,
          equipmentType: data[i].equipmentType
        })
      }
      return this.data
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
    }
  }
}
</script>
