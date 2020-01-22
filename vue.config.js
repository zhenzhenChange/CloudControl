module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://39.108.132.32:8080",
        changeOrigin: true
      }
    }
  }
  // publicPath: "/cloud-control/"
}
