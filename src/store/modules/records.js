import axios from "axios"

export default {
    state: {
        savedState: [],
        status: ''
    },
    actions: {
        saveEvents({commit}, payload) {
            return new Promise((resolve) => {
                axios({
                    url: 'https://vacation-api.thirty3.tools/api/v1/frontend/events',
                    data: {
                        user: this.user.id,
                        title: payload.title,
                        comment: payload.comment,
                        status: payload.status,
                        //тип события (daysoff, vacation)
                        kind: payload.kind,
                        busy: payload.busy,
                        request: payload.request,
                        date_from: payload.date_from,
                        date_to: payload.date_to,
                    },
                    method: 'POST'
                })
                    .then(() => {
                       commit('saveRecords',payload)
                        resolve()
                    })
            })

        },
        getRecords({commit}) {
            return new Promise((resolve) => {
                axios
                    .get('https://vacation-api.thirty3.tools/api/v1/frontend/events')
                    .then(response => {
                        const events = response.data.data
                        commit('getEvents', events)
                        resolve(response)
                    })
            })

        },
        deleteRecords({commit}, payload) {
            return new Promise(resolve => {
                axios
                    .delete(`https://vacation-api.thirty3.tools/api/v1/frontend/events/${payload.id}`)
                    .then(response => {
                        const events = response
                        commit('deleteEvents', events)
                        resolve()
                    })
            })
        },
        updateEvents({commit}, payload) {
            return new Promise(resolve => {
                axios({
                    url: `https://vacation-api.thirty3.tools/api/v1/frontend/events/${payload.id}`,
                    data: payload.value,
                    method: 'PATCH'
                })
                    .then(() => {
                        commit('getEvents', payload.value)
                    })
                resolve()
            })
        }
    },
    mutations: {
        saveRecords(state, payload) {
           state.savedState.push(payload)
        },
        getEvents(state, events) {
            state.savedState = events
        },
        deleteEvents(state, events) {
            state.savedState = events
        }

    },
    getters: {
        calendarState(state) {
            return state.savedState
        }
    }
}