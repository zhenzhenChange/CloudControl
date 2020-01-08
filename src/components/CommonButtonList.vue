<template>
  <!-- 按钮组复用组件 -->
  <div class="ButtonList">
    <Button
      class="mr-10"
      :key="index"
      :type="buttonInfo.type"
      :icon="buttonInfo.icon"
      v-for="(buttonInfo, index) in buttonListInfos"
      >{{ buttonInfo.name }}</Button
    >
  </div>
</template>

<script>
export default {
  name: "ButtonList",
  props: {
    buttonListInfos: Array
  }
}
</script>
