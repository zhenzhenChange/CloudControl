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
import { mapState } from "vuex"
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
  computed: {
    ...mapState({ GroupData: state => state.GroupData })
  },
  methods: {
    clickEvent(btnID) {
      const parent = this.$parent
      const parentRefs = parent.$refs
      /* switch (btnID) {
        case "remove-g":
        case "remove-t":
          if (!parent.operationData.length) {
            this.$Message.warning("请先勾选要处理的数据～")
            return
          }
          parent.operationConfig = this.commonConfig
          parentRefs[parent.ConfirmModalRef].isShowConfirmModal = true
          break
        case "create-g":
          parent.updateConfig = {
            icon: "md-add-circle",
            color: "#2D8CF0",
            title: "添加分组",
            isUpdate: false,
            tryBtn: "确定",
            inputInfos: [{ desc: "分组名称", label: "分组名称" }]
          }
          parentRefs[parent.EditModalRef].isShowEditModal = true
          break
        case "create-m":
          parent.createConfig = {
            title: "批量上传账号",
            createConfig: {
              title: "所属分组",
              info: "分组",
              options: JSON.parse(this.GroupData)
            }
          }
          parentRefs[parent.CreateModalRef].isShowCreateModal = true
          break
        case "newSpace":
          parent.selectModalConfig = {
            width: "350",
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
          break
        case "create-p":
          parent.isShowUrlModal = true
          break
        case "GroupChange":
          if (!parent.operationData.length) {
            this.$Message.warning("请先勾选要处理的数据～")
            return
          }
          parent.selectConfig = {
            width: "350",
            icon: "md-move",
            color: "#2D8CF0",
            title: "将所选账号移动至另一个分组",
            selectConfig: {
              title: "账号分组",
              info: "分组",
              options: JSON.parse(this.GroupData)
            },
            tryIcon: "md-checkmark",
            tryBtn: "确定"
          }
          parentRefs[parent.SelectModalRef].params = "moveGroup"
          parentRefs[parent.SelectModalRef].isShowSelectModal = true
          break
        case "request":
          if (parent.operationData.length) {
            parent.operationConfig = {
              icon: "md-git-pull-request",
              color: "#2D8CF0",
              title: "为选取的微信账号设置",
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
              width: "350",
              icon: "md-git-pull-request",
              color: "#2D8CF0",
              title: "为分组下的所有账号设置",
              selectConfig: {
                title: "账号分组",
                info: "分组",
                options: JSON.parse(this.GroupData)
              },
              tryIcon: "md-checkmark",
              tryBtn: "确定"
            }
            parentRefs[parent.SelectModalRef].params = "request"
            parentRefs[parent.SelectModalRef].isShowSelectModal = true
          }
          break
        case "ChangeMeans":
          if (parent.operationData.length) {
            parent.operationConfig = {
              icon: "md-create",
              color: "#2D8CF0",
              title: "为选取的账号统一修改资料",
              operation: "修改（资料模板于素材管理设置）",
              btnType: "success",
              btnIcon: "md-checkmark",
              btnText: "确定",
              params: "changeMeansByWXID",
              flag: true
            }
            parentRefs[parent.ConfirmModalRef].isShowConfirmModal = true
          } else {
            parent.selectConfig = {
              width: "500",
              icon: "md-create",
              color: "#2D8CF0",
              title: "分组下的所有账号修改资料（资料模板于素材管理设置）",
              selectConfig: {
                title: "账号分组",
                info: "分组",
                options: JSON.parse(this.GroupData)
              },
              tryIcon: "md-checkmark",
              tryBtn: "确定"
            }
            parentRefs[parent.SelectModalRef].params = "changeMeansByGroup"
            parentRefs[parent.SelectModalRef].isShowSelectModal = true
          }
          break
        case "uploadMailList":
          parent.isShowModal = true
          break
        case "addByAcc":
          parent.isShowWXModal = true
          break
        case "clearMailList":
          parent.operationConfig = {
            icon: "md-trash",
            color: "#ED4014",
            title: "清空已上传的通讯录",
            operation: "清空",
            btnType: "error",
            btnIcon: "md-checkmark",
            btnText: "确定",
            params: "clearMailList",
            flag: true
          }
          parentRefs[parent.ConfirmModalRef].isShowConfirmModal = true
          break
        case "remove-m":
          if (!parent.operationData.length) {
            this.$Message.warning("请先勾选要处理的数据～")
            return
          }
          parent.operationConfig = {
            icon: "md-trash",
            color: "#ED4014",
            title: "删除",
            operation: "删除",
            btnType: "error",
            btnIcon: "md-trash",
            btnText: "删除",
            params: "remove-m",
            flag: true
          }
          parentRefs[parent.ConfirmModalRef].isShowConfirmModal = true
          break
      } */

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
      } else if (btnID === "create-m") {
        parent.createConfig = {
          title: "批量上传账号",
          createConfig: {
            title: "所属分组",
            info: "分组",
            options: JSON.parse(this.GroupData)
          }
        }
        parentRefs[parent.CreateModalRef].isShowCreateModal = true
      } else if (btnID === "newSpace") {
        parent.selectModalConfig = {
          width: "350",
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
      } else if (btnID === "create-p") {
        parent.isShowUrlModal = true
      } else if (btnID === "GroupChange") {
        if (!parent.operationData.length) {
          this.$Message.warning("请先勾选要处理的数据～")
          return
        }
        parent.selectConfig = {
          width: "350",
          icon: "md-move",
          color: "#2D8CF0",
          title: "将所选账号移动至另一个分组",
          selectConfig: {
            title: "账号分组",
            info: "分组",
            options: JSON.parse(this.GroupData)
          },
          tryIcon: "md-checkmark",
          tryBtn: "确定"
        }
        parentRefs[parent.SelectModalRef].params = "moveGroup"
        parentRefs[parent.SelectModalRef].isShowSelectModal = true
      } else if (btnID === "request") {
        if (parent.operationData.length) {
          parent.operationConfig = {
            icon: "md-git-pull-request",
            color: "#2D8CF0",
            title: "为选取的微信账号设置",
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
            width: "350",
            icon: "md-git-pull-request",
            color: "#2D8CF0",
            title: "为分组下的所有账号设置",
            selectConfig: {
              title: "账号分组",
              info: "分组",
              options: JSON.parse(this.GroupData)
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
            title: "为选取的账号统一修改资料",
            operation: "修改（资料模板于素材管理设置）",
            btnType: "success",
            btnIcon: "md-checkmark",
            btnText: "确定",
            params: "changeMeansByWXID",
            flag: true
          }
          parentRefs[parent.ConfirmModalRef].isShowConfirmModal = true
        } else {
          parent.selectConfig = {
            width: "500",
            icon: "md-create",
            color: "#2D8CF0",
            title: "分组下的所有账号修改资料（资料模板于素材管理设置）",
            selectConfig: {
              title: "账号分组",
              info: "分组",
              options: JSON.parse(this.GroupData)
            },
            tryIcon: "md-checkmark",
            tryBtn: "确定"
          }
          parentRefs[parent.SelectModalRef].params = "changeMeansByGroup"
          parentRefs[parent.SelectModalRef].isShowSelectModal = true
        }
      } else if (btnID === "uploadMailList") {
        parent.isShowModal = true
      } else if (btnID === "addByAcc") {
        parent.isShowWXModal = true
      } else if (btnID === "clearMailList") {
        parent.operationConfig = {
          icon: "md-trash",
          color: "#ED4014",
          title: "清空已上传的通讯录",
          operation: "清空",
          btnType: "error",
          btnIcon: "md-checkmark",
          btnText: "确定",
          params: "clearMailList",
          flag: true
        }
        parentRefs[parent.ConfirmModalRef].isShowConfirmModal = true
      } else if (btnID === "remove-m") {
        if (!parent.operationData.length) {
          this.$Message.warning("请先勾选要处理的数据～")
          return
        }
        parent.operationConfig = {
          icon: "md-trash",
          color: "#ED4014",
          title: "删除",
          operation: "删除",
          btnType: "error",
          btnIcon: "md-trash",
          btnText: "删除",
          params: "remove-m",
          flag: true
        }
        parentRefs[parent.ConfirmModalRef].isShowConfirmModal = true
      }
    }
  }
}
</script>
