<template>
  <div class="grouping">
    <div class="grouping-search">
      <Input class="grouping-search-input" placeholder="请输入分组名称">
        <span slot="prepend">分组名称</span>
      </Input>
      <Button type="primary" shape="circle" icon="ios-search" />
    </div>
    <Divider />
    <div class="grouping-groupAction">
      <Button type="error" icon="md-trash" class="mr-10">删除</Button>
      <Button type="primary" icon="md-add-circle">添加</Button>
    </div>
    <Divider />
    <div class="grouping-table">
      <Table :data="groupData" :columns="groupColumns" stripe border></Table>
      <div class="grouping-table-page">
        <div>
          <Page
            :total="100"
            show-total
            show-elevator
            show-sizer
            :current="3"
            @on-change="changePage"
          ></Page>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      groupData: this.mockTableData(),
      groupColumns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "序号",
          key: "groupNumber"
        },
        {
          title: "分组名称",
          key: "groupName",
          render: (h, params) => {
            const row = params.row
            const color =
              row.groupName === 1
                ? "primary"
                : row.groupName === 2
                ? "success"
                : "error"
            const text =
              row.groupName === 1
                ? "Working"
                : row.groupName === 2
                ? "Success"
                : "Fail"
            return h(
              "Tag",
              {
                props: {
                  type: "dot",
                  color: color
                }
              },
              text
            )
          }
        },
        {
          title: "排序数字",
          key: "groupSortNumber",
          sortable: true
        },
        {
          title: "创建时间",
          key: "groupCreateTime",
          sortable: true,
          render: (h, params) => {
            return h(
              "div",
              this.$options.filters.date(
                this.groupData[params.index].groupCreateTime
              )
            )
          }
        },
        {
          title: "操作",
          key: "groupAction",
          width: 250,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small",
                    icon: "md-create"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.show(params.index)
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small",
                    icon: "md-trash"
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                },
                "删除"
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
          groupNumber: Math.floor(Math.random() * 100 + 1),
          groupName: Math.floor(Math.random() * 3 + 1),
          groupSortNumber: Math.floor(Math.random() * 100 + 1),
          groupCreateTime: new Date()
        })
      }
      return data
    },
    changePage() {
      this.groupData = this.mockTableData()
    }
  }
}
</script>

<style lang="scss" scoped>
.grouping {
  .grouping-search {
    .grouping-search-input {
      width: 250px;
      margin-right: 10px;
      float: left;
    }
  }
  .grouping-table {
    .grouping-table-page {
      margin: 10px;
      overflow: hidden;
      div {
        float: left;
      }
    }
  }
}
</style>
