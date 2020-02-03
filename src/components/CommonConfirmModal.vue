<template>
  <!-- 对话确认模态窗 -->
  <Modal
    width="350"
    :closable="false"
    :mask-closable="false"
    v-model="isShowConfirmModal"
    class-name="vertical-center-modal"
  >
    <p slot="header">
      <Icon
        :type="config.icon"
        :color="config.color"
        class="mr-5 header-icon"
      />{{ config.title }}
    </p>
    <div class="text-center">
      <p>确定要{{ config.operation }}吗？</p>
    </div>
    <div slot="footer">
      <Button icon="md-remove-circle" @click="catchClick">取消</Button>
      <Button :type="config.btnType" :icon="config.btnIcon" @click="tryClick">
        {{ config.btnText }}
      </Button>
    </div>
  </Modal>
</template>

<script>
import { mapState } from "vuex"
export default {
  name: "CommonConfirmModal",
  props: { config: Object },
  data() {
    return {
      params: null,
      configParams: null,
      isShowConfirmModal: false
    }
  },
  computed: {
    ...mapState({ user_id: state => state.user_id })
  },
  methods: {
    tryClick() {
      if (!this.config.flag) {
        if (this.params) {
          this.$parent.remove(this.params)
          this.params = null
        } else {
          this.$parent.remove(null)
        }
      }
      if (this.config.params === "onByID") {
        this.$parent.onlineByWXID(this.config.paramsValue)
      } else if (this.config.params === "onNo") {
        this.$parent.onlineByWXID(null)
      } else if (this.config.params === "offNo") {
        this.$parent.offlineByWXID()
      } else if (this.config.params === "removeByIDs") {
        this.$parent.removeByWXID(null)
      } else if (this.config.params === "removeByID") {
        this.$parent.removeByWXID(this.config.paramsValue)
      } else if (this.config.params === "requestByWXID") {
        this.$parent.requestSetByWXID()
      } else if (this.config.params === "changeMeansByWXID") {
        this.$parent.changeMeansByWXID()
      } else if (this.config.params === "addMailFriend") {
        this.$parent.addMailFriend(this.configParams)
      } else if (this.config.params === "sendFriend") {
        this.$parent.sendFriendSpace(this.configParams)
      } else if (this.config.params === "sendByTag") {
        this.$parent.sendByTag(this.configParams)
      } else if (this.config.params === "clearMailList") {
        this.$parent.clearMailList()
      }
      this.configParams = null
    },
    catchClick() {
      this.isShowConfirmModal = false
    }
  }
}
</script>

<style lang="scss" scoped>
.header-icon {
  width: 20px;
  height: 20px;
  vertical-align: -0.05em;
}
</style>
