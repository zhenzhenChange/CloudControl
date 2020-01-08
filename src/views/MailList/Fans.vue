<template>
  <div class="Fans">
    <RangeDatePicker />
    <Divider dashed />
    <SearchSelect :title="'订单状态'" :info="'订单状态'" />
    <SearchInput :infos="['任务名称']" />
    <Divider />
    <ButtonList :buttonListInfos="ActionButtonListInfos" />
    <Divider dashed />
    <PagedTable ref="FansPagedTable" :dataColumns="FansColumns" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      ActionButtonListInfos: [
        {
          type: "error",
          icon: "md-trash",
          name: "删除"
        },
        {
          type: "primary",
          icon: "md-add",
          name: "创建任务"
        }
      ],
      FansColumns: [
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
          title: "订单编号",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "任务名称",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "标签名称",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "来源通道",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "微信数",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "导入总数",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "XXXXX",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "失败请求数",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "通过好友数",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "发起时间",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "任务结束时间",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "操作",
          key: "groupAction",
          width: 250,
          align: "center",
          render: (h /*params*/) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small",
                    icon: "md-trash"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      // this.show(params.index)
                    }
                  }
                },
                "删除"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small",
                    icon: "md-eye"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      // this.show(params.index)
                    }
                  }
                },
                "查看"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "warning",
                    size: "small",
                    icon: "md-remove-circle"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      // this.show(params.index)
                    }
                  }
                },
                "取消"
              )
            ])
          }
        }
      ]
    }
  },
  mounted() {
    this.$refs["FansPagedTable"].tableData = this.mockTableData()
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
    }
  }
}
</script>
