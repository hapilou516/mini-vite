const path = require("path")
const fs = require('fs')
function vuePlugin({app,root}){
  app.use(async (ctx,next)=>{
    if(!ctx.path.endsWith('.vue')){
      return next()
    }

    const filePath = path.join(root,ctx.path)
    console.log(filePath);
    const content = await fs.readFile(filePath,'utf-8')
    console.log("content");
    console.log(content);
  })
}

exports.vuePlugin = vuePlugin