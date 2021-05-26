
class Profile {
    city
    country
    created_at
    description
    first_name
    id
    last_name
    mobile
    region
    state
    title
    updated_at
    user

    constructor(options = {}) {
        for (let key of Object.keys(this)) {
            this[key] = Object.hasOwnProperty.call(options, key) ? options[key] : null
        }
    }
}

export {Profile}