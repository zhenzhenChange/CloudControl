<template>
  <Modal
    :width="config.width ? config.width : 600"
    :closable="false"
    :mask-closable="false"
    v-model="isShowSelectModal"
    class-name="vertical-center-modal"
  >
    <p slot="header">
      <Icon
        :type="config.icon"
        :color="config.color"
        class="mr-5 header-icon"
      />
      {{ config.title }}
    </p>
    <div class="flex-div" v-if="config.selectConfig">
      <SearchSelect ref="SearchSelect" :config="config.selectConfig" />
      <div class="clear-both"></div>
    </div>
    <div slot="footer">
      <Button icon="md-remove-circle" @click="catchClick">取消</Button>
      <Button
        @click="tryClick"
        :icon="config.tryIcon"
        :type="config.tryType ? config.tryType : 'success'"
      >
        {{ config.tryBtn }}
      </Button>
    </div>
  </Modal>
</template>

<script>
import { mapState } from "vuex"
export default {
  name: "CommonSelectModal",
  props: { config: Object },
  data() {
    return {
      params: null,
      isShowSelectModal: false
    }
  },
  computed: {
    ...mapState({ user_id: state => state.user_id })
  },
  methods: {
    tryClick() {
      const refs = this.$refs
      const parent = this.$parent
      const value = refs["SearchSelect"].value
      if (!value) {
        this.$Message.warning("请选择处理项！")
        return
      }
      if (this.params === "online") {
        parent.onlineByGroup(value)
      } else if (this.params === "offline") {
        parent.offlineByGroup(value)
      } else if (this.params === "send") {
        parent.sendFriendSpace(value)
      } else if (this.params === "removeByGroup") {
        parent.removeByGroup(value)
      } else if (this.params === "moveGroup") {
        parent.moveGroup(value)
      } else if (this.params === "request") {
        parent.requestSetByGroup(value)
      } else if (this.params === "changeMeansByGroup") {
        parent.changeMeansByGroup(value)
      }
    },
    catchClick() {
      this.isShowSelectModal = false
      this.$refs["SearchSelect"].value = ""
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

.clear-both {
  clear: both;
}
</style>
