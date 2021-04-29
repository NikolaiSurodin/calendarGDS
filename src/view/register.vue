<template>
  <div class="wrapper">
    <div>
      <v-jumbotron
          :gradient="gradient"
          :height="100"
          dark
          src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
      >
        <v-container fill-height>
          <v-layout align-center>
            <v-flex text-xs-center>
              <h3 class="display-3">Добро пожаловать!</h3>
              <div class="description">
                <b>
                  Введите данные для регистрации и нажмите "Зарегистрироваться"<br>
                  Если есть аккуант, нажмите "Войти"
                </b>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-jumbotron>

      <v-form v-model="valid">
        <v-container class="container card">
          <v-text-field
              v-model="user.username"
              :rules="usernameRules"
              :counter="10"
              label="User name"
              required
          ></v-text-field>

          <v-text-field
              v-model="user.firstname"
              :rules="nameRules"
              :counter="10"
              label="Имя"
              required
          ></v-text-field>

          <v-text-field
              v-model="user.lastname"
              :rules="nameRules"
              :counter="10"
              label="Фамилия"
              required
          ></v-text-field>

          <v-text-field
              v-model="user.email"
              :rules="emailRules"
              label="E-mail"
              required
          ></v-text-field>

          <v-text-field
              type="number"
              v-model="user.mobile"
              :rules="mobileRules"
              label="Телефон"
              required
          ></v-text-field>

          <v-text-field
              v-model="user.password"
              :rules="passwordRules"
              label="Пароль"
              required
          ></v-text-field>

          <v-text-field
              v-model="user.passwordConfirm"
              :rules="passwordConfirmRules"
              label="Повторите пароль"
              required
          ></v-text-field>
          <v-text-field
              v-model="user.birthday"
              label="День Рождения. Формат: ГГГГ-ММ-ЧЧ"
              required
          ></v-text-field>

          <div class="buttons">
            <button class="v-btn" type="button" @click="register" :disabled="!valid">
              Зарегистрироваться!
            </button>
            <button class="v-btn" type="button" @click="toLogin">
              Есть аккаунт! Войти!
              <i class="material-icons right">grade</i>
            </button>
          </div>
        </v-container>
      </v-form>
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

export default {
  components: {MessageError},
  name: "register",
  data() {
    return {
      gradient: 'to top right, rgba(63,81,181, .7), rgba(25,32,72, .7)',
      valid: false,
      PasswordError: false,
      errors: null,
      user: {
        firstname: '',
        lastname: '',
        email: '',
        mobile: 79,
        birthday: '',
        password: '',
        passwordConfirm: ''
      },

      nameRules: [
        v => !!v || 'Имя заполнить обязательно!',
        v => v.length <= 20 || 'Максимальное количество символов - 20',
      ],
      emailRules: [
        v => !!v || 'E-mail заполнить обязательно',
        v => /.+@.+/.test(v) || 'Проверьте, пожалуйста, E-mail',
      ],
      mobileRules: [
        v => !!v || 'Заполните номер телефона',
        v => /.79.+/.test && v.length === 11 || 'Проверьте, пожалуйста, телефон',
      ],
      usernameRules: [
        v => !!v || 'Заполнить обязательно!',
        v => v.length <= 20 || 'Максимальное количество символов - 20',
      ],
      passwordRules: [
        v => !!v || 'Введите пароль!',
        v => v.length >= 7 || 'Пароль должен содержать минимум 7 символов',
      ],
      passwordConfirmRules: [
        v => !!v || 'Повторите пароль!'
      ]
    }
  },
  methods: {
    closePopup() {
      this.errors = false
    },
    toLogin() {
      this.$router.push('/login')
    },
    register() {
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


</script>

<style scoped>
.card {
  width: 500px;
  position: center;
  display: block;
  margin-top: 20px;
  background: linear-gradient(#e9e2e2, #ffffff); /* Цвет фона */
  border: 3px solid #fff; /* Белая рамка */
  border-radius: 10px;
}

.buttons {
  margin-top: 20px;
}

.description {
  text-align: center;
  margin-top: 50px;
}

.wrapper {

}
</style>