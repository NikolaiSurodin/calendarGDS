import axios from "axios"

export default {
    state: {
        savedState: JSON.parse(localStorage.getItem('calendarState')) || [],
        status: ''
    },
    actions: {
        saveRecords({commit}, payload) {
            commit('saveEvents', payload)
        }
    },
    mutations: {
        saveEvents(state, payload) {
            return new Promise((resolve, reject) => {
                axios({
                    url: 'https://vacation-api.thirty3.tools/api/v1/frontend/events',
                    data: {
                        user: this.user.id,
                        title: payload.title,
                        comment: payload.description,
                        status: payload.status,
                        //тип события (daysoff, vacation)
                        kind: payload.kind,
                        busy: payload.busy,
                        request: payload.request,
                        date_from:payload.date_from,
                        date_to:payload.date_to,
                    },
                    method: 'POST'
                })
                    .then(() => {
                        state.savedState = payload
                        console.log(payload)
                        localStorage.setItem('calendarState', JSON.stringify(state.savedState))
                    })
                resolve()
                reject()
            })
        }
    },
    getters: {
        calendarState(state) {
            return state.savedState
        }
    }
}