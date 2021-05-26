import {User} from '@/classes/User/User'

class Event {
    user
    title
    comment
    date_from
    date_to
    id
    busy
    kind
    request

    constructor(options = {}) {
        for (let key of Object.keys(options)) {
            let tempData = null
            if (Object.hasOwnProperty.call(options, key)) {
                switch (key) {
                    case 'user':
                        tempData = new User(options[key])
                        break
                    default:
                        tempData = options[key]
                }
                this[key] = tempData
            }
        }
    }
}

export {Event}