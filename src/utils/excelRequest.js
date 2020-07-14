import axios from 'axios'
import store from '../store/index'
import { parseTime } from '../utils'
//导出
export function baasRequest(url, body, name, method = 'post') {
  axios({
    method: method,
    url: process.env.BASE_API + url,
    headers: {
      'Content-Type': 'application/json'
    },
    responseType: 'blob',
    ...body
  }).then(res => {
    const clientCode = store.state.user.clientCode
    const date = new Date()
    const fliName = clientCode + '-' + parseTime(date)
    const link = document.createElement('a')
    const blob = new Blob([res.data], { type: 'multipary/form-data' })
    link.style.display = 'none'
    link.href = URL.createObjectURL(blob)
    link.setAttribute('download', `${name}-${fliName}.xlsx`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  })
}
//导入
export function uploadRequest(data, URL, callback1, callback2) {
  axios({
    url: process.env.BASE_API + URL,
    method: 'post',
    onUploadProgress: function (progressEvent) {
      // 原生获取上传进度的事件
      if (progressEvent.lengthComputable) {
        callback1(progressEvent)
      }
    },
    data: data
  })
    .then(res => {
      callback2(res.data)
    })
    .then({})
}
