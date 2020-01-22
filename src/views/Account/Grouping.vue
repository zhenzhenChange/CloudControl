<template>
  <!-- 分组管理 -->
  <div class="Grouping">
    <SearchInput :infos="['分组名称']" />
    <Divider dashed />
    <ButtonList :buttonListInfos="buttonListInfos" />
    <CommonEditModal :config="updateConfig" ref="GroupingEditModal" />
    <CommonConfirmModal
      ref="ConfirmModal"
      :data="operationData"
      :config="operationConfig"
    />
    <Divider class="float-left" dashed />
    <UnCheckButton :el="refEl" />
    <PagedTable :ref="refEl" :data="data" :dataColumns="GroupingColumns" />
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  data() {
    return {
      data: [],
      mutex: false,
      updateConfig: {},
      operationData: [],
      operationConfig: {},
      refEl: "GroupingPagedTable",
      buttonListInfos: [
        { id: "remove-g", name: "删除", icon: "md-trash", type: "error" },
        { id: "create-g", name: "添加", icon: "md-add-circle", type: "primary" }
      ],
      GroupingColumns: [
        { width: 60, align: "center", type: "selection" },
        { width: 70, align: "center", title: "序号", key: "serialNumber" },
        { align: "center", title: "分组名称", key: "groupName" },
        {
          sortable: true,
          align: "center",
          title: "创建时间",
          key: "groupCreateDate"
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
                    disabled: this.mutex
                  },
                  style: { marginRight: "5px" },
                  on: {
                    click: () => {
                      this.update(params.row)
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
                      this.remove(params.row)
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
  computed: {
    ...mapState({
      user_id: state => state.user_id
    })
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
    },
    create() {
      this.$refs["GroupingEditModal"].isShowEditModal = true
    },
    update({ groupName: group_name, groupId: group_id }) {
      this.updateConfig = {
        icon: "md-create",
        color: "#2D8CF0",
        title: "编辑分组",
        isUpdate: true,
        tryBtn: "保存",
        inputInfos: [
          {
            desc: "分组名称",
            label: "分组名称",
            model: group_name
          }
        ],
        updateData: { group_id },
        updateArgs: "group_name"
      }
      this.$refs["GroupingEditModal"].isShowEditModal = true
    },
    remove(row) {
      this.operationConfig = {
        icon: "md-trash",
        color: "#ED4014",
        title: "删除",
        operation: "删除",
        btnType: "error",
        btnIcon: "md-trash",
        btnText: "删除"
      }
      if (row) {
        const { groupId: group_id } = row
        this.operationData.push(String(group_id))
      }
      this.$refs["ConfirmModal"].isShowConfirmModal = true
    }
  }
}
</script>
