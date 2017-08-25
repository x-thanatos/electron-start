/**
 * Created by X.Jason on 2017/7/4.
 */
import { Toast, Indicator } from 'mint-ui'

const URL_BASE = 'http://qjcg-oss.oss-cn-qingdao.aliyuncs.com/'
const search = function () {
  if (!this.form.keywords) {
    return
  }
  Indicator.open({
    text: '加载中...',
    spinnerType: 'fading-circle'
  })
  const req = {
    method: 'GET',
    url: '/api/getImage'
  }
  this.$http(req)
    .then(({ body }) => {
    console.log(body)
      this.result.url = ''
      if (body.data) {
        this.result.url = body.data[3].keyword
      } else {
        Toast('暂无数据')
      }
    })
    .catch(err => Toast(err.statusText))
    .finally(() => Indicator.close())
}
const methods = {
  search
}
export default methods
