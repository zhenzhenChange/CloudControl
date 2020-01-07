<template>
  <div class="SearchSelect mr-30">
    <span class="title mr-10">账号分组</span>
    <Select
      class="select"
      filterable
      clearable
      transfer
      placeholder="请选择分组"
    >
      <Option v-for="item in cityList" :value="item.value" :key="item.value">{{
        item.label
      }}</Option>
    </Select>
  </div>
</template>

<script>
export default {
  name: "SearchSelect",
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
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.SearchSelect {
  float: left;
  .title {
    float: left;
    height: 32px;
    line-height: 32px;
  }
  .select {
    width: 200px;
    margin-top: 1px;
    float: left;
  }
}
</style>
