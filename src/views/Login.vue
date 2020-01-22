<template>
  <div class="login">
    <Card class="login-card">
      <p slot="title"><Icon type="md-cloud-done" />请登录</p>
      <Form :model="loginForm" inline>
        <FormItem prop="username">
          <Input
            clearable
            type="text"
            size="large"
            placeholder="username"
            v-model="loginForm.user_account"
          >
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input
            clearable
            size="large"
            type="password"
            placeholder="password"
            v-model="loginForm.user_pwd"
          >
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <br />
        <FormItem>
          <Button
            type="info"
            shape="circle"
            icon="ios-radio-outline"
            @click="submitLogin"
            >登录</Button
          >
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
    async submitLogin() {
      const { msg, data } = await this.$http.post("/login", this.loginForm)
      if (msg === "登录成功") {
        this.$router.push("/grouping")
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
