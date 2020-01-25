<template>
  <div class="PullGroup">
    <SearchInput :infos="['微信群']" />
    <Divider dashed />
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
      @on-visible-change="visibleChange"
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      qrcode: "",
      urlArea: "",
      isShowUrlModal: false,
      PagedTableRef: "PullGroupPagedTable",
      buttonListInfos: [
        { id: "pull", type: "primary", icon: "md-add", name: "邀请进群" },
        { id: "create-p", type: "primary", icon: "md-add", name: "添加群链接" }
      ],
      PullGroupColumns: [
        { width: 60, align: "center", type: "selection" },
        { width: 70, align: "center", title: "序号", key: "mAccountNumber" },
        { align: "center", title: "订单ID", key: "mAccountNumber" },
        { align: "center", title: "任务名称", key: "mAccountNumber" },
        { align: "center", title: "微信数", key: "mAccountNumber" },
        { align: "center", title: "拉群标签", key: "mAccountNumber" },
        { align: "center", title: "拉群类型", key: "mAccountNumber" },
        { align: "center", title: "群最终人数", key: "mAccountNumber" },
        { align: "center", title: "总拉群数", key: "mAccountNumber" },
        { align: "center", title: "合格群数", key: "mAccountNumber" },
        { align: "center", title: "不合格群数", key: "mAccountNumber" },
        { align: "center", title: "创建时间", key: "mAccountNumber" },
        { align: "center", title: "结束时间", key: "mAccountNumber" },
        { align: "center", title: "当前状态", key: "mAccountNumber" },
        {
          width: 250,
          align: "center",
          title: "操作",
          render: (h /*params*/) => {
            return h("div", [
              h(
                "Button",
                {
                  props: { type: "primary", size: "small", icon: "md-eye" },
                  style: { marginRight: "5px" },
                  on: {
                    click: () => {}
                  }
                },
                "查看"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small",
                    icon: "md-aperture"
                  },
                  style: { marginRight: "5px" },
                  on: {
                    click: () => {}
                  }
                },
                "运行"
              )
            ])
          }
        }
      ]
    }
  },
  methods: {
    visibleChange(value) {
      value ? "" : (this.isShowUrlModal = false)
    },
    async tryClick() {
      let grpUrl = []
      this.urlArea.split(/\n/g).forEach(item => grpUrl.push(item))
      grpUrl = grpUrl.filter(item => item !== "")
      const res = await this.$http.post("/group/setGroupURL", { grpUrl })
      console.log(res)
    },
    catchClick() {
      this.isShowUrlModal = false
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
