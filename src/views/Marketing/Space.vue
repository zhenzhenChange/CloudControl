<template>
  <div class="Space">
    <ButtonList :buttonListInfos="buttonListInfos" />
    <CommonSelectModal :ref="SelectModalRef" :config="selectModalConfig" />
    <Divider dashed />
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
        {
          title: "发布账号",
          align: "center",
          key: "groupName"
        },
        {
          title: "发布内容",
          align: "center",
          key: "groupId"
        },
        {
          title: "发布时间",
          align: "center",
          key: "groupCreateDate"
        }
      ]
    }
  },
  created() {
    this.getData()
  },
  computed: {
    ...mapState({ user_id: state => state.user_id })
  },
  methods: {
    async getData() {
      const { data } = await this.$http.get("/account/getAllGroup", {
        params: { user_id: this.user_id }
      })
      this.data = []
      data.forEach(item => {
        this.data.push({
          groupName: item.groupName,
          groupId: item.groupId,
          groupCreateDate: this.$options.filters.date(item.groupCreateDate)
        })
        this.groups.push({ label: item.groupName, value: item.groupId })
      })
    },
    async sendFriendSpace(params) {
      const { data } = await this.$http.post("/account/sendFriendCircle", {
        group_id: String(params),
        user_id: this.user_id
      })
      console.log(data)
    }
  }
}
</script>
