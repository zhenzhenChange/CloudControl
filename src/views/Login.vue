<template>
  <div class="login">
    <Card class="login-card">
      <p slot="title">
        <Icon type="md-cloud-done" class="mr-10" />欢迎登录后台管理系统
      </p>
      <Form :model="loginForm" inline>
        <FormItem>
          <Input
            clearable
            type="text"
            size="large"
            placeholder="账号"
            v-model="loginForm.user_account"
          >
            <Icon type="md-person" slot="prepend" />
          </Input>
        </FormItem>
        <FormItem>
          <Input
            clearable
            size="large"
            type="password"
            placeholder="密码"
            v-model="loginForm.user_pwd"
          >
            <Icon type="md-lock" slot="prepend" />
          </Input>
        </FormItem>
        <br />
        <FormItem>
          <Button type="info" @click="login" icon="md-log-in">
            登录
          </Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: { user_account: "admin", user_pwd: "123456" }
    }
  },
  methods: {
    async login() {
      const { msg, data } = await this.$http.post("/login", this.loginForm)
      if (msg === "登录成功") {
        this.$router.push("/data")
        this.$store.commit("saveID", data.user_id)
      }
      this.$Message.success(msg)
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  text-align: center;
  padding-top: 250px;
  background-image: url(../assets/images/login.jpeg);
  .login-card {
    width: 400px;
    margin: 0 auto;
  }
}
</style>
