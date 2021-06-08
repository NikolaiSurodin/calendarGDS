<template>
  <form-login
      :user-email="user.email"
      :user-password="user.password"
      @submitLogin="submitLogin"
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
        email: '',
        password: '',
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
                text: 'Неверно! Есть еще варианты?',
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