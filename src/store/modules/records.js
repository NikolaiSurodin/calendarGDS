import axios from "axios"

export default {
    state: {
        savedState: [],
        event: {},
        filEvents:[],
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
                        commit('saveRecords', event)
                        resolve()
                    })
            })

        },
        getRecords({commit}) {
            return new Promise((resolve) => {
                axios
                    .get('https://vacation-api.thirty3.tools/api/v1/frontend/events?expand=user.profile')
                    .then(response => {
                        const events = response.data.data
                        commit('setEvents', events)
                        resolve(response)
                    })
            })
        },
        filterEvents({commit}){
            return new Promise((resolve) => {
                axios
                    .get('https://vacation-api.thirty3.tools/api/v1/frontend/events?expand=user.profile')
                    .then(response => {
                        const events = response.data.data
                        console.log(events)
                        const filterEvents = events.filter((ev) => ev.status === 'pending')
                        console.log(filterEvents)
                        commit('filter', filterEvents)
                        resolve(response)
                    })
            })
        },
        deleteRecords({commit, state}, payload) {
            return new Promise(resolve => {
                axios
                    .delete(`https://vacation-api.thirty3.tools/api/v1/frontend/events/${payload.id}`)
                    .then(() => {
                        const events = state.savedState.filter((el) => el.id !== payload.id)
                        commit('setEvents', events)
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
                        const status = event.status
                        commit('setEvent', event, status)
                    })
                resolve()
            })
        },
        approveEvent({commit,state}, payload) {
            return new Promise(resolve => {
                axios({
                    url: `https://vacation-api.thirty3.tools/api/v1/frontend/events/${payload.id}`,
                    data: payload.value,
                    method: 'PATCH'
                })
                    .then((response) => {
                        const event = response.data
                        const apr = state.filEvents.filter((ev) => ev.status === 'pending' )
                        commit('filter', event, apr)
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
        setEvent(state, event, status) {
            state.event = event
            state.status = status
        },
        deleteEvents(state, events) {
            state.savedState = events
        },
        filter(state, events){
            state.filEvents = events
        }

    },
    getters: {
        calendarState(state) {
            return state.savedState
        },
        calendarEvent(state){
            return state.event
        },
        filterEvents(state) {
            return state.filEvents
        }
    }
}