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
    InputInfo: Array,
    SelectInfo: Array,
    ButtonName: String,
    TableColumnsTitle: String
  },
  data() {
    return {
      TabsContentColumns: [
        { width: 60, align: "center", type: "selection" },
        { width: 70, title: "序号", align: "center", key: "mAccountNumber" },
        {
          align: "center",
          key: "mAccountNumber",
          title: this.TableColumnsTitle
        },
        { align: "center", title: "模板分类", key: "mAccountNumber" },
        { align: "center", title: "创建时间", key: "mAccountNumber" },
        {
          width: 250,
          title: "操作",
          align: "center",
          render: (h /*params*/) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    size: "small",
                    type: "primary",
                    icon: "md-create"
                  },
                  style: { marginRight: "5px" },
                  on: {
                    click: () => {}
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
                    click: () => {}
                  }
                },
                "删除"
              )
            ])
          }
        }
      ],
      TabsButtonListInfo: [
        { icon: "md-add", type: "primary", name: `添加${this.ButtonName}` },
        { type: "error", icon: "md-trash", name: `删除${this.ButtonName}` }
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
