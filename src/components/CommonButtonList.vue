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
      if (btnID === "remove-g" || btnID === "up" || btnID === "down") {
        if (!parent.operationData.length) {
          this.$Message.warning("请先勾选要处理的数据～")
          return
        }
        if (btnID === "remove-g") {
          parent.remove(null)
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
      } else if (btnID === "create-g") {
        parent.updateConfig = {
          icon: "md-add-circle",
          color: "#2D8CF0",
          title: "添加分组",
          isUpdate: false,
          tryBtn: "确定",
          inputInfos: [{ desc: "分组名称", label: "分组名称" }]
        }
        parent.create()
      } else if (btnID === "create") {
        parentRefs["CreateModal"].isShowCreateModal = true
      }
    }
  }
}
</script>
