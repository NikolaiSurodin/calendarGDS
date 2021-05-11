<template>
  <div v-if="show">
    <div>
      <my-navbar
          @toCalendar="toCalendar"
      />
    </div>

    <form-user
        @updateUser="updateUser"
        @cancel="toCalendar"
        :user_name="user.username"
        :birth_day="user.birthday"
        :first_name="user.profile.first_name"
        :last_name="user.profile.last_name"
        :mobile_ph="user.profile.mobile"
        :user_city="user.profile.city"
        :user_description="user.profile.description"
        :user_state="user.profile.state"
        :Email="user.email"
        :user_country="user.profile.country"
    />
  </div>
</template>

<script>
import MyNavbar from "@/components/myNavbar"
import FormUser from "@/components/fromUser";

export default {
  name: "editProfile",
  components: {FormUser, MyNavbar},
  data() {
    return {
      show: false,
      expand: false,
      valid: true,
      userModel: {
        username: '',
        birthday: '',
        email: '',
        profile: {
          mobile: 79,
          lastname: '',
          firstname: '',
          country: '',
          description: '',
          city: '',
          state: ''
        }
      }
    }
  },
  methods: {
    logout() {
      this.$root.$emit('logout')
    },
    toCalendar() {
      this.$router.push('/calendar')
    },
    updateUser(user) {
      this.$store.dispatch('updateUser', {value: user, id: this.$route.params.id})
      this.$root.$emit('save')
      this.$router.push('/calendar')
    },
    expanded() {
      this.expand = !this.expand
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
  beforeMount() {
    this.$store.dispatch('infoUserById', this.$route.params.id)
        .then(() => {
          this.userModel = this.user
        })
  },
  mounted() {
    this.show = true
  }
}
</script>

<style scoped>
.form {
  background: whitesmoke;
  box-shadow: 0 0 17px 0 #e7e7e7;
  display: flex;
  max-width: 800px;
  position: center;
  align-items: center;
  padding: 1rem;
  border: 1px solid #eee;
  margin-bottom: 1rem;
}
</style>