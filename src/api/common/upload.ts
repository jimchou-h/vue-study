import request from '@/util/request'

export const upload = (form: FormData) => {
  return request.post('/api/upload', form)
}

export const merge = (form: any) => {
  return request.post('/api/merge', form)
}
