<template>
  <div class="Space">
    <ButtonList :buttonListInfos="buttonListInfos" />
    <CommonSelectModal :ref="selectRef" :config="selectModalConfig" />
    <Divider dashed />
    <PagedTable :data="data" :ref="pagedTableRef" :dataColumns="SpaceColumns" />
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
      selectRef: "SpaceSelectModal",
      pagedTableRef: "SpacePagedTable",
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
      const res = await this.$http.get("/account/getAllGroup", {
        params: { user_id: this.user_id }
      })
      this.data = []
      res.forEach(item => {
        this.data.push({
          groupName: item.groupName,
          groupId: item.groupId,
          groupCreateDate: this.$options.filters.date(item.groupCreateDate)
        })
        this.groups.push({ label: item.groupName, value: item.groupId })
      })
    }
  }
}
</script>
