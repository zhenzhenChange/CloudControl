<template>
  <div class="grouping">
    <SearchInput :infos="['分组名称']" />
    <Divider dashed />
    <CDButton />
    <InputModal
      ref="InputModal"
      :title="'添加分组'"
      :infos="['分组名称', '排序数字']"
    />
    <ConfirmModal ref="ConfirmModal" :title="'删除分组'" :total="10" />
    <Divider class="float-left" dashed />
    <PagedTable ref="PagedTable" :dataColumns="groupColumns" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      groupColumns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "序号",
          width: 70,
          align: "center",
          key: "groupNumber"
        },
        {
          title: "分组名称",
          key: "groupName",
          render: (h, params) => {
            const row = params.row
            const color =
              row.groupName === 1
                ? "primary"
                : row.groupName === 2
                ? "success"
                : "error"
            const text =
              row.groupName === 1
                ? "忙碌"
                : row.groupName === 2
                ? "在线"
                : "封禁"
            return h(
              "Tag",
              {
                props: {
                  type: "dot",
                  color: color
                }
              },
              text
            )
          }
        },
        {
          title: "排序数字",
          key: "groupSortNumber",
          sortable: true
        },
        {
          title: "创建时间",
          key: "groupCreateTime",
          sortable: true,
          render: (h /* params */) => {
            return h(
              "div",
              this.$options.filters.date
              // this.groupData[params.index].groupCreateTime
            )
          }
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
      ]
    }
  },
  mounted() {
    this.$refs["PagedTable"].tableData = this.mockTableData()
  },
  methods: {
    mockTableData() {
      let data = []
      for (let i = 0; i < 10; i++) {
        data.push({
          groupNumber: Math.floor(Math.random() * 100 + 1),
          groupName: Math.floor(Math.random() * 3 + 1),
          groupSortNumber: Math.floor(Math.random() * 100 + 1),
          groupCreateTime: new Date()
        })
      }
      return data
    },
    addModalVisibleChange() {
      this.$refs["InputModal"].isShowInputModal = true
    },
    deleteModalVisibleChange() {
      this.$refs["ConfirmModal"].isShowConfirmModal = true
    }
  }
}
</script>
