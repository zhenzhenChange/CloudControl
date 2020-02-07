<template>
  <!-- 分组管理 -->
  <div class="Group">
    <SearchInput :ref="SearchInputRef" :infos="['分组名称']" />
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
    <PagedTable :data="data" :ref="PagedTableRef" :dataColumns="GroupColumns" />
    <TableDrawer ref="GroupTableDrawer" />
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  data() {
    return {
      data: [],
      mutex: false,
      pageIndex: 0,
      pageSize: 10,
      updateConfig: {},
      operationData: [],
      EditModalRef: "GroupEditModal",
      PagedTableRef: "GroupPagedTable",
      SearchInputRef: "GroupSearchInput",
      ConfirmModalRef: "GroupConfirmModal",
      operationConfig: {
        icon: "md-trash",
        color: "#ED4014",
        title: "删除",
        operation: "删除",
        btnType: "error",
        btnIcon: "md-trash",
        btnText: "删除"
      },
      buttonListInfos: [
        { id: "remove-g", name: "删除", icon: "md-trash", type: "error" },
        { id: "create-g", name: "添加", icon: "md-add-circle", type: "primary" }
      ],
      GroupColumns: [
        { width: 60, align: "center", type: "selection" },
        { width: 70, align: "center", title: "序号", key: "serialNumber" },
        { align: "center", title: "分组名称", key: "groupName" },
        { align: "center", title: "分组ID", key: "groupId" },
        {
          sortable: true,
          align: "center",
          title: "创建时间",
          key: "groupCreateDate"
        },
        {
          width: 330,
          title: "操作",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    size: "small",
                    type: "success",
                    icon: "md-eye",
                    disabled: this.mutex
                  },
                  style: { marginRight: "5px" },
                  on: {
                    click: () => {
                      const { groupId } = params.row
                      this.$refs["GroupTableDrawer"].isShowTableDrawer = true
                      this.$refs["GroupTableDrawer"].getAccountDataByGroupID(
                        groupId
                      )
                      this.$refs["GroupTableDrawer"].initAllData(groupId)
                      this.$refs["GroupTableDrawer"].groupID = groupId
                    }
                  }
                },
                "查看详情"
              ),
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
                      const { groupId: group_id } = params.row
                      this.$refs[this.ConfirmModalRef].isShowConfirmModal = true
                      this.$refs[this.ConfirmModalRef].params = group_id
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
    this.allData()
    this.initData(null)
  },
  computed: {
    ...mapState({ user_id: state => state.user_id })
  },
  methods: {
    async allData() {
      const { data } = await this.$http.get("/account/getAllGroup", {
        params: { user_id: this.user_id }
      })
      this.$refs[this.PagedTableRef].total = data.length
      const arr = []
      data.forEach(item =>
        arr.push({ label: item.groupName, value: String(item.groupId) })
      )
      this.$store.commit("saveGroupData", JSON.stringify(arr))
    },
    async initData(keyWords) {
      this.data = []
      let arr = []
      let res = null
      if (keyWords) {
        res = await this.$http.get("/account/getGroupByName", {
          params: { group_name: keyWords, user_id: this.user_id }
        })
      } else {
        res = await this.$http.get("/account/getAllGroup", {
          params: {
            user_id: this.user_id,
            pageIndex: this.pageIndex,
            pageSize: this.pageSize
          }
        })
        res.data.forEach(item =>
          arr.push({ label: item.groupName, value: item.groupId })
        )
      }
      res.data.forEach((item, index) => {
        this.data.push({
          serialNumber: index + 1,
          groupName: item.groupName,
          groupId: String(item.groupId),
          groupCreateDate: this.$options.filters.date(item.groupCreateDate)
        })
      })
    },
    async create() {
      const editModal = this.$refs[this.EditModalRef]
      const createData = { group_name: editModal.value, user_id: this.user_id }
      const { msg } = await this.$http.post("/account/addGroup", createData)
      this.$refs[this.EditModalRef].value = ""
      if (msg) {
        this.allData()
        this.initData()
        this.$Message.success("添加成功！")
      }
    },
    update({ groupName: group_name, groupId: group_id }) {
      this.updateConfig = {
        icon: "md-create",
        color: "#2D8CF0",
        title: "编辑分组",
        isUpdate: true,
        tryBtn: "保存",
        inputInfos: [
          { desc: "分组名称", label: "分组名称", model: group_name }
        ],
        updateData: { group_id },
        updateArgs: ["group_name"],
        url: "/account/updateGroup"
      }
      this.$refs[this.EditModalRef].isShowEditModal = true
      this.$refs[this.EditModalRef].value = false
    },
    async remove(params) {
      let group_id = []
      const ref = this.$refs
      if (params) {
        group_id.push(params)
      } else {
        group_id = this.operationData.map(item => item.groupId)
      }
      const { msg } = await this.$http.post("/account/deleteGroup", {
        group_id,
        user_id: this.user_id
      })
      if (msg) {
        this.allData()
        this.initData()
        ref["UnCheckButton"].unCheck()
        this.$Message.success(`删除成功（账号处于未分配状态）！`)
        ref[this.SearchInputRef].keyWords = ""
        ref[this.ConfirmModalRef].isShowConfirmModal = false
      }
    }
  }
}
</script>
