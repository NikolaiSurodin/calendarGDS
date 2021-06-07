import Vue from 'vue'
import Router from 'vue-router'
import {store} from "@/store"

import AppCalendar from '@/view/AppCalendar'
import Register from "@/view/Register"
import Login from "@/view/Login"
import NotFound from '@/components/NotFound'
import AllUsersList from "@/view/AllUsersList";
import EditProfile from "@/view/EditProfile";


Vue.use(Router)
const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name:'register',
            component: Register,
            //редирект с '/' если залогинен на '/calendar'
            beforeEnter: (to, from, next) => {
                if (!store.getters.isLoggedIn){
                    next()
                }else {
                    next('/calendar')
                }
            },
        },
        {
            path: '/login',
            name:'login',
            component: Login
        },
        {
            path: '/calendar',
            name:'calendar',
            component: AppCalendar,
            meta: {auth: true}
        },
        {
            path: '/all_users',
            name:'UserList',
            component: AllUsersList,
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
            children: [
                {
                    path: '',
                    name:'editProfile',
                    component: EditProfile
                }
            ]
        },
        {
            path: '*',
            name: 'notFound',
            component: NotFound
        },
    ],

})
router.beforeEach((to, from, next) => {
    if (to.matched.some(route => route.meta.auth) && !store.getters.isLoggedIn) {
        next('/')
    } else {
        next()
    }

})

export default router