<template>
  <div>
    <form class="form" @submit.prevent="submitLogin">
      <img class="mb-4" src="../assets/2017679.png" alt width="240" height="105">
      <h1 class="h3 mb-3 font-weight-normal">Вход</h1>
      <p>Введите данные для входа и нажмите Войти:</p>
      <label for="inputEmail" class="row ml-0 p-0"><b-icon icon="at" aria-hidden="true"></b-icon></label>
      <input type="email"
             id="inputEmail"
             class="form-control"
             placeholder="email"
             required autofocus
             v-model.trim="user.email"
             :class="$v.user.email.$error ? 'is-invalid' : ''"
      >
      <p v-if="$v.user.email.$dirty && !$v.user.email.email" class="invalid-feedback">Введите корректный E-mail</p>
      <p v-if="$v.user.email.$dirty && !$v.user.email.required" class="invalid-feedback">Обязательное поле!</p>
      <label for="inputPassword" class="row ml-0 mt-1"><b-icon icon="lock-fill" aria-hidden="true"></b-icon></label>
      <input type="password"
             id="inputPassword"
             class="form-control"
             placeholder="пароль"
             required
             v-model.trim="user.password"
             :class="$v.user.password.$error ? 'is-invalid' : ''"
      >

      <p v-if="$v.user.password.$dirty && !$v.user.password.minLength" class="invalid-feedback">Пароль минимум 7
        символов</p>
      <p v-if="$v.user.password.$dirty && !$v.user.password.required" class="invalid-feedback">Обязательное поле!</p>

      <div class="btn">
        <b-button class="mt-3" variant="outline-success" type="submit">Войти</b-button>

        <router-link to="/">Регистрация</router-link>
        <p class="mt-5 mb-3 text-muted">© GDS - {{ currentYear }}</p>
      </div>
    </form>
  </div>
</template>

<script>

import {email, required, minLength} from 'vuelidate/lib/validators'

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
      },
      error: false,
      valid: false,
    }
  },
  validations: {
    user: {
      email: {required, email},
      password: {required, minLength: minLength(7)}
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