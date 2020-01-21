<template>
  <!-- 分组管理 -->
  <div class="Grouping">
    <SearchInput :infos="['分组名称']" />
    <Divider dashed />
    <ButtonList :buttonListInfos="buttonListInfos" />
    <InputModal
      :title="'添加分组'"
      ref="GroupingInputModal"
      :infos="['分组名称', '排序数字']"
    />
    <CommonConfirmModal
      :config="config"
      :data="selectedData"
      ref="GroupingDeleteModal"
    />
    <Divider class="float-left" dashed />
    <PagedTable ref="GroupingPagedTable" :dataColumns="GroupingColumns" />
    <!-- 模态窗 -->
    <GroupEditModal ref="GroupEditModal" :data="groupEditData" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      mutex: false,
      selectedData: [],
      groupEditData: {},
      config: {
        icon: "md-trash",
        color: "#ED4014",
        title: "删除分组",
        operation: "删除",
        btnType: "error",
        btnIcon: "md-trash",
        btnText: "删除"
      },
      buttonListInfos: [
        { id: "remove", name: "删除", icon: "md-trash", type: "error" },
        { id: "add", name: "添加", icon: "md-add-circle", type: "primary" }
      ],
      GroupingColumns: [
        { width: 60, align: "center", type: "selection" },
        { width: 70, align: "center", title: "序号", key: "serialNumber" },
        { align: "center", title: "分组名称", key: "group_name" },
        { sortable: true, align: "center", title: "排序数字", key: "group_id" },
        {
          sortable: true,
          align: "center",
          title: "创建时间",
          key: "group_create_date",
          render: (h, params) => {
            return h(
              "div",
              this.$options.filters.date(
                this.$refs["GroupingPagedTable"].tableData[params.index]
                  .group_create_date
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
                  props: { size: "small", type: "primary", icon: "md-create" },
                  style: { marginRight: "5px" },
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
                    disabled: this.mutex
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
      const { data } = await this.$http.getAllGroup()
      const length = data.length
      for (let i = 0; i < length; i++) {
        this.data.push({
          serialNumber: data[i].serialNumber,
          group_name: data[i].group_name,
          group_id: data[i].group_id,
          group_create_date: data[i].group_create_date
        })
      }
      return this.data
    },
    groupEdit({ group_name, group_id }) {
      this.groupEditData = {
        title: "编辑分组",
        transmiData: [
          { model: group_name, placeholder: "分组名称" },
          { model: group_id, placeholder: "排序数字" }
        ]
      }
      this.$refs["GroupEditModal"].isShowInputModal = true
    },
    groupRemove({ group_id }) {
      this.selectedData.push(group_id)
      this.$refs["GroupingDeleteModal"].isShowModal = true
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
