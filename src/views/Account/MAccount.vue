<template>
  <div class="m-account">
    <SearchSelect />
    <SearchInput :infos="['微信登录名', '代理IP']" />
    <Divider dashed />
    <CDButton />
    <InputModal
      ref="InputModal"
      :title="'添加分组'"
      :infos="['分组名称', '排序数字']"
    />
    <ConfirmModal ref="ConfirmModal" :title="'删除分组'" :total="10" />
    <ListButton />
    <Divider dashed />
    <PagedTable ref="PagedTable" :dataColumns="mAccountColumns" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      mAccountData: this.mockTableData(),
      mAccountColumns: [
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
      ]
    }
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
    changePage() {
      this.mAccountData = this.mockTableData()
    }
  }
}
</script>
