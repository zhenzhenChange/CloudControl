<template>
  <div class="m-account">
    <div class="search">
      <div class="mr-30">
        <span class="title mr-10">账号分组</span>
        <Select
          class="select"
          v-model="model10"
          filterable
          clearable
          transfer
          placeholder="请选择分组"
        >
          <Option
            v-for="item in cityList"
            :value="item.value"
            :key="item.value"
            >{{ item.label }}</Option
          >
        </Select>
      </div>
      <div class="mr-10">
        <span class="title mr-10">微信状态</span>
        <Select
          class="select"
          v-model="model10"
          clearable
          transfer
          filterable
          placeholder="请选择在线状态"
        >
          <Option
            v-for="item in cityList"
            :value="item.value"
            :key="item.value"
            >{{ item.label }}</Option
          >
        </Select>
      </div>
      <Input class="mr-10" clearable placeholder="请输入微信登录名">
        <span slot="prepend">微信登录名</span>
      </Input>
      <Input class="mr-10" clearable placeholder="请输入代理IP">
        <span slot="prepend">代理IP</span>
      </Input>
      <Button type="primary" shape="circle" icon="ios-search" />
    </div>
    <Divider dashed />
    <div class="action">
      <Button
        type="error"
        icon="md-trash"
        @click="deleteAccountModal = true"
        class="mr-10"
        >删除</Button
      >
      <Button
        type="primary"
        icon="md-add-circle"
        class="mr-10"
        @click="addAccountModal = true"
        >添加</Button
      >
      <Button
        type="warning"
        icon="md-trending-up"
        @click="deleteAccountModal = true"
        class="mr-10"
        >一键上线</Button
      >
      <Button
        type="warning"
        icon="md-trending-down"
        class="mr-10"
        @click="addAccountModal = true"
        >一键下线</Button
      >
      <Button
        type="info"
        icon="md-create"
        @click="deleteAccountModal = true"
        class="mr-10"
        >修改分组</Button
      >
      <Button
        type="info"
        icon="md-create"
        class="mr-10"
        @click="addAccountModal = true"
        >修改资料</Button
      >
      <Button
        type="info"
        icon="md-create"
        @click="deleteAccountModal = true"
        class="mr-10"
        >修改头像</Button
      >
      <Button
        type="info"
        icon="md-create"
        class="mr-10"
        @click="addAccountModal = true"
        >修改昵称</Button
      >
      <Button
        type="info"
        icon="md-create"
        @click="deleteAccountModal = true"
        class="mr-10"
        >修改密码</Button
      >
      <Button
        type="info"
        icon="md-create"
        class="mr-10"
        @click="addAccountModal = true"
        >修改朋友圈封面</Button
      >
      <Divider />
      <Button
        type="success"
        icon="md-settings"
        @click="deleteAccountModal = true"
        class="mr-10"
        >设置朋友圈权限</Button
      >
      <Button
        type="success"
        icon="md-unlock"
        class="mr-10"
        @click="addAccountModal = true"
        >解锁改密码权限</Button
      >
      <Button
        type="success"
        icon="md-unlock"
        @click="deleteAccountModal = true"
        class="mr-10"
        >解锁改资料权限</Button
      >
      <Button type="success" icon="md-unlock" @click="addAccountModal = true"
        >解锁改头像权限</Button
      >
      <Modal
        width="330"
        title="添加分组"
        :mask-closable="false"
        v-model="addAccountModal"
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
        v-model="deleteAccountModal"
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
          title: "锁状态",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "账号状态",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "微信登录名",
          width: 110,
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "密码",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "昵称",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "WXID",
          width: 140,
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "微信号",
          align: "center",
          key: "mAccountSortNumber",
          sortable: true
        },
        {
          title: "签名",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "所属分组",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "性别",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "城市",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "设备类型",
          align: "center",
          key: "mAccountNumber"
        },
        {
          title: "操作",
          key: "mAccountAction",
          width: 250,
          align: "center",
          render: (h /*params*/) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "warning",
                    size: "small",
                    icon: "ios-trending-up"
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
                "上线"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small",
                    icon: "md-information-circle"
                  },
                  on: {
                    click: () => {
                      this.deleteGroupModal = true
                      // this.remove(params.index)
                    }
                  }
                },
                "操作日志"
              )
            ])
          }
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
      model10: [],
      addAccountModal: false,
      deleteAccountModal: false
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
.m-account {
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
