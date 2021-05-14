import Vue from 'vue'
import Router from 'vue-router'
import {store} from "@/store"

import calendar from '@/view/calendar'
import register from "@/view/register"
import login from "@/view/login"
import notFound from '@/components/notFound'
import userList from "@/view/userList";
import editProfile from "@/view/editProfile";
import formEvent from "@/components/formEvent";


Vue.use(Router)
const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: register
        },
        {
            path: '/login',
            component: login
        },

        {
            path: '/calendar',
            component: calendar,
            meta: {auth: true}
        },
        {
            path: '/all_users',
            component: userList,
            meta: {auth: true}
        },
        {
            path: '/edit_profile/:id',
            meta: {auth: true},
            component: {
                render(c) {
                    return c('router-view')
                }
            },
            children:[
                {
                    path:'',
                    component:editProfile
                }
            ]
        },
        {
            path: '/event/:id',
            meta: {auth: true},
            component: {
                render(c) {
                    return c('router-view')
                }
            },
            children:[
                {
                    path:'',
                    component:formEvent
                }
            ]
        },
        {
            path: '*',
            name: 'notFound',
            component: notFound
        },
    ]
})
router.beforeEach((to, from, next) => {
    if (to.matched.some(route => route.meta.auth) && !store.getters.isLoggedIn) {
        next('/')
    } else {
        next()
    }
})

export default router