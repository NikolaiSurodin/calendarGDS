<template>
  <div class="wrapper">
    <div>

      <form class="form-signin">
        <h3>Добро пожаловать!</h3>
        <h1 class="h3 mb-3 font-weight-normal">Регистрация</h1>
        <p>Заполните все поля и нажмите "Зарегистрироваться":</p>
        <input type="text" id="inputUserName" class="form-control" placeholder="Имя пользователя" required autofocus v-model="user.username">
        <input type="text" id="inputName" class="form-control" placeholder="Имя" required v-model="user.firstname">
        <input type="text" id="inputLastName" class="form-control" placeholder="Фамилия" required v-model="user.lastname">
        <input type="email" id="inputEmail" class="form-control" placeholder="Email" required autofocus v-model="user.email">
        <input type="text" id="inputMobile" class="form-control" placeholder="Телефон" required v-model="user.mobile">
        <input type="text" id="inputBirthday" class="form-control" placeholder="День Рождения. Формат: ГГГГ-ММ-ЧЧ" required v-model="user.birthday">
        <input type="password" id="inputPassword" class="form-control" placeholder="пароль" required v-model="user.password">
        <input type="password" id="inputPasswordConfirm" class="form-control" placeholder="Повторите пароль" required v-model="user.passwordConfirm">
        <div class="btn">
          <button class="btn btn-lg btn-primary btn-block" type="submit" @click="register" :disabled="!valid">
            Зарегистрироваться
          </button>
          <router-link to="/login">Есть аккаунт!</router-link>
          <p class="mt-5 mb-3 text-muted">© GDS - 2021</p>
        </div>
      </form>
      <!--      <v-form v-model="valid">-->
      <!--        <v-container class="container card">-->
      <!--          <v-text-field-->
      <!--              v-model="user.username"-->
      <!--              :rules="usernameRules"-->
      <!--              :counter="10"-->
      <!--              label="User name"-->
      <!--              required-->
      <!--          ></v-text-field>-->

      <!--          <v-text-field-->
      <!--              v-model="user.firstname"-->
      <!--              :rules="nameRules"-->
      <!--              :counter="10"-->
      <!--              label="Имя"-->
      <!--              required-->
      <!--          ></v-text-field>-->

      <!--          <v-text-field-->
      <!--              v-model="user.lastname"-->
      <!--              :rules="nameRules"-->
      <!--              :counter="10"-->
      <!--              label="Фамилия"-->
      <!--              required-->
      <!--          ></v-text-field>-->

      <!--          <v-text-field-->
      <!--              v-model="user.email"-->
      <!--              :rules="emailRules"-->
      <!--              label="E-mail"-->
      <!--              required-->
      <!--          ></v-text-field>-->

      <!--          <v-text-field-->
      <!--              type="number"-->
      <!--              v-model="user.mobile"-->
      <!--              :rules="mobileRules"-->
      <!--              label="Телефон"-->
      <!--              required-->
      <!--          ></v-text-field>-->

      <!--          <v-text-field-->
      <!--              v-model="user.password"-->
      <!--              :rules="passwordRules"-->
      <!--              label="Пароль"-->
      <!--              required-->
      <!--          ></v-text-field>-->

      <!--          <v-text-field-->
      <!--              v-model="user.passwordConfirm"-->
      <!--              :rules="passwordConfirmRules"-->
      <!--              label="Повторите пароль"-->
      <!--              required-->
      <!--          ></v-text-field>-->
      <!--          <v-text-field-->
      <!--              v-model="user.birthday"-->
      <!--              label="День Рождения. Формат: ГГГГ-ММ-ЧЧ"-->
      <!--              required-->
      <!--          ></v-text-field>-->

      <!--          <div class="buttons">-->
      <!--            <button class="v-btn" type="button" @click="register" :disabled="!valid">-->
      <!--              Зарегистрироваться!-->
      <!--            </button>-->
      <!--            <button class="v-btn" type="button" @click="toLogin">-->
      <!--              Есть аккаунт! Войти!-->
      <!--              <i class="material-icons right">grade</i>-->
      <!--            </button>-->
      <!--          </div>-->
      <!--        </v-container>-->
      <!--      </v-form>-->
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