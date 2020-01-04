<template>
  <!-- 集合分页的表格复用组件 -->
  <div class="PagedTable">
    <Table :data="data" :columns="dataColumns" stripe border />
    <div class="page">
      <div>
        <Page
          :total="total"
          show-total
          show-elevator
          show-sizer
          :current="1"
          @on-change="changePage"
        ></Page>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Array,
    dataColumns: Array,
    total: Number,
    changePage: Function
  }
}
</script>

<style lang="scss" scoped>
.PagedTable {
  .page {
    margin: 10px;
    overflow: hidden;
    div {
      float: left;
    }
  }
}
</style>
