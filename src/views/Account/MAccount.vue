<template>
  <div class="m-account">
    <div class="search">
      <div class="mr-30">
        <span class="span mr-10">账号分组</span>
        <Select
          class="select"
          v-model="model10"
          filterable
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
        <span class="span mr-10">微信状态</span>
        <Select
          class="select"
          v-model="model10"
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
      <Input class="input mr-10" clearable placeholder="请输入分组名称">
        <span slot="prepend">微信登录名</span>
      </Input>
      <Input class="input mr-10" clearable placeholder="请输入分组名称">
        <span slot="prepend">代理IP</span>
      </Input>
      <Button type="primary" shape="circle" icon="ios-search" />
    </div>
    <Divider />
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
      model10: []
    }
  }
}
</script>

<style lang="scss" scoped>
.m-account {
  .search {
    .input {
      width: 250px;
    }
    div {
      width: 250px;
      float: left;
      .span {
        width: 60px;
        height: 32px;
        line-height: 32px;
        margin-top: 1px;
        float: left;
      }
      .select {
        width: 180px;
        margin-top: 1px;
        z-index: 999;
      }
    }
  }
}
</style>
