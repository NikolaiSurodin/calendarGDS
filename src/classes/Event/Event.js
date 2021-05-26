import {User} from '@/classes/User/User'

class Event {
    constructor(options) {
        this.user = new User(options.user)
        this.title = options.title
        this.comment = options.comment
        this.date_from = options.date_from
        this.date_to = options.date_to
        this.id = options.id
        this.busy = options.busy
        this.kind = options.kind
        this.request = options.request
    }
}

export {Event}