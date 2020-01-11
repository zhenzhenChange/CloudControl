<template>
  <div class="login">
    <Card class="login-card">
      <p slot="title"><Icon type="md-cloud-done" />请登录</p>
      <Form ref="loginForm" :model="loginForm" :rules="loginRules" inline>
        <FormItem prop="username">
          <Input
            type="text"
            size="large"
            v-model="loginForm.username"
            placeholder="username"
            clearable
          >
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input
            size="large"
            type="password"
            v-model="loginForm.password"
            placeholder="password"
            clearable
          >
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <br />
        <FormItem>
          <Button
            type="info"
            shape="circle"
            @click="submitLogin('loginForm')"
            icon="ios-radio-outline"
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
            message: "请填写用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请填写密码",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "密码长度不能少于6位",
            trigger: "blur"
          }
        ]
      }
    }
  },
  methods: {
    submitLogin(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("登录成功!")
          this.$router.push("/grouping")
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
