<template>
  <div class="Trumpet">
    <SearchInput :infos="['任务名称']" />
    <Divider dashed />
    <ButtonList :buttonListInfos="TrumpetButtonListInfos" />
    <Divider dashed />
    <PagedTable ref="TrumpetPagedTable" :dataColumns="TrumpetColumns" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      TrumpetColumns: [
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
          title: "任务编号",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "任务名称",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "添加方式",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "互聊时间",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "互聊间隔",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "自动聊天",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "配对数",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "成功请求数",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "失败请求数",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "通过",
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
                    type: "primary",
                    size: "small",
                    icon: "md-create"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      // this.remove(params.index)
                    }
                  }
                },
                "修改"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small",
                    icon: "md-remove-circle"
                  },
                  on: {
                    click: () => {
                      // this.remove(params.index)
                    }
                  }
                },
                "取消"
              )
            ])
          }
        }
      ],
      TrumpetButtonListInfos: [
        {
          type: "primary",
          icon: "md-add",
          name: "创建任务"
        }
      ]
    }
  },
  mounted() {
    this.$refs["TrumpetPagedTable"].tableData = this.mockTableData()
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
