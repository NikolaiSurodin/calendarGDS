<template>
  <div v-if="show">
    <div>
      <app-navbar
          @toCalendar="toCalendar"
      />
    </div>
    <form-user
        @updateUser="updateUser"
        @cancel="toCalendar"
        :user-name="user.username"
        :user-birthday="user.birthday"
        :user-email="user.email"
        :first-name="user.profile.first_name"
        :last-name="user.profile.last_name"
        :user-mobile="user.profile.mobile"
        :user-city="user.profile.city"
        :user-description="user.profile.description"
        :user-state="user.profile.state"
        :user-country="user.profile.country"
    />

    <app-footer/>

  </div>
</template>

<script>
import AppNavbar from "@/components/TheNavbar"
import FormUser from "@/components/FromUser";
import AppFooter from "@/components/TheFooter";

export default {
  name: "EditProfile",
  components: {AppFooter, FormUser, AppNavbar},
  data() {
    return {
      show: false,
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
              title: 'Ошибка! Пользователь не может быть обновлен!',
              solid: true
            })
          })
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