import {Profile} from '@/classes/User/Profile'


class User {

    constructor(options) {
        this.birthday = options.birthday
        this.email = options.email
        this.password = options.password
        this.id = options.id
        this.profile = new Profile(options.profile)
        this.user_hide = options.user_hide
        this.username = options.username

    }
    get AvatarText () {
        if (this.profile.first_name && this.profile.last_name) {
            let avatarName = this.profile.first_name.split('')[0]
            let avatarLastName = this.profile.last_name.split('')[0]
            return avatarName + avatarLastName
        } else {
            return 'XX'
        }
    }
}


export {User}