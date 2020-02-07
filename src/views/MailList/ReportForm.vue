<template>
  <PagedTable :data="data" ref="ReportPagedTable" :dataColumns="Columns" />
</template>

<script>
export default {
  data() {
    return {
      data: [],
      Columns: [
        { width: 70, align: "center", title: "序号", key: "serialNumber" },
        { title: "群聊ID", align: "center", key: "ID" },
        { title: "群聊链接", align: "center", key: "Url" },
        { title: "群内人数", align: "center", key: "memberCount" }
      ]
    }
  },
  created() {
    this._initData()
  },
  methods: {
    async _initData() {
      this.data = []
      const data = await this.$http.get("/groupView")
      data.forEach((item, index) => {
        for (const key in item) {
          this.data.push({
            serialNumber: index + 1,
            ID: key.split("@")[0],
            Url: key.split("###")[1],
            memberCount: item[key].memberCount
          })
        }
      })
    }
  }
}
</script>
