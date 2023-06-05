// vue.config.js
module.exports = {
publicPath: "",
runtimeCompiler: true,
devServer: {
    disableHostCheck: true,
    port: 8080,
    public: (process.env.PROTOCOL_HOST || "http://localhost") + ':8080'
  }
}