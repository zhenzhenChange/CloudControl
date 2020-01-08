<template>
  <!-- 集合分页的表格复用组件 -->
  <div class="PagedTable">
    <Table :data="tableData" :columns="dataColumns" stripe border />
    <div class="page">
      <div>
        <Page
          show-total
          show-sizer
          show-elevator
          :total="100"
          :current="1"
          @on-change="changePage"
          @on-page-size-change="changeSize"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PagedTable",
  props: {
    dataColumns: Array
  },
  data() {
    return {
      tableData: []
    }
  },
  methods: {
    changePage() {
      this.tableData = this.$parent.mockTableData()
    },
    changeSize(pageSize) {
      return pageSize
    }
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
