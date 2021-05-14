<template>
  <div class="wrapper">
    <div>
      <div class="block">
        <p>Общее</p>
      </div>
      <form class="form-signin">
        <input type="text"
               id="inputUserName"
               class="form-control"
               placeholder="Имя пользователя"
               required autofocus v-model="user.username"
               :class="$v.user.username.$error ? 'is-invalid' : '' "
        >
        <p v-if="$v.user.username.$dirty && !$v.user.username.required" class="invalid-feedback">Ошибка! Обязательное
          поле</p>

        <input type="text"
               id="inputName"
               class="form-control"
               placeholder="Имя"
               required v-model="user.profile.firstname"
               :class="$v.user.profile.firstname.$error ? 'is-invalid' : '' "
        >
        <p v-if="$v.user.profile.firstname.$dirty && !$v.user.profile.firstname.required" class="invalid-feedback">Обязательное поле</p>
        <p v-if="$v.user.profile.firstname.$dirty && !$v.user.profile.firstname.maxLength" class="invalid-feedback">Не более 10
          символов</p>

        <input type="text"
               id="inputLastName"
               class="form-control"
               placeholder="Фамилия"
               required v-model="user.profile.lastname"
               :class="$v.user.profile.lastname.$error ? 'is-invalid' : '' "
        >
        <p v-if="$v.user.profile.lastname.$dirty && !$v.user.profile.lastname.maxLength" class="invalid-feedback">Не более 10
          символов</p>
        <p v-if="$v.user.profile.lastname.$dirty && !$v.user.profile.lastname.required" class="invalid-feedback">Обязательное поле</p>

        <input type="email"
               id="inputEmail"
               class="form-control"
               placeholder="Email" required autofocus v-model="user.email"
               :class="$v.user.email.$error ? 'is-invalid' : '' "
        >
        <p v-if="$v.user.email.$dirty && !$v.user.email.required" class="invalid-feedback">Обязательное поле</p>
        <p v-if="$v.user.email.$dirty && !$v.user.email.email" class="invalid-feedback">Некорректный email</p>

        <input type="text"
               id="inputMobile"
               class="form-control"
               placeholder="Телефон" required v-model="user.profile.mobile"
               :class="$v.user.profile.mobile.$error ? 'is-invalid' : '' "
        >
        <p v-if="$v.user.profile.mobile.$dirty && !$v.user.profile.mobile.required" class="invalid-feedback">Обязательное поле</p>

        <input type="text"
               id="inputBirthday"
               class="form-control"
               placeholder="День Рождения. Формат: ГГГГ-ММ-ЧЧ" required v-model="user.birthday"
               :class="$v.user.birthday.$error ? 'is-invalid' : '' "
        >
        <p v-if="$v.user.birthday.$dirty && !$v.user.birthday.required" class="invalid-feedback">Обязательное поле</p>

        <input type="text"
               id="inputCountry"
               class="form-control"
               placeholder="Страна" v-model="user.profile.country"
        >
        <div class="btn">
          <b-button variant="light" @click="expanded">
            {{ expand ? 'Скрыть' : 'Дополнительные данные' }}
          </b-button>
          <div v-show="expand">
            <input type="text"
                   id="inputCity"
                   class="form-control"
                   placeholder="Город" v-model="user.profile.city"
            >
            <input type="text"
                   id="inputState"
                   class="form-control"
                   placeholder="Должность" v-model="user.profile.state"
            >
            <textarea type="text"
                      id="description"
                      class="form-control"
                      placeholder="Описание" v-model="user.profile.description"
            />
          </div>
          <div class="mt-5">
            <b-button variant="outline-success"  @click="updateUser">Отредактировать</b-button>
            <b-button variant="outline-danger" class="mb-1" @click="cancel">Отмена</b-button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

import {email, required, minLength, maxLength} from 'vuelidate/lib/validators'

export default {
  name: "formUser",
  props: ['user_name', 'birth_day', 'Email', 'mobile_ph', 'last_name', 'first_name', 'user_city', 'user_state', 'user_description', 'user_country'],
  data() {
    return {
      expand: false,
      user: {
        username: this.user_name,
        birthday: this.birth_day,
        email: this.Email,
        profile:{
          mobile: this.mobile_ph,
          lastname: this.last_name,
          firstname: this.first_name,
          country: this.user_country,
          description: this.user_description,
          city: this.user_city,
          state: this.user_state,
        }
      }
    }
  },
  validations: {
    user: {
      username: {required},
      email: {required, email},
      birthday: {required},
      profile:{
        firstname: {required, maxLength: maxLength(10)},
        lastname: {required, maxLength: maxLength(10)},
        mobile: {required, maxLength: maxLength(11), minLength: minLength(11)},
      }
    }
  },
  methods: {
    expanded() {
      this.expand = !this.expand
    },
    updateUser() {
      this.$v.user.$touch()
      if (!this.$v.$error) {
        this.$emit('updateUser', this.user)
      }
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

.block {
  display: block;
  height: 54px;
  line-height: 54px;
  font-size: 16px;
  outline: 0;
  color: black;
  background-color: slategray;

}
</style>