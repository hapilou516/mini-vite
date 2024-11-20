

const MagicString = require("magic-string");
const readBody = require("./utils");
const {parse} = require("es-module-lexer")

function rewriteImports(source){
  let imports = parse(source)[0]
  let ms  = new MagicString(source)
  if(imports.length > 0){
    for(let i =0;i<imports.length;i++){
      let {s,e} = imports[i]
      let id  = source.slice(s,e)
      if(/^[^\/\.]/.test(id)){
        id = `/@modules/${id}`
        ms.overwrite(s,e,id)
      }
    }
  }
  return ms.toString()

}
function serverPluginModuleRewrite({ app, root }) {
  app.use(async (ctx,next)=>{
    await next()
    // 将流转换为字符串,处理引用问题
    if(ctx.body && ctx.response.is("js")){
      let r = await readBody(ctx.body)
      const result = rewriteImports(r)
      ctx.body  = result
    }
  })
}

module.exports = serverPluginModuleRewrite;
