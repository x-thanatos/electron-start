/**
 * Created by X.Jason on 2017/6/23.
 */
import Vue from 'vue'
import Resource from 'vue-resource'
import App from './app'

Vue.use(Resource)
const root = {}
document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: '#app',
    data: {
      root
    },
    components: {
      app: App
    }
  })
})
