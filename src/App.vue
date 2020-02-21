<template>
  <div id="app">
    <keep-alive exclude="taskAdd">
      <router-view />
    </keep-alive>
  </div>
</template>

<style lang="scss" scope>
#app {
  color: #2c3e50;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
</style>
