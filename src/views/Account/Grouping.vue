<template>
  <div class="grouping">
    <div class="search">
      <Input class="input" clearable placeholder="请输入分组名称">
        <span slot="prepend">分组名称</span>
      </Input>
      <Button type="primary" shape="circle" icon="ios-search" />
    </div>
    <Divider dashed />
    <div class="action">
      <Button
        type="error"
        icon="md-trash"
        @click="deleteGroupModal = true"
        class="mr-10"
        >删除</Button
      >
      <Button type="primary" icon="md-add-circle" @click="addGroupModal = true"
        >添加</Button
      >
      <Modal
        width="330"
        title="添加分组"
        :mask-closable="false"
        v-model="addGroupModal"
        class-name="vertical-center-modal"
      >
        <Input class="mb-10" clearable placeholder="请输入分组名称">
          <span slot="prepend">分组名称</span>
        </Input>
        <Input clearable placeholder="请输入排序数字">
          <span slot="prepend">排序数字</span>
        </Input>
      </Modal>
      <Modal
        width="330"
        :mask-closable="false"
        v-model="deleteGroupModal"
        class-name="vertical-center-modal"
      >
        <p slot="header" style="color:red;">
          <Icon type="md-warning"></Icon>
          <span>删除分组</span>
        </p>
        <div style="text-align:center">
          <p>确定要删除这XX条数据吗？</p>
        </div>
        <div slot="footer">
          <Button type="error" icon="md-trash">删除</Button>
          <Button>取消</Button>
        </div>
      </Modal>
    </div>
    <Divider dashed />
    <div class="table">
      <Table :data="groupData" :columns="groupColumns" stripe border></Table>
      <div class="page">
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
                ? "忙碌"
                : row.groupName === 2
                ? "在线"
                : "封禁"
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
          render: (h /*params*/) => {
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
                      this.addGroupModal = true
                      // this.show(params.index)
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
                      this.deleteGroupModal = true
                      // this.remove(params.index)
                    }
                  }
                },
                "删除"
              )
            ])
          }
        }
      ],
      addGroupModal: false,
      deleteGroupModal: false
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
  .search {
    .input {
      width: 250px;
      margin-right: 10px;
      float: left;
    }
  }
  .table {
    .page {
      margin: 10px;
      overflow: hidden;
      div {
        float: left;
      }
    }
  }
}
</style>
