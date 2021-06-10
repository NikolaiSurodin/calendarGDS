<template>
  <div class="wrapper">
    <div>
      <form class="form" @submit.prevent="register">
        <h3>Добро пожаловать!</h3>
        <h1 class="h3 mb-3 font-weight-normal">Регистрация</h1>
        <p class="mt-3">
          <b>Заполните все поля и нажмите "Зарегистрироваться":</b>
        </p>

        <input type="text"
               id="inputUserName"
               class="form-control"
               placeholder="Имя пользователя"
               required autofocus
               v-model="user.username"
               :class="$v.user.username.$error ? 'is-invalid': ''"
        >
        <input type="text"
               id="inputName"
               class="form-control"
               placeholder="Имя"
               required
               v-model="user.profile.first_name"
               :class="$v.user.profile.first_name.$error ? 'is-invalid' : ''"
        >
        <input type="text"
               id="inputLastName"
               class="form-control"
               placeholder="Фамилия"
               required
               v-model="user.profile.last_name"
               :class="$v.user.profile.last_name.$error ? 'is-invalid' : ''"
        >

        <input type="email"
               id="inputEmail"
               class="form-control"
               placeholder="Email"
               required
               v-model="user.email"
               :class="$v.user.email.$error ? 'is-invalid' : ''"
        >
        <p v-if="isValidEmail" class="invalid-feedback">Некоректный Email</p>

        <input type="number"
               id="inputMobile"
               class="form-control"
               placeholder="Телефон"
               required
               v-model="user.profile.mobile"
               :class="$v.user.profile.mobile.$error ? 'is-invalid' : ''"
        >
        <p v-if="isValidMobile" class="invalid-feedback">Ошибка! Неверный номер</p>

        <input type="text"
               id="inputBirthday"
               class="form-control"
               placeholder="День Рождения. Формат: ГГГГ-ММ-ЧЧ"
               required
               v-model="user.birthday"
               :class="$v.user.birthday.$error ? 'is-invalid' : ''"
        >
        <input type="text"
               id="inputState"
               class="form-control"
               placeholder="Должность"
               required
               v-model="user.profile.state"
               :class="$v.user.profile.state.$error ? 'is-invalid' : ''"
        >

        <input :type="passwordType"
               id="inputPassword"
               class="form-control"
               placeholder="Пароль"
               required
               v-model="user.password"
               :class="$v.user.password.$error ? 'is-invalid' : ''"
        >
        <b-form-checkbox class="text-sm-right" @input="switchVisibilityPassword">
          <b-icon icon="eye-slash"></b-icon>
        </b-form-checkbox>

        <p v-if="!isValidPassword" class="invalid-feedback">
          Пароль минимум 7 символов. Введено : {{ $v.user.password.$model.length }}
        </p>

        <input type="password"
               id="inputPasswordConfirm"
               class="form-control"
               placeholder="Повторите пароль"
               required
               v-model="user.passwordConfirm"
               :class="$v.user.passwordConfirm.$error ? 'is-invalid' : ''"
        >
        <div class="btn">
          <b-button variant="outline-success" class="mt-3" type="submit">
            Зарегистрироваться
          </b-button>
          <router-link to="/login">Есть аккаунт!</router-link>
          <p class="mt-5 mb-3 text-muted">© GDS - {{currentYear}}</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {email, minLength, maxLength} from 'vuelidate/lib/validators'

export default {
  name: "FormRegister",
  props: {
    userName: {
      type: String,
      required: true
    },
    userEmail: {
      type: String,
      required: true
    },
    userBirthday: {
      type: String,
      required: true
    },
    userPassword: {
      type: String,
      required: true
    },
    userPasswordConfirm: {
      type: String,
      required: true
    },
    userFirstName: {
      type: String,
      required: true
    },
    userLastName: {
      type: String,
      required: true
    },
    userMobile: {
      type: String,
      required: true
    },
    userCity: {
      type: String,
      required: true
    },
    userCountry: {
      type: String,
      required: true
    },
    userState: {
      type: String,
      required: true
    },
    userTitle: {
      type: String,
      required: true
    },
    userDescription: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      passwordType: 'password',
      valid: false,
      user: {
        username: this.userName,
        email: this.userEmail,
        birthday: this.userBirthday,
        password: this.userPassword,
        passwordConfirm: this.userPasswordConfirm,
        profile: {
          first_name: this.userFirstName,
          last_name: this.userLastName,
          mobile: this.userMobile,
          city: this.userCity,
          country: this.userCountry,
          region: '',
          state: this.userState,
          title: this.userTitle,
          description: this.userDescription,
        }
      }
    }
  },
  validations: {
    user: {
      username: {},
      email: {email},
      password: {minLength: minLength(7)},
      birthday: {},
      passwordConfirm: {},
      profile: {
        first_name: {maxLength: maxLength(10)},
        last_name: {maxLength: maxLength(10)},
        mobile: {maxLength: maxLength(11), minLength: minLength(11)},
        state: {}
      }
    }
  },
  methods: {
    switchVisibilityPassword() {
      this.passwordType = this.passwordType === "password" ? "text" : "password"
    },
    register() {
      this.$v.user.$touch()
      if (!this.$v.user.$error) {
        if (this.user.password !== this.user.passwordConfirm) {
          this.user.password = ''
          this.user.passwordConfirm = ''
        } else {
          this.$emit('register', this.user)
        }
      }
    }
  },
  computed:{
    currentYear() {
      return new Date().getFullYear()
    },
    isValidEmail($v) {
      return $v.user.email.$dirty && !$v.user.email.email
    },
    isValidMobile($v) {
     return $v.user.profile.mobile.$dirty && !$v.user.profile.mobile.maxLength && !$v.user.profile.mobile.minLength
    },
    isValidPassword($v) {
      return $v.user.password.$dirty && !$v.user.password.minLength
    }
  }
}
</script>

<style scoped>
.form {
  width: 100%;
  max-width: 330px;
  margin: auto;
}
.btn {
  margin-bottom: 50px;
  width: 100%;
}
</style>