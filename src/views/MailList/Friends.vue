<template>
  <div class="Friends">
    <ButtonList :buttonListInfos="buttonListInfos" />
    <Divider class="float-left" dashed />
    <PagedTable
      :data="data"
      :ref="PagedTableRef"
      :dataColumns="FriendsColumns"
    />
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  data() {
    return {
      data: [],
      PagedTableRef: "FriendsPagedTable",
      FriendsColumns: [
        { width: 70, align: "center", title: "序号", key: "serialNumber" },
        { align: "center", title: "标签名称", key: "tagName" },
        { align: "center", title: "标签ID", key: "tagId" },
        {
          sortable: true,
          align: "center",
          title: "创建时间",
          key: "tagCreateDate"
        },
        {
          width: 400,
          title: "操作",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: { type: "warning", icon: "md-send" },
                  style: { marginRight: "5px" },
                  on: {
                    click: () => {
                      this.$refs["MailSet"].isShowConfirmModal = true
                      this.$refs["MailSet"].configParams = params.row
                    }
                  }
                },
                "发送添加好友请求"
              ),
              h(
                "Button",
                {
                  props: { type: "info", icon: "md-paper-plane" },
                  style: { marginRight: "5px" },
                  on: {
                    click: () => {
                      this.$refs["MailSet"].isShowConfirmModal = true
                      this.$refs["MailSet"].configParams = params.row
                    }
                  }
                },
                "群发好友"
              )
            ])
          }
        }
      ],
      buttonListInfos: [
        {
          id: "addByAcc",
          type: "primary",
          icon: "md-person-add",
          name: "单个账号添加"
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
      this.data = []
      const { data } = await this.$http.get("/account/getAllTag", {
        params: { user_id: this.user_id }
      })
      data.forEach((item, index) => {
        this.data.push({
          serialNumber: index + 1,
          tagName: item.tagName,
          tagId: item.tagId,
          tagCreateDate: this.$options.filters.date(item.tagCreateDate)
        })
      })
    }
  }
}
</script>
