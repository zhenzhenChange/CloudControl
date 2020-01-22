<template>
  <!-- 集合分页的表格复用组件 -->
  <div class="PagedTable mt-10">
    <Table
      stripe
      border
      :data="data"
      ref="CommonTable"
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
          :total="data.length"
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
  props: { data: Array, dataColumns: Array },
  methods: {
    changePage() {
      // this.tableData = this.$parent.data
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
      const length = selection.length
      length ? (this.$parent.mutex = true) : (this.$parent.mutex = false)
      this.$parent.operationData = selection
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
