<template>
  <!-- 集合分页的表格复用组件 -->
  <div class="PagedTable mt-10">
    <Table
      stripe
      border
      :ref="TableRef"
      :data="data"
      :columns="dataColumns"
      @on-selection-change="selectionChange"
    />
    <div class="page" v-if="show ? false : true">
      <div class="mb-10">
        <Page
          transfer
          show-total
          show-sizer
          show-elevator
          :total="total"
          :current="current"
          :page-size="pageSize"
          @on-change="changePage"
          :page-size-opts="pageSizeOpts"
          @on-page-size-change="changeSize"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PagedTable",
  props: { data: Array, dataColumns: Array, show: String },
  data() {
    return {
      total: 0,
      current: 1,
      pageSize: 10,
      TableRef: "CommonPagedTable",
      pageSizeOpts: [10, 30, 50, 100, 150, 200, 400]
    }
  },
  methods: {
    changePage(index) {
      this.current = index
      const parent = this.$parent
      parent.pageIndex = index - 1
      parent.initData(null)
    },
    changeSize(pageSize) {
      this.pageSize = pageSize
      this.$parent.pageSize = pageSize
      this.$parent.initData(null)
    },
    selectionChange(selection) {
      const parent = this.$parent
      parent.operationData = selection
      selection.length ? (parent.mutex = true) : (parent.mutex = false)
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
