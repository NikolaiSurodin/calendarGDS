import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import records from "@/store/modules/records"
import auth from "@/store/modules/auth"
import user from "@/store/modules/user"


export const store = new Vuex.Store({
    modules: {
        records,
        auth,
        user
    }
})
