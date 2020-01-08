<template>
  <div class="GroupChat">
    <SearchSelect :title="'状态'" :info="'状态'" :options="cityList" />
    <SearchInput :infos="['群名称']" />
    <Divider dashed />
    <ButtonList :buttonListInfos="ActionButtonListInfos" />
    <Divider dashed />
    <PagedTable ref="GroupChatPagedTable" :dataColumns="GroupChatColumns" />
  </div>
</template>

<script>
export default {
  data() {
    return {
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
      ActionButtonListInfos: [
        {
          type: "error",
          icon: "md-trash",
          name: "删除"
        },
        {
          type: "warning",
          icon: "md-exit",
          name: "退群"
        }
      ],
      GroupChatColumns: [
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
          title: "群名称",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "群号",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "微信账号",
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
                    type: "error",
                    size: "small",
                    icon: "md-trash"
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
                "删除"
              )
            ])
          }
        }
      ]
    }
  },
  mounted() {
    this.$refs["GroupChatPagedTable"].tableData = this.mockTableData()
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
