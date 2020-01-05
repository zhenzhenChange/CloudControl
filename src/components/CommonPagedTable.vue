<template>
  <!-- 集合分页的表格复用组件 -->
  <div class="PagedTable">
    <Table :data="tableData" :columns="dataColumns" stripe border />
    <div class="page">
      <div>
        <Page
          :total="100"
          show-total
          show-elevator
          show-sizer
          :current="1"
          @on-change="changePage"
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
