const vueConfig = {
  publicPath: '/',
  outputDir: 'dist',
  devServer: {
    disableHostCheck: true,
    host: '127.0.0.1',
    port: 7004,
    open: true,
    proxy: {
      "/api/v1": {
        target: "http://172.16.97.194:7004",
        secure: false,
        changeOrigin: true
      },
      '/api/my/': {
        target: 'http://172.16.97.194:3000',
        changeOrigin: true,
      }
    },
    watchOptions: {
      ignored: ['**/node_modules', '**/.#*']
    }
  },
  runtimeCompiler: true,
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  }
}

module.exports = vueConfig
