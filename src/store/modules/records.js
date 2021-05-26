import axios from "axios"
import {Event} from "@/classes/Event/Event";

export default {
    state: {
        //все события
        events: [],

        // выбранное событие
        currentEvent: {},

        //фильтрованные для списка заявок
        filteredEvents: [],

        status: ''
    },
    actions: {
        saveEvents({commit}, payload) {
            return new Promise((resolve, reject) => {
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
                        let event = new Event({...response.data, user:payload.user})
                        commit('ADD_EVENT', event)
                        resolve()
                    })
                    .catch((error) => {
                        reject(error)
                    })

            })

        },
        getRecords({commit, dispatch}) {
            return new Promise((resolve, reject) => {
                axios
                    .get('https://vacation-api.thirty3.tools/api/v1/frontend/events?expand=user.profile')
                    .then(response => {
                        const events = response.data.data
                        commit('SET_EVENTS', events)
                        // и сразу фильтруем.
                        dispatch('filterEvents')
                        resolve(response)
                    })
                    .catch((error) => reject(error))
            })
        },
        filterEvents({commit, state}) {
            return new Promise((resolve, reject) => {
                // тут мы берем все, без запроса, запрос всегда будет проихсодить на getRecords
                const filterEvents = state.events.filter((ev) => ev.status === 'pending')
                commit('SET_FILTERED_EVENTS', filterEvents)
                resolve(filterEvents)
                reject(error => console.log(error))
            })
        },
        deleteRecords({commit, state}, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .delete(`https://vacation-api.thirty3.tools/api/v1/frontend/events/${payload.id}`)
                    .then(() => {
                        const events = state.events.filter((el) => el.id !== payload.id)
                        commit('SET_EVENTS', events)
                        resolve()
                    })
                    .catch(error => reject(error))
            })
        },
        updateEvent({commit}, payload) {
            return new Promise((resolve, reject) => {
                axios({
                    url: `https://vacation-api.thirty3.tools/api/v1/frontend/events/${payload.id}`,
                    data: payload.value,
                    method: 'PATCH'
                })
                    .then((response) => {
                        let event = response.data
                        const status = event.status
                        commit('SET_CURRENT_EVENT', event, status)
                        resolve()
                    })
                    .catch(error => reject(error))
            })
        },
        approveEvent({commit, dispatch}, payload) {
            return new Promise((resolve, reject) => {
                axios({
                    url: `https://vacation-api.thirty3.tools/api/v1/frontend/events/${payload.id}`,
                    data: payload.value,
                    method: 'PATCH'
                })
                    .then((response) => {
                        const event = response.data
                        // аппрувим ивент в нашем локальном сторадже
                        commit('APPROVE_EVENT', event)
                        // просим стор перефильтровать то, что у нас есть
                        dispatch('filterEvents')
                        resolve()
                    })
                    .catch(error => reject(error))


            })
        },
        rejectEvent({commit, dispatch}, payload) {
            return new Promise((resolve, reject) => {
                axios({
                    url: `https://vacation-api.thirty3.tools/api/v1/frontend/events/${payload.id}`,
                    data: payload.value,
                    method: 'PATCH'
                })
                    .then((response) => {
                        const event = response.data
                        // аппрувим ивент в нашем локальном сторадже
                        commit('REJECT_EVENT', event)
                        // просим стор перефильтровать то, что у нас есть
                        dispatch('filterEvents')
                        resolve()
                    })
                    .catch(error => reject(error))

            })
        }
    },
    mutations: {
        ADD_EVENT(state, event) {
            state.events.push(event)
            state.filteredEvents.push(event)
        },
        SET_EVENTS(state, events) {
            state.events = events
        },
        SET_CURRENT_EVENT(state, event, status) {
            state.currentEvent = event
            state.currentStatus = status
        },
        APPROVE_EVENT(state, event) {
            // ищем то, что мы только что апрувнули, то же самое нужно сделать для reject
            let ev = state.filteredEvents.find(el => el.id === event.id)
            if (ev) {
                // т.к. вернется нам референс на объект, и мы его нашли, сразу патчим нужный объект
                ev.status = 'approved'
            }
        },
        REJECT_EVENT(state, event) {
            let ev = state.filteredEvents.find(el => el.id === event.id)
            if (ev) {
                // т.к. вернется нам референс на объект, и мы его нашли, сразу патчим нужный объект
                ev.status = 'rejected'
            }
        },
        SET_FILTERED_EVENTS(state, events) {
            state.filteredEvents = events
        }

    },
    getters: {
        getEvents(state) {
            return state.events
        },
        getCurrentEvent(state) {
            return state.currentEvent
        },
        getFilteredEvents(state) {
            return state.filteredEvents
        }
    }
}