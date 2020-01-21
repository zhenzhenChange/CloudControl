<template>
  <!-- 账号设置 -->
  <div class="SAccount">
    <SearchSelect :info="'分组'" :title="'所属分组'" :options="cityList" />
    <SearchSelect :info="'在线状态'" :title="'微信状态'" :options="cityList" />
    <SearchInput :infos="['微信登录名']" />
    <Divider dashed />
    <ButtonList :buttonListInfos="setButtonListInfos" />
    <Divider dashed />
    <PagedTable ref="SAccountPagedTable" :dataColumns="SAccountColumns" />
    <SAccountSetModal
      :config="requestSetConfig"
      ref="SAccountRequestSetModal"
    />
    <SAccountSetModal
      :config="autoReplySetConfig"
      ref="SAccountAutoReplySetModal"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      cityList: [
        { value: "New York", label: "New York" },
        { value: "London", label: "London" },
        { value: "Sydney", label: "Sydney" },
        { value: "Ottawa", label: "Ottawa" },
        { value: "Paris", label: "Paris" },
        { value: "Canberra", label: "Canberra" }
      ],
      requestSetConfig: {
        title: "好友请求设置",
        label: "加我为好友时是否需要验证：",
        reallyText: "是",
        fakeText: "否"
      },
      autoReplySetConfig: {
        title: "自动回复设置",
        label: "是否自动回复：",
        reallyText: "开启",
        fakeText: "关闭"
      },
      setButtonListInfos: [
        { type: "success", icon: "md-settings", name: "好友请求设置" },
        { type: "success", icon: "md-settings", name: "自动回复设置" },
        { type: "success", icon: "md-settings", name: "自动回复模板设置" }
      ],
      SAccountColumns: [
        { width: 60, align: "center", type: "selection" },
        { width: 70, align: "center", title: "序号", key: "serialNumber" },
        { align: "center", title: "微信账号", key: "wechatNumber" },
        {
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
          align: "center",
          title: "是否需要认证",
          key: "isAuthentication",
          render: (h, params) => {
            const row = params.row
            const color = row.isAuthentication ? "success" : "volcano"
            const text = row.isAuthentication ? "是" : "否"
            return h("Tag", { props: { type: "border", color } }, text)
          }
        },
        {
          align: "center",
          title: "是否自动回复",
          key: "isAutoReply",
          render: (h, params) => {
            const row = params.row
            const color = row.isAutoReply ? "success" : "volcano"
            const text = row.isAutoReply ? "是" : "否"
            return h("Tag", { props: { type: "border", color } }, text)
          }
        },
        {
          tooltip: true,
          align: "center",
          title: "自动回复模板",
          key: "autoReplyTemplate"
        },
        {
          width: 130,
          title: "操作",
          align: "center",
          render: h => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    size: "small",
                    type: "primary",
                    icon: "md-alert",
                    disabled: this.radio
                  },
                  style: { marginRight: "5px" },
                  on: {
                    click: () => {}
                  }
                },
                "未设置"
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
    this.$refs["SAccountPagedTable"].tableData = this.data
  },
  methods: {
    async getData() {
      const { data } = await this.$http.getSaccount()
      const length = data.length
      for (let i = 0; i < length; i++) {
        this.data.push({
          serialNumber: data[i].serialNumber,
          wechatNumber: data[i].wechatNumber,
          accountStatus: data[i].accountStatus,
          isAuthentication: data[i].isAuthentication,
          isAutoReply: data[i].isAutoReply,
          autoReplyTemplate: data[i].autoReplyTemplate
        })
      }
      return this.data
    },
    requestAddFriend() {
      this.$refs["SAccountRequestSetModal"].isShowSetModal = true
    },
    autoReply() {
      this.$refs["SAccountAutoReplySetModal"].isShowSetModal = true
    }
  }
}
</script>
