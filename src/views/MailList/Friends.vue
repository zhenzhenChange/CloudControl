<template>
  <div class="Friends">
    <RangeDatePicker />
    <Divider dashed />
    <SearchSelect :title="'账号分组'" :info="'分组'" :options="cityList" />
    <SearchSelect :title="'所属账号'" :info="'账号'" :options="cityList" />
    <SearchSelect :title="'所属标签'" :info="'标签'" :options="cityList" />
    <SearchInput :infos="['微信登录名']" />
    <Divider dashed />
    <ButtonList :buttonListInfos="confirmButtonListInfos" />
    <Divider class="float-left" dashed />
    <PagedTable ref="FriendsPagedTable" :dataColumns="FriendsColumns" />
  </div>
</template>

<script>
export default {
  data() {
    return {
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
      FriendsColumns: [
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
          title: "好友昵称",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "好友微信号",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "所属账号",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "所属标签",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "被拉群次数",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "性别",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "签名",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "城市",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "添加来源",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "添加时间",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "操作",
          key: "groupAction",
          width: 250,
          align: "center",
          render: (h /*params*/) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small",
                    icon: "md-trash"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      // this.show(params.index)
                    }
                  }
                },
                "删除"
              )
            ])
          }
        }
      ],
      confirmButtonListInfos: [
        {
          type: "error",
          icon: "md-trash",
          name: "删除"
        },
        {
          type: "success",
          icon: "md-pricetags",
          name: "打标签"
        }
      ]
    }
  },
  mounted() {
    this.$refs["FriendsPagedTable"].tableData = this.mockTableData()
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
