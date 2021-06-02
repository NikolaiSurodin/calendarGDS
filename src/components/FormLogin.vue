<template>
  <div>
    <form class="form-signin" @submit.prevent="submitLogin()">
      <img class="mb-4" src="../assets/2017679.png" alt width="240" height="105">
      <h1 class="h3 mb-3 font-weight-normal">Вход</h1>
      <p>Введите данные для входа и нажмите Войти:</p>

      <input type="email"
             id="inputEmail"
             class="form-control"
             placeholder="Email"
             required autofocus
             v-model.trim="user.email"
             :class="$v.user.email.$error ? 'is-invalid' : ''"
      >
      <p v-if="$v.user.email.$dirty && !$v.user.email.required" class="invalid-feedback">Обязательное поле!</p>
      <p v-if="$v.user.email.$dirty && !$v.user.email.email" class="invalid-feedback">Введите корректный E-mail</p>

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
        <p class="mt-5 mb-3 text-muted">© GDS - 2021</p>
      </div>
    </form>
  </div>
</template>

<script>

import {email, required, minLength} from 'vuelidate/lib/validators'

export default {
  name: "FormLogin",
  props: {
    Email: {
      type: String,
      required: true
    },
    Password: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      user: {
        password: this.Password,
        email: this.Email,
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
        this.$emit('SubmitLogin', this.user)
      }
    }
  }
}


</script>

<style scoped>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

form {
  display: block;
  margin-top: 0;
}

.text-center {
  text-align: center !important;
}

h1 {
  display: block;
  font-size: 2em;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0;
  margin-inline-end: 0;
  font-weight: bold;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

label {
  display: inline-block;
  margin-bottom: .5rem;
}

label {
  cursor: default;
}

.text-center {
  text-align: center !important;
}

.btn {
  margin-bottom: 50px;
  width: 100%;
}

.element {
  display: flex;
  flex-direction: column;
}

</style>