<template>
  <!-- 下拉框搜索复用组件 -->
  <div class="SearchSelect mr-30">
    <span class="title mr-10">{{ title }}</span>
    <Select
      transfer
      clearable
      filterable
      class="select"
      :placeholder="`请选择${info}`"
    >
      <Option
        :key="option.value"
        :value="option.value"
        v-for="option in options"
        >{{ option.label }}</Option
      >
    </Select>
  </div>
</template>

<script>
export default {
  name: "SearchSelect",
  props: {
    info: String,
    title: String,
    options: Array
  }
}
</script>

<style lang="scss" scoped>
.SearchSelect {
  .title {
    float: left;
    height: 32px;
    line-height: 32px;
  }
  .select {
    width: 200px;
    margin-top: 1px;
    ::v-deep .ivu-select-input {
      padding-bottom: 5px;
    }
  }
}
</style>
