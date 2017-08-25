/**
 * Created by X.Jason on 2017/7/4.
 */
import { Toast, Indicator } from 'mint-ui'

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
  const message = '看，好多美女!'
  this.$http(req)
  .then(({ body }) => {
    this.result.url = ''
    if (body.data) {
      this.result.url = body.data[3].keyword
    } else {
      Toast(message)
    }
  })
  .catch(err => Toast(err.statusText ? err.message : message))
  .finally(() => Indicator.close())
}
const methods = {
  search
}
export default methods
