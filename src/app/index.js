/**
 * Created by X.Jason on 2017/7/4.
 */
import Vue from 'vue'
import { Lazyload } from 'mint-ui'
import template from './template.html'
import data from './data'
import methods from './methods'
import './style.scss'

Vue.use(Lazyload)
const myFavorite = {
  template,
  data,
  methods
}
export default Vue.component('my-favorite', myFavorite)
