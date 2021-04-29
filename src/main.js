import Vue from 'vue'
import App from './App.vue'
import axios from "axios"
import {store} from "@/store"
import Vuetify from 'vuetify'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vuetify/dist/vuetify.css'


import router from '@/router'

Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(router)


Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Vuetify)
new Vue({
  el:'#app',
  router,
  store,
  render: h => h(App),
})
