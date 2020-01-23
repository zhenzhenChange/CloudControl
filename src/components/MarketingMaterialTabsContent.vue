<template>
  <div class="MaterialTabsContent">
    <ButtonList :buttonListInfos="TabsButtonListInfo" />
    <Divider />
    <PagedTable
      :data="data"
      ref="pagedTableRef"
      :dataColumns="TabsContentColumns"
    />
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  name: "MaterialTabsContent",
  props: { TableColumnsTitle: String },
  data() {
    return {
      data: [],
      pagedTableRef: "TabsContentPagedTable",
      TabsButtonListInfo: [
        { type: "primary", icon: "md-add", name: "添加" },
        { type: "error", icon: "md-trash", name: "删除" }
      ],
      TabsContentColumns: [
        { width: 60, align: "center", type: "selection" },
        { width: 70, align: "center", title: "序号", key: "serialNumber" },
        { align: "center", title: "名称", key: "groupName" },
        { align: "center", title: "模板分类", key: "groupId" },
        { align: "center", title: "创建时间", key: "groupCreateDate" },
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
      ]
    }
  },
  created() {
    this.getData()
  },
  computed: {
    ...mapState({ user_id: state => state.user_id })
  },
  methods: {
    async getData() {
      const res = await this.$http.get("/account/getAllGroup", {
        params: { user_id: this.user_id }
      })
      this.data = []
      res.forEach((item, index) => {
        this.data.push({
          serialNumber: index + 1,
          groupName: item.groupName,
          groupId: item.groupId,
          groupCreateDate: this.$options.filters.date(item.groupCreateDate)
        })
      })
    }
  }
}
</script>
