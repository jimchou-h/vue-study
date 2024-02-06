const path = require('path')
const fse = require('fs-extra') // 继承了fs所有方法并为这些方法添加了promise语法

// 切片文件存储目录
const UPLOAD_DIR_TEMP = path.resolve(__dirname, '..', 'resource', 'temp')
// 文件存储目录
const UPLOAD_DIR_FILE = path.resolve(__dirname, '..', 'resource', 'file')

/**
 * 保存切片数据
 * @param {Object} fields
 * @param {Object} files
 */
const saveCutFile = async (fields, files) => {
  const [chunk] = files.chunk
  const [hash] = fields.hash
  const [filename] = fields.filename

  // 创建临时文件夹用于存储chunk
  // 添加chunkDir前缀与文件名做区分
  const chunkDir = path.resolve(UPLOAD_DIR_TEMP, 'chunkDir' + filename)

  // 如果文件不存在，先创建一个空目录来保存切片
  if (!fse.existsSync(chunkDir)) {
    await fse.mkdirs(chunkDir)
  }

  // 把切片移动到路径下
  // fs-extra的 rename 方法 windows 平台会有权限问题
  await fse.move(chunk.path, `${chunkDir}/${hash}`, { overwrite: true })

  return {
    type: 'success',
  }
}

const mergeCutFile = async (filename, size) => {
  // 写入文件流
  const pipeStream = (path, writeStream) => {
    console.log(path, writeStream)
    new Promise((resolve) => {
      const readStream = fse.createReadStream(path) // 创建读取流
      readStream.on('end', () => {
        fse.unlinkSync(path) // 删除文件
        resolve()
      })
      readStream.pipe(writeStream) // 将读取到的文件内容写入到新生成的文件中
    })
  }
  // 合并
  const mergeFileChunk = async (filePath, filename, size) => {
    const chunkDir = path.resolve(UPLOAD_DIR_TEMP, 'chunkDir' + filename)
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

  // path.resolve 将路径解析为绝对路径
  // 创建一个最终的路径，文件将合并后保存在那里
  const filePath = path.resolve(UPLOAD_DIR_FILE, filename)

  await mergeFileChunk(filePath, filename, size)

  return {
    type: 'success',
  }
}

module.exports = {
  saveCutFile,
  mergeCutFile,
}
