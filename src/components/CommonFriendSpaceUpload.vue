<template>
  <div class="mt-10">
    <h3>{{ desc }}</h3>
    <div
      :key="index"
      class="upload-list mt-10"
      v-for="(item, index) in uploadList"
    >
      <template>
        <img :src="item" />
        <div class="upload-list-cover">
          <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
          <Icon
            type="ios-trash-outline"
            @click.native="handleRemove(index)"
          ></Icon>
        </div>
      </template>
    </div>
    <Upload
      multiple
      action=""
      type="drag"
      ref="upload"
      :format="fileType"
      class="mt-10 upload"
      :show-upload-list="false"
      :before-upload="handleBeforeUpload"
      :on-format-error="handleFormatError"
    >
      <div class="icon">
        <Icon type="ios-camera" size="20"></Icon>
      </div>
    </Upload>
    <Modal title="图片详情" v-model="visible" fullscreen>
      <img class="w-100" v-if="visible" :src="image" />
    </Modal>
  </div>
</template>

<script>
export default {
  name: "SpaceUpload",
  props: { desc: String, uploadLimit: Number },
  data() {
    return {
      image: "",
      visible: false,
      uploadList: [],
      fileType: ["jpg", "jpeg", "png"]
    }
  },
  methods: {
    handleView(image) {
      this.image = image
      this.visible = true
    },
    handleRemove(index) {
      this.uploadList.splice(index, 1)
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "图片格式不正确！",
        desc: `${file.name} 图片格式不正确，请选择jpg（jpeg）或png格式的图片文件`,
        duration: 6
      })
    },
    handleBeforeUpload(file) {
      let check = ""
      if (this.uploadLimit) {
        check = this.uploadList.length < this.uploadLimit
        if (!check) {
          this.$Notice.warning({
            title: `最多可上传${this.uploadLimit}张图片！`
          })
          return
        }
      }
      const fileType = file.type
      if (
        fileType === "image/jpeg" ||
        fileType === "image/jpg" ||
        fileType === "image/png"
      ) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          this.uploadList.push(reader.result)
        }
      }
      return check
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-list {
  width: 150px;
  height: 150px;
  overflow: hidden;
  margin-right: 4px;
  position: relative;
  text-align: center;
  background: #fff;
  line-height: 150px;
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
  width: 150px;
  display: inline-block;
  .icon {
    width: 150px;
    height: 150px;
    line-height: 150px;
  }
}
</style>
