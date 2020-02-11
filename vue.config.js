module.exports = {
  devServer: {
    proxy: {
      "/cloud-api": {
        changeOrigin: true,
        target: "http://39.108.132.32:8080",
        pathRewrite: { "^/cloud-api": "/api" }
      }
    }
  },
  publicPath: "/cloud-control/"
}
