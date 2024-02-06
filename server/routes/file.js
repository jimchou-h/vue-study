const express = require('express')
const { parseForm } = require('../utils/index')
const { saveCutFile, mergeCutFile } = require('../controller/file')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const router = express.Router()

/**
 * 切片上传接口
 */
router.post('/cut-upload', async function (req, res, next) {
  const { type, err, fields, files } = await parseForm(req)
  if (type === 'success') {
    const result = await saveCutFile(fields, files)
    if (result.type === 'success') {
      res.json(new SuccessModel('upload success'))
    }
  } else {
    res.json(new ErrorModel(err))
  }
})

/**
 * 切片合并接口
 */
router.post('/cut-merge', async function (req, res, next) {
  const { filename, size } = req.body
  const result = await mergeCutFile(filename, size)
  if (result.type === 'success') {
    res.json(new SuccessModel('merge success'))
  } else {
    res.json(new ErrorModel('merge fail'))
  }
})

module.exports = router
