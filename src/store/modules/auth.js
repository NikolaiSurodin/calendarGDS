import axios from "axios";
import {store} from "@/store";

export default {
    state: {
        user: {},
        token: localStorage.getItem('token'),
        status: '',
        error:''
    },
    actions: {
        // запрос на токен
        submitLogin({commit}, data) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios({url: 'https://vacation-api.thirty3.tools/token/auth', data, method: 'POST'})
                    .then(response => {
                        const token = response.data.token
                        commit('auth_success', token, data)
                        this.dispatch('setAuthHeader')
                        resolve(response)
                    })// в случае ошибки вызывается мутация и очищается локалСторадж
                    .catch(error => {
                        commit('set_error', error)
                        localStorage.removeItem('token')
                        reject(error)
                    })
            })
        },
        //устанавливаем заголовок запроса
        setAuthHeader() {
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.getters.token}`
        },
        register({commit}, data) {
            return new Promise((resolve, reject) => {
                axios({url: 'https://vacation-api.thirty3.tools/api/v1/frontend/users', data, method: 'POST'})
                    .then(response => {
                        const user = response.data
                        commit('auth_register', user, data)
                        resolve(response)
                    })
                    .catch(err => {
                        commit('set_error', err)
                        reject(err)
                    })
            })
        },
        //разлогинивание. удаляем из локалсторажда токен + заголовок. Возвращает промис
        logout({commit}) {
            return new Promise((resolve) => {
                commit('logout')
                localStorage.removeItem('token')
                delete axios.defaults.headers.common['Authorization']
                resolve()
            })
        },
        checkAuth() {
            return new Promise((resolve, reject) => {
                if (this.getters.isLoggedIn) {
                    this.dispatch('setAuthHeader')
                        .then(() => {
                            axios({url: 'https://vacation-api.thirty3.tools/api/v1/frontend/auth/me', method: 'GET'})
                                .then(response => resolve(response))
                        })
                        .catch((error) => {
                            if (error.status === 401 && error.status === 404) {
                                console.log(error)
                                this.dispatch('logout')

                            }
                        })
                } else {
                    reject()
                }
            })
        }
    },
    mutations: {
        auth_request(state) {
            state.status = 'loading'
        },
        auth_success(state, token, user) {
            state.status = 'success'
            state.user = user
            store.commit('set_token', token)
        },
        set_token(state, token) {
            localStorage.setItem('token', token)
            state.token = localStorage.getItem('token')
        },
        set_error(state) {
            state.status = 'error'
        },
        logout(state) {
            state.token = null
            state.status = ''
        },
        auth_register(state, user) {
            state.user = user
        }
    },
    getters: {
        token: state => state.token,
        isLoggedIn: state => !!state.token
    }
}
