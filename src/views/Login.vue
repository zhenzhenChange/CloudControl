<template>
  <div class="login">
    <div class="sky">
      <div class="clouds_one"></div>
      <div class="clouds_two"></div>
      <div class="clouds_three"></div>
    </div>
    <Card class="login-card">
      <p slot="title"><Icon type="md-cloud-done" class="mr-10" />欢迎使用平台-请先登录</p>
      <Form :model="loginForm" class="">
        <FormItem>
          <Input
            clearable
            type="text"
            size="large"
            placeholder="account"
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
            placeholder="password"
            v-model="loginForm.user_pwd"
          >
            <Icon type="md-lock" slot="prepend" />
          </Input>
        </FormItem>
        <FormItem>
          <Button type="info" long @click="login" icon="md-log-in">登录</Button>
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
        this.$store.commit("saveID", String(data.user_id))
        this.$router.push("/data")
      }
      this.$Message.success(msg)
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  position: relative;
  .login-card {
    top: 50%;
    left: 50%;
    width: 350px;
    text-align: center;
    position: absolute;
    transform: translate(-50%, -50%);
  }
}
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

.sky {
  height: 100%;
  background: #007fd5;
  position: relative;
  overflow: hidden;
  -webkit-animation: sky_background 50s ease-out infinite;
  -moz-animation: sky_background 50s ease-out infinite;
  -o-animation: sky_background 50s ease-out infinite;
  animation: sky_background 50s ease-out infinite;
  -webkit-transform: translate3d(0, 0, 0);
  -ms-transform: translate3d(0, 0, 0);
  -o-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}

.sky .clouds_one {
  background: url("../assets/images/cloud_one.png");
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 300%;
  -webkit-animation: cloud_one 50s linear infinite;
  -moz-animation: cloud_one 50s linear infinite;
  -o-animation: cloud_one 50s linear infinite;
  animation: cloud_one 50s linear infinite;
  -webkit-transform: translate3d(0, 0, 0);
  -ms-transform: translate3d(0, 0, 0);
  -o-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}

.sky .clouds_two {
  background: url("../assets/images/cloud_two.png");
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 300%;
  -webkit-animation: cloud_two 75s linear infinite;
  -moz-animation: cloud_two 75s linear infinite;
  -o-animation: cloud_two 75s linear infinite;
  animation: cloud_two 75s linear infinite;
  -webkit-transform: translate3d(0, 0, 0);
  -ms-transform: translate3d(0, 0, 0);
  -o-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}

.sky .clouds_three {
  background: url("../assets/images/cloud_three.png");
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 300%;
  -webkit-animation: cloud_three 100s linear infinite;
  -moz-animation: cloud_three 100s linear infinite;
  -o-animation: cloud_three 100s linear infinite;
  animation: cloud_three 100s linear infinite;
  -webkit-transform: translate3d(0, 0, 0);
  -ms-transform: translate3d(0, 0, 0);
  -o-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}

@-webkit-keyframes sky_background {
  0% {
    background: #007fd5;
    color: #007fd5;
  }
  50% {
    background: #000;
    color: #a3d9ff;
  }
  100% {
    background: #007fd5;
    color: #007fd5;
  }
}
@-moz-keyframes sky_background {
  0% {
    background: #007fd5;
    color: #007fd5;
  }
  50% {
    background: #000;
    color: #a3d9ff;
  }
  100% {
    background: #007fd5;
    color: #007fd5;
  }
}
@keyframes sky_background {
  0% {
    background: #007fd5;
    color: #007fd5;
  }
  50% {
    background: #000;
    color: #a3d9ff;
  }
  100% {
    background: #007fd5;
    color: #007fd5;
  }
}

@-webkit-keyframes cloud_one {
  0% {
    left: 0;
  }
  100% {
    left: -200%;
  }
}
@-moz-keyframes cloud_one {
  0% {
    left: 0;
  }
  100% {
    left: -200%;
  }
}
@keyframes cloud_one {
  0% {
    left: 0;
  }
  100% {
    left: -200%;
  }
}

@-webkit-keyframes cloud_two {
  0% {
    left: 0;
  }
  100% {
    left: -200%;
  }
}
@-moz-keyframes cloud_two {
  0% {
    left: 0;
  }
  100% {
    left: -200%;
  }
}
@keyframes cloud_two {
  0% {
    left: 0;
  }
  100% {
    left: -200%;
  }
}

@-webkit-keyframes cloud_three {
  0% {
    left: 0;
  }
  100% {
    left: -200%;
  }
}
@-moz-keyframes cloud_three {
  0% {
    left: 0;
  }
  100% {
    left: -200%;
  }
}
@keyframes cloud_three {
  0% {
    left: 0;
  }
  100% {
    left: -200%;
  }
}
</style>
