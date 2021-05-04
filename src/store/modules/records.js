import axios from "axios"

export default {
    state: {
        savedState: [],
        status: ''
    },
    actions: {
        saveRecords({commit}, payload) {
            commit('saveEvents', payload)
        },
        getRecords({commit}) {
            return new Promise((resolve) => {
                axios
                    .get('https://vacation-api.thirty3.tools/api/v1/frontend/events?page=4')
                    .then(response => {
                        const events = response.data.data
                        commit('getEvents', events)
                        resolve(response)
                    })
            })

        }
    },
    mutations: {
        saveEvents(state, payload) {
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
                        state.savedState = payload
                        //localStorage.setItem('calendarState', JSON.stringify(state.savedState))
                        resolve()
                    })
            })

        },
        getEvents(state, events) {
            state.savedState = events
        }
    },
    getters: {
        calendarState(state) {
            return state.savedState
        }
    }
}