<template>
  <!-- 添加编辑-纯输入框模态窗 -->
  <Modal
    width="330"
    :closable="false"
    :mask-closable="false"
    v-model="isShowEditModal"
    class-name="vertical-center-modal"
  >
    <p slot="header">
      <Icon :type="config.icon" :color="config.color" class="mr-5 header-icon" />
      {{ config.title }}
    </p>
    <div v-if="!config.isUpdate">
      <Input
        clearable
        :key="index"
        class="mb-10"
        v-model="value"
        :placeholder="`请输入${inputInfo.desc}`"
        v-for="(inputInfo, index) in config.inputInfos"
      >
        <span slot="prepend">{{ inputInfo.label }}</span>
      </Input>
    </div>
    <div v-if="config.isUpdate">
      <Input
        clearable
        :key="index"
        class="mb-10"
        v-model="inputInfo.model"
        :placeholder="`请输入${inputInfo.desc}`"
        v-for="(inputInfo, index) in config.inputInfos"
      >
        <span slot="prepend">{{ inputInfo.label }}</span>
      </Input>
    </div>
    <div slot="footer">
      <Button icon="md-remove-circle" @click="catchClick">取消</Button>
      <Button type="success" ref="tryButton" @click="tryClick" icon="md-checkmark">
        {{ config.tryBtn }}
      </Button>
    </div>
  </Modal>
</template>

<script>
import { mapState } from "vuex"
export default {
  name: "CommonEditModal",
  props: { config: Object },
  data() {
    return {
      value: "",
      isShowEditModal: false
    }
  },
  computed: {
    ...mapState({ user_id: state => state.user_id })
  },
  methods: {
    tryClick() {
      this.config.isUpdate ? this.update() : this.create()
    },
    catchClick() {
      this.$parent.updateConfig.inputInfos.forEach(info => (info.model = ""))
      this.value = ""
      this.isShowEditModal = false
    },
    create() {
      this.$parent.create()
    },
    async update() {
      this.isShowEditModal = false
      let updateData = {}
      const config = this.config
      const args = config.updateArgs
      const length = args.length
      for (let key in config.updateData) updateData[key] = config.updateData[key]
      for (let i = 0; i < length; i++) updateData[args[i]] = config.inputInfos[i].model
      updateData = Object.assign({}, updateData, { user_id: this.user_id })
      const res = await this.$http.post(config.url, updateData)
      if (res) {
        this.$parent.initData()
        this.$Message.success("修改成功!")
      }
      this.value = ""
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
