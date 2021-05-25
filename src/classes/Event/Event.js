import {Profile} from '@/classes/Event/Profile'

class Event {
    constructor(options) {
        this.username = options.username
        this.email = options.email
        this.birthday = options.birthday
        this.password = options.password
        this.profile = new Profile(options.profile)
    }
}
export { Event }