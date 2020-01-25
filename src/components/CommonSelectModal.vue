<template>
  <Modal
    :width="config.width ? config.width : 600"
    :closable="false"
    :mask-closable="false"
    v-model="isShowSelectModal"
    @on-visible-change="visibleChange"
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
    <div class="mt-10" v-if="config.selectConfig1">
      <SearchSelect ref="SearchSelect1" :config="config.selectConfig1" />
      <div class="clear-both"></div>
    </div>
    <div class="mt-10 " v-if="config.selectConfig2">
      <SearchSelect :config="config.selectConfig2" />
      <div class="clear-both"></div>
    </div>
    <div slot="footer">
      <Button icon="md-remove-circle" @click="catchClick">取消</Button>
      <Button type="success" :icon="config.tryIcon" @click="tryClick">
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
    visibleChange(value) {
      value ? "" : (this.isShowModal = false)
    },
    tryClick() {
      if (this.params === "online") {
        this.$parent.onlineByGroup(this.$refs["SearchSelect1"].value)
      } else if (this.params === "offline") {
        this.$parent.offlineByGroup(this.$refs["SearchSelect1"].value)
      } else if (this.params === "send") {
        this.$parent.sendFriendSpace(this.$refs["SearchSelect1"].value)
      }
    },
    catchClick() {
      this.$refs["SearchSelect1"].value = ""
      this.isShowSelectModal = false
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
