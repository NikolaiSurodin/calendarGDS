import {Profile} from '@/classes/User/Profile'


// class User {
//
//     constructor(options) {
//         this.birthday = options.birthday
//         this.email = options.email
//         this.password = options.password
//         this.id = options.id
//         this.profile = new Profile(options.profile)
//         this.user_hide = options.user_hide
//         this.username = options.username
//
//     }
//     get AvatarText () {
//         if (this.profile.first_name && this.profile.last_name) {
//             let avatarName = this.profile.first_name.split('')[0]
//             let avatarLastName = this.profile.last_name.split('')[0]
//             return avatarName + avatarLastName
//         } else {
//             return 'XX'
//         }
//     }
// }

class User {
    birthday
    email
    password
    id
    profile
    username
    user_hide

    constructor(options = {}) {
        for (let i of Object.keys(options)){
            let tempData = null
            if (Object.hasOwnProperty.call(options, i)){
                switch (i){
                    case 'profile':
                        tempData = new Profile(options[i])
                        break
                    case 'email':
                        tempData = options.email
                        break
                    case 'birthday':
                        tempData = options.birthday
                        break
                    case 'username':
                        tempData = options.username
                        break
                    case 'id':
                        tempData = options.id
                        break
                }
            }
            this[i] = tempData
        }
    }
}

export {User}