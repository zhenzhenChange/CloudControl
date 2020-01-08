<template>
  <div class="MAccount">
    <SearchSelect :title="'账号分组'" :options="cityList" :info="'分组'" />
    <SearchSelect :title="'微信状态'" :options="cityList" :info="'在线状态'" />
    <SearchInput :infos="['微信登录名', '代理IP']" />
    <Divider dashed />
    <CDButton />
    <ButtonList :buttonListInfos="editButtonListInfos" />
    <Divider />
    <ButtonList :buttonListInfos="setButtonListInfos" />
    <InputModal
      ref="MAccountInputModal"
      :title="'添加分组'"
      :infos="['分组名称', '排序数字']"
    />
    <ConfirmModal ref="MAccountConfirmModal" :title="'删除分组'" :total="10" />
    <Divider dashed />
    <PagedTable ref="MAccountPagedTable" :dataColumns="MAccountColumns" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      MAccountColumns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "序号",
          width: 70,
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "锁状态",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "账号状态",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "微信登录名",
          width: 110,
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "密码",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "昵称",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "WXID",
          width: 140,
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "微信号",
          align: "center",
          key: "mAccountSortNumber",
          sortable: true
        },
        {
          title: "签名",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "所属分组",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "性别",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "城市",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "设备类型",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "操作",
          key: "mAccountAction",
          width: 250,
          align: "center",
          render: (h /*params*/) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "warning",
                    size: "small",
                    icon: "ios-trending-up"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.addGroupModal = true
                      // this.show(params.index)
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
                    icon: "md-information-circle"
                  },
                  on: {
                    click: () => {
                      this.deleteGroupModal = true
                      // this.remove(params.index)
                    }
                  }
                },
                "操作日志"
              )
            ])
          }
        }
      ],
      cityList: [
        {
          value: "New York",
          label: "New York"
        },
        {
          value: "London",
          label: "London"
        },
        {
          value: "Sydney",
          label: "Sydney"
        },
        {
          value: "Ottawa",
          label: "Ottawa"
        },
        {
          value: "Paris",
          label: "Paris"
        },
        {
          value: "Canberra",
          label: "Canberra"
        }
      ],
      editButtonListInfos: [
        {
          type: "warning",
          icon: "md-trending-up",
          name: "一键上线"
        },
        {
          type: "warning",
          icon: "md-trending-down",
          name: "一键下线"
        },
        {
          type: "info",
          icon: "md-create",
          name: "修改分组"
        },
        {
          type: "info",
          icon: "md-create",
          name: "修改资料"
        },
        {
          type: "info",
          icon: "md-create",
          name: "修改头像"
        },
        {
          type: "info",
          icon: "md-create",
          name: "修改昵称"
        },
        {
          type: "info",
          icon: "md-create",
          name: "修改密码"
        },
        {
          type: "info",
          icon: "md-create",
          name: "修改朋友圈封面"
        }
      ],
      setButtonListInfos: [
        {
          type: "success",
          icon: "md-settings",
          name: "设置朋友圈权限"
        },
        {
          type: "success",
          icon: "md-unlock",
          name: "解锁改密码权限"
        },
        {
          type: "success",
          icon: "md-unlock",
          name: "解锁改资料权限"
        },
        {
          type: "success",
          icon: "md-unlock",
          name: "解锁改头像权限"
        }
      ]
    }
  },
  mounted() {
    this.$refs["MAccountPagedTable"].tableData = this.mockTableData()
  },
  methods: {
    mockTableData() {
      let data = []
      for (let i = 0; i < 10; i++) {
        data.push({
          mAccountNumber: Math.floor(Math.random() * 100 + 1),
          mAccountSortNumber: Math.floor(Math.random() * 100 + 1)
        })
      }
      return data
    },
    addModalVisibleChange() {
      this.$refs["MAccountInputModal"].isShowInputModal = true
    },
    deleteModalVisibleChange() {
      this.$refs["MAccountConfirmModal"].isShowConfirmModal = true
    }
  }
}
</script>
