<template>
  <div class="PullGroup">
    <SearchInput :infos="['微信群']" />
    <Divider dashed />
    <ButtonList :buttonListInfos="buttonListInfos" />
    <Divider />
    <PagedTable
      :data="data"
      :ref="PagedTableRef"
      :dataColumns="PullGroupColumns"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      PagedTableRef: "PullGroupPagedTable",
      buttonListInfos: [
        { id: "pull", type: "primary", icon: "md-add", name: "邀请进群" },
        { id: "create-p", type: "primary", icon: "md-add", name: "创建群聊" }
      ],
      PullGroupColumns: [
        { width: 60, align: "center", type: "selection" },
        { width: 70, align: "center", title: "序号", key: "mAccountNumber" },
        { align: "center", title: "订单ID", key: "mAccountNumber" },
        { align: "center", title: "任务名称", key: "mAccountNumber" },
        { align: "center", title: "微信数", key: "mAccountNumber" },
        { align: "center", title: "拉群标签", key: "mAccountNumber" },
        { align: "center", title: "拉群类型", key: "mAccountNumber" },
        { align: "center", title: "群最终人数", key: "mAccountNumber" },
        { align: "center", title: "总拉群数", key: "mAccountNumber" },
        { align: "center", title: "合格群数", key: "mAccountNumber" },
        { align: "center", title: "不合格群数", key: "mAccountNumber" },
        { align: "center", title: "创建时间", key: "mAccountNumber" },
        { align: "center", title: "结束时间", key: "mAccountNumber" },
        { align: "center", title: "当前状态", key: "mAccountNumber" },
        {
          width: 250,
          align: "center",
          title: "操作",
          render: (h /*params*/) => {
            return h("div", [
              h(
                "Button",
                {
                  props: { type: "primary", size: "small", icon: "md-eye" },
                  style: { marginRight: "5px" },
                  on: {
                    click: () => {}
                  }
                },
                "查看"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small",
                    icon: "md-aperture"
                  },
                  style: { marginRight: "5px" },
                  on: {
                    click: () => {}
                  }
                },
                "运行"
              )
            ])
          }
        }
      ]
    }
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
