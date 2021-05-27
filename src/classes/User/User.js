import {Profile} from '@/classes/User/Profile'

class User {
    birthday
    email
    password
    id
    profile
    username
    user_hide

    constructor(options = {}) {
        for (let key of Object.keys(options)) {
            let tempData = null
            if (Object.hasOwnProperty.call(options, key)) {
                switch (key) {
                    case 'profile':
                        tempData = new Profile(options[key])
                        break
                    default:
                        tempData = options[key]
                }
            }
            this[key] = tempData
        }
    }

    get AvatarText() {
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