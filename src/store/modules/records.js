import axios from "axios"

export default {
    state: {
        savedState: [],
        event:{},
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
                        const event = response.data
                       commit('saveRecords',event)
                        resolve()
                    })
            })

        },
        getRecords({commit}) {
            return new Promise((resolve) => {
                axios
                    .get('https://vacation-api.thirty3.tools/api/v1/frontend/events?expand=user')
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
                    .then((response) => {
                        const event = response.data
                        commit('setEvent', event)
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
        setEvent(state, event) {
          state.event = event
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