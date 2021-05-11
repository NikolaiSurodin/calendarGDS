<template>
  <div class="wrapper">
    <div>
      <form class="form-signin" @submit.prevent="register">
        <h3>Добро пожаловать!</h3>
        <h1 class="h3 mb-3 font-weight-normal">Регистрация</h1>
        <p>Заполните все поля и нажмите "Зарегистрироваться":</p>
        <input type="text"
               id="inputUserName"
               class="form-control"
               placeholder="Имя пользователя"
               required autofocus v-model="user.username"
               :class="$v.user.username.$error ? 'is-invalid' : ''"
        >
        <p v-if="$v.user.username.$dirty && !$v.user.username.required" class="invalid-feedback">Ошибка! Обязательное
          поле</p>

        <input type="text"
               id="inputName"
               class="form-control"
               placeholder="Имя"
               required v-model="user.firstname"
               :class="$v.user.firstname.$error ? 'is-invalid' : ''"
        >
        <p v-if="$v.user.firstname.$dirty && !$v.user.firstname.required" class="invalid-feedback">Ошибка! Обязательное
          поле</p>

        <input type="text"
               id="inputLastName"
               class="form-control"
               placeholder="Фамилия"
               required v-model="user.lastname"
               :class="$v.user.lastname.$error ? 'is-invalid' : ''"
        >
        <p v-if="$v.user.lastname.$dirty && !$v.user.lastname.required" class="invalid-feedback">Ошибка! Обязательное
          поле</p>
        <input type="email"
               id="inputEmail"
               class="form-control"
               placeholder="Email" required autofocus v-model="user.email"
               :class="$v.user.email.$error ? 'is-invalid' : ''"
        >
        <p v-if="$v.user.email.$dirty && !$v.user.email.required" class="invalid-feedback">Ошибка! Обязательное поле</p>
        <p v-if="$v.user.email.$dirty && !$v.user.email.email" class="invalid-feedback">Некоректный Email</p>
        <input type="text"
               id="inputMobile"
               class="form-control"
               placeholder="Телефон" required v-model="user.mobile"
               :class="$v.user.mobile.$error ? 'is-invalid' : ''"
        >
        <p v-if="$v.user.mobile.$dirty && !$v.user.mobile.required" class="invalid-feedback">Ошибка! Обязательное
          поле</p>
        <p v-if="$v.user.mobile.$dirty && !$v.user.mobile.maxLength" class="invalid-feedback">Ошибка! Неверный номер</p>
        <p v-if="$v.user.mobile.$dirty && !$v.user.mobile.minLength" class="invalid-feedback">Ошибка! Неверный номер </p>


        <input type="text"
               id="inputBirthday"
               class="form-control"
               placeholder="День Рождения. Формат: ГГГГ-ММ-ЧЧ" required v-model="user.birthday"
               :class="$v.user.birthday.$error ? 'is-invalid' : ''"
        >
        <p v-if="$v.user.birthday.$dirty && !$v.user.birthday.required" class="invalid-feedback">Ошибка! Обязательное
          поле</p>
        <input type="password"
               id="inputPassword"
               class="form-control"
               placeholder="пароль" required v-model="user.password"
               :class="$v.user.password.$error ? 'is-invalid' : ''"
        >
        <p v-if="$v.user.password.$dirty && !$v.user.password.required" class="invalid-feedback">Ошибка! Обязательное
          поле</p>
        <p v-if="$v.user.password.$dirty && !$v.user.password.minLength" class="invalid-feedback">Пароль минимум 7
          символов. Введено : {{ $v.user.password.$model.length }}</p>

        <input type="password"
               id="inputPasswordConfirm"
               class="form-control" placeholder="Повторите пароль" required v-model="user.passwordConfirm"
               :class="$v.user.passwordConfirm.$error ? 'is-invalid' : ''"
        >
        <p v-if="$v.user.passwordConfirm.$dirty && !$v.user.passwordConfirm.required" class="invalid-feedback">Ошибка!
          Обязательное поле</p>
        <div class="btn">
          <button class="btn btn-lg btn-primary btn-block">
            Зарегистрироваться
          </button>
          <router-link to="/login">Есть аккаунт!</router-link>
          <p class="mt-5 mb-3 text-muted">© GDS - 2021</p>
        </div>
      </form>
    </div>

    <message-error v-if="errors"
                   @closePopup="closePopup"
    >
      <h3 v-for="(e, key) in errors"
          :key="key"
      >{{ key }}: {{ e }}</h3>
    </message-error>
  </div>
</template>

<script>
import MessageError from "@/components/messageError";
import {email, required, minLength, maxLength} from 'vuelidate/lib/validators'


export default {
  components: { MessageError },
  name: "register",
  data() {
    return {
      valid: false,
      errors: null,
      user: {
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        mobile: 79,
        birthday: '',
        password: '',
        passwordConfirm: ''
      }
    }
  }, validations: {
    user: {
      username: {required},
      email: {required, email},
      password: {required, minLength: minLength(7)},
      firstname: {required, maxLength: maxLength(10)},
      lastname: {required, maxLength: maxLength(10)},
      mobile: {required, maxLength: maxLength(11), minLength: minLength(11)},
      birthday: {required},
      passwordConfirm: {required}
    }
  },
  methods: {
    closePopup() {
      this.errors = false
    },
    register() {
      this.$v.user.$touch()
      if (!this.$v.user.$error) {
        const user = {
          username: this.user.username,
          password: this.user.password,
          email: this.user.email,
          birthday: this.user.birthday,
          profile: {
            description: '',
            title: '',
            first_name: this.user.firstname,
            last_name: '',
            mobile: this.user.mobile,
            city: '',
            country: '',
            region: '',
            state: '',
          }
        }
        if (this.user.passwordConfirm !== this.user.password) {
          this.user.password = ''
          this.user.passwordConfirm = ''
        } else {
          this.$store.dispatch('register', user)
              .then(() => this.$router.push('/login'))
              .catch((error) => {
                this.errors = error.response.data
              })
        }
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