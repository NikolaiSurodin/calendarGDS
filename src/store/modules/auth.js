import axios from "axios";
import {store} from "@/store";

export default {
    state: {
        user: {},
        token: localStorage.getItem('token'),
        status: '',
        error: ''
    },
    actions: {
        // запрос на токен
        submitLogin({commit, dispatch}, data) {
            return new Promise((resolve, reject) => {
                commit('AUTH_REQUEST')
                axios(
                    {
                        url: 'https://vacation-api.thirty3.tools/token/auth',
                        data,
                        method: 'POST'
                    })
                    .then(response => {
                        const token = response.data.token
                        commit('AUTH_SUCCESS', token, data)
                        dispatch('setAuthHeader')
                        resolve(response)
                    })// в случае ошибки вызывается мутация и очищается локалСторадж
                    .catch(error => {
                        commit('SET_ERROR', error)
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
                axios(
                    {
                        url: 'https://vacation-api.thirty3.tools/api/v1/frontend/users',
                        data,
                        method: 'POST'
                    })
                    .then(response => {
                        const user = response.data
                        commit('AUTH_REGISTER', user, data)
                        resolve(response)
                    })
                    .catch(error => {
                        commit('SET_ERROR', error)
                        reject(error)
                    })
            })
        },
        //разлогинивание. удаляем из локалсторажда токен + заголовок. Возвращает промис
        logout({commit}) {
            return new Promise((resolve) => {
                commit('LOGOUT')
                localStorage.removeItem('token')
                delete axios.defaults.headers.common['Authorization']
                resolve()
            })
        },
        checkAuth({dispatch}) {
            return new Promise((resolve,reject) => {
                if (this.getters.isLoggedIn) {
                    dispatch('setAuthHeader')
                        .then(() => {
                            axios({url: 'https://vacation-api.thirty3.tools/api/v1/admin/auth/me', method: 'GET'})
                                .then(response => resolve(response))
                                .catch((Error) => {
                                    if (Error.response.status === 401) {
                                        dispatch('logout')
                                    }
                                    reject(Error)

                                })
                        })


                }
            })
        }
    },
    mutations: {
        AUTH_REQUEST(state) {
            state.status = 'loading'
        },
        AUTH_SUCCESS(state, token, user) {
            state.status = 'success'
            state.user = user
            store.commit('SET_TOKEN', token)
        },
        SET_TOKEN(state, token) {
            localStorage.setItem('token', token)
            state.token = localStorage.getItem('token')
        },
        SET_ERROR(state) {
            state.status = 'error'
        },
        LOGOUT(state) {
            state.token = null
            state.status = ''
        },
        AUTH_REGISTER(state, user) {
            state.user = user
        }
    },
    getters: {
        token: state => state.token,
        isLoggedIn: state => !!state.token
    }
}
