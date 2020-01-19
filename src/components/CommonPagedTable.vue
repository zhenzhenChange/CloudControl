<template>
  <!-- 集合分页的表格复用组件 -->
  <div class="PagedTable">
    <Table
      stripe
      border
      :data="tableData"
      :columns="dataColumns"
      @on-select-all="selectAll"
      @on-selection-change="selectionChange"
      @on-select-all-cancel="selectAllCancel"
    />
    <div class="page">
      <div>
        <Page
          show-total
          show-sizer
          show-elevator
          :current="1"
          :total="tableData.length"
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
      this.$parent.batch = true
      this.$parent.radio = !this.$parent.batch
      this.$parent.pageSize = pageSize
      this.changePage()
    },
    selectAll() {
      this.$parent.batch = false
    },
    selectAllCancel() {
      this.$parent.batch = true
    },
    selectionChange(selection) {
      selection.length === 0
        ? (this.$parent.batch = true)
        : (this.$parent.batch = false)
      this.$parent.radio = !this.$parent.batch
      this.$parent.selectionData = selection
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
