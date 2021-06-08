<template>
  <form-register
      :user-name="user.username"
      :user-email="user.email"
      :user-password="user.password"
      :user-password-confirm="user.passwordConfirm"
      :user-title="user.profile.title"
      :user-birthday="user.birthday"
      :user-city="user.profile.city"
      :user-country="user.profile.country"
      :user-description="user.profile.description"
      :user-first-name="user.profile.first_name"
      :user-last-name="user.profile.last_name"
      :user-mobile="user.profile.mobile"
      :user-state="user.profile.state"
      @register="register"
  >

  </form-register>
</template>

<script>

import FormRegister from "@/components/FormRegister";

export default {
  name: "Register",
  components: {FormRegister},
  data() {
    return {
      passwordType: 'password',
      valid: false,
      user: {
        username: '',
        email: '',
        birthday: '',
        password: '',
        passwordConfirm: '',
        profile: {
          first_name: '',
          last_name: '',
          mobile: '79',
          city: '',
          country: '',
          region: '',
          state: '',
          title: '',
          description: '',
        }
      }
    }
  },
  methods: {
    register(user) {
      this.$store.dispatch('register', user)
          .then(() => {
                this.$router.push('/login')
              })
          .catch((error) => {
            let errors = error.response.data
            let err = ''
            for (let error of Object.values(errors)) {
              err = error
            }
            this.$swal.fire({
              icon: 'error',
              title: 'Упс...',
              text: `${err}`,
            })
          })
    }
  }
}
</script>

<style scoped>

</style>