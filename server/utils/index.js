const multiparty = require('multiparty') // 解析 multipart/form-data 的值

const parseForm = (req) => {
  return new Promise((resolve, reject) => {
    const form = new multiparty.Form()
    form.parse(req, function (err, fields, files) {
      if (err) {
        resolve({
          type: 'error',
          err,
        })
      } else {
        resolve({
          type: 'success',
          fields,
          files,
        })
      }
    })
  })
}

module.exports = {
  parseForm,
}
