<template>
  <div class="Grouping">
    <SearchInput :infos="['分组名称']" />
    <Divider dashed />
    <CDButton :batch="batch" />
    <InputModal
      ref="GroupingInputModal"
      :title="'添加分组'"
      :infos="['分组名称', '排序数字']"
    />
    <ConfirmModal
      ref="GroupingConfirmModal"
      :title="'删除分组'"
      :total="selectionLength"
    />
    <Divider class="float-left" dashed />
    <PagedTable ref="GroupingPagedTable" :dataColumns="GroupingColumns" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      GroupingColumns: [
        {
          width: 60,
          align: "center",
          type: "selection"
        },
        {
          width: 70,
          title: "序号",
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
          render: (h, params) => {
            return h(
              "div",
              this.$options.filters.date(
                this.$refs["GroupingPagedTable"].tableData[params.index]
                  .groupCreateTime
              )
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
                    icon: "md-create",
                    disabled: this.radio
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
                    icon: "md-trash",
                    disabled: this.radio
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
      batch: true,
      radio: false,
      pageSize: 10,
      selectionLength: 0
    }
  },
  mounted() {
    this.$refs["GroupingPagedTable"].tableData = this.mockTableData()
  },
  methods: {
    mockTableData() {
      let i
      let data = []
      for (i = 0; i < this.pageSize; i++) {
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
      this.$refs["GroupingInputModal"].isShowInputModal = true
    },
    deleteModalVisibleChange() {
      this.$refs["GroupingConfirmModal"].isShowConfirmModal = true
    }
  }
}
</script>
