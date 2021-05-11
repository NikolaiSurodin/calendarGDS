import axios from "axios"
import {User} from "@/classes/User"

export default {
    state: {
        user: {},
        users: [],
        superUser: null
    },
    actions: {
        infoUser({commit}) {
            return new Promise(resolve => {
                axios
                    .get('https://vacation-api.thirty3.tools/api/v1/frontend/me?expand=profile')
                    .then(response => {
                        let user = response.data.data.find(user => user)
                        this.user = new User(user)
                        commit('set_user', this.user)
                        resolve(response)
                    })
            })
        },
        allUsers({commit}) {
            return new Promise(resolve => {
                axios
                    .get('https://vacation-api.thirty3.tools/api/v1/frontend/users?expand=profile')
                    .then(response => {
                        const users = response.data.data
                        commit('all_users', users)
                        resolve()
                    })
            })
        },
        infoUserById({commit}, payload) {
            return new Promise(resolve => {
                axios
                    .get(`https://vacation-api.thirty3.tools/api/v1/frontend/users/${payload}?expand=profile`)
                    .then(response => {
                        const user = response.data
                        commit('set_user', user)
                    })
                resolve()
            })


        },
        updateUser({commit}, payload) {
            return new Promise(resolve => {
                axios({
                    url: `https://vacation-api.thirty3.tools/api/v1/frontend/me/${payload.id}`,
                    data: payload.value,
                    method: 'PATCH'
                })
                    .then((response) => {
                        const user = response.data
                        commit('set_user', user)
                    })
                resolve()
            })

        },
        isSuperUser({commit}) {
            return new Promise(resolve => {
                axios
                    .get('https://vacation-api.thirty3.tools/api/v1/admin/auth/me')
                    .then(response => {
                        const superUser = response.data.is_superuser
                        commit('set_superUser', superUser)
                    })
                resolve()
            })

        }
    },
    mutations: {
        set_user(state, user) {
            state.user = user
        },
        all_users(state, users) {
            state.users = users
        },
        set_superUser(state, superUser) {
            state.superUser = superUser
        }
    },
    getters: {
        user: state => state.user,
        users: state => state.users,
        isSuperUser: state => state.superUser
    }
}