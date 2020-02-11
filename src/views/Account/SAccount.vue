<template>
  <!-- 账号资料设置 -->
  <div class="SAccount">
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
import { mapState } from "vuex"
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
    this.allData()
    this.initData()
  },
  computed: {
    ...mapState({ user_id: state => state.user_id })
  },
  methods: {
    async allData() {
      const params = { user_id: this.user_id }
      const { data } = await this.$http.get("/account/getAllGroup", { params })
      this.$refs[this.PagedTableRef].total = data.length
    },
    async initData() {
      this.data = []
      const params = { user_id: this.user_id, pageIndex: this.pageIndex, pageSize: this.pageSize }
      const { data } = await this.$http.get("/account/getAllGroup", { params })
      data.forEach(async (item, index) => {
        const group_id = String(item.groupId)
        let total = await this.$http.post("/account/getAccount", { group_id })
        this.data.push({
          serialNumber: index + 1,
          groupName: item.groupName,
          groupId: String(item.groupId),
          groupCreateDate: this.$options.filters.date(item.groupCreateDate),
          total: total.data.length
        })
      })
    },
    async modify() {
      this.isShowModfiyModal = false
      const isUpdateType = this.isUpdateType
      const change_type = isUpdateType === "修改密码" ? 2 : isUpdateType === "修改昵称" ? 0 : 1
      const group_id = this.currentGroupID
      const args = { type: 0, wxids: [], change_type, user_id: this.user_id, group_id }
      const { msg, data } = await this.$http.post("/account/changeDatum", args)
      if (data) {
        this.$Message.info(`成功修改${data.success.length}个，失败${data.error.length}个`)
      }
      if (msg === "全部失败") {
        this.$Message.info(msg)
      }
      this.allData()
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
