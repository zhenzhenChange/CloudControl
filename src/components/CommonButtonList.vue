<template>
  <!-- 按钮组复用组件 -->
  <div class="ButtonList">
    <Button
      :key="index"
      class="mr-10"
      :disabled="listBatch"
      :type="buttonInfo.type"
      :icon="buttonInfo.icon"
      :ref="`button${index}`"
      @click="clickEvent"
      v-for="(buttonInfo, index) in buttonListInfos"
      >{{ buttonInfo.name }}</Button
    >
  </div>
</template>

<script>
export default {
  name: "ButtonList",
  props: {
    listBatch: Boolean,
    buttonListInfos: Array
  },
  methods: {
    clickEvent(e) {
      if (e.toElement.innerText === "一键上线") {
        this.$parent.trendUp()
      }
      if (e.toElement.innerText === "一键下线") {
        this.$parent.trendDown()
      }
    }
  }
}
</script>
