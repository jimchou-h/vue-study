const express = require('express')
const cookieParser = require('cookie-parser')
const createError = require('http-errors') // 创建一个错误对象返回

const fileRouter = require('./routes/file')

const app = express()

// 设置跨域请求
app.all('*', (req, res, next) => {
  const origin = req.headers.origin
  res.header('Access-Control-Allow-Origin', origin)
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, token'
  )
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE')
  next()
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/api/file', fileRouter)

app.use(function (req, res, next) {
  next(createError(404))
})

module.exports = app
