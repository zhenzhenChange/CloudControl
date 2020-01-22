<template>
  <!-- 分组管理 -->
  <div class="Grouping">
    <SearchInput :infos="['分组名称']" />
    <Divider dashed />
    <ButtonList :buttonListInfos="buttonListInfos" />
    <CommonEditModal :config="editConfig" ref="GroupingEditModal" />
    <CommonConfirmModal
      :data="operationData"
      :config="operationConfig"
      ref="ConfirmModal"
    />
    <Divider class="float-left" dashed />
    <UnCheckButton :el="refEl" />
    <PagedTable :ref="refEl" :dataColumns="GroupingColumns" />
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  data() {
    return {
      data: [],
      mutex: false,
      operationData: [],
      refEl: "GroupingPagedTable",
      editConfig: {
        icon: "md-add-circle",
        color: "#2D8CF0",
        title: "添加分组",
        isUpdate: false,
        inputInfos: [{ desc: "分组名称", label: "分组名称", value: null }],
        editData: {},
        tryBtn: "确定"
      },
      operationConfig: {},
      buttonListInfos: [
        { id: "remove", name: "删除", icon: "md-trash", type: "error" },
        { id: "add", name: "添加", icon: "md-add-circle", type: "primary" }
      ],
      GroupingColumns: [
        { width: 60, align: "center", type: "selection" },
        { width: 70, align: "center", title: "序号", key: "serialNumber" },
        { align: "center", title: "分组名称", key: "groupName" },
        {
          sortable: true,
          align: "center",
          title: "创建时间",
          key: "groupCreateDate",
          render: (h, params) => {
            return h(
              "div",
              this.$options.filters.date(
                this.$refs["GroupingPagedTable"].tableData[params.index]
                  .groupCreateDate
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
  mounted() {
    this.$refs[this.refEl].tableData = this.data
  },
  computed: {
    ...mapState({
      userID: state => state.userID
    })
  },
  methods: {
    async getData() {
      const res = await this.$http.get("/account/getAllGroup", {
        params: { user_id: 100001 }
      })
      const length = res.length
      for (let i = 0; i < length; i++) {
        this.data.push({
          serialNumber: i + 1,
          groupName: res[i].groupName,
          groupId: res[i].groupId,
          groupCreateDate: res[i].groupCreateDate
        })
      }
      return this.data
    },
    update({ groupName, groupId }) {
      this.editConfig.title = "编辑分组"
      this.editConfig.icon = "md-create"
      this.editConfig.isUpdate = true
      this.editConfig.inputInfos[0].value = groupName
      this.$refs["GroupingEditModal"].groupId = groupId
      this.$refs["GroupingEditModal"].isShowEditModal = true
    },
    remove({ groupId }) {
      this.operationConfig = {
        icon: "md-trash",
        color: "#ED4014",
        title: "删除",
        operation: "删除",
        btnType: "error",
        btnIcon: "md-trash",
        btnText: "删除"
      }
      this.operationData.push(groupId)
      this.$refs["ConfirmModal"].isShowConfirmModal = true
    }
  }
}
</script>
