<template>
  <div class="RangeDatePicker">
    <span class="mr-10">时间范围</span>
    <DatePicker
      transfer
      separator="  至  "
      style="width: 350px"
      type="datetimerange"
      placeholder="请选择时间范围"
      format="yyyy-MM-dd HH:mm:ss"
    ></DatePicker>
  </div>
</template>

<script>
export default {
  name: "RangeDatePicker"
}
</script>
