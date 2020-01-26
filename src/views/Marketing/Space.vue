<template>
  <div class="Space">
    <!-- <ButtonList :buttonListInfos="buttonListInfos" /> -->
    <CommonSelectModal :ref="SelectModalRef" :config="selectModalConfig" />
    <!-- <Divider dashed /> -->
    <PagedTable :data="data" :ref="PagedTableRef" :dataColumns="SpaceColumns" />
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  data() {
    return {
      data: [],
      groups: [],
      selectModalConfig: {},
      SelectModalRef: "SpaceSelectModal",
      PagedTableRef: "SpacePagedTable",
      buttonListInfos: [
        { id: "newSpace", name: "朋友圈发布", icon: "md-send", type: "primary" }
      ],
      SpaceColumns: [
        { width: 70, align: "center", title: "序号", key: "serialNumber" },
        {
          title: "分组名称",
          align: "center",
          key: "groupName"
        },
        {
          title: "分组ID",
          align: "center",
          key: "groupId"
        },
        {
          title: "创建时间",
          align: "center",
          key: "groupCreateDate"
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
                  props: { type: "primary", icon: "md-send" },
                  style: { marginRight: "5px" },
                  on: {
                    click: () => {
                      this.$refs["MailSet"].isShowConfirmModal = true
                      this.$refs["MailSet"].configParams = params.row
                    }
                  }
                },
                "朋友圈发布"
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
    ...mapState({ user_id: state => state.user_id })
  },
  methods: {
    async initData() {
      const { data } = await this.$http.get("/account/getAllGroup", {
        params: { user_id: this.user_id }
      })
      this.data = []
      data.forEach((item, index) => {
        this.data.push({
          serialNumber: index + 1,
          groupName: item.groupName,
          groupId: item.groupId,
          groupCreateDate: this.$options.filters.date(item.groupCreateDate)
        })
        this.groups.push({ label: item.groupName, value: item.groupId })
      })
    },
    async sendFriendSpace(params) {
      await this.$http.post("/account/sendFriendCircle", {
        group_id: String(params),
        user_id: this.user_id
      })
    }
  }
}
</script>
