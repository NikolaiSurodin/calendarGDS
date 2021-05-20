import axios from "axios"

export default {
    state: {
        //все событий
        events: [],
        // выбранное событие
        currentEvent: {},

        //фильтрованные для списка заявок
        filteredEvents:[],

        status: ''
    },
    actions: {
        saveEvents({commit}, payload) {
            return new Promise((resolve) => {
                axios({
                    url: 'https://vacation-api.thirty3.tools/api/v1/frontend/events',
                    data: {
                        // берем id из присланного объекта
                        user: payload.user.id,
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
                        // сразу складываем присланного юзера, т.к. нам сразу не прилетает expand
                        const event = {...response.data, user: payload.user}
                        commit('addEvent', event)
                        resolve()
                    })
            })

        },
        getRecords({commit, dispatch}) {
            return new Promise((resolve) => {
                axios
                    .get('https://vacation-api.thirty3.tools/api/v1/frontend/events?expand=user.profile')
                    .then(response => {
                        const events = response.data.data
                        commit('setEvents', events)
                        // и сразу фильтруем.
                        dispatch('filterEvents')
                        resolve(response)
                    })
            })
        },
        filterEvents({commit, state}){
            return new Promise((resolve) => {
                // тут мы берем все, без запроса, запрос всегда будет проихсодить на getRecords
                const filterEvents = state.events.filter((ev) => ev.status === 'pending')
                commit('setFilteredEvents', filterEvents)
                resolve(filterEvents)
            })
        },
        deleteRecords({commit, state}, payload) {
            return new Promise(resolve => {
                axios
                    .delete(`https://vacation-api.thirty3.tools/api/v1/frontend/events/${payload.id}`)
                    .then(() => {
                        const events = state.events.filter((el) => el.id !== payload.id)
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
                        commit('setCurrentEvent', event, status)
                    })
                resolve()
            })
        },
        approveEvent({commit, dispatch}, payload) {
            return new Promise(resolve => {
                axios({
                    url: `https://vacation-api.thirty3.tools/api/v1/frontend/events/${payload.id}`,
                    data: payload.value,
                    method: 'PATCH'
                })
                    .then((response) => {
                        const event = response.data
                        // аппрувим ивент в нашем локальном сторадже
                        commit('approveEvent', event)
                        // просим стор перефильтровать то, что у нас есть
                        dispatch('filterEvents')
                    })
                resolve()
            })
        }
    },
    mutations: {
        addEvent(state, event) {
            state.events.push(event)
            state.filteredEvents.push(event)
        },
        setEvents(state, events) {
            state.events = events
        },
        setCurrentEvent(state, event, status) {
            state.currentEvent = event
            state.currentStatus = status
        },
        approveEvent(state, event){
            // ищем то, что мы только что апрувнули, то же самое нужно сделать для reject
            let ev = state.filteredEvents.find(el => el.id === event.id)
            if ( ev ) {
                // т.к. вернется нам референс на объект, и мы его нашли, сразу патчим нужный объект
                ev.status = 'approved'
            }
        },
        setFilteredEvents(state, events){
          state.filteredEvents = events
        }

    },
    getters: {
        getEvents(state) {
            return state.events
        },
        getCurrentEvent(state){
            return state.currentEvent
        },
        getFilteredEvents(state) {
            return state.filteredEvents
        }
    }
}