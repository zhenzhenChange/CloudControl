<template>
  <div class="Space">
    <CommonConfirmModal :ref="ConfirmModalRef" :config="config" />
    <Button type="info" icon="md-refresh" @click="refreshData">刷新数据</Button>
    <PagedTable :data="data" :ref="PagedTableRef" :dataColumns="SpaceColumns" />
  </div>
</template>

<script>
import { mapGetters } from "vuex"
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
        { align: "center", title: "组内账号总数", key: "total" },
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
    this.initData()
  },
  computed: {
    ...mapGetters(["user_id", "GroupDataTotal"])
  },
  methods: {
    async initData() {
      this.data = []
      this.$nextTick(() => (this.$refs[this.PagedTableRef].total = Number(this.GroupDataTotal)))
      const params = {
        userId: this.user_id,
        size: Number(this.pageSize),
        currentPage: Number(this.pageIndex) + 1
      }
      const data = await this.$http.get("/account/getAllGroup", { params })
      data.forEach(async (item, index) => {
        this.data.push({
          serialNumber: index + 1,
          groupName: item.tbGroupEntity.groupName,
          groupId: String(item.tbGroupEntity.groupId),
          groupCreateDate: this.$options.filters.date(item.tbGroupEntity.groupCreateDate),
          total: item.accountCount
        })
        this.GroupData.push({
          label: item.tbGroupEntity.groupName,
          value: item.tbGroupEntity.groupId
        })
      })
    },
    async sendFriendSpace(params) {
      this.$refs[this.ConfirmModalRef].isShowConfirmModal = false
      const group_id = String(params)
      const { msg } = await this.$http.post("/account/sendFriendCircle", { group_id })
      this.$Message.info(msg)
    },
    refreshData() {
      this.initData()
    }
  }
}
</script>
