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
    <!-- 模态窗 -->
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
      data: [],
      batch: true,
      radio: false,
      pageSize: 10,
      dataSign: {},
      selectionData: [],
      groupEditData: {},
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
          align: "center",
          title: "分组名称",
          key: "groupName"
        },
        {
          sortable: true,
          align: "center",
          title: "排序数字",
          key: "groupSortNumber"
        },
        {
          sortable: true,
          align: "center",
          title: "创建时间",
          key: "groupCreateTime",
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
          width: 230,
          title: "操作",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    size: "small",
                    type: "primary",
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
      ]
    }
  },
  created() {
    this.getData()
  },
  mounted() {
    this.$refs["GroupingPagedTable"].tableData = this.data
  },
  methods: {
    async getData() {
      const { data } = await this.$http.get("grouping")
      const res = data.data
      const length = res.length
      for (let i = 0; i < length; i++) {
        this.data.push({
          serialNumber: res[i].serialNumber,
          groupName: res[i].groupName,
          groupSortNumber: res[i].groupSortNumber,
          groupCreateTime: res[i].groupCreateTime
        })
      }
      return this.data
    },
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
    addModalVisibleChange() {
      this.$refs["GroupingInputModal"].isShowInputModal = true
    },
    deleteModalVisibleChange() {
      this.$refs["GroupingConfirmModal"].isShowConfirmModal = true
    }
  }
}
</script>
