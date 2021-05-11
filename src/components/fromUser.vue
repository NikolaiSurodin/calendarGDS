<template>
  <div class="wrapper">
    <div>
      <form class="form-signin">
        <input type="text"
               id="inputUserName"
               class="form-control"
               placeholder="Имя пользователя"
               required autofocus v-model="user.username"
        >

        <input type="text"
               id="inputName"
               class="form-control"
               placeholder="Имя"
               required v-model="user.firstname"

        >


        <input type="text"
               id="inputLastName"
               class="form-control"
               placeholder="Фамилия"
               required v-model="user.lastname"

        >

        <input type="email"
               id="inputEmail"
               class="form-control"
               placeholder="Email" required autofocus v-model="user.email"

        >

        <input type="text"
               id="inputMobile"
               class="form-control"
               placeholder="Телефон" required v-model="user.mobile"

        >

        <input type="text"
               id="inputBirthday"
               class="form-control"
               placeholder="День Рождения. Формат: ГГГГ-ММ-ЧЧ" required v-model="user.birthday"

        >


        <input type="text"
               id="inputCountry"
               class="form-control"
               placeholder="Страна" v-model="user.country"
        >
        <div class="btn">
          <b-button variant="light" @click="expanded">
            {{ expand ? 'Скрыть' : 'Дополнительные данные' }}
          </b-button>
          <div v-show="expand">
            <input type="text"
                   id="inputCity"
                   class="form-control"
                   placeholder="Город" v-model="user.city"
            >
            <input type="text"
                   id="inputState"
                   class="form-control"
                   placeholder="Должность" v-model="user.state"
            >
            <textarea type="text"
                      id="description"
                      class="form-control"
                      placeholder="Описание" v-model="user.description"
            />
          </div>
          <b-button variant="outline-primary" @click="updateUser">Отредактировать</b-button>
          <b-button variant="outline-danger" @click="cancel">Отмена</b-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

import {email, required, minLength, maxLength} from 'vuelidate/lib/validators'

export default {
  name: "formUser",
  props: ['user_name', 'birth_day', 'Email', 'mobile_ph', 'last_name', 'first_name', 'user_city', 'user_state', 'user_description','user_country'],
  data() {
    return {
      expand: false,
      user: {
        username: this.user_name,
        firstname: this.first_name,
        lastname: this.last_name,
        email: this.Email,
        mobile: this.mobile_ph,
        birthday: this.birth_day,
        city: this.user_city,
        state: this.user_state,
        description: this.user_description,
        country: this.user_country
      }
    }
  },
  validations: {
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
    expanded() {
      this.expand = !this.expand
    },
    updateUser() {
      this.$emit('updateUser', this.user)
    },
    cancel() {
     this.$emit('cancel')
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