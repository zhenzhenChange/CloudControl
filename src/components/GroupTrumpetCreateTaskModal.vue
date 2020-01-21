<template>
  <Modal
    width="500"
    :mask-closable="false"
    v-model="isShowCreateModal"
    @on-visible-change="visibleChange"
    class-name="vertical-center-modal"
  >
    <p slot="header">
      <Icon color="#2d8cf0" type="md-create" class="mr-5" />创建任务
    </p>
    <div class="task-input">
      <Input v-model="taskName" placeholder="请输入任务名称">
        <span slot="prepend">任务名称</span>
      </Input>
    </div>
    <div class="task-select">
      <SearchSelect :info="'分组'" :title="'账号分组'" :options="options" />
      <Button class="ml--20" type="primary" shape="circle" icon="md-refresh" />
    </div>
    <div class="radio mt-10">
      <span class="label mr-10">{{ config.label }}</span>
      <RadioGroup v-model="value" @on-change="radioChange">
        <Radio class="mr-20" :label="config.reallyText" />
        <Radio :label="config.fakeText" />
      </RadioGroup>
    </div>
    <div class="task-upload" v-if="isShowTextarea">
      <div class="upload mt-10 mb-10">
        <span class="title mr-10">账号数据</span>
        <Upload
          action=""
          :show-upload-list="false"
          :before-upload="handleBeforeUpload"
        >
          <Button icon="md-cloud-upload">上传数据</Button>
        </Upload>
      </div>
      <Input
        type="textarea"
        v-model="accountData"
        placeholder="账号格式：一行一个微信号"
        :autosize="{ minRows: 5, maxRows: 20 }"
      >
      </Input>
    </div>
    <RangeDatePicker class="mt-10 date" />
    <div class="task-input mt-10">
      <Input v-model="interchatInterval" placeholder="请输入聊天间隔（单位S）">
        <span slot="prepend">聊天间隔</span>
      </Input>
    </div>
    <div class="task-switch mt-10">
      <span class="mr-10">自动回复</span>
      <i-switch size="large">
        <span slot="open">开启</span>
        <span slot="close">关闭</span>
      </i-switch>
    </div>
    <div slot="footer">
      <Button icon="md-remove-circle">取消</Button>
      <Button type="success" icon="md-checkmark">确定</Button>
    </div>
  </Modal>
</template>

<script>
export default {
  name: "TrumpetCreateTaskModal",
  props: {
    options: Array,
    config: Object
  },
  data() {
    return {
      taskName: "",
      accountData: "",
      isShowTextarea: false,
      interchatInterval: "",
      isShowCreateModal: false,
      value: this.config.reallyText
    }
  },
  methods: {
    visibleChange(value) {
      if (!value) {
        this.isShowCreateModal = false
      }
    },
    radioChange(value) {
      if (value === "添加号码") {
        this.isShowTextarea = true
      } else {
        this.isShowTextarea = false
      }
    },
    handleBeforeUpload(file) {
      const reader = new FileReader()
      reader.readAsText(file)
      reader.onload = () => {
        this.accountData = reader.result
      }
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
.task-input {
  width: 275px;
}

.task-select {
  margin-top: 10px;
  padding-left: 7px;
}

.radio {
  padding-left: 6px;
  .label {
    float: left;
    height: 22.7px;
    line-height: 25px;
  }
  .ivu-radio-group {
    display: inline-block;
  }
}

.date {
  margin-left: 6px;
}

.task-switch {
  margin-left: 6px;
}

.task-upload {
  padding-left: 6px;
  .upload {
    .title {
      width: 56px;
      float: left;
      height: 32px;
      display: block;
      line-height: 32px;
    }
  }
}
</style>
