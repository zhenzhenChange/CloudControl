<template>
  <div class="InterChat">
    <SearchSelect :title="'当前状态'" :info="'状态'" />
    <SearchInput :infos="['任务名称']" />
    <Divider dashed />
    <ButtonList :buttonListInfos="CreateTaskButtonInfo" />
    <Divider />
    <PagedTable ref="InterChatPagedTable" :dataColumns="InterChatColumns" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      CreateTaskButtonInfo: [
        {
          type: "primary",
          icon: "md-add",
          name: "创建任务"
        }
      ],
      InterChatColumns: [
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
          title: "任务名称",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "聊天间隔",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "群上限数",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "聊天状态",
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
                    type: "warning",
                    size: "small",
                    icon: "md-remove-circle"
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
                "取消"
              )
            ])
          }
        }
      ]
    }
  },
  mounted() {
    this.$refs["InterChatPagedTable"].tableData = this.mockTableData()
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
