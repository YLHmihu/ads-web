module.exports = {
  publicPath: process.env.PUBLIC_PATH, // 静态资源路径（要以/结尾）
  lintOnSave: false,
  chainWebpack: config => {
    // 取消 prefetch 功能
    config.plugins.delete('prefetch')
  },
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/itf/fixcsfront/api': {
        target: 'https://www.unicompayment.com/',
        changeOrigin: true,
        secure: false
      }
    }
  }
}
