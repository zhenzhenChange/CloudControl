<template>
  <!-- 账号管理 -->
  <div class="MAccount">
    <SearchSelect :info="'分组'" :title="'账号分组'" :options="cityList" />
    <SearchSelect :info="'在线状态'" :title="'微信状态'" :options="cityList" />
    <SearchInput :infos="['微信登录名', '代理IP']" />
    <Divider dashed />
    <CDButton :batch="batch" />
    <ButtonList :listBatch="batch" :buttonListInfos="oneKeyButtonListInfos" />
    <Divider />
    <ButtonList :listBatch="batch" :buttonListInfos="editButtonListInfos" />
    <Divider />
    <ButtonList :listBatch="batch" :buttonListInfos="setButtonListInfos" />
    <InputModal
      :title="'添加分组'"
      ref="MAccountInputModal"
      :infos="['分组名称', '排序数字']"
    />
    <ConfirmModal
      :total="selectionData"
      :title="'删除分组'"
      ref="MAccountConfirmModal"
    />
    <Divider dashed />
    <PagedTable ref="MAccountPagedTable" :dataColumns="MAccountColumns" />
    <!-- 模态窗 -->
    <MAccountCreateModal ref="MAccountCreateModal" :title="'添加账号'" />
    <MAccountTrendModal
      :title="'一键上线'"
      :total="selectionData"
      :type="'md-trending-up'"
      ref="MAccountTrendUpModal"
    />
    <MAccountTrendModal
      :title="'一键下线'"
      :total="selectionData"
      :type="'md-trending-down'"
      ref="MAccountTrendDownModal"
    />
    <MAccountTrendModal
      :title="'上线'"
      :type="'md-trending-up'"
      ref="AloneTrendUpModal"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      batch: true,
      radio: false,
      selectionData: [],
      cityList: [
        { value: "New York", label: "New York" },
        { value: "London", label: "London" },
        { value: "Sydney", label: "Sydney" },
        { value: "Ottawa", label: "Ottawa" },
        { value: "Paris", label: "Paris" },
        { value: "Canberra", label: "Canberra" }
      ],
      setButtonListInfos: [
        { type: "success", icon: "md-settings", name: "设置朋友圈权限" },
        { type: "success", icon: "md-unlock", name: "解锁改密码权限" },
        { type: "success", icon: "md-unlock", name: "解锁改资料权限" },
        { type: "success", icon: "md-unlock", name: "解锁改头像权限" }
      ],
      editButtonListInfos: [
        { type: "info", icon: "md-create", name: "修改分组" },
        { type: "info", icon: "md-create", name: "修改资料" },
        { type: "info", icon: "md-create", name: "修改头像" },
        { type: "info", icon: "md-create", name: "修改昵称" },
        { type: "info", icon: "md-create", name: "修改密码" },
        { type: "info", icon: "md-create", name: "修改朋友圈封面" }
      ],
      oneKeyButtonListInfos: [
        { type: "warning", icon: "md-trending-up", name: "一键上线" },
        { type: "warning", icon: "md-trending-down", name: "一键下线" }
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
          render: h => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    size: "small",
                    type: "warning",
                    disabled: this.radio,
                    icon: "ios-trending-up"
                  },
                  style: { marginRight: "5px" },
                  on: {
                    click: () => {
                      this.$refs[
                        "AloneTrendUpModal"
                      ].isShowMAccountTrendModal = true
                    }
                  }
                },
                "上线"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small",
                    disabled: this.radio,
                    icon: "md-information-circle"
                  }
                },
                "操作日志"
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
    this.$refs["MAccountPagedTable"].tableData = this.data
  },
  methods: {
    async getData() {
      const { data } = await this.$http.getAccountInfo()
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
    addModalVisibleChange() {
      this.$refs["MAccountCreateModal"].isShowMAccountCreateModal = true
    },
    deleteModalVisibleChange() {
      this.$refs["MAccountConfirmModal"].isShowConfirmModal = true
    },
    trendUp() {
      this.$refs["MAccountTrendUpModal"].isShowMAccountTrendModal = true
    },
    trendDown() {
      this.$refs["MAccountTrendDownModal"].isShowMAccountTrendModal = true
    }
  }
}
</script>
