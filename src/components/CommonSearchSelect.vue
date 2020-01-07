<template>
  <!-- 下拉框搜索复用组件 -->
  <div class="SearchSelect mr-30">
    <span class="title mr-10">{{ title }}</span>
    <Select
      class="select"
      filterable
      clearable
      transfer
      :placeholder="`请选择${info}`"
    >
      <Option
        v-for="option in options"
        :value="option.value"
        :key="option.value"
        >{{ option.label }}</Option
      >
    </Select>
  </div>
</template>

<script>
export default {
  name: "SearchSelect",
  props: {
    title: String,
    info: String,
    options: Array
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
