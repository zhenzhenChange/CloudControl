<template>
  <div class="login">
    <Card class="login-card">
      <p slot="title"><Icon type="md-cloud-done" />请登录</p>
      <Form ref="loginForm" :model="loginForm" :rules="loginRules" inline>
        <FormItem prop="username">
          <Input
            clearable
            type="text"
            size="large"
            placeholder="username"
            v-model="loginForm.username"
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
            v-model="loginForm.password"
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
            @click="submitLogin('loginForm')"
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
      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [
          {
            required: true,
            trigger: "blur",
            message: "请填写用户名"
          }
        ],
        password: [
          {
            required: true,
            trigger: "blur",
            message: "请填写密码"
          },
          {
            min: 6,
            type: "string",
            trigger: "blur",
            message: "密码长度不能少于6位"
          }
        ]
      }
    }
  },
  methods: {
    submitLogin(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$router.push("/grouping")
          this.$Message.success("登录成功!")
        } else {
          this.$Message.error("未知错误!")
        }
      })
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
