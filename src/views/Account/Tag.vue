<template>
  <!-- 标签管理 -->
  <div class="Tag">
    <SearchInput :infos="['标签名称']" />
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
    <PagedTable :ref="refEl" :dataColumns="TagColumns" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      mutex: false,
      operationData: [],
      refEl: "TagPagedTable",
      buttonListInfos: [
        { id: "remove", name: "删除", icon: "md-trash", type: "error" },
        { id: "add", name: "添加", icon: "md-add-circle", type: "primary" }
      ],
      editConfig: {
        icon: "md-add-circle",
        color: "#2D8CF0",
        title: "添加标签",
        isUpdate: false,
        inputInfos: [{ desc: "标签名称", label: "标签名称", value: null }],
        tryBtn: "确定"
      },
      operationConfig: {},
      TagColumns: [
        { width: 60, align: "center", type: "selection" },
        { width: 70, align: "center", title: "序号", key: "serialNumber" },
        { align: "center", key: "tag_name", title: "标签名称" },
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
  methods: {
    async getData() {
      const { data } = await this.$http.get("/account/getAllTag")
      const length = data.length
      for (let i = 0; i < length; i++) {
        this.data.push({
          serialNumber: data[i].serialNumber,
          tag_name: data[i].tag_name
        })
      }
      return this.data
    },
    update({ tag_name }) {
      this.editConfig.title = "编辑标签"
      this.editConfig.icon = "md-create"
      this.editConfig.isUpdate = true
      this.editConfig.inputInfos[0].value = tag_name
      this.$refs["GroupingEditModal"].isShowEditModal = true
    },
    remove({ tag_name }) {
      this.operationConfig = {
        icon: "md-trash",
        color: "#ED4014",
        title: "删除",
        operation: "删除",
        btnType: "error",
        btnIcon: "md-trash",
        btnText: "删除"
      }
      this.operationData.push(tag_name)
      this.$refs["ConfirmModal"].isShowConfirmModal = true
    }
  }
}
</script>
