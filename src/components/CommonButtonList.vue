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
      if (btnID === "remove-g" || btnID === "remove-a") {
        if (!parent.operationData.length) {
          this.$Message.warning("请先勾选要处理的数据～")
          return
        }
        if (btnID === "remove-g") {
          parent.remove(null)
        } else if (btnID === "remove-a") {
          parent.remove(null)
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
        parent.$refs[parent.editModalRef].isShowEditModal = true
      } else if (btnID === "create-a") {
        parent.updateConfig = {
          icon: "md-add-circle",
          color: "#2D8CF0",
          title: "添加标签",
          isUpdate: false,
          tryBtn: "确定",
          inputInfos: [{ desc: "标签名称", label: "标签名称" }]
        }
        parent.$refs[parent.editModalRef].isShowEditModal = true
      } else if (btnID === "newSpace") {
        parent.selectModalConfig = {
          icon: "md-send",
          color: "#2D8CF0",
          title: "朋友圈发布",
          selectConfig1: {
            title: "账号分组",
            info: "分组",
            options: parent.groups
          },
          selectConfig2: {
            title: "素材模板",
            info: "素材",
            options: parent.groups,
            width: "300px"
          },
          tryIcon: "ios-send",
          tryBtn: "发布"
        }
        parent.$refs[parent.selectRef].isShowSelectModal = true
      }
    }
  }
}
</script>
