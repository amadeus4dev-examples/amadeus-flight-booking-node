// vue.config.js
module.exports = {
publicPath: "",
runtimeCompiler: true,
devServer: {
    disableHostCheck: true,
    port: 8080,
    public: '0.0.0.0:8080'
  }
}