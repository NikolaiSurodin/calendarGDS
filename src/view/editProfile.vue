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
        :Email="user.email"
        :first_name="user.profile.first_name"
        :last_name="user.profile.last_name"
        :mobile_ph="user.profile.mobile"
        :user_city="user.profile.city"
        :user_description="user.profile.description"
        :user_state="user.profile.state"
        :user_country="user.profile.country"
    />
    <my-footer/>
  </div>
</template>

<script>
import MyNavbar from "@/components/myNavbar"
import FormUser from "@/components/fromUser";
import MyFooter from "@/components/myFooter";

export default {
  name: "editProfile",
  components: {MyFooter, FormUser, MyNavbar},
  data() {
    return {
      show: false,
      expand: false,
      valid: true
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
      this.$store.dispatch('updateUser', {
        value: user,
        id: this.$route.params.id
      })
          .then(() => {
            this.$root.$emit('save')
            this.$router.push('/calendar')
          })
          .catch((error) => {
            this.$bvToast.toast(`${error}`, {
              title:'Ошибка! Пользователь не может быть обновлен!',
              solid: true
            })
          })

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
  },
  mounted() {
    this.show = true
  }
}
</script>

<style scoped>


</style>