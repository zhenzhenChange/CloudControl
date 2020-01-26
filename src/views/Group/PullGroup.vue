<template>
  <div class="PullGroup">
    <ButtonList :buttonListInfos="buttonListInfos" />
    <Divider />
    <PagedTable
      :data="data"
      :ref="PagedTableRef"
      :dataColumns="PullGroupColumns"
    />
    <Modal
      width="700"
      :closable="false"
      :mask-closable="false"
      v-model="isShowUrlModal"
      class-name="vertical-center-modal"
    >
      <p slot="header">
        <Icon type="md-add-circle" color="#2D8CF0" class="mr-5 header-icon" />
        添加微信群
      </p>
      <SpaceUpload
        ref="urlUpload"
        :uploadLimit="9"
        :desc="
          '上传二维码点击左下角按钮生成群链接（最多可上传9张二维码）或者粘贴群链接'
        "
      ></SpaceUpload>
      <Input
        class="mt-10"
        type="textarea"
        v-model="qrcode"
        :autosize="{ minRows: 3, maxRows: 15 }"
        placeholder="请将生成的群链接复制，粘贴到下一个文本区域"
      ></Input>
      <Input
        class="mt-10"
        type="textarea"
        v-model="urlArea"
        :autosize="{ minRows: 5, maxRows: 15 }"
        placeholder="请将群链接粘贴至此处，一条链接占一行"
      ></Input>
      <div slot="footer">
        <Button icon="md-remove-circle" @click="catchClick">取消</Button>
        <Button type="success" icon="md-checkmark" @click="tryClick">
          确定
        </Button>
        <Button
          type="info"
          icon="md-hand"
          class="float-left"
          @click="handleQRCode"
        >
          生成群链接
        </Button>
      </div>
    </Modal>
    <Modal
      width="400"
      :closable="false"
      :mask-closable="false"
      v-model="isShowRadioModal"
      class-name="vertical-center-modal"
    >
      <p slot="header">
        <Icon type="md-add" color="#2D8CF0" class="mr-5 header-icon" />
        按标签邀请入群
      </p>
      <SearchSelect ref="RadioSelect" :config="radioSelectConfig" />
      <div class="clear-both"></div>
      <div class="mt-10">
        <span class="mr-10">类型选择</span>
        <RadioGroup v-model="opType">
          <Radio label="一手"></Radio>
          <Radio label="二手"></Radio>
        </RadioGroup>
      </div>
      <div slot="footer">
        <Button icon="md-remove-circle" @click="catchClick">取消</Button>
        <Button type="success" icon="md-checkmark" @click="inviteTag">
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
      qrcode: "",
      urlArea: "",
      TagData: [],
      opType: "一手",
      isShowUrlModal: false,
      isShowRadioModal: false,
      radioSelectConfig: {},
      PagedTableRef: "PullGroupPagedTable",
      buttonListInfos: [
        // { id: "pull", type: "primary", icon: "md-add", name: "邀请进群" },
        { id: "create-p", type: "primary", icon: "md-add", name: "添加群链接" }
      ],
      PullGroupColumns: [
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
                  props: { type: "info", icon: "md-hand" },
                  style: { marginRight: "5px" },
                  on: {
                    click: () => {
                      this.$refs["MailSet"].isShowConfirmModal = true
                      this.$refs["MailSet"].configParams = params.row
                    }
                  }
                },
                "邀请进群"
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
        this.TagData.push({ label: item.tagName, value: item.tagId })
        this.data.push({
          serialNumber: index + 1,
          tagName: item.tagName,
          tagId: item.tagId,
          tagCreateDate: this.$options.filters.date(item.tagCreateDate)
        })
      })
    },
    async tryClick() {
      let grpUrl = []
      this.urlArea.split(/\n/g).forEach(item => grpUrl.push(item))
      grpUrl = grpUrl.filter(item => item !== "")
      await this.$http.post("/group/setGroupURL", { grpUrl })
    },
    catchClick() {
      this.isShowUrlModal = false
      this.isShowRadioModal = false
    },
    async inviteTag() {
      this.isShowRadioModal = false
      await this.$http.get("/group/enterGroup", {
        params: {
          tagId: this.$refs["RadioSelect"].value,
          opType: this.opType === "一手" ? 0 : 1
        }
      })
    },
    handleQRCode() {
      this.qrcode = ""
      const urlList = this.$refs.urlUpload.uploadList
      urlList.map(item => {
        window.qrcode.decode(item)
        window.qrcode.callback = url => {
          if (url === "error decoding QR Code") {
            this.$Notice.warning({ title: `含有非二维码图片，已自动过滤！` })
          } else {
            this.qrcode += `${url}\n`
          }
        }
      })
    }
  }
}
</script>
