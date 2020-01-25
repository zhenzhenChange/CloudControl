<template>
  <!-- 标签管理 -->
  <div class="Tag">
    <SearchInput :ref="SearchInputRef" :infos="['标签名称']" />
    <Divider dashed />
    <ButtonList :buttonListInfos="buttonListInfos" />
    <CommonEditModal :config="updateConfig" :ref="EditModalRef" />
    <CommonConfirmModal
      :data="operationData"
      :ref="ConfirmModalRef"
      :config="operationConfig"
    />
    <Divider class="float-left" dashed />
    <UnCheckButton ref="UnCheckButton" :el="PagedTableRef" />
    <PagedTable :ref="PagedTableRef" :data="data" :dataColumns="TagColumns" />
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
      EditModalRef: "TagEditModal",
      PagedTableRef: "TagPagedTable",
      SearchInputRef: "TagSearchInput",
      ConfirmModalRef: "TagConfirmModal",
      buttonListInfos: [
        { id: "remove-t", name: "删除", icon: "md-trash", type: "error" },
        { id: "create-t", name: "添加", icon: "md-add-circle", type: "primary" }
      ],
      updateConfig: {
        icon: "md-add-circle",
        color: "#2D8CF0",
        title: "添加标签",
        isUpdate: false,
        inputInfos: [{ desc: "标签名称", label: "标签名称", value: null }],
        tryBtn: "确定"
      },
      operationConfig: {
        icon: "md-trash",
        color: "#ED4014",
        title: "删除",
        operation: "删除",
        btnType: "error",
        btnIcon: "md-trash",
        btnText: "删除"
      },
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
                      const { tagId: tag_id } = params.row
                      this.$refs[this.ConfirmModalRef].isShowConfirmModal = true
                      this.$refs[this.ConfirmModalRef].params = tag_id
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
    ...mapState({ user_id: state => state.user_id })
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
        res = res.data
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
      const editModal = this.$refs[this.EditModalRef]
      const createData = { tag_name: editModal.value, user_id: this.user_id }
      const { msg } = await this.$http.post("/account/addTag", createData)
      this.$refs[this.EditModalRef].value = ""
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
      this.$refs[this.EditModalRef].isShowEditModal = true
    },
    async remove(params) {
      let TagIDArray = []
      const ref = this.$refs
      if (params) {
        TagIDArray.push(String(params))
      } else {
        TagIDArray = this.operationData.map(item => String(item.tagId))
      }
      const { msg } = await this.$http.post("/account/deleteTag", {
        tag_id: TagIDArray,
        user_id: this.user_id
      })
      if (msg) {
        this.getData()
        ref["UnCheckButton"].unCheck()
        this.$Message.success(`删除成功！`)
        ref[this.SearchInputRef].keyWords = ""
        ref[this.ConfirmModalRef].isShowConfirmModal = false
      }
    }
  }
}
</script>
