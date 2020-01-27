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
  data() {
    return {
      commonConfig: {
        icon: "md-trash",
        color: "#ED4014",
        title: "删除",
        operation: "删除",
        btnType: "error",
        btnIcon: "md-trash",
        btnText: "删除"
      }
    }
  },
  methods: {
    clickEvent(btnID) {
      const parent = this.$parent
      const parentRefs = parent.$refs
      if (btnID === "remove-g" || btnID === "remove-t") {
        if (!parent.operationData.length) {
          this.$Message.warning("请先勾选要处理的数据～")
          return
        }
        parent.operationConfig = this.commonConfig
        parentRefs[parent.ConfirmModalRef].isShowConfirmModal = true
      } else if (btnID === "create-g") {
        parent.updateConfig = {
          icon: "md-add-circle",
          color: "#2D8CF0",
          title: "添加分组",
          isUpdate: false,
          tryBtn: "确定",
          inputInfos: [{ desc: "分组名称", label: "分组名称" }]
        }
        parentRefs[parent.EditModalRef].isShowEditModal = true
      } else if (btnID === "create-t") {
        parent.updateConfig = {
          icon: "md-add-circle",
          color: "#2D8CF0",
          title: "添加标签",
          isUpdate: false,
          tryBtn: "确定",
          inputInfos: [{ desc: "标签名称", label: "标签名称" }]
        }
        parentRefs[parent.EditModalRef].isShowEditModal = true
      } else if (btnID === "create-m") {
        parent.createConfig = {
          title: "批量上传账号",
          createConfig: {
            title: "所属分组",
            info: "分组",
            options: parent.GroupData
          }
        }
        parentRefs[parent.CreateModalRef].isShowCreateModal = true
      } else if (btnID === "newSpace") {
        parent.selectModalConfig = {
          width: 350,
          icon: "md-send",
          color: "#2D8CF0",
          title: "选择分组发布",
          selectConfig: {
            title: "账号分组",
            info: "分组",
            options: parent.groups
          },
          tryIcon: "ios-send",
          tryBtn: "发布"
        }
        parentRefs[parent.SelectModalRef].params = "send"
        parentRefs[parent.SelectModalRef].isShowSelectModal = true
      } else if (btnID === "up") {
        if (parent.operationData.length) {
          parent.operationConfig = {
            icon: "ios-trending-up",
            color: "#19BE6B",
            title: "一键上线",
            operation: "上线（已自动筛选离线且有效账号）",
            btnType: "success",
            btnIcon: "md-checkmark",
            btnText: "确定",
            params: "onNo",
            flag: true
          }
          parentRefs[parent.ConfirmModalRef].isShowConfirmModal = true
        } else {
          parent.selectConfig = {
            width: "400",
            icon: "md-arrow-round-up",
            color: "#2D8CF0",
            title: "按分组上线",
            selectConfig: {
              title: "账号分组",
              info: "分组",
              options: parent.GroupData
            },
            tryIcon: "md-checkmark",
            tryBtn: "确定"
          }
          parentRefs[parent.SelectModalRef].params = "online"
          parentRefs[parent.SelectModalRef].isShowSelectModal = true
        }
      } else if (btnID === "down") {
        if (parent.operationData.length) {
          parent.operationConfig = {
            icon: "ios-trending-down",
            color: "#19BE6B",
            title: "一键下线",
            operation: "下线（已自动筛选有微信ID且在线账号）",
            btnType: "success",
            btnIcon: "md-checkmark",
            btnText: "确定",
            params: "offNo",
            flag: true
          }
          parentRefs[parent.ConfirmModalRef].isShowConfirmModal = true
        } else {
          parent.selectConfig = {
            width: "400",
            icon: "md-arrow-round-up",
            color: "#2D8CF0",
            title: "按分组下线",
            selectConfig: {
              title: "账号分组",
              info: "分组",
              options: parent.GroupData
            },
            tryIcon: "md-checkmark",
            tryBtn: "确定"
          }
          parentRefs[parent.SelectModalRef].params = "offline"
          parentRefs[parent.SelectModalRef].isShowSelectModal = true
        }
      } else if (btnID === "create-p") {
        parent.isShowUrlModal = true
      } else if (btnID === "remove-m") {
        if (parent.operationData.length) {
          parent.operationConfig = {
            icon: "md-trash",
            color: "#ED4014",
            title: "一键删除",
            operation: "删除",
            btnType: "error",
            btnIcon: "md-trash",
            btnText: "删除",
            params: "removeByIDs",
            flag: true
          }
          parentRefs[parent.ConfirmModalRef].isShowConfirmModal = true
        } else {
          parent.selectConfig = {
            width: "400",
            icon: "md-trash",
            color: "#ED4014",
            title: "按分组删除",
            selectConfig: {
              title: "账号分组",
              info: "分组",
              options: parent.GroupData
            },
            tryType: "error",
            tryIcon: "md-trash",
            tryBtn: "删除"
          }
          parentRefs[parent.SelectModalRef].params = "removeByGroup"
          parentRefs[parent.SelectModalRef].isShowSelectModal = true
        }
      } else if (btnID === "GroupChange") {
        if (!parent.operationData.length) {
          this.$Message.warning("请先勾选要处理的数据～")
          return
        }
        parent.selectConfig = {
          width: "400",
          icon: "md-move",
          color: "#2D8CF0",
          title: "移动分组",
          selectConfig: {
            title: "账号分组",
            info: "分组",
            options: parent.GroupData
          },
          tryIcon: "md-checkmark",
          tryBtn: "确定"
        }
        parentRefs[parent.SelectModalRef].params = "moveGroup"
        parentRefs[parent.SelectModalRef].isShowSelectModal = true
      } else if (btnID === "TagChange") {
        if (!parent.operationData.length) {
          this.$Message.warning("请先勾选要处理的数据～")
          return
        }
        parent.selectConfig = {
          width: "400",
          icon: "md-move",
          color: "#2D8CF0",
          title: "移动标签",
          selectConfig: {
            title: "账号标签",
            info: "标签",
            options: parent.TagData
          },
          tryIcon: "md-checkmark",
          tryBtn: "确定"
        }
        parentRefs[parent.SelectModalRef].params = "moveTag"
        parentRefs[parent.SelectModalRef].isShowSelectModal = true
      } else if (btnID === "request") {
        if (parent.operationData.length) {
          parent.operationConfig = {
            icon: "md-git-pull-request",
            color: "#2D8CF0",
            title: "按微信ID设置请求",
            operation: "设置",
            btnType: "success",
            btnIcon: "md-checkmark",
            btnText: "确定",
            params: "requestByWXID",
            flag: true
          }
          parentRefs[parent.ConfirmModalRef].isShowConfirmModal = true
        } else {
          parent.selectConfig = {
            width: "400",
            icon: "md-git-pull-request",
            color: "#2D8CF0",
            title: "按分组设置请求",
            selectConfig: {
              title: "账号分组",
              info: "分组",
              options: parent.GroupData
            },
            tryIcon: "md-checkmark",
            tryBtn: "确定"
          }
          parentRefs[parent.SelectModalRef].params = "request"
          parentRefs[parent.SelectModalRef].isShowSelectModal = true
        }
      } else if (btnID === "ChangeMeans") {
        if (parent.operationData.length) {
          parent.operationConfig = {
            icon: "md-create",
            color: "#2D8CF0",
            title: "修改资料",
            operation: "修改这些账号",
            btnType: "success",
            btnIcon: "md-checkmark",
            btnText: "确定",
            params: "changeMeansByWXID",
            flag: true
          }
          parentRefs[parent.ConfirmModalRef].isShowConfirmModal = true
        } else {
          parent.selectConfig = {
            width: "400",
            icon: "md-create",
            color: "#2D8CF0",
            title: "按分组修改资料",
            selectConfig: {
              title: "账号分组",
              info: "分组",
              options: parent.GroupData
            },
            tryIcon: "md-checkmark",
            tryBtn: "确定"
          }
          parentRefs[parent.SelectModalRef].params = "changeMeansByGroup"
          parentRefs[parent.SelectModalRef].isShowSelectModal = true
        }
      } else if (btnID === "uploadMailList") {
        parent.isShowModal = true
      }
    }
  }
}
</script>
