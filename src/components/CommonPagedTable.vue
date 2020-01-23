<template>
  <!-- 集合分页的表格复用组件 -->
  <div class="PagedTable mt-10">
    <Table
      stripe
      border
      :data="data"
      :ref="TableRef"
      :columns="dataColumns"
      @on-selection-change="selectionChange"
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
  data() {
    return {
      TableRef: "CommonPagedTable"
    }
  },
  methods: {
    changePage(index) {
      const parent = this.$parent
      let _start = (index - 1) * parent.pageSize
      let _end = index * parent.pageSize
      parent.pageData = parent.data.slice(_start, _end)
      parent.pageCurrent = index
    },
    changeSize(pageSize) {
      this.$parent.changeSize(pageSize)
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
