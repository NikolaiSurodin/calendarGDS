import axios from "axios"
import {User} from "@/classes/User/User"

export default {
    state: {
        user: {},
        users: [],
        superUser: null
    },
    actions: {
        infoUser({commit}) {
            return new Promise((resolve, reject) => {
                axios
                    .get('https://vacation-api.thirty3.tools/api/v1/frontend/me?expand=profile')
                    .then(response => {
                        let user = response.data.data.find(user => user)
                        this.user = new User(user)
                        console.log(this.user)
                        commit('SET_USER', this.user)
                        resolve(response)
                    })
                    .catch((error) => reject(error))
            })
        },
        allUsers({commit}) {
            return new Promise((resolve, reject) => {
                axios
                    .get('https://vacation-api.thirty3.tools/api/v1/frontend/users?expand=profile')
                    .then(response => {
                        const users = response.data.data
                        commit('ALL_USERS', users)
                        resolve()
                    })
                    .catch((error) => reject(error))
            })
        },
        infoUserById({commit}, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .get(`https://vacation-api.thirty3.tools/api/v1/frontend/users/${payload}?expand=profile`)
                    .then(response => {
                        const user = response.data
                        commit('SET_USER', user)
                        resolve()
                    })
                    .catch((error) => reject(error))
            })
        },
        updateUser({commit}, payload) {
            return new Promise((resolve, reject) => {
                axios({
                    url: `https://vacation-api.thirty3.tools/api/v1/frontend/me/${payload.id}`,
                    data: payload.value,
                    method: 'PATCH'
                })
                    .then(() => {
                        commit('SET_USER', payload.value)
                        resolve()
                    })
                    .catch(error => reject(error))
            })

        },
        isSuperUser({commit}) {
            return new Promise((resolve, reject) => {
                axios
                    .get('https://vacation-api.thirty3.tools/api/v1/admin/auth/me')
                    .then(response => {
                        const superUser = response.data.is_superuser
                        commit('SET_SUPER_USER', superUser)
                        resolve()
                    })
                    .catch((error) => reject(error))
            })

        }
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user
        },
        ALL_USERS(state, users) {
            state.users = users
        },
        SET_SUPER_USER(state, superUser) {
            state.superUser = superUser
        }
    },
    getters: {
        user: state => state.user,
        users: state => state.users,
        isSuperUser: state => state.superUser
    }
}