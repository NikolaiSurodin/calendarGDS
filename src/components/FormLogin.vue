<template>
  <div>
    <form class="form" @submit.prevent="submitLogin">
      <img class="mb-4" src="../assets/2017679.png" alt width="240" height="105">
      <h1 class="h3 mb-3 font-weight-normal">Вход</h1>
      <p>Введите данные для входа и нажмите Войти:</p>
      <b-input-group size="md" class="mb-3">
        <b-input-group-prepend is-text>
          <b-icon icon="envelope"></b-icon>
        </b-input-group-prepend>

        <b-form-input type="email"
                      placeholder="me@example.com"
                      v-model.trim="user.email"
                      required
                      :class="$v.user.email.$error ? 'is-invalid' : ''"
        />
        <p v-if="!isValidEmail" class="invalid-feedback">Введите корректный E-mail</p>

      </b-input-group>

      <b-input-group size="md" >
        <b-input-group-prepend is-text>
          <b-icon icon="lock"></b-icon>
        </b-input-group-prepend>

        <b-form-input type="password"
                      placeholder="пароль"
                      required
                      v-model.trim="user.password"
                      :class="$v.user.password.$error ? 'is-invalid' : ''"
        />
        <p v-if="!isValidPassword" class="invalid-feedback">Пароль минимум 7
          символов</p>
      </b-input-group>

      <div class="btn">
        <b-button class="mt-3" variant="outline-success" type="submit">Войти</b-button>

        <router-link to="/">Регистрация</router-link>
        <p class="mt-5 mb-3 text-muted">© GDS - {{ currentYear }}</p>
      </div>
    </form>
  </div>
</template>

<script>

import {email, minLength} from 'vuelidate/lib/validators'

export default {
  name: "FormLogin",
  props: {
    userEmail: {
      type: String,
      required: true
    },
    userPassword: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      user: {
        email: this.userEmail,
        password: this.userPassword,
      }
    }
  },
  validations: {
    user: {
      email: { email },
      password: { minLength: minLength(7) }
    }
  },
  methods: {
    submitLogin() {
      this.$v.user.$touch()
      if (!this.$v.user.$error) {
        this.$emit('submitLogin', this.user)
      }
    }
  },
  computed:{
    currentYear() {
      return new Date().getFullYear()
    },
    //$v - vuelidate library (проверка на валидность)
    isValidEmail ($v) {
      return $v.user.email.$dirty && !$v.user.email.email
    },
    isValidPassword ($v) {
      return $v.user.password.$dirty && !$v.user.password.minLength
    }
  }
}


</script>

<style scoped>
.form {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.btn {
  margin-bottom: 50px;
  width: 100%;
}



</style>