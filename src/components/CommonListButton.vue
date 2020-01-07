<template>
  <div class="listButton">
    <Button
      type="warning"
      icon="md-trending-up"
      @click="deleteAccountModal = true"
      class="mr-10"
      >一键上线</Button
    >
    <Button
      type="warning"
      icon="md-trending-down"
      class="mr-10"
      @click="addAccountModal = true"
      >一键下线</Button
    >
    <Button
      type="info"
      icon="md-create"
      @click="deleteAccountModal = true"
      class="mr-10"
      >修改分组</Button
    >
    <Button
      type="info"
      icon="md-create"
      class="mr-10"
      @click="addAccountModal = true"
      >修改资料</Button
    >
    <Button
      type="info"
      icon="md-create"
      @click="deleteAccountModal = true"
      class="mr-10"
      >修改头像</Button
    >
    <Button
      type="info"
      icon="md-create"
      class="mr-10"
      @click="addAccountModal = true"
      >修改昵称</Button
    >
    <Button
      type="info"
      icon="md-create"
      @click="deleteAccountModal = true"
      class="mr-10"
      >修改密码</Button
    >
    <Button
      type="info"
      icon="md-create"
      class="mr-10"
      @click="addAccountModal = true"
      >修改朋友圈封面</Button
    >
    <Divider />
    <Button
      type="success"
      icon="md-settings"
      @click="deleteAccountModal = true"
      class="mr-10"
      >设置朋友圈权限</Button
    >
    <Button
      type="success"
      icon="md-unlock"
      class="mr-10"
      @click="addAccountModal = true"
      >解锁改密码权限</Button
    >
    <Button
      type="success"
      icon="md-unlock"
      @click="deleteAccountModal = true"
      class="mr-10"
      >解锁改资料权限</Button
    >
    <Button type="success" icon="md-unlock" @click="addAccountModal = true"
      >解锁改头像权限</Button
    >
  </div>
</template>

<script>
export default {
  name: "ListButton"
}
</script>

<style lang="scss" scoped></style>
