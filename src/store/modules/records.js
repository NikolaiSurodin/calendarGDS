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
                        date_to: payload.date_to
                    },
                    method: 'POST'
                })
                    .then((response) => {
                        console.log(response)

                        let event = {
                            id:response.data.id,
                            comment:response.data.comment,
                            date_from:response.data.date_from,
                            date_to:response.data.date_to,
                            title:response.data.title,
                            user:response.data.user
                        }
                       commit('saveRecords',event)
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
                        commit('setEvents', events)
                        resolve(response)
                    })
            })

        },
        deleteRecords({commit, state}, payload ) {
            return new Promise(resolve => {
                axios
                    .delete(`https://vacation-api.thirty3.tools/api/v1/frontend/events/${payload.id}`)
                    .then(() => {
                        const events = state.savedState.filter((el) => el.id !== payload.id)
                        console.log(events)
                        commit('setEvents',events)
                        resolve()
                    })
            })
        },
        updateEvent({commit}, payload) {
            return new Promise(resolve => {
                axios({
                    url: `https://vacation-api.thirty3.tools/api/v1/frontend/events/${payload.id}`,
                    data: payload.value,
                    method: 'PATCH'
                })
                    .then(() => {
                        commit('setEvents', payload.value)
                    })
                resolve()
            })
        }
    },
    mutations: {
        saveRecords(state, event) {
           state.savedState.push(event)
        },
        setEvents(state, events) {
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