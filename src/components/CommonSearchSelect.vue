<template>
  <!-- 下拉框搜索复用组件 -->
  <div class="SearchSelect mr-30">
    <span class="title mr-10">{{ config.title }}</span>
    <Select
      transfer
      clearable
      filterable
      class="select"
      v-model="value"
      :placeholder="`请选择${config.info}`"
      :style="config.width ? `width:${config.width}` : 'width:200px;'"
    >
      <Option
        :key="option.value"
        :value="option.value"
        v-for="option in config.options"
        >{{ option.label }}</Option
      >
    </Select>
  </div>
</template>

<script>
export default {
  name: "SearchSelect",
  props: { config: Object },
  data() {
    return {
      value: ""
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
    margin-top: 1px;
    ::v-deep .ivu-select-input {
      padding-bottom: 5px;
    }
  }
}
</style>
