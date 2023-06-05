module.exports = {
  runtimeCompiler: true,
  devServer: {
    disableHostCheck: true,
    port: 8080,
    public: 'server-flight-booking.azurewebsites.net:8080',
    proxy: {
      '/citySearch': {
        target: 'https://server-flight-booking.azurewebsites.net',
        changeOrigin: true,
      },
    },
  },
  publicPath: '/',
};