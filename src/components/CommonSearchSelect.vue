<template>
  <div class="SearchSelect mr-30">
    <span class="title mr-10">{{ title }}</span>
    <Select
      class="select"
      filterable
      clearable
      transfer
      :placeholder="`请选择${title}`"
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
  props: {
    title: String
  },
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
    ::v-deep .ivu-select-input {
      padding-bottom: 5px;
    }
  }
}
</style>
