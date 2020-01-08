<template>
  <div class="MaterialTabsContent">
    <SearchSelect :title="'模板类型'" :info="'类型'" :options="SelectInfo" />
    <SearchInput :infos="InputInfo" />
    <Divider dashed />
    <ButtonList :buttonListInfos="TabsButtonListInfo" />
    <Divider />
    <PagedTable ref="TabsContentPagedTable" :dataColumns="TabsContentColumns" />
  </div>
</template>

<script>
export default {
  name: "MaterialTabsContent",
  props: {
    SelectInfo: Array,
    InputInfo: Array,
    TableColumnsTitle: String,
    ButtonName: String
  },
  data() {
    return {
      TabsContentColumns: [
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
          title: this.TableColumnsTitle,
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "模板分类",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "创建时间",
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
                    icon: "md-create"
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
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small",
                    icon: "md-trash"
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
      ],
      TabsButtonListInfo: [
        {
          type: "primary",
          icon: "md-add",
          name: `添加${this.ButtonName}`
        },
        {
          type: "error",
          icon: "md-trash",
          name: `删除${this.ButtonName}`
        }
      ]
    }
  },
  mounted() {
    this.$refs["TabsContentPagedTable"].tableData = this.mockTableData()
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
