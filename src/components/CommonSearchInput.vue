<template>
  <!-- 输入框搜索复用组件 -->
  <div class="search">
    <Input
      clearable
      :key="index"
      class="mr-10"
      v-for="(info, index) in infos"
      :placeholder="`请输入${info}`"
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
</style>
