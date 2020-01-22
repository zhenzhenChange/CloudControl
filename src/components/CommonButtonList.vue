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
      if (btnID === "remove" || btnID === "up" || btnID === "down") {
        if (!parent.operationData.length) {
          this.$Message.warning("请先勾选要处理的数据～")
          return
        }
        if (btnID === "remove") {
          parent.operationConfig = {
            icon: "md-trash",
            color: "#ED4014",
            title: "删除分组",
            operation: "删除",
            btnType: "error",
            btnIcon: "md-trash",
            btnText: "删除"
          }
        } else if (btnID === "up") {
          parent.operationConfig = {
            icon: "ios-trending-up",
            color: "#19BE6B",
            title: "一键上线",
            operation: "上线",
            btnType: "success",
            btnIcon: "md-checkmark",
            btnText: "确定"
          }
        } else if (btnID === "down") {
          parent.operationConfig = {
            icon: "ios-trending-down",
            color: "#19BE6B",
            title: "一键下线",
            operation: "下线",
            btnType: "success",
            btnIcon: "md-checkmark",
            btnText: "确定"
          }
        }
        parentRefs["ConfirmModal"].isShowConfirmModal = true
      } else if (btnID === "add") {
        parentRefs["GroupingEditModal"].isShowEditModal = true
      } else if (btnID === "create") {
        parentRefs["CreateModal"].isShowCreateModal = true
      }
    }
  }
}
</script>
