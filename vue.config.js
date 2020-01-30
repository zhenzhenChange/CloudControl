module.exports = {
  devServer: {
    proxy: {
      "/cloud-api": {
        target: "http://39.108.132.32:8080",
        changeOrigin: true,
        pathRewrite: { "^/cloud-api": "/api" }
      }
    }
  },
  publicPath: "/cloud-control/"
}
