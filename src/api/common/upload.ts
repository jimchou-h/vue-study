import request from '@/util/request'

export const upload = (form: FormData) => {
  return request.post('/api/file/cut-upload', form)
}

export const merge = (form: any) => {
  return request.post('/api/file/cut-merge', form)
}
