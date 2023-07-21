<script lang="ts" setup name="large-file-upload-index">
import { reactive } from 'vue'
import { upload, merge } from '@/api/index.ts'

type UploadList = {
  chunk: Blob
  hash: string
}

// 切片大小
const SIZE = 10 * 1024 * 1024

const form = reactive({
  file: null as any,
})

// 切片上传完毕，提交合并请求
const mergeRequest = () => {
  merge({
    filename: (form.file as any).name,
    size: SIZE,
  })
}

// 创建一个切片数组
const createFileChunk = (file: File, size = SIZE) => {
  const fileChunkList: { file: Blob }[] = []
  let cur = 0
  while (cur < file.size) {
    fileChunkList.push({
      file: file.slice(cur, cur + size),
    })
    cur += size
  }
  return fileChunkList
}

// 上传切片
const uploadChunks = async (data: UploadList[]) => {
  const requestList = data
    .map(({ chunk, hash }) => {
      const formData = new FormData()
      formData.append('chunk', chunk)
      formData.append('hash', hash)
      formData.append('filename', form.file.name)
      return { formData }
    })
    .map(({ formData }) => {
      return upload(formData)
    })

  await Promise.all(requestList)
  mergeRequest()
}

const handleUpload = () => {
  if (!form.file) {
    return
  }
  const fileChunkList = createFileChunk(form.file)
  const data: UploadList[] = fileChunkList.map(({ file }, index) => ({
    chunk: file,
    // 文件名 + 数组下标
    hash: (form.file as any).name + '-' + index,
  }))
  uploadChunks(data)
}

const handleFileChange = (e: any) => {
  form.file = e.target.files[0]
}
</script>

<template>
  <div>
    <input type="file" @change="handleFileChange" />
    <el-button @click="handleUpload">upload</el-button>
  </div>
</template>
