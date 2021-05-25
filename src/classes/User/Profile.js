class Profile {
    constructor(options) {
        this.city = options.city
        this.country = options.country
        this.created_at = options.created_at
        this.description = options.description
        this.first_name = options.first_name
        this.id = options.id
        this.last_name = options.last_name
        this.mobile = options.mobile
        this.region =options.region
        this.state = options.state
        this.title = options.title
        this.updated_at = options.updated_at
        this.user = options.user
    }
}

export {Profile}