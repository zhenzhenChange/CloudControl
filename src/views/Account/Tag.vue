<template>
  <div class="Tag">
    <SearchInput :infos="['标签名称']" />
    <Divider dashed />
    <CDButton :batch="batch" />
    <InputModal :title="'添加标签'" ref="TagInputModal" :infos="['标签名称']" />
    <ConfirmModal
      :title="'删除标签'"
      :total="selectionData"
      ref="TagConfirmModal"
    />
    <Divider class="float-left" dashed />
    <PagedTable ref="TagPagedTable" :dataColumns="TagColumns" />
    <GroupEditModal ref="TagEditModal" :data="tagEditData" />
    <GroupRemoveModal
      :title="'删除分组'"
      :dataSign="dataSign"
      ref="TagRemoveModal"
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
      dataSign: {},
      tagEditData: {},
      selectionData: [],
      TagColumns: [
        { width: 60, align: "center", type: "selection" },
        { width: 70, align: "center", title: "序号", key: "serialNumber" },
        { align: "center", key: "tagName", title: "标签名称" },
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
                  style: { marginRight: "5px" },
                  on: {
                    click: () => {
                      this.tagEdit(params.row)
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
                      this.tagRemove(params.row)
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
    this.$refs["TagPagedTable"].tableData = this.data
  },
  methods: {
    async getData() {
      const { data } = await this.$http.get("tag")
      const res = data.data
      const length = res.length
      for (let i = 0; i < length; i++) {
        this.data.push({
          serialNumber: res[i].serialNumber,
          tagName: res[i].tagName
        })
      }
      return this.data
    },
    tagEdit({ tagName }) {
      this.tagEditData = {
        title: "编辑标签",
        transmiData: [{ model: tagName, placeholder: "标签名称" }]
      }
      this.$refs["TagEditModal"].isShowInputModal = true
    },
    tagRemove(arg) {
      this.dataSign = arg
      this.$refs["TagRemoveModal"].isShowConfirmModal = true
    },
    addModalVisibleChange() {
      this.$refs["TagInputModal"].isShowInputModal = true
    },
    deleteModalVisibleChange() {
      this.$refs["TagConfirmModal"].isShowConfirmModal = true
    }
  }
}
</script>
