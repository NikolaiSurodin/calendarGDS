<template>
  <div class="wrapper">
    <template>
      <message-error
          v-if="error"
          @closePopup="closePopup"
      >
        <h3>Введеные данные неверны! Попробуйте еще раз!</h3>
      </message-error>
    </template>
    <div class="wrapper">
      <v-jumbotron
          :gradient="gradient"
          :height="50"
          dark
          src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
      >
        <v-container fill-height>
          <v-layout align-center>
            <v-flex text-xs-center>
              <h3 class="display-3">Календарь отпусков</h3>
              <div class="description">
                <b>
                  Введите данные для входа: <br>
                </b>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-jumbotron>
      <v-form v-model="valid">
        <v-container class="card">
          <div class="text">
            Введите данные для входа:
          </div>
          <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
          ></v-text-field>

          <v-text-field
              v-model="password"
              :rules="passwordRules"
              label="Пароль"
              type="password"
              required
          ></v-text-field>

          <div class="submit">
            <v-btn type="submit" @click.prevent="submitLogin" :disabled="!valid">
              Войти
              <span class="material-icons">done</span>
            </v-btn>
            <div class="register">
              <router-link to="/">Регистрация</router-link>
            </div>
          </div>
        </v-container>
      </v-form>
    </div>
    <v-footer
        :height="50"
        :fixed="true"
        :color="'grey'"
    >
      <v-flex
          primary
          lighten-2
          py-3
          text-xs-center
          white--text
          xs12
      >
        &copy;2021 — <strong>GDS</strong>
      </v-flex>
    </v-footer>
  </div>
</template>

<script>
import messageError from "@/components/messageError";

export default {
  name: "login",
  components: {messageError},
  data() {
    return {
      gradient: 'to top right, rgba(63,81,181, .7), rgba(25,32,72, .7)',
      valid: false,
      password: '',
      email: '',
      error: false,
      emailRules: [
        v => !!v || 'E-mail заполнить обязательно',
        v => /.+@.+/.test(v) || 'Проверьте, пожалуйста, E-mail',
      ],
      passwordRules: [
        v => !!v || 'Проверьте пароль!',
      ]
    }
  },
  methods: {
    submitLogin() {
      const user = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('submitLogin', user)
          .then(() => this.$router.push('/calendar'))
          .catch((error) => {
            console.log(error)
            this.error = !this.error
            this.email = ''
            this.password = ''
          })
    },
    closePopup() {
      this.error = false
    }
  }
}


</script>

<style scoped>
.card {
  max-width: 500px;
  position: center;
  margin-top: 20px;
  width: 500px;
  display: block;
  background: linear-gradient(#e3d4d4, #a3a3a9); /* Цвет фона */
  border: 3px solid #fff; /* Белая рамка */
  border-radius: 30px;


}

.submit {
  margin-top: 20px;
  margin-left: 150px;
}
.register{
  margin-left: 20px;
}
</style>