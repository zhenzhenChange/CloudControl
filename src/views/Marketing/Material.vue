<template>
  <Tabs class="Material">
    <TabPane label="朋友圈素材" icon="md-people">
      <Card class="template-card">
        <p slot="title" class="title">素材模板</p>
        <Input
          clearable
          size="large"
          placeholder="请填写标题"
          v-model="template.title"
        >
          <span slot="prepend">标题</span>
        </Input>
        <Input
          class="mt-10"
          type="textarea"
          placeholder="请填写内容"
          v-model="template.content"
          :autosize="{ minRows: 5, maxRows: 10 }"
        >
        </Input>
        <SpaceUpload
          :uploadLimit="9"
          ref="SpaceUpload"
          :desc="'最多可上传9张图片'"
        />
        <div class="mt-10">
          <Button
            long
            size="large"
            type="success"
            icon="md-checkbox"
            @click="saveTemplate"
            :loading="templateLoading"
            >保存</Button
          >
        </div>
      </Card>
    </TabPane>
    <TabPane label="快捷消息模板" icon="md-information-circle">
      <Card class="template-card">
        <p slot="title" class="title">快捷消息模板</p>
        <Input
          class="mt-10"
          type="textarea"
          v-model="quickInfo.content"
          placeholder="请设置快捷消息模板"
          :autosize="{ minRows: 5, maxRows: 10 }"
        >
        </Input>
        <div class="mt-10">
          <Button
            long
            size="large"
            type="success"
            icon="md-checkbox"
            @click="saveQuickInfo"
            :loading="quickLoading"
            >保存</Button
          >
        </div>
      </Card>
    </TabPane>
    <TabPane label="个人信息模板" icon="md-person">
      <Card class="template-card">
        <p slot="title" class="title">个人信息模板</p>
        <Input
          clearable
          size="large"
          type="password"
          placeholder="请设置密码"
          v-model="personInfo.pwd"
        >
          <span slot="prepend">密码模板</span>
        </Input>
        <Input
          clearable
          size="large"
          class="mt-10"
          placeholder="请设置昵称"
          v-model="personInfo.nickname"
        >
          <span slot="prepend">昵称模板</span>
        </Input>
        <Input
          clearable
          class="mt-10"
          type="textarea"
          placeholder="请设置个性签名"
          v-model="personInfo.signature"
          :autosize="{ minRows: 5, maxRows: 10 }"
        >
        </Input>
        <SpaceUpload :uploadLimit="1" :desc="'上传头像'" ref="UploadAvatar" />
        <div class="mt-10">
          <Button
            long
            size="large"
            type="success"
            icon="md-checkbox"
            @click="savePersonInfo"
            :loading="personLoading"
            >保存</Button
          >
        </div>
      </Card>
    </TabPane>
    <TabPane label="验证信息模板" icon="md-paper-plane">
      <Card class="template-card">
        <p slot="title" class="title">验证信息模板</p>
        <Input
          class="mt-10"
          type="textarea"
          v-model="verifyInfo.content"
          placeholder="请设置验证消息模板"
          :autosize="{ minRows: 5, maxRows: 10 }"
        >
        </Input>
        <div class="mt-10">
          <Button
            long
            size="large"
            type="success"
            icon="md-checkbox"
            @click="saveVerifyInfo"
            :loading="verifyLoading"
            >保存</Button
          >
        </div>
      </Card>
    </TabPane>
  </Tabs>
</template>

<script>
import { mapState } from "vuex"
export default {
  data() {
    return {
      quickLoading: false,
      verifyLoading: false,
      personLoading: false,
      templateLoading: false,
      quickInfo: { content: "" },
      verifyInfo: { content: "" },
      template: { title: "", content: "", picURL: [] },
      personInfo: { pwd: "", nickname: "", signature: "", avatarUrl: "" }
    }
  },
  created() {
    this._initData()
  },
  computed: {
    ...mapState({ user_id: state => state.user_id })
  },
  methods: {
    async _initData() {
      const { data, msg } = await this.$http.get("/marketing/getInfo", {
        params: { user_id: this.user_id }
      })
      this.$refs.SpaceUpload.uploadList.push(data.friendCriclePicURL)
      this.$refs.UploadAvatar.uploadList.push(data.setInfoAvatarUrl)

      this.template.title = data.friendCricleTitle
      this.template.content = data.friendCricleContent

      this.quickInfo.content = data.setSendMsgContent
      this.verifyInfo.content = data.setAddMsgContent

      this.personInfo.pwd = data.setInfoPwd
      this.personInfo.nickname = data.setInfoNickName
      this.personInfo.signature = data.setInfoSignature
      this.$Message.info(msg)
      console.log(this.$refs.SpaceUpload.uploadList)
    },
    async saveTemplate() {
      if (!this.template.title) {
        this.$Message.warning("标题不能为空！")
        return
      }
      if (!this.template.content) {
        this.$Message.warning("内容不能为空！")
        return
      }
      this.templateLoading = true
      this.template.user_id = this.user_id
      this.template.picURL = this.$refs.SpaceUpload.uploadList
      const { msg } = await this.$http.post(
        "/marketing/setFriendCricle",
        this.template
      )
      this.templateLoading = false
      this._initData()
      this.$Message.info(msg)
    },
    async saveQuickInfo() {
      if (!this.quickInfo.content) {
        this.$Message.warning("内容不能为空！")
        return
      }
      this.quickLoading = true
      this.quickInfo.user_id = this.user_id
      const { msg } = await this.$http.post(
        "/marketing/setSendMsg",
        this.quickInfo
      )
      this.quickLoading = false
      this._initData()
      this.$Message.info(msg)
    },
    async savePersonInfo() {
      if (!this.personInfo.pwd) {
        this.$Message.warning("密码设置不能为空！")
        return
      }
      if (!this.personInfo.nickname) {
        this.$Message.warning("昵称不能为空！")
        return
      }
      this.personLoading = true
      this.personInfo.user_id = this.user_id
      this.personInfo.avatarUrl = this.$refs.UploadAvatar.uploadList[0]
      const { msg } = await this.$http.post(
        "/marketing/setInfo",
        this.personInfo
      )
      this.personLoading = false
      this._initData()
      this.$Message.info(msg)
    },
    async saveVerifyInfo() {
      if (!this.verifyInfo.content) {
        this.$Message.warning("内容不能为空！")
        return
      }
      this.verifyLoading = true
      this.verifyInfo.user_id = this.user_id
      const { msg } = await this.$http.post(
        "/marketing/setAddMsg",
        this.verifyInfo
      )
      this.verifyLoading = false
      this._initData()
      this.$Message.info(msg)
    }
  }
}
</script>

<style lang="scss" scoped>
.Material {
  .template-card {
    width: 500px;
    margin: 0 auto;
    .title {
      text-align: center;
    }
  }
}
</style>
