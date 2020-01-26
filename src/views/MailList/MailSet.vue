<template>
  <div class="MailList">
    <ButtonList :buttonListInfos="buttonListInfos" />
    <Divider dashed />
    <PagedTable :data="data" :ref="PagedTableRef" :dataColumns="MailColumns" />
    <CommonConfirmModal ref="MailSet" :config="MailSetConfig" />
    <Modal
      width="600"
      :mask-closable="false"
      v-model="isShowModal"
      class-name="vertical-center-modal"
    >
      <p slot="header">
        <Icon color="#2d8cf0" type="md-cloud-upload" class="mr-5" />
        {{ mailListConfig.title }}
      </p>
      <div class="upload mt-10 mb-10">
        <span class="title mr-10">通讯录</span>
        <Upload
          action=""
          :show-upload-list="false"
          :before-upload="handleBeforeUpload"
        >
          <Button icon="md-cloud-upload">批量上传通讯录</Button>
        </Upload>
      </div>
      <Input
        type="textarea"
        v-model="mailList"
        :autosize="{ minRows: 5, maxRows: 20 }"
        placeholder="通讯录格式：XXXX----XXXX（姓名----手机号）或 XXXXXXX（手机号），一条通讯录单独一行，多个通讯录多行"
      >
      </Input>
      <div slot="footer">
        <Button icon="md-remove-circle" @click="catchClick">取消</Button>
        <Button type="success" icon="md-checkmark" @click="uploadMailList">
          确定
        </Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  data() {
    return {
      data: [],
      mailList: "",
      mailListConfig: {
        title: "上传通讯录"
      },
      isShowModal: false,
      PagedTableRef: "MailPagedTable",
      MailSetConfig: {
        icon: "md-add",
        color: "#2D8CF0",
        title: "按标签添加通讯录好友",
        operation: "为该标签添加好友",
        btnType: "primary",
        btnIcon: "md-checkmark",
        btnText: "确定",
        params: "addMailFriend",
        flag: true
      },
      buttonListInfos: [
        {
          id: "uploadMailList",
          type: "primary",
          icon: "md-cloud-upload",
          name: "上传通讯录"
        }
      ],
      MailColumns: [
        { width: 70, align: "center", title: "序号", key: "serialNumber" },
        { align: "center", title: "标签名称", key: "tagName" },
        { align: "center", title: "标签ID", key: "tagId" },
        {
          sortable: true,
          align: "center",
          title: "创建时间",
          key: "tagCreateDate"
        },
        {
          width: 230,
          title: "操作",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: { type: "primary", icon: "md-add" },
                  style: { marginRight: "5px" },
                  on: {
                    click: () => {
                      this.$refs["MailSet"].isShowConfirmModal = true
                      this.$refs["MailSet"].configParams = params.row
                    }
                  }
                },
                "添加通讯录好友"
              )
            ])
          }
        }
      ]
    }
  },
  created() {
    this.initData()
  },
  computed: {
    ...mapState({ user_id: state => state.user_id })
  },
  methods: {
    async initData() {
      this.data = []
      const { data } = await this.$http.get("/account/getAllTag", {
        params: { user_id: this.user_id }
      })
      data.forEach((item, index) => {
        this.data.push({
          serialNumber: index + 1,
          tagName: item.tagName,
          tagId: item.tagId,
          tagCreateDate: this.$options.filters.date(item.tagCreateDate)
        })
      })
    },
    async addMailFriend({ tagId: tag_id }) {
      this.$refs["MailSet"].configParams = null
      this.$refs["MailSet"].isShowConfirmModal = false
      const { msg } = await this.$http.post("/contact/addFriends", { tag_id })
      this.$Message.info(msg)
    },
    handleBeforeUpload(file) {
      const reader = new FileReader()
      reader.readAsText(file)
      reader.onload = () => {
        this.mailList = reader.result
      }
      return false
    },
    catchClick() {
      this.isShowModal = false
    },
    async uploadMailList() {
      this.isShowModal = false
      let contact = []
      contact = this.mailList.split(/\n/g).filter(item => item !== "")
      const obj = { contact, user_id: this.user_id }
      const { data } = await this.$http.post("/contact/upload", obj)
      this.mailList = ""
      this.$Message.info(`上传成功${data.success}个，失败${data.error}个！`)
    }
  }
}
</script>

<style lang="scss" scoped>
.upload {
  .title {
    width: 56px;
    float: left;
    height: 32px;
    display: block;
    line-height: 32px;
  }
}
</style>
