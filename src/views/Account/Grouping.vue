<template>
  <div class="Grouping">
    <SearchInput :infos="['分组名称']" />
    <Divider dashed />
    <CDButton :batch="batch" />
    <InputModal
      :title="'添加分组'"
      ref="GroupingInputModal"
      :infos="['分组名称', '排序数字']"
    />
    <ConfirmModal
      :title="'删除分组'"
      :total="selectionData"
      ref="GroupingConfirmModal"
    />
    <Divider class="float-left" dashed />
    <PagedTable ref="GroupingPagedTable" :dataColumns="GroupingColumns" />
    <GroupEditModal ref="GroupEditModal" :data="groupEditData" />
    <GroupRemoveModal
      :title="'删除分组'"
      :dataSign="dataSign"
      ref="GroupRemoveModal"
    />
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
          key: "serialNumber"
        },
        {
          title: "分组名称",
          key: "groupName"
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
          render: (h, params) => {
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
                      this.groupEdit(params.row)
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
                      this.groupRemove(params.row)
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
      selectionData: [],
      groupEditData: {},
      dataSign: {}
    }
  },
  mounted() {
    this.$refs["GroupingPagedTable"].tableData = this.mockTableData()
  },
  methods: {
    groupEdit({ groupName, groupSortNumber }) {
      this.groupEditData = {
        title: "编辑分组",
        transmiData: [
          {
            model: groupName,
            placeholder: "分组名称"
          },
          {
            placeholder: "排序数字",
            model: groupSortNumber
          }
        ]
      }
      this.$refs["GroupEditModal"].isShowInputModal = true
    },
    groupRemove(arg) {
      this.dataSign = arg
      this.$refs["GroupRemoveModal"].isShowConfirmModal = true
    },
    mockTableData() {
      let i
      let data = []
      for (i = 0; i < this.pageSize; i++) {
        data.push({
          serialNumber: Math.floor(Math.random() * 100 + 1),
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
