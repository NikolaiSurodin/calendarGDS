<template>
  <form-register
      :Username="user.username"
      :Email="user.email"
      :Password="user.password"
      :password-confirm="user.passwordConfirm"
      :Title="user.profile.title"
      :Birthday="user.birthday"
      :City="user.profile.city"
      :Country="user.profile.country"
      :Description="user.profile.description"
      :first-name="user.profile.first_name"
      :last-name="user.profile.last_name"
      :Mobile="user.profile.mobile"
      :State="user.profile.state"
      @Register="register"
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
                    this.$bvToast.toast('Регистрация прошла успешно! Введите Ваши данные для входа', {
                      title: 'Отлично!',
                      solid: true,
                    })
                  }
              )
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