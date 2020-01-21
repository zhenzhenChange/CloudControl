<template>
  <!-- 被动请求 -->
  <div class="Passive">
    <RangeDatePicker />
    <Divider dashed />
    <SearchSelect :info="'分组'" :title="'账号分组'" :options="cityList" />
    <SearchSelect :info="'账号'" :title="'所属账号'" :options="cityList" />
    <SearchSelect :info="'标签'" :title="'所属标签'" :options="cityList" />
    <SearchSelect :info="'状态'" :title="'通过状态'" :options="cityList" />
    <SearchInput :infos="['微信登录名']" />
    <Divider dashed />
    <ButtonList :listBatch="batch" :buttonListInfos="confirmButtonListInfos" />
    <Divider class="float-left" dashed />
    <PagedTable ref="PassivePagedTable" :dataColumns="PassiveColumns" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      batch: true,
      radio: false,
      selectionData: [],
      cityList: [
        { value: "New York", label: "New York" },
        { value: "London", label: "London" },
        { value: "Sydney", label: "Sydney" },
        { value: "Ottawa", label: "Ottawa" },
        { value: "Paris", label: "Paris" },
        { value: "Canberra", label: "Canberra" }
      ],
      confirmButtonListInfos: [
        { type: "error", icon: "md-trash", name: "删除" },
        { type: "success", icon: "md-done-all", name: "通过请求" }
      ],
      PassiveColumns: [
        { width: 60, align: "center", type: "selection" },
        { width: 70, align: "center", title: "序号", key: "serialNumber" },
        {
          width: 120,
          align: "center",
          title: "所属账号",
          key: "subordinateAccount"
        },
        {
          width: 120,
          align: "center",
          tooltip: true,
          title: "好友昵称",
          key: "friendName"
        },
        {
          width: 120,
          tooltip: true,
          align: "center",
          title: "好友微信号",
          key: "friendWxId"
        },
        {
          width: 120,
          align: "center",
          title: "性别",
          key: "sex",
          render: (h, params) => {
            const row = params.row
            const color = row.sex ? "success" : "magenta"
            const text = row.sex ? "男" : "女"
            return h("Tag", { props: { type: "border", color } }, text)
          }
        },
        {
          width: 150,
          tooltip: true,
          align: "center",
          title: "签名",
          key: "autograph"
        },
        {
          width: 120,
          tooltip: true,
          align: "center",
          title: "城市",
          key: "city"
        },
        {
          width: 120,
          align: "center",
          tooltip: true,
          title: "添加来源",
          key: "addSource"
        },
        {
          width: 150,
          tooltip: true,
          align: "center",
          title: "招呼语",
          key: "aCall"
        },
        {
          width: 120,
          align: "center",
          title: "状态",
          key: "state",
          render: (h, params) => {
            const row = params.row
            const color = row.state ? "success" : "error"
            const text = row.state ? "通过" : "拒绝"
            return h("Tag", { props: { type: "dot", color } }, text)
          }
        },
        { width: 170, align: "center", title: "添加时间", key: "createTime" },
        {
          width: 230,
          title: "操作",
          fixed: "right",
          align: "center",
          render: (h /*params*/) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    size: "small",
                    type: "error",
                    icon: "md-trash",
                    disabled: this.radio
                  },
                  style: { marginRight: "5px" },
                  on: {
                    click: () => {}
                  }
                },
                "删除"
              ),
              h(
                "Button",
                {
                  props: {
                    size: "small",
                    type: "success",
                    icon: "md-checkmark",
                    disabled: this.radio
                  },
                  style: { marginRight: "5px" },
                  on: {
                    click: () => {}
                  }
                },
                "通过请求"
              )
            ])
          }
        }
      ]
    }
  },
  created() {
    this.getData()
  },
  mounted() {
    this.$refs["PassivePagedTable"].tableData = this.data
  },
  methods: {
    async getData() {
      const { data } = await this.$http.getPassive()
      const length = data.length
      for (let i = 0; i < length; i++) {
        this.data.push({
          serialNumber: data[i].serialNumber,
          subordinateAccount: data[i].subordinateAccount,
          friendName: data[i].friendName,
          friendWxId: data[i].friendWxId,
          sex: data[i].sex,
          autograph: data[i].autograph,
          city: data[i].city,
          addSource: data[i].addSource,
          aCall: data[i].aCall,
          state: data[i].state,
          createTime: data[i].createTime
        })
      }
      return this.data
    }
  }
}
</script>
