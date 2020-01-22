<template>
  <!-- 标签管理 -->
  <div class="Tag">
    <SearchInput ref="Search" :infos="['标签名称']" />
    <Divider dashed />
    <ButtonList :buttonListInfos="buttonListInfos" />
    <CommonEditModal :config="updateConfig" :ref="editModalRef" />
    <CommonConfirmModal
      ref="ConfirmModal"
      :data="operationData"
      :config="operationConfig"
    />
    <Divider class="float-left" dashed />
    <UnCheckButton :el="pagedTableRef" />
    <PagedTable :ref="pagedTableRef" :data="data" :dataColumns="TagColumns" />
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
      editModalRef: "TagEditModal",
      pagedTableRef: "TagPagedTable",
      buttonListInfos: [
        { id: "remove-a", name: "删除", icon: "md-trash", type: "error" },
        { id: "create-a", name: "添加", icon: "md-add-circle", type: "primary" }
      ],
      updateConfig: {
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
        { align: "center", key: "tagName", title: "标签名称" },
        { align: "center", key: "tagCreateDate", title: "创建时间" },
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
    this.getData(null)
  },
  computed: {
    ...mapState({
      user_id: state => state.user_id
    })
  },
  methods: {
    async getData(keyWords) {
      let res = null
      if (keyWords) {
        res = await this.$http.get("/account/getTagByName", {
          params: { tag_name: keyWords, user_id: this.user_id }
        })
      } else {
        res = await this.$http.get("/account/getAllTag", {
          params: { user_id: this.user_id }
        })
      }
      this.data = []
      res.forEach((item, index) => {
        this.data.push({
          serialNumber: index + 1,
          tagName: item.tagName,
          tagId: item.tagId,
          tagCreateDate: this.$options.filters.date(item.tagCreateDate)
        })
      })
    },
    async create() {
      const editModal = this.$refs[this.editModalRef]
      const createData = { tag_name: editModal.value, user_id: this.user_id }
      const { msg } = await this.$http.post("/account/addTag", createData)
      this.$refs[this.editModalRef].value = ""
      if (msg) {
        this.getData()
        this.$Message.success("添加成功！")
      }
    },
    update({ tagName: tag_name, tagId: tag_id }) {
      this.updateConfig = {
        icon: "md-create",
        color: "#2D8CF0",
        title: "编辑标签",
        isUpdate: true,
        tryBtn: "保存",
        inputInfos: [{ desc: "标签名称", label: "标签名称", model: tag_name }],
        updateData: { tag_id },
        updateArgs: ["tag_name"],
        url: "/account/updateTag"
      }
      this.$refs[this.editModalRef].isShowEditModal = true
    },
    remove(row) {
      this.operationConfig = {
        icon: "md-trash",
        color: "#ED4014",
        title: "删除",
        operation: "删除",
        btnType: "error",
        btnIcon: "md-trash",
        btnText: "删除",
        url: "/account/deleteTag",
        deleteArgs: "tag_id",
        looperArgs: "tagId"
      }
      if (row) {
        const { tagId: tag_id } = row
        this.operationConfig.type = "single"
        this.operationData.push(String(tag_id))
      }
      this.$refs["ConfirmModal"].isShowConfirmModal = true
    }
  }
}
</script>
