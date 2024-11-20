
const { Readable } = require("stream")
async function readBody(stream) {
  // 将流拼接成一个字符串
  if (stream instanceof Readable) {
    return new Promise((resolve, reject) => {
      let res = ""
      stream.on('data', function (chunk) {
        res += chunk
      })
      stream.on('end', function () {
        resolve(res)
      })
    })
  } else {
    return stream
  }
}
module.exports = readBody