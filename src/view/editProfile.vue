<template>
  <div v-if="show">
    <div>
      <v-toolbar
          :height="64"
      >
        <v-toolbar-side-icon></v-toolbar-side-icon>
        <v-toolbar-title>
          <router-link type="button" depressed small to="/calendar">
            <span class="material-icons">event</span>
          </router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn>Link Two</v-btn>
          <v-btn @click="logout">
            Выйти
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </div>
    <v-form v-model="valid">
      <v-container>
        <v-text-field
            v-model="userModel.username"
            :rules="nameRules"
            :counter="10"
            label="User name"
            required
        ></v-text-field>
        <v-text-field
            v-model="userModel.profile.first_name"
            :rules="nameRules"
            :counter="10"
            label="Имя"
            required
        ></v-text-field>

        <v-text-field
            v-model="userModel.profile.last_name"
            :counter="20"
            label="Фамилия"
        ></v-text-field>

        <v-text-field
            v-model="userModel.email"
            :rules="emailRules"
            label="E-mail"
            required
        ></v-text-field>

        <v-text-field
            type="number"
            v-model="userModel.profile.mobile"
            :rules="mobileRules"
            label="Телефон"
            required
        ></v-text-field>

        <v-text-field
            v-model="userModel.birthday"
            :rules="birthdayRules"
            label="День рождения"
            required
        ></v-text-field>

        <v-text-field
            v-model="userModel.profile.country"
            label="Страна"
        ></v-text-field>

        <v-btn flat small @click="expanded">
          {{ expand ? 'Скрыть' : 'Дополнительные данные' }}
        </v-btn>
        <div v-show="expand">

          <v-form class="form">
            <v-container>
              <v-text-field
                  v-model="userModel.profile.city"
                  label="Город"
              ></v-text-field>

              <v-text-field
                  v-model="userModel.profile.state"
                  label="Должность"
              ></v-text-field>

              <v-textarea
                  v-model="userModel.profile.description"
                  label="Описание"
                  required
              ></v-textarea>
            </v-container>
          </v-form>
        </div>

        <v-checkbox
            v-model="checkbox"
            :rules="[v => !!v || '']"
            label="Согласен с изменениями"
            required
        ></v-checkbox>

        <div class="buttons">
          <v-btn type="button" @click="updateUser" :disabled="!valid">
            Отредактировать данные
            <i class="material-icons right">done</i>
          </v-btn>
          <v-btn type="button" @click="goOut">
            Отмена
            <i class="material-icons right">highlight_off</i>
          </v-btn>
        </div>

      </v-container>
    </v-form>
    <v-footer
        :height="50"
        :fixed="false"
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
        &copy; 2021 — <strong>GDS</strong>
      </v-flex>
    </v-footer>
  </div>
</template>

<script>

export default {
  name: "editProfile",
  data() {
    return {
      show: false,
      expand: false,
      valid: true,
      userModel: {
        username: '',
        birthday: '',
        email: '',
        profile: {
          mobile: 79,
          lastname: '',
          firstname: '',
          country: '',
          description: '',
          city: '',
          state: ''
        }
      },
      nameRules: [
        v => !!v || 'Имя обязательно',
        v => (v && v.length <= 10) || 'Заполните имя'
      ],
      email: '',
      checkbox: false,
      emailRules: [
        v => !!v || 'E-mail обязательно',
        v => /.+@.+/.test(v) || 'E-mail неверный'
      ],
      mobileRules: [
        v => !!v || 'Заполните номер телефона',
        v => /.79.+/.test && v.length === 11 || 'Проверьте, пожалуйста, телефон',
      ],
      birthdayRules: [
        v => !!v || 'Проверьте дату рождения'
      ]
    }
  },
  methods: {
    logout() {
      this.$root.$emit('logout')
    },
    goOut() {
      this.$router.push('/calendar')
    },
    updateUser() {
      this.$store.dispatch('updateUser', {value: this.userModel, id: this.$route.params.id})
      this.$root.$emit('save')
      this.$router.push('/calendar')
    },
    expanded() {
      this.expand = !this.expand
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
  beforeMount() {
    this.$store.dispatch('infoUserById', this.$route.params.id)
        .then(() => {
          this.userModel = this.user
        })
  },
  mounted() {
    this.show = true
  }
}
</script>

<style scoped>
.form {
  background: whitesmoke;
  box-shadow: 0 0 17px 0 #e7e7e7;
  display: flex;
  max-width: 800px;
  position: center;
  align-items: center;
  padding: 1rem;
  border: 1px solid #eee;
  margin-bottom: 1rem;
}
</style>