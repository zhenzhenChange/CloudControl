<template>
  <!-- 账号资料设置 -->
  <div class="SAccount">
    <Button type="info" icon="md-refresh" @click="refreshData">刷新数据</Button>
    <Modal
      width="450"
      :closable="false"
      :mask-closable="false"
      v-model="isShowModfiyModal"
      class-name="vertical-center-modal"
    >
      <p slot="header">
        <Icon
          color="#42BEF6"
          type="md-create"
          class="mr-5 header-icon"
        />为该分组下的所有账号修改资料
      </p>
      <div class="mb-10 config">
        <span class="mr-10">修改资料配置</span>
        <RadioGroup v-model="isUpdateType">
          <Radio label="修改密码"></Radio>
          <Radio label="修改昵称"></Radio>
          <Radio label="修改头像"></Radio>
        </RadioGroup>
      </div>
      <div slot="footer">
        <Button icon="md-remove-circle" @click="isShowModfiyModal = false">取消</Button>
        <Button type="success" icon="md-checkmark" @click="modify">确定</Button>
      </div>
    </Modal>
    <PagedTable :data="data" :ref="PagedTableRef" :dataColumns="SAccountColumns" />
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
      currentGroupID: "",
      isUpdateType: "修改密码",
      isShowModfiyModal: false,
      PagedTableRef: "SAccountPagedTable",
      SAccountColumns: [
        { width: 70, align: "center", title: "序号", key: "serialNumber" },
        { align: "center", title: "分组ID", key: "groupId" },
        { align: "center", title: "分组名称", key: "groupName" },
        { align: "center", title: "创建时间", key: "groupCreateDate" },
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
                  props: { type: "info", icon: "md-create" },
                  on: {
                    click: () => {
                      const { groupId } = params.row
                      this.isShowModfiyModal = true
                      this.currentGroupID = groupId
                    }
                  }
                },
                "修改资料"
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
      })
    },
    async modify() {
      this.isShowModfiyModal = false
      const group_id = this.currentGroupID
      const isUpdateType = this.isUpdateType
      const change_type = isUpdateType === "修改密码" ? 2 : isUpdateType === "修改昵称" ? 0 : 1

      const args = { type: 0, wxids: [], change_type, user_id: this.user_id, group_id }

      const { msg, data } = await this.$http.post("/account/changeDatum", args)
      if (data) this.$Message.info(`成功修改${data.success.length}个，失败${data.error.length}个`)
      if (msg === "全部失败") this.$Message.info(msg)
      this.initData()
    },
    refreshData() {
      this.initData()
    }
  }
}
</script>

<style lang="scss" scoped>
.config {
  .ivu-radio-group {
    vertical-align: bottom;
  }
}
</style>
