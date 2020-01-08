<template>
  <div class="Space">
    <RangeDatePicker />
    <Divider dashed />
    <SearchSelect :title="'发布状态'" :info="'发布状态'" />
    <SearchInput :infos="['发布内容']" />
    <Divider />
    <ButtonList :buttonListInfos="CreateNewSpaceButtonInfo" />
    <Divider dashed />
    <PagedTable ref="SpacePagedTable" :dataColumns="SpaceColumns" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      CreateNewSpaceButtonInfo: [
        {
          type: "primary",
          icon: "md-add",
          name: "新建朋友圈"
        }
      ],
      SpaceColumns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "序号",
          width: 70,
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "发布账号",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "发布内容",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "发布状态",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "发布时间",
          align: "center",
          key: "mAccountNumber"
        }
      ]
    }
  },
  mounted() {
    this.$refs["SpacePagedTable"].tableData = this.mockTableData()
  },
  methods: {
    mockTableData() {
      let data = []
      for (let i = 0; i < 10; i++) {
        data.push({
          mAccountNumber: Math.floor(Math.random() * 100 + 1),
          mAccountSortNumber: Math.floor(Math.random() * 100 + 1)
        })
      }
      return data
    }
  }
}
</script>
