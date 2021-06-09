import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import axios from "axios"
import { store } from "@/store"

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Vuelidate from "vuelidate"
import VueSweetalert2 from 'vue-sweetalert2'


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'sweetalert2/dist/sweetalert2.min.css'



Vue.prototype.$http = axios
Vue.config.productionTip = false



Vue.use(router)
Vue.use(Vuelidate)
Vue.use(VueSweetalert2)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

new Vue({
  el:'#app',
  router,
  store,
  render: h => h(App),
})
