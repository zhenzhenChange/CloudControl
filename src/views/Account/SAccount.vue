<template>
  <div class="s-account">
    <div class="search">
      <div class="mr-30">
        <span class="title mr-10">所属分组</span>
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
      <Button type="primary" shape="circle" icon="ios-search" />
    </div>
    <Divider dashed />
    <div class="action">
      <Button
        type="success"
        icon="md-settings"
        @click="deleteAccountModal = true"
        class="mr-10"
        >好友请求设置</Button
      >
      <Button
        type="success"
        icon="md-settings"
        @click="deleteAccountModal = true"
        class="mr-10"
        >自动回复设置</Button
      ><Button
        type="success"
        icon="md-settings"
        @click="deleteAccountModal = true"
        class="mr-10"
        >自动回复模板设置</Button
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
.s-account {
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
