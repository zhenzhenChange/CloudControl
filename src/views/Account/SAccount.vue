<template>
  <div class="SAccount">
    <SearchSelect :title="'所属分组'" :options="cityList" :info="'分组'" />
    <SearchSelect :title="'微信状态'" :options="cityList" :info="'在线状态'" />
    <SearchInput :infos="['微信登录名']" />
    <Divider dashed />
    <ButtonList :buttonListInfos="setButtonListInfos" />
    <Divider dashed />
    <PagedTable ref="SAccountPagedTable" :dataColumns="SAccountColumns" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      SAccountColumns: [
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
          title: "微信账号",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "账号状态",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "是否需要认证",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "是否自动回复",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "自动回复模板",
          align: "center",
          key: "mAccountNumber"
        }
      ],
      cityList: [
        {
          value: "New York",
          label: "New York"
        },
        {
          value: "London",
          label: "London"
        },
        {
          value: "Sydney",
          label: "Sydney"
        },
        {
          value: "Ottawa",
          label: "Ottawa"
        },
        {
          value: "Paris",
          label: "Paris"
        },
        {
          value: "Canberra",
          label: "Canberra"
        }
      ],
      setButtonListInfos: [
        {
          type: "success",
          icon: "md-settings",
          name: "好友请求设置"
        },
        {
          type: "success",
          icon: "md-settings",
          name: "自动回复设置"
        },
        {
          type: "success",
          icon: "md-settings",
          name: "自动回复模板设置"
        }
      ]
    }
  },
  mounted() {
    this.$refs["SAccountPagedTable"].tableData = this.mockTableData()
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
