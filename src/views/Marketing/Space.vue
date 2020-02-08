<template>
  <div class="Space">
    <CommonConfirmModal :ref="ConfirmModalRef" :config="config" />
    <PagedTable :data="data" :ref="PagedTableRef" :dataColumns="SpaceColumns" />
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  data() {
    return {
      data: [],
      pageIndex: 0,
      pageSize: 10,
      config: {
        icon: "md-send",
        color: "#2D8CF0",
        title: "该分组下的所有账号都将发布朋友圈",
        operation: "发布（朋友圈模板于素材管理设置）",
        btnType: "success",
        btnIcon: "md-paper-plane",
        btnText: "确定",
        flag: true,
        params: "sendFriend"
      },
      GroupData: [],
      PagedTableRef: "SpacePagedTable",
      ConfirmModalRef: "SpaceConfirmModal",
      SpaceColumns: [
        { width: 70, align: "center", title: "序号", key: "serialNumber" },
        { title: "分组ID", align: "center", key: "groupId" },
        { title: "分组名称", align: "center", key: "groupName" },
        { title: "创建时间", align: "center", key: "groupCreateDate" },
        {
          width: 200,
          title: "操作",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: { type: "info", icon: "md-send" },
                  on: {
                    click: () => {
                      const { groupId: group_id } = params.row
                      this.$refs[this.ConfirmModalRef].isShowConfirmModal = true
                      this.$refs[this.ConfirmModalRef].configParams = group_id
                    }
                  }
                },
                "发布朋友圈"
              )
            ])
          }
        }
      ]
    }
  },
  created() {
    this.allData()
    this.initData()
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
    },
    async initData() {
      this.data = []
      const { data } = await this.$http.get("/account/getAllGroup", {
        params: {
          user_id: this.user_id,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      data.forEach((item, index) => {
        this.data.push({
          serialNumber: index + 1,
          groupName: item.groupName,
          groupId: String(item.groupId),
          groupCreateDate: this.$options.filters.date(item.groupCreateDate)
        })
        this.GroupData.push({ label: item.groupName, value: item.groupId })
      })
    },
    async sendFriendSpace(params) {
      this.$refs[this.ConfirmModalRef].isShowConfirmModal = false
      const { msg } = await this.$http.post("/account/sendFriendCircle", {
        group_id: String(params)
      })
      this.$Message.info(msg)
    }
  }
}
</script>
