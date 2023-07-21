const http = require('http')
const path = require('path')
const fse = require('fs-extra') // 继承了fs所有方法并为这些方法添加了promise语法
const multiparty = require('multiparty')

// 大文件存储目录
const UPLOAD_DIR = path.resolve(__dirname, '.', 'target')

const server = http.createServer()

const resolvePost = (req) => {
  return new Promise((resolve) => {
    let chunk = ''
    req.on('data', (data) => {
      chunk += data.toString()
    })
    req.on('end', () => {
      resolve(JSON.parse(chunk))
    })
  })
}

// 写入文件流
const pipeStream = (path, writeStream) => {
  new Promise((resolve) => {
    const readStream = fse.createReadStream(path) // 创建读取流
    readStream.on('end', () => {
      fse.unlinkSync(path) // 删除文件
      resolve()
    })
    readStream.pipe(writeStream) // 将读取到的文件内容写入到新生成的文件中
  })
}

const mergeFileChunk = async (filePath, filename, size) => {
  const chunkDir = path.resolve(UPLOAD_DIR, 'chunkDir' + filename)
  const chunkPaths = await fse.readdir(chunkDir) // 读取对应的文件夹
  // 根据切片下标进行排序
  // 否则直接读取目录的获得的顺序会错乱
  chunkPaths.sort((a, b) => a.split('-')[1] - b.split('-')[1])
  // 并发写入文件
  await Promise.all(
    chunkPaths.map((chunkPath, index) => {
      pipeStream(
        path.resolve(chunkDir, chunkPath),
        // 根据size在指定位置创建写入流
        fse.createWriteStream(filePath, {
          start: index * size,
        })
      )
    })
  )
}

server.on('request', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')

  if (req.method === 'OPTIONS') {
    res.status = 200
    res.end()
    return
  }

  if (req.url === '/api/upload') {
    const multipart = new multiparty.Form()
    multipart.parse(req, async (err, fields, files) => {
      if (err) {
        return
      }
      const [chunk] = files.chunk
      const [hash] = fields.hash
      const [filename] = fields.filename
      // 创建临时文件夹用于存储chunk
      // 添加chunkDir前缀与文件名做区分
      const chunkDir = path.resolve(UPLOAD_DIR, 'chunkDir' + filename)

      if (!fse.existsSync(chunkDir)) {
        await fse.mkdirs(chunkDir)
      }

      // fs-extra的 rename 方法 windows 平台会有权限问题
      await fse.move(chunk.path, `${chunkDir}/${hash}`)

      res.end(
        JSON.stringify({
          code: 200,
          message: 'upload success',
        })
      )
    })
  }

  if (req.url === '/api/merge') {
    const data = await resolvePost(req)
    const { filename, size } = data
    // path.resolve 将路径解析为绝对路径
    // 创建一个最终的路径，文件将合并后保存在那里
    const filePath = path.resolve(UPLOAD_DIR, filename)
    await mergeFileChunk(filePath, filename, size)
    res.end(
      JSON.stringify({
        code: 200,
        message: 'merge success',
      })
    )
  }
})

server.listen(3000, () => console.log('listening port 3000'))
