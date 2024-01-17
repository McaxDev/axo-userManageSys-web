import axios from 'axios'
import cookie from 'js-cookie'
import store from '../store/index'

const http = axios.create({
  baseURL: 'https://api.mcax.cn/sys',
  // baseURL: 'https://localhost:10808',
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer yourToken'
  }
})

http.interceptors.request.use(config => {
  const token = cookie.get('axotoken')
  if (token) {
    config.headers['Axotoken'] = token // 将 Token 添加到请求头
  }
  return config
}, error => {
  return Promise.reject(error)
})

http.interceptors.response.use(response => {
  return response
}, error => {
    if (error.response) {
        switch (error.response.status) {
            case 400:
              window.$message.error('请求错误!')
            break
            case 401:
              window.$message.error('无法验证的用户，请登录后再试！')
              store.commit('setLoginStatus', false)
              store.commit('setUserName', '')
              store.commit('setAdminStatus', 0)
              cookie.remove('axotoken')
            break
            case 403:
              window.$message.error('禁止访问!')
            break
            case 404:
              window.$message.error('404未找到!')
            break
            case 500:
              window.$message.error('服务器内部错误!')
            break
            case 502:
              window.$message.error('网络错误，请检查网络连接!')
            break
            default:
              window.$message.error('发生了一些错误!')
        }
    }
  return Promise.reject(error)
});

export default http
