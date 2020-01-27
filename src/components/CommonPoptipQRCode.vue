<template>
  <Poptip transfer placement="right-start" width="800">
    <Button type="error" icon="md-barcode">二维码解码</Button>
    <div class="qrcode" slot="content">
      <SpaceUpload
        :style="60"
        ref="urlUpload"
        :desc="
          '上传二维码点击左下角按钮生成群链接（清空请刷新页面，避免解码缓存，导致浏览器卡死）'
        "
      ></SpaceUpload>
      <Input
        class="mt-10"
        type="textarea"
        v-model="qrcode"
        :autosize="{ minRows: 3, maxRows: 15 }"
      ></Input>
      <Button
        type="info"
        icon="md-hand"
        class="float-left mt-10 mb-10"
        @click="handleQRCode"
      >
        生成群链接
      </Button>
    </div>
  </Poptip>
</template>

<script>
export default {
  name: "CommonPoptipQRCode",
  data() {
    return {
      qrcode: ""
    }
  },
  methods: {
    handleQRCode() {
      this.qrcode = ""
      const promiseArr = []
      const urlList = this.$refs.urlUpload.uploadList
      urlList.map(item => promiseArr.push(this.asyncLooper(item)))
    },
    asyncLooper(item) {
      return new Promise((resolve, reject) => {
        window.qrcode.decode(item)
        window.qrcode.callback = url => {
          if (url === "error decoding QR Code") {
            this.$Notice.warning({ title: `含有非二维码图片，已自动过滤！` })
            reject("err")
          } else {
            this.qrcode += `${url}\n`
            resolve("ok")
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-list {
  width: 60px;
  height: 60px;
  overflow: hidden;
  margin-right: 4px;
  position: relative;
  text-align: center;
  background: #fff;
  line-height: 60px;
  border-radius: 4px;
  display: inline-block;
  border: 1px solid transparent;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  img {
    width: 100%;
    height: 100%;
  }
  &:hover {
    .upload-list-cover {
      display: block;
    }
  }
  .upload-list-cover {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: none;
    position: absolute;
    background: rgba(0, 0, 0, 0.6);
    i {
      color: #fff;
      margin: 0 2px;
      cursor: pointer;
      font-size: 40px;
    }
  }
}

.upload {
  width: 60px;
  display: inline-block;
  .icon {
    width: 60px;
    height: 60px;
    line-height: 60px;
  }
}
</style>
