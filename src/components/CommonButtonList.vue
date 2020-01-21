<template>
  <!-- 按钮组 -->
  <div class="ButtonList">
    <Button
      :key="index"
      class="mr-10"
      :type="buttonInfo.type"
      :icon="buttonInfo.icon"
      @click="clickEvent(buttonInfo.id)"
      v-for="(buttonInfo, index) in buttonListInfos"
    >
      {{ buttonInfo.name }}
    </Button>
  </div>
</template>

<script>
export default {
  name: "ButtonList",
  props: { buttonListInfos: Array },
  methods: {
    clickEvent(btnID) {
      const parent = this.$parent
      const parentRefs = parent.$refs
      if (btnID === "remove") {
        if (!parent.selectedData.length) {
          this.$Message.warning("请先勾选要处理的数据～")
          return
        }
        parentRefs["GroupingDeleteModal"].isShowModal = true
      } else if (btnID === "add") {
        parentRefs["GroupingInputModal"].isShowInputModal = true
      }
    }
  }
}
</script>
