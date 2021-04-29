import Vue from 'vue'
import Vuex from 'vuex'
import records from "@/store/modules/records"
import auth from "@/store/modules/auth"
import user from "@/store/modules/user"
Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        records,
        auth,
        user
    }
})
