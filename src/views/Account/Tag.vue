<template>
  <div class="tag">
    <div class="search">
      <Input class="mr-10" clearable placeholder="请输入标签名称">
        <span slot="prepend">标签名称</span>
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
    </div>
    <Divider dashed />
    <div class="table">
      <Table
        :data="mAccountData"
        :columns="mAccountColumns"
        stripe
        border
      ></Table>
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
      mAccountData: this.mockTableData(),
      mAccountColumns: [
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
          title: "标签名称",
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
      model10: []
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
    },
    changePage() {
      this.mAccountData = this.mockTableData()
    }
  }
}
</script>

<style lang="scss" scoped>
.tag {
  .search {
    div {
      width: 250px;
      float: left;
      .title {
        width: 60px;
        height: 32px;
        line-height: 32px;
        margin-top: 1px;
        float: left;
      }
      .select {
        width: 180px;
        margin-top: 1px;
      }
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
