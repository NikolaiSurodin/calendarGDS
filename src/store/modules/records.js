// import axios from "axios"
//
// export default {
//     state: {
//         savedState: JSON.parse(localStorage.getItem('calendarState')) || [],
//         status: ''
//     },
//     actions: {
//         saveRecords({commit}, payload) {
//             commit('saveEvents', payload)
//         },
//         getRecords({commit}) {
//             commit('getEvents')
//         }
//     },
//     mutations: {
//         saveEvents(state, payload) {
//             return new Promise((resolve, reject) => {
//                 axios({
//                     url: 'https://vacation-api.thirty3.tools/api/v1/frontend/events',
//                     data: {
//                         user: this.user.id,
//                         title: payload.title,
//                         comment: payload.description,
//                         status: payload.status,
//                         //тип события (daysoff, vacation)
//                         kind: payload.kind,
//                         busy: payload.busy,
//                         request: payload.request,
//                         date_from:payload.date_from,
//                         date_to:payload.date_to,
//                     },
//                     method: 'POST'
//                 })
//                     .then(() => {
//                         state.savedState = payload
//                         console.log(payload)
//                         localStorage.setItem('calendarState', JSON.stringify(state.savedState))
//                     })
//             })
//
//         },
//         getEvents(state) {
//             return new Promise((resolve, reject) => {
//                 axios
//                     .get('https://vacation-api.thirty3.tools/api/v1/frontend/events')
//                     .then(response => {
//                         state.savedState = response.data.data
//                         //console.log(state.savedState)
//                         localStorage.setItem('calendarState', JSON.stringify(state.savedState))
//                     })
//             })
//         }
//     },
//     getters: {
//         calendarState(state) {
//             return state.savedState
//         }
//     }
// }