<template>
  <div class="wrapper">
    <div>
      <form class="form-signin" @submit.prevent="register">
        <h3>Добро пожаловать!</h3>
        <h1 class="h3 mb-3 font-weight-normal">Регистрация</h1>
        <b>Заполните все поля и нажмите "Зарегистрироваться":</b>
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
               required v-model="user.profile.first_name"
               :class="$v.user.profile.first_name.$error ? 'is-invalid' : ''"
        >
        <p v-if="$v.user.profile.first_name.$dirty && !$v.user.profile.first_name.required" class="invalid-feedback">
          Ошибка!
          Обязательное
          поле</p>

        <input type="text"
               id="inputLastName"
               class="form-control"
               placeholder="Фамилия"
               required v-model="user.profile.last_name"
               :class="$v.user.profile.last_name.$error ? 'is-invalid' : ''"
        >
        <p v-if="$v.user.profile.last_name.$dirty && !$v.user.profile.last_name.required" class="invalid-feedback">
          Ошибка! Обязательное
          поле</p>
        <input type="email"
               id="inputEmail"
               class="form-control"
               placeholder="Email" required autofocus v-model="user.email"
               :class="$v.user.email.$error ? 'is-invalid' : ''"
        >
        <p v-if="$v.user.email.$dirty && !$v.user.email.required" class="invalid-feedback">Ошибка! Обязательное поле</p>
        <p v-if="$v.user.email.$dirty && !$v.user.email.email" class="invalid-feedback">Некоректный Email</p>
        <input type="number"
               id="inputMobile"
               class="form-control"
               placeholder="Телефон" required v-model="user.profile.mobile"
               :class="$v.user.profile.mobile.$error ? 'is-invalid' : ''"
        >
        <p v-if="$v.user.profile.mobile.$dirty && !$v.user.profile.mobile.required" class="invalid-feedback">Ошибка!
          Обязательное
          поле</p>
        <p v-if="$v.user.profile.mobile.$dirty && !$v.user.profile.mobile.maxLength" class="invalid-feedback">Ошибка!
          Неверный номер</p>
        <p v-if="$v.user.profile.mobile.$dirty && !$v.user.profile.mobile.minLength" class="invalid-feedback">Ошибка!
          Неверный номер </p>


        <input type="text"
               id="inputBirthday"
               class="form-control"
               placeholder="День Рождения. Формат: ГГГГ-ММ-ЧЧ" required v-model="user.birthday"
               :class="$v.user.profile.$error ? 'is-invalid' : ''"
        >
        <p v-if="$v.user.birthday.$dirty && !$v.user.birthday.required" class="invalid-feedback">
          Обязательное поле!</p>
        <input type="password"
               id="inputPassword"
               class="form-control"
               placeholder="Пароль" required v-model="user.password"
               :class="$v.user.password.$error ? 'is-invalid' : ''"
        >
        <p v-if="$v.user.password.$dirty && !$v.user.password.required" class="invalid-feedback">Обязательное
          поле!</p>
        <p v-if="$v.user.password.$dirty && !$v.user.password.minLength" class="invalid-feedback">Пароль минимум 7
          символов. Введено : {{ $v.user.password.$model.length }}</p>

        <input type="password"
               id="inputPasswordConfirm"
               class="form-control" placeholder="Повторите пароль" required v-model="user.passwordConfirm"
               :class="$v.user.passwordConfirm.$error ? 'is-invalid' : ''"
        >
        <p v-if="$v.user.passwordConfirm.$dirty && !$v.user.passwordConfirm.required" class="invalid-feedback">
          Обязательное поле!</p>
        <div class="btn">
          <b-button variant="outline-success" class="mt-3" @submit="register('b-toaster-top-center')">
            Зарегистрироваться
          </b-button>
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
  components: {MessageError},
  name: "register",
  data() {
    return {
      valid: false,
      errors: null,
      user: {
        username: '',
        email: '',
        birthday: '',
        password: '',
        passwordConfirm: '',
        profile: {
          first_name: '',
          last_name: '',
          mobile: 79,
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
  validations: {
    user: {
      username: {required},
      email: {required, email},
      password: {required, minLength: minLength(7)},
      birthday: {required},
      passwordConfirm: {required},
      profile: {
        first_name: {required, maxLength: maxLength(10)},
        last_name: {required, maxLength: maxLength(10)},
        mobile: {required, maxLength: maxLength(11), minLength: minLength(11)},
      }
    }
  },
  methods: {
    closePopup() {
      this.errors = false
    },
    register(toaster, append = false) {
      this.$v.user.$touch()
      if (!this.$v.user.$error) {
        if (this.user.passwordConfirm !== this.user.password) {
          this.user.password = ''
          this.user.passwordConfirm = ''
        } else {
          this.$store.dispatch('register', this.user)
              .then(() => {
                    this.$router.push('/login')
                    this.$bvToast.toast('Регистрация прошла успешно! Введите Ваши данные для входа', {
                      title: 'Отлично!',
                      toaster: toaster,
                      solid: true,
                      appendToast: append
                    })
                  }
              )
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
</style>