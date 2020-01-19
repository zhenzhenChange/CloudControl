<template>
  <!-- 输入框搜索复用组件 -->
  <div class="SearchInput">
    <Input
      clearable
      :key="index"
      class="mr-10"
      :placeholder="`请输入${info}`"
      v-for="(info, index) in infos"
    >
      <span slot="prepend">{{ info }}</span>
    </Input>
    <Button type="primary" shape="circle" icon="ios-search" />
  </div>
</template>

<script>
export default {
  name: "SearchInput",
  props: {
    infos: Array
  }
}
</script>

<style lang="scss" scoped>
.SearchInput {
  div {
    float: left;
    width: 250px;
    .title {
      float: left;
      width: 60px;
      height: 32px;
      margin-top: 1px;
      line-height: 32px;
    }
    .select {
      width: 180px;
      margin-top: 1px;
    }
  }
}
</style>
