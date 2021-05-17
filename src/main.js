import Vue from 'vue'
import App from './App.vue'
import axios from "axios"
import { store } from "@/store"
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Vuelidate from "vuelidate"
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'




import router from '@/router'

Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(router)

Vue.use(Vuelidate)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
new Vue({
  el:'#app',
  router,
  store,
  render: h => h(App),
})
