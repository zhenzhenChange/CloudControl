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
    changePage(index) {
      let _start = (index - 1) * this.$parent.pageSize
      let _end = index * this.$parent.pageSize
      this.$parent.pageData = this.$parent.data.slice(_start, _end)
      this.$parent.pageCurrent = index
    },
    changeSize(pageSize) {
      this.$parent.changeSize(pageSize)
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
