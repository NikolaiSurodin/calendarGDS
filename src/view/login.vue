<template>
  <div>
    <template>
      <message-error
          v-if="error"
          @closePopup="closePopup"
      >
        <h3>Введеные данные неверны! Попробуйте еще раз!</h3>
      </message-error>
    </template>
    <form class="form-signin" @submit.prevent="submitLogin">
      <img class="mb-4" src="../assets/2017679.png" alt width="240" height="105">
      <h1 class="h3 mb-3 font-weight-normal">Вход</h1>
      <p>Ведите данные для входа и нажмите Войти:</p>

      <input type="email"
             id="inputEmail"
             class="form-control"
             placeholder="Email"
             required autofocus
             v-model.trim="form.email"
             :class="$v.form.email.$error ? 'is-invalid' : ''"
      >
      <p v-if="$v.form.email.$dirty && !$v.form.email.required" class="invalid-feedback">Ошибка! Обязательное поле</p>
      <p v-if="$v.form.email.$dirty && !$v.form.email.email" class="invalid-feedback">Ошибка! Введите корректный
        E-mail</p>

      <input type="password"
             id="inputPassword"
             class="form-control"
             placeholder="пароль"
             required
             v-model.trim="form.password"
             :class="$v.form.password.$error ? 'is-invalid' : ''"
      >

      <p v-if="$v.form.password.$dirty && !$v.form.password.minLength" class="invalid-feedback">Ошибка!Пароль минимум 7
        символов</p>
      <p v-if="$v.form.password.$dirty && !$v.form.password.required" class="invalid-feedback">Обязательное поля!</p>

      <div class="btn">
        <button class="btn btn-lg btn-primary btn-block"
                type="submit">
          Войти
        </button>

        <router-link to="/">Регистрация</router-link>
        <p class="mt-5 mb-3 text-muted">© GDS - 2021</p>
      </div>
    </form>
  </div>

</template>

<script>
import messageError from "@/components/messageError"
import {email, required, minLength} from 'vuelidate/lib/validators'

export default {
  name: "login",
  components: {messageError},
  data() {
    return {
      form: {
        password: '',
        email: '',
      },
      error: false,
      valid: false,
    }
  },
  validations: {
    form: {
      email: {required, email},
      password: {required, minLength: minLength(7)}
    }
  },
  methods: {
    submitLogin() {
      this.$v.form.$touch()
      if (!this.$v.form.$error) {
        this.$store.dispatch('submitLogin', this.form)
            .then(() => this.$router.push('/calendar'))

            .catch((error) => {
              console.log(error)

              this.error = !this.error
              this.form.email = ''
              this.form.password = ''
            })
      }
    },
    closePopup() {
      this.error = false
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
  margin-top: 0em;
}

.text-center {
  text-align: center !important;
}

h1 {
  display: block;
  font-size: 2em;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
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
</style>