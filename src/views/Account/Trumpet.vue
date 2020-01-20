<template>
  <div class="Trumpet">
    <RangeDatePicker />
    <Divider dashed />
    <SearchInput :infos="['任务名称']" />
    <Divider dashed />
    <ButtonList :buttonListInfos="TrumpetButtonListInfos" />
    <Divider dashed />
    <PagedTable ref="TrumpetPagedTable" :dataColumns="TrumpetColumns" />
    <TrumpetCreateTaskModal
      :options="cityList"
      :config="createTaskConfig"
      ref="TrumpetCreateTaskModal"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      cityList: [
        { value: "New York", label: "New York" },
        { value: "London", label: "London" },
        { value: "Sydney", label: "Sydney" },
        { value: "Ottawa", label: "Ottawa" },
        { value: "Paris", label: "Paris" },
        { value: "Canberra", label: "Canberra" }
      ],
      createTaskConfig: {
        label: "添加方式",
        reallyText: "两两互加",
        fakeText: "添加号码"
      },
      TrumpetColumns: [
        { width: 60, align: "center", type: "selection" },
        { width: 70, align: "center", title: "序号", key: "serialNumber" },
        { width: 120, align: "center", title: "任务编号", key: "taskNumber" },
        { align: "center", width: 150, title: "任务名称", key: "taskName" },
        {
          width: 150,
          key: "addWay",
          align: "center",
          title: "添加方式"
        },
        {
          width: 170,
          align: "center",
          title: "互聊时间",
          key: "interchatTime"
        },
        {
          width: 120,
          align: "center",
          title: "互聊间隔",
          key: "interchatInterval"
        },
        {
          width: 120,
          align: "center",
          title: "自动聊天",
          key: "automaticChat",
          render: (h, params) => {
            const row = params.row
            return h("i-switch", {
              props: { size: "large", value: row.automaticChat },
              scopedSlots: {
                open: () => h("span", "打开"),
                close: () => h("span", "关闭")
              }
            })
          }
        },
        { width: 120, align: "center", title: "配对数", key: "pairNumber" },
        {
          width: 120,
          align: "center",
          title: "成功请求数",
          key: "successRequest"
        },
        {
          width: 120,
          align: "center",
          title: "失败请求数",
          key: "errorRequest"
        },
        { width: 120, key: "adopt", title: "通过数", align: "center" },
        {
          width: 260,
          title: "操作",
          fixed: "right",
          align: "center",
          render: (h /*params*/) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small",
                    icon: "md-eye"
                  },
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
                    type: "primary",
                    size: "small",
                    icon: "md-create"
                  },
                  style: { marginRight: "5px" },
                  on: {
                    click: () => {}
                  }
                },
                "修改"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "warning",
                    size: "small",
                    icon: "md-remove-circle"
                  },
                  on: {
                    click: () => {}
                  }
                },
                "取消"
              )
            ])
          }
        }
      ],
      TrumpetButtonListInfos: [
        { type: "primary", icon: "md-add", name: "创建任务" }
      ]
    }
  },
  created() {
    this.getData()
  },
  mounted() {
    this.$refs["TrumpetPagedTable"].tableData = this.data
  },
  methods: {
    async getData() {
      const { data } = await this.$http.get("trumpet")
      const res = data.data
      const length = res.length
      for (let i = 0; i < length; i++) {
        this.data.push({
          serialNumber: res[i].serialNumber,
          taskNumber: res[i].taskNumber,
          taskName: res[i].taskName,
          addWay: res[i].addWay,
          interchatTime: res[i].interchatTime,
          interchatInterval: res[i].interchatInterval,
          automaticChat: res[i].automaticChat,
          pairNumber: res[i].pairNumber,
          successRequest: res[i].successRequest,
          errorRequest: res[i].errorRequest,
          adopt: res[i].adopt
        })
      }
      return this.data
    },
    createTask() {
      this.$refs["TrumpetCreateTaskModal"].isShowCreateModal = true
    }
  }
}
</script>
