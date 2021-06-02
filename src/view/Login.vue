<template>
  <form-login
      @SubmitLogin="submitLogin"
      :Email="user.email"
      :Password="user.password"
  >

  </form-login>
</template>

<script>

import FormLogin from "@/components/FormLogin";

export default {
  name: "Login",
  components: {FormLogin},
  data() {
    return {
      user: {
        password: '',
        email: '',
      }
    }
  },
  methods: {
    submitLogin(user) {
        this.$store.dispatch('submitLogin', user)
            .then(() => {
              this.$router.push('/calendar')
            })
            .catch(() => {
              this.$swal.fire({
                icon: 'error',
                title: 'Упс...',
                text: 'Данные неверные! Есть еще варианты?',
              })
              user.email = ''
              user.password = ''
            })
      }
    }
}


</script>

<style scoped>

</style>