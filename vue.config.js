const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/spaceship-dashboard/' : '/',
  devServer: {
    proxy: {
      '/api': {
        target: 'https://caranferen.ru',
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/api': '/api' },
        logLevel: 'debug',
      },
    },
    host: 'localhost',
    port: 8080,
    client: {
      webSocketURL: 'ws://localhost:8080/ws',
    },
  },
})
