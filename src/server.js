
const Koa = require("koa")
// const process = require("process")
const serverStaticPlugin = require("./serverPluginServeStatic")
const serverPluginModuleRewrite = require("./serverPluginModuleRewrite")
const {mouduleResolvePlugin} = require("./serverPluginMouleResolvejs")
const { vuePlugin } = require("./serverPluginVue")
function createServer(){
  let app = new Koa()
  const context = { // 创建的上下文，共享
    app,
    // 进程当前的进程目录
    root:"D:/桌面/vite-product/vite-vue"
  }
  
  const resolvePlugin = [
    serverPluginModuleRewrite, // 重写请求路径
    mouduleResolvePlugin,
    vuePlugin, //解析.vue文件
    serverStaticPlugin, //静态服务插件
  ]
  resolvePlugin.forEach(plugin=>{
    return plugin(context)
  })
  return app
}


createServer().listen(4000,()=>{
  console.log("vite start 4000");
})