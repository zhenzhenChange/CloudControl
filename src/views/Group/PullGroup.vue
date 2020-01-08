<template>
  <div class="PullGroup">
    <RangeDatePicker />
    <Divider dashed />
    <SearchSelect :title="'订单状态'" :info="'状态'" :options="cityList" />
    <SearchInput :infos="['任务名称']" />
    <Divider dashed />
    <ButtonList :buttonListInfos="ActionButtonListInfos" />
    <Divider />
    <PagedTable ref="PullGroupPagedTable" :dataColumns="PullGroupColumns" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      PullGroupColumns: [
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
          title: "订单ID",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "任务名称",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "微信数",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "拉群标签",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "拉群类型",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "群最终人数",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "总拉群数",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "合格群数",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "不合格群数",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "创建时间",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "结束时间",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "当前状态",
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
                    type: "success",
                    size: "small",
                    icon: "md-aperture"
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
                "运行"
              )
            ])
          }
        }
      ],
      ActionButtonListInfos: [
        {
          type: "info",
          icon: "md-download",
          name: "导出报表"
        },
        {
          type: "primary",
          icon: "md-add",
          name: "创建任务"
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
      ]
    }
  },
  mounted() {
    this.$refs["PullGroupPagedTable"].tableData = this.mockTableData()
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
